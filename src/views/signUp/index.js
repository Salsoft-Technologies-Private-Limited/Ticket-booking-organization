import React from "react";
import { Layout, Col, Row, Button, Form, Input, Checkbox } from "antd";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { COMPANY, PROFILE, USER_AUTH } from "../../config/constants/api";
import { addUser , addProfileDetails } from "../../redux/slice/authSlice";
import swal from "sweetalert";
import { Get } from "../../config/api/get";
import socket from "../../config/socket";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);

  // useEffect if user is already logged in
  React.useEffect(() => {
    if (user && token) {
      navigate("/", { replace: true });
    }
  }, [user, token]);

  const checkProfile = (token)=>{
    Get(PROFILE.getMyProfile, token).then((response)=>{
      if(response?.status){
        dispatch(addProfileDetails({details : response?.data}))
      }
      else{
        dispatch(addProfileDetails({details : null}))
      } 
    }).catch((err)=>{
      console.log(err, "Error Fetching Profile Details")
      dispatch(addProfileDetails({details : null}))
    })
  }
  const onFinish = (values) => {
    setLoading(true);
    let data = {
      email: values.email,
      password: values.password,
      deviceId: "123456789",
    };
    Post(USER_AUTH.login, data)
      .then((response) => {
        setLoading(false);
        dispatch(
          addUser({ user: response?.data?.user, token: response?.data?.token })
          );
          socket.emit('setupAdmin' , response?.data?.user)
          checkProfile(response?.data?.token, response?.data?.user?._id)
          navigate("/");
      })
      .catch((err) => {
        let message = err?.response?.data?.message ? err?.response?.data?.message : err?.message
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
          <Col md={20} lg={14}>
            <div className="auth-box">
              <h2 className="auth-heading">CREATE AN ACCOUNT</h2>
              <p className="auth-p">
              Fill out this form to signup
              </p>
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
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12} lg={12}>
                    <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[
                    {
                      type: "text",
                      message: "Please Enter First Name",
                    },
                    {
                      required: true,
                      message: "Please input your Name",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Please Enter First Name"
                    className="web-input"
                    
                  />
                </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                    <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[
                    {
                      type: "text",
                      message: "Please Enter Last Name",
                    },
                    {
                      required: true,
                      message: "Please input your Name",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Please Enter Last Name"
                    className="web-input"
                    
                  />
                </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={12}>
                        <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "Please input valid email!",
                    },
                    {
                      required: true,
                      message: "Please input your email!",
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
                    <Col xs={24} md={12} lg={12}>
                    <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[
                    {
                      type: "text",
                      message: "Please EnterPhone Number",
                    },
                    {
                      required: true,
                      message: "Please input your Phone Number",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    placeholder="Please Enter Phone Number"
                    className="web-input"
                    
                  />
                </Form.Item>
                    </Col>
                    <Col xs={24} md={12} lg={12}><Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                    {
                      type: "string",
                      min: 8,
                      message: "password must be atleast 8 characters!",
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
                    }}
                  />
                </Form.Item></Col>
                    <Col xs={24} md={12} lg={12}>
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
                      min: 8,
                      message: "password must be atleast 8 characters!",
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
                    }}
                  />
                </Form.Item>
                    </Col>
                </Row>
                

                
                <Row>
                  
                  <Col xs={24}>
                    <p><FaLock style={{
                        background:"#797979",
                        padding:" 6px",
                        fontSize: "22px",
                        borderRadius: "50%",
                        color:" #fff",
                        lineHeight:"24px",
                        verticalAlign:"top",
                    }} /> Your data will be protected and will not be used without your consent. By creating an account you agree to our <Button
                      type="link"
                      className="forgot-text purple-text"
                      style={{padding:"0"
                      }}
                      onClick={() => navigate("")}
                    >
                      Terms & Conditions
                    </Button> and <Button
                      type="link"
                      className="forgot-text purple-text"
                      style={{padding:"0"
                      }}
                      onClick={() => navigate("")}
                    >
                      Privacy Policy.
                    </Button></p>
                    
                  </Col>
                </Row>
                <br />
                <Row justify={"center"}>
                  <Col>
                  <Form.Item style={{ textAlign: "center", margin: "0" }}>
                  <Button
                    type="submit"
                    htmlType="submit"
                    className="web-btn"
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {loading ? "Loading..." : "SIGN UP"}
                    <BsArrowUpRightCircleFill />
                  </Button>
                </Form.Item>
                </Col>
                </Row>
                
                <div
               
                  style={{ textAlign: "center" , marginTop:"5px" }}
                >
                  Already have an account? 
                  <span onClick={() => navigate("/login")} style={{cursor : 'pointer' , marginLeft:'4px'}}    className="already-account-text" >
                  Login
                  </span>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default SignUp;
