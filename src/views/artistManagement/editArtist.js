import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Avatar,
  Card,
  Spin,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  Upload,
  message,
  TextArea,
  TimePicker,
  Image,
} from "antd";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  ADMIN,
  ARTIST,
  COMPANY,
  UPLOADS_URL,
} from "../../config/constants/api";
import DashbordSidebar from "../../components/DashboardSidebar";
import { Get } from "../../config/api/get";
import { Put } from "../../config/api/put";
import { FaArrowLeftLong } from "react-icons/fa6";
import avatar from "../../assets/avatar.png";
import swal from "sweetalert";
import { userManagementDate } from "../../components/Data/data";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { LoadingOutlined } from "@ant-design/icons";
import { Post } from "../../config/api/post";
import { FaCamera } from "react-icons/fa";

function AddArtist() {
  const [form] = Form.useForm();
  const location = useLocation();
  const details = location?.state?.details;
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageObject, setImageObject] = useState(null);
  const [isBanned, setIsBanned] = useState(false);
  const [userManagement, setUserManagement] = useState(
    userManagementDate.find((item) => item.id == id)
  );
  useEffect(() => {
    if (!details) {
      navigate(-1);
    } else {
      form.setFieldsValue({
        fullName: details?.fullName,
        gender: details?.gender,
        email: details?.email,
        eventType: details?.eventType,
        category: details?.category,
      });
    }
  }, []);

  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const handleChange = () => {};
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const { TextArea } = Input;
  const onFinish = (values) => {
    const formValuesChanged = () => {
      return (
        details?.fullName !== values?.fullName ||
        details?.gender !== values?.gender ||
        details?.category !== values?.category ||
        details?.email !== values?.email ||
        details?.eventType !== values?.eventType ||
        imageObject
      );
    };
    if (formValuesChanged()) {
      let data = new FormData();
      if(values?.fullName){
          data.append("fullName", values?.fullName);
      }
      if(values?.email){
        data.append("email", values?.email);
      }
      if(values?.gender){
        data.append("gender", values?.gender);
      }
      if(values?.category){
        data.append("category", values?.category);
      }
      if(values?.eventType){
        data.append("eventType", values?.eventType);
      }
      if(imageObject){
          data.append("image", imageObject);
      }
      Put(
        `${ARTIST.updateArtist}${details?._id}`,
        token,
        data,
        null,
        "multipart"
      )
        .then((response) => {
          swal("Success!", response?.message, "success");
          navigate(`/artistManagement/${details?._id}`);
        })
        .catch((err) => {
          let message = err?.response?.data?.message;
          console.log(":::;", err);
          if (message) swal("Oops!", message, "error");
        });
    } else {
      swal("System Alert", "No Changes Detected", "error");
      return;
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleChangepro = (info) => {
    setLoading(true);
    getBase64(
      info?.fileList[info?.fileList?.length - 1]?.originFileObj,
      (url) => {
        setImageObject(
          info?.fileList[info?.fileList?.length - 1]?.originFileObj
        );
        setLoading(false);
        setImageUrl(url);
      }
    );
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Invalid Uplaod, You can only upload image files!");
    }
    return isImage;
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Picture
      </div>
    </button>
  );

  return (
    <div className="shop-page">
      <Row style={{ width: "100%", justifyContent: "center" }}>
        <Col xs={24} md={24}>
          <div className="shop-page-main">
            <Row>
              <Col xs={24} md={24} lg={24} xl={24}>
                <div className="my-account-profile">
                  <section className="side-menu-parent">
                    <DashbordSidebar />
                    {!loading ? (
                      <div className="about-us-section">
                        <Row align={"middle"} style={{ marginBottom: "15px" }}>
                          <Col lg={24}>
                            <div class="arrow-box2">
                              <div>
                                <FaArrowLeftLong
                                  className="arrow"
                                  onClick={() => navigate(-1)}
                                />
                              </div>
                              <h3 className="main-heading">EDIT ARTIST</h3>
                            </div>
                          </Col>
                        </Row>

                        <div className="bg-parent">
                          <Row gutter={[16, 16]} align={""} justify={"center"}>
                            <Col md={14} lg={12} xl={16}>
                              <div className="">
                                <div className="logo-rectangle">
                                  <div className="edit-profile-info">
                                    <Form
                                      className="row g-3"
                                      name="basic"
                                      layout="vertical"
                                      initialValues={{
                                        remember: true,
                                      }}
                                      onFinish={onFinish}
                                      onFinishFailed={onFinishFailed}
                                      autoComplete="off"
                                      form={form}
                                    >
                                      <Row
                                        style={{ width: "100%" }}
                                        gutter={[16, 16]}
                                      >
                                        <Col xs={24} md={12}>
                                          <Form.Item
                                            label="Full Name"
                                            name="fullName"
                                          >
                                            <Input
                                              size="large"
                                              placeholder="Enter Full Name"
                                              className="web-input"
                                              required={true}
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col xs={24} md={12}>
                                          <Form.Item
                                            label="Email Address"
                                            name="email"
                                          >
                                            <Input
                                              size="large"
                                              placeholder="Enter Email Address"
                                              className="web-input"
                                              required={true}
                                            />
                                          </Form.Item>
                                        </Col>

                                        <Col lg={12} md={12} xs={24}>
                                          <Form.Item
                                            label="Category"
                                            name="category"
                                          >
                                            <Select
                                              defaultValue="Category"
                                              onChange={handleChange}
                                              options={[
                                                {
                                                  value: "Musician",
                                                  label: "Musician",
                                                },
                                                {
                                                  value: "Comedian",
                                                  label: "Comedian",
                                                },
                                                {
                                                  value: "Priest",
                                                  label: "Priest",
                                                },
                                                {
                                                  value: "Singer",
                                                  label: "Singer",
                                                },
                                              ]}
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col lg={12} md={12} xs={24}>
                                          <Form.Item
                                            label="Gender"
                                            name="gender"
                                          >
                                            <Select
                                              defaultValue="Gender"
                                              onChange={handleChange}
                                              options={[
                                                {
                                                  value: "MALE",
                                                  label: "Male",
                                                },
                                                {
                                                  value: "FEMALE",
                                                  label: "Female",
                                                },
                                                {
                                                  value: "OTHER",
                                                  label: "Other",
                                                },
                                              ]}
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col lg={24} md={24} xs={24}>
                                          <Form.Item
                                            label="Event Type"
                                            name="eventType"
                                          >
                                            <Select
                                              defaultValue="Event Type"
                                              // onChange={handleChange}
                                              options={[
                                                {
                                                  value: "Playground",
                                                  label: "Playground",
                                                },
                                                {
                                                  value: "Attractions",
                                                  label: "Attractions",
                                                },
                                                {
                                                  value: "Entertainment",
                                                  label: "Entertainment",
                                                },
                                              ]}
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col xs={24}>
                                          <Form.Item
                                            label="Upload Image"
                                            name="uploadImage"
                                            required={true}
                                          >
                                            <>
                                              <Upload
                                                name="image"
                                                showUploadList={false}
                                                style={{ position: "relative" }}
                                                onChange={handleChangepro}
                                                beforeUpload={beforeUpload}
                                              >
                                                {" "}
                                                <div
                                                  style={{
                                                    height: "300px",
                                                    // border: "1px solid gray",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                    width: "100%",
                                                    objectFit: "cover",
                                                  }}
                                                >
                                                  {imageUrl ? (
                                                    <img
                                                      src={imageUrl}
                                                      alt="avatar"
                                                      style={{
                                                        width: "100%",
                                                        maxHeight: "300px",
                                                      }}
                                                    />
                                                  ) : (
                                                    <img
                                                      src={
                                                        UPLOADS_URL +
                                                        details?.image
                                                      }
                                                      alt="avatar"
                                                      style={{
                                                        width: "100%",
                                                        maxHeight: "300px",
                                                        objectFit: "cover",
                                                        objectPosition:
                                                          "center",
                                                        filter: "blur(1px)",
                                                      }}
                                                    />
                                                  )}
                                                  <FaCamera
                                                    style={{
                                                      position: "absolute",
                                                      color: "rgb(0,127,202)",
                                                      fontSize: "25px",
                                                    }}
                                                  />
                                                </div>{" "}
                                              </Upload>
                                            </>
                                          </Form.Item>
                                        </Col>

                                        <div
                                          style={{
                                            textAlign: "center",
                                            justifyContent: "center",
                                            width: "100%",
                                            display: "flex",
                                          }}
                                        >
                                          <Button
                                            type=""
                                            htmlType="submit"
                                            className="btn web-btn px-5"
                                          >
                                            Edit ARTIST{" "}
                                            <BsArrowUpRightCircleFill />
                                          </Button>
                                        </div>
                                      </Row>
                                    </Form>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Spin style={{ margin: "250px 600px" }} />
                      </div>
                    )}
                  </section>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default AddArtist;
