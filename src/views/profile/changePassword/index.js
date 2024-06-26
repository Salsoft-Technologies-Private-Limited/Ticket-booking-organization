import { useState } from "react";
import { Col, Row, Button, Input, Form } from "antd";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import DashbordSidebar from "../../../components/DashboardSidebar";
import "react-phone-number-input/style.css";
import swal from "sweetalert";
import { Post } from "../../../config/api/post";
import { RESET } from "../../../config/constants/api";

const DropzoneFiltercards = () => {
  const [form] = Form.useForm();
  const token = useSelector((state) => state.user.userToken);
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const onFinish = (values) => {
    if (values?.password !== values?.confirmpassword) {
      swal("Error", "Password and Confirm Password should match", "error");
      return;
    }
    let body = {
      email: userData.email,
      type: "ORGANIZATION",
      password: values?.password,
      oldPassword: values.oldPassword,
    };
    Post(RESET.changePassword, body, token)
      .then((response) => {
        if (response.status) {
          form.resetFields();
          showAlert();
          navigate("/Profile");
        }
      })
      .catch((err) => {
        console.log("Error", err);
        swal("Error", err?.response?.data?.message, "error");
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const showAlert = () => {
    swal("system Alert", "Your password has been updated", "success");
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
                        <h3 className="main-heading">Update Password</h3>
                      </div>
                      <div className="bg-parent">
                        <Row gutter={[16, 16]} align={""} justify={"center"}>
                          <Col md={23} lg={12} xl={10}>
                            <Form
                              layout="vertical"
                              name="basic"
                              labelCol={{
                                span: 0,
                              }}
                              wrapperCol={{
                                span: 24,
                              }}
                              initialValues={{
                                remember: true,
                              }}
                              onFinish={onFinish}
                              onFinishFailed={onFinishFailed}
                              autoComplete="off"
                              form={form}
                            >
                              <Form.Item
                                label="Old Password"
                                name="oldPassword"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your Old Password!",
                                  },
                                  {
                                    type: "string",
                                  },
                                ]}
                              >
                                <Input.Password
                                  size="large"
                                  placeholder="Enter Old Password*"
                                  className="web-input"
                                  style={{
                                    borderRadius: "5px",
                                    fontSize: "14px",
                                    paddingRight: "10px",
                                  }}
                                />
                              </Form.Item>
                              <Form.Item
                                label="New Password"
                                name="password"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input your New Password!",
                                  },
                                  {
                                    type: "string",
                                  },
                                ]}
                              >
                                <Input.Password
                                  size="large"
                                  placeholder="Enter New Password"
                                  className="web-input"
                                  style={{
                                    borderRadius: "5px",
                                    fontSize: "14px",
                                    paddingRight: "10px",
                                  }}
                                />
                              </Form.Item>
                              <Form.Item
                                label="Confirm Password"
                                name="confirmpassword"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please input your Confirm Password!",
                                  },
                                  {
                                    type: "string",
                                  },
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
                                  }}
                                />
                              </Form.Item>
                              <Form.Item style={{ textAlign: "center" , }}>
                                <Button
                                  type="button"
                                  htmlType="submit"
                                  className="web-btn"
                                  style={{
                                    cursor: "pointer",
                                    margin: "2px",
                                    display:"inline-block"
                                  }}
                                >
                                  Save
                                </Button>
                                <Button
                                  type="button"
                                  htmlType="submit"
                                  className="mainbtn"
                                  style={{
                                    cursor: "pointer",
                                    margin: "2px",
                                    display:"inline-block"
                                  }}
                                  onClick={() => navigate("/profile")}
                                >
                                  Cancel
                                </Button>
                              </Form.Item>
                            </Form>
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
