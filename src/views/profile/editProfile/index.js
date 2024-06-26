import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  Upload,
  message,
} from "antd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import DashbordSidebar from "../../../components/DashboardSidebar";
import "react-phone-number-input/style.css";
import swal from "sweetalert";
import { PROFILE, UPLOADS_URL } from "../../../config/constants/api";
import { Put } from "../../../config/api/put";
import moment from "moment";
import { addUser } from "../../../redux/slice/authSlice";
import { FaCamera } from "react-icons/fa";
import dayjs from "dayjs";

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
const DropzoneFiltercards = () => {
  const [loading, setLoading] = useState(false);
  const [imageObject, setImageObject] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();
  const token = useSelector((state) => state.user.userToken);
  const userData = useSelector((state) => state.user.userData);
  useEffect(() => {
    form.setFieldsValue({
      FirstName: userData?.firstName,
      LastName: userData?.lastName,
      Email: userData?.email,
      Phone: userData?.phone,
    });
  }, []);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onFinish = (values) => {
    const { FirstName, LastName, Phone } = values;
    const formValuesChanged = () => {
      return (
        userData?.firstName !== FirstName ||
        userData?.LastName !== LastName ||
        userData?.phone !== Phone ||
        imageObject
      );
    };
    if (formValuesChanged()) {
      let data = new FormData();
      if (imageObject) {
        data.append("image", imageObject);
      }
      if (FirstName) {
        data.append("firstName", FirstName);
      }
      if (LastName) {
        data.append("lastName", LastName);
      }
      if (Phone) {
        data.append("phone", Phone);
      }

      Put(PROFILE.editProfile, token, data, {}, "multipart")
        .then((response) => {
          if (response.status) {
            dispatch(
              addUser({ user: response?.data, token: token })
            );
            form.resetFields();
            swal("Success", "Profile Updated Successfully", "success");
            navigate("/profile");
          }
        })
        .catch((err) => {
          console.log("Error", err);
          swal("Error", err?.response?.data?.message, "error");
        });
    } else {
      swal("System Alert", "No Changes Detected", "error");
      return;
    }
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

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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
                    <div className="about-us-section">
                      <div className="profile-information-wrapper">
                        <h3 className="main-heading">Edit Profile</h3>
                      </div>
                      <div className="bg-parent">
                        <Row
                          gutter={[16, 16]}
                          align={""}
                          justify={"space-between"}
                        >
                          <Col md={10} lg={10} xl={8}>
                            <div className="wrapper-group-100000185">
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
                                        src={UPLOADS_URL + userData?.image}
                                        alt="avatar"
                                        style={{
                                          width: "100%",
                                          maxHeight: "300px",
                                          objectFit: "cover",
                                          objectPosition: "center",
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
                            </div>
                          </Col>

                          <Col md={14} lg={14} xl={16}>
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
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item
                                          label="First Name"
                                          name="FirstName"
                                        >
                                          <Input
                                            size="large"
                                            className="web-input"
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item
                                          label="Last Name"
                                          name="LastName"
                                        >
                                          <Input
                                            size="large"
                                            className="web-input"
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item
                                          label="Phone Number"
                                          name="Phone"
                                        >
                                          <Input
                                            size="large"
                                            // placeholder={profileDetails?.phone}
                                            className="web-input"
                                            type="number"
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item label="Email" name="Email">
                                          <Input
                                            size="large"
                                            className="web-input"
                                            disabled
                                          />
                                        </Form.Item>
                                      </Col>

                                      {/* <Col lg={24} md={12} xs={24}>
                                        <Form.Item
                                          label="Date Of Birth"
                                          name="DOB"
                                        >
                                          <DatePicker className="web-input" />
                                        </Form.Item>
                                      </Col> */}
                                      <div
                                        className=""
                                        style={{ textAlign: "center" }}
                                      >
                                        <Button
                                          type=""
                                          htmlType="submit"
                                          className="btn web-btn px-5"
                                        >
                                          Update
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
                  </section>
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DropzoneFiltercards;
