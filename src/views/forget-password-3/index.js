import React, { useEffect, useState } from "react";
import { Layout, Col, Row, Button, Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

import Modals from "../../../src/components/Modals";

import swal from "sweetalert";
import { Post } from "../../config/api/post";
import { RESET } from "../../config/constants/api";

function ForgetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const  email= location?.state?.email;
  const  code  = location?.state?.code;
  const [form] = Form.useForm();
  useEffect(() => {
    if (!email || !code) {
      navigate("/forget-password-2");
    }
  }, []);
  const onFinish = (values) => {
    if (values.password !== values.confirmpassword) {
      swal("Error", "Passwords should match", "error");
      return;
    }
    Post(RESET.resetPassword, {
      email,
      code,
      password: values.password,
      type: "ORGANIZATION",
    })
      .then((response) => {
        if (response?.status) {
          form.resetFields();
          handleShow1();
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

  const [show1, setShow1] = useState(false);
  const handleShow1 = () => {
    setShow1(true);
  };

  return (
    <Layout
      className=""
      style={{ backgroundColor: "#fff", minHeight: "100vh" }}
    >
      <div className="auth-banner">
        <Row style={{ width: "100%", justifyContent: "center" }}>
          <Col lg={8}>
            <div className="auth-box">
              <h4 className="auth-heading">Forgot Your Password?</h4>
              <h4 className="auth-p">Set New Password For Your Acccount</h4>
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
              >
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      type: "string",
                      // min: 8,
                      // message: "password must be atleast 8 characters!",
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Enter Password"
                    style={{
                      borderRadius: "5px",
                      fontSize: "14px",
                      padding: "10px 20px",
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label="Confirm Password"
                  name="confirmpassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Confirm Password",
                    },
                    {
                      type: "string",
                      // min: 8,
                      // message: "password must be atleast 8 characters!",
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    placeholder="Confirm your password"
                    style={{
                      borderRadius: "5px",
                      fontSize: "14px",
                      padding: "10px 20px",
                    }}
                  />
                </Form.Item>
                <br />
                
                <Row justify={"center"}>
                  <Col>
                  <Form.Item style={{ textAlign: "center", margin: "0" }}>
                  <Button
                    type="button"
                    htmlType="submit"
                    className="web-btn"
                    style={{
                      cursor: "pointer",
                    }}
                    // onClick={handleShow1}
                  >
                    Continue <BsArrowUpRightCircleFill />
                  </Button>
                </Form.Item>
                </Col>
                </Row>
                <div
                  className="already-account-text"
                  style={{ textAlign: "center" }}
                >
                  Back to <span onClick={() => navigate("/login")}>Login</span>{" "}
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>

      <Modals
        open={show1}
        handleOk={() => setShow1(false)}
        handleCancel={() => setShow1(false)}
        text="Your password has been reset. Please login to continue."
        footer={[
          <Button
            key="submit"
            type=""
            className="web-btn"
            onClick={() => navigate("/login")}
            style={{ textAlign: "center" }}
          >
            Continue
          </Button>,
        ]}
      />
    </Layout>
  );
}

export default ForgetPassword;
