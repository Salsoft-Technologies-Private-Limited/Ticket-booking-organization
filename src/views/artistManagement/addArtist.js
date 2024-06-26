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
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { ADMIN, ARTIST, COMPANY, UPLOADS_URL } from "../../config/constants/api";
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

function AddArtist() {
  const [form] = Form.useForm();
  
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageObject, setImageObject] = useState(null);
  const [isBanned, setIsBanned] = useState(false);
  const [userManagement, setUserManagement] = useState(
    userManagementDate.find((item) => item.id == id)
  );
  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const handleChange = () => {};
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const { TextArea } = Input;
  const onFinish = (values) => {
    if (!imageObject) {
      swal("Error", "Artist Image is Required", "error");
      return;
    }
    setLoading(true);
    let data = new FormData();
    data.append("fullName", values?.fullName);
    data.append("email", values?.email);
    data.append("eventType", values?.eventType);
    data.append("category", values?.category);
    data.append("gender", values?.gender);
    data.append("image", imageObject);
    Post(ARTIST.addArtist, data, token, null, "multipart")
      .then((response) => {
        setLoading(false);
        swal("Success!", response?.message, "success");
        navigate("/artistManagement");
      })
      .catch((err) => {
        let message = err?.response?.data?.message;
        setLoading(false);
        console.log(":::;", err);
        if (message) swal("Oops!", message, "error");
      });
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
                              <h3 className="main-heading">ADD ARTIST</h3>
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
                                            required={true}
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
                                            required={true}
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
                                            required={true}
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
                                                }
                                                
                                              ]}
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col lg={12} md={12} xs={24}>
                                          <Form.Item
                                            label="Gender"
                                            name="gender"
                                            required={true}
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
                                            required={true}
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
                                                    width: "100%",
                                                    border: "1px dotted gray",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    cursor: "pointer",
                                                  }}
                                                >
                                                  {imageUrl ? (
                                                    <img
                                                      src={imageUrl}
                                                      alt="avatar"
                                                      style={{
                                                        maxWidth: "100%",
                                                        height: "295px",
                                                        objectPosition:
                                                          "center",
                                                        objectFit: "cover",
                                                      }}
                                                    />
                                                  ) : (
                                                    uploadButton
                                                  )}
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
                                            ADD ARTIST{" "}
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
