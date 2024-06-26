import React, { useState } from "react";
import {
  Layout,
  Col,
  Row,
  Button,
  Form,
  Input,
  Checkbox,
  Upload,
  message,
} from "antd";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { COMPANY, PROFILE, USER_AUTH } from "../../config/constants/api";
import { addUser, addProfileDetails } from "../../redux/slice/authSlice";
import swal from "sweetalert";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Get } from "../../config/api/get";
// import socket from "../../config/socket";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";

function SignUp() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageObject, setImageObject] = useState(null);
  // useEffect if user is already logged in
  React.useEffect(() => {
    if (user && token) {
      navigate("/", { replace: true });
    }
  }, [user, token]);
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

  const onFinish = (values) => {
    console.log('skhdn')
    if (!imageObject) {
      swal("Error", "Profile Image is Required", "error");
      return;
    }
    setLoading(true);
    let data = new FormData();
    data.append("email", values?.email);
    data.append("password", values?.password);
    data.append("firstName", values?.firstName);
    data.append("lastName", values?.lastName);
    data.append("phone", values?.phone);
    data.append("image", imageObject);
    Post(USER_AUTH.signup, data, null, null, "multipart")
      .then((response) => {
        setLoading(false);
        dispatch(
          addUser({ user: response.data?.organization, token: response.data?.token })
        );
        swal("Success!", response?.message, "success");
        navigate("/");
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

  return (
    <Layout
      className=""
      style={{ backgroundColor: "#fff", minHeight: "100vh" }}
    >
      <div className="auth-banner">
        <Row style={{ width: "100%", justifyContent: "center" }}>
          <Col xs={23} md={18} lg={15}>
            <div className="auth-box mb-50 mt-50">
              <div className="blur-bg-inner-card-form">
                <h2 className="auth-heading">CREATE AN ACCOUNT</h2>
                <p className="auth-p">Fill out this form to signup</p>
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
                    style={{ width: "100%", justifyContent: "center" }}
                    gutter={[16, 16]}
                  >
                    <Col
                      lg={24}
                      md={24}
                      xs={24}
                      className="upload-img"
                      style={{ textAlign: "center" }}
                    >
                      <h6 className="for-lable">Upload Profile Picture*</h6>
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
                            height: "150px",
                            width: "150px",
                            borderRadius: "100%",
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
                                height: "150px",
                                objectPosition: "center",
                                objectFit: "cover",
                                borderRadius: "100%",
                              }}
                            />
                          ) : (
                            uploadButton
                          )}
                        </div>{" "}
                      </Upload>
                    </Col>
                    <Col lg={12}>
                      <Form.Item
                        label="First Name"
                        name="firstName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your first name!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter First Name"
                          className="web-input"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12}>
                      <Form.Item
                        label="Last Name"
                        name="lastName"
                        rules={[
                          {
                            required: true,
                            message: "Enter Last Name",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter Email Address"
                          className="web-input"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12}>
                      <Form.Item
                        label="Email Address"
                        name="email"
                        rules={[
                          {
                            type: "email",
                            message: "Please enter a valid email address!",
                          },
                          {
                            required: true,
                            message: "Please enter your email address!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="James.Anderson@gmail.com"
                          className="web-input"
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12}>
                      <Form.Item
                        label="Phone Number"
                        name="phone"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your phone number!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter Phone Number"
                          className="web-input"
                        />
                      </Form.Item>
                    </Col>

                    <Col lg={12}>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                          {
                            required: true,
                            message: "Enter Password",
                          },
                        ]}
                      >
                        <Input.Password
                          size="large"
                          placeholder="Enter Password"
                          className="web-input"
                          style={{
                            borderRadius: "5px",
                            fontSize: "14px",
                            paddingRight: "10px",
                            backgroundColor: "transparent",
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col lg={12}>
                      <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your password!",
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue("password") === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error("The two passwords do not match!")
                              );
                            },
                          }),
                        ]}
                      >
                        <Input.Password
                          size="large"
                          placeholder="Confirm Password"
                          className="web-input"
                          style={{
                            borderRadius: "5px",
                            fontSize: "14px",
                            paddingRight: "10px",
                            backgroundColor: "transparent",
                          }}
                        />
                      </Form.Item>
                    </Col>

                    <Col xs={24}>
                      <div
                        className=""
                        style={{
                          textAlign: "center",
                          justifyContent: "center",
                          width: "100%",
                          display: "flex",
                        }}
                      >
                        <Button
                          type="primary"
                          htmlType="submit"
                          className="mainbtn"
                          style={{
                            cursor: "pointer",
                            paddingRight: "60px",
                            paddingLeft: "60px",
                          }}
                        >
                          Sign Up
                        </Button>
                      </div>
                    </Col>
                    <div
                      className="already-account-text"
                      style={{ textAlign: "center", cursor: "pointer" }}
                    >
                      Already Have An Account?{" "}
                      <span onClick={() => navigate("/login")}>Login</span>{" "}
                    </div>
                  </Row>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default SignUp;
