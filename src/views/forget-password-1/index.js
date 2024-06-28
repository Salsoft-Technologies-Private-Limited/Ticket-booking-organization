import React from "react";
import { Layout, Col, Row, Button, Form, Input } from "antd";
import { useNavigate } from "react-router";
import { Post } from "../../config/api/post";
import { RESET } from "../../config/constants/api";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import { BsArrowUpRightCircleFill } from "react-icons/bs";


function ForgetPassword() {
  const [form] = Form.useForm();
  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const onFinish = (values) => {
    Post(RESET.sendCode, { email: values.email, type: "ORGANIZATION" }, token)
      .then((response) => {
        if (response.status) {
          form.resetFields();
          swal("Success", response?.message, "success");
          navigate("/forget-password-2", { state: { email: values.email } });
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

  return (
    <Layout
      className=""
      style={{ backgroundColor: "#fff", minHeight: "100vh" }}
    >
      <div className="auth-banner">
 
        <Row style={{ width: "100%", justifyContent: "center" }}>
          <Col lg={8}>
            <div className="auth-box">
              <h2 className="auth-heading">Forgot Your Password?</h2>
              <p className="auth-p">Enter your active email address here</p>
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
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Please input valid email!",
                      required: true,
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Enter your email address"
                    className="web-input"
                  />
                </Form.Item>
                <br />
                
                <Row justify={"center"}>
                  <Col>
                  <Form.Item
                  style={{ textAlign: "center", marginBottom: "10px" }}
                >
                  <Button
                    type="button"
                    htmlType="submit"
                    className="web-btn"
                    style={{
                      cursor: "pointer",
                    }}
                    // onClick={() =>}
                  >
                    Continue <BsArrowUpRightCircleFill />
                  </Button>
                  
                </Form.Item>
                </Col>
                </Row>
                <div
                  className="already-account-text"
                  style={{ textAlign: "center", cursor: "pointer" }}
                >
                  Back to <span onClick={() => navigate("/login")}>Login</span>{" "}
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default ForgetPassword;
