import React, { useEffect, useState } from "react";
import { Layout, Col, Row, Button, Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router";
import { Post } from "../../config/api/post";
import { RESET } from "../../config/constants/api";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import VerificationInput from "react-verification-input";
import { BsArrowUpRightCircleFill } from "react-icons/bs";

function ForgetPassword2() {
  const location = useLocation();
  const token = useSelector((state) => state.user.userToken);
  const email = location?.state?.email;
  useEffect(() => {
    if (!email) {
      navigate("/forget-password-1");
    }
  }, []);
  const navigate = useNavigate();
  const [code, setCode] = useState(null);
  const handleSubmit = () => {
    Post(RESET.verifyCode, { email: email, code: code }, token)
      .then((response) => {
        console.log(response);
        if (response?.status) {
          swal("Success", response?.message, "success");
        }
        navigate("/forget-password-3", { state: { email: email, code: code } });
      })
      .catch((err) => {
        console.log("Error", err);
        swal("Error", err?.response?.data?.message, "error");
      });
  };

  return (
    <Layout
      className=""
      style={{ backgroundColor: "#fff", minHeight: "100vh" }}
    >
      <div className="auth-banner">
        <Row style={{ width: "100%", justifyContent: "center" }}>
          <Col lg={8}>
            <div className="auth-box" style={{ textAlign: "center" }}>
              <h2 className="auth-heading">Verification Code</h2>
              <p className="auth-p">
                An Email Has Been Sent To You With A Verification Code
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <VerificationInput
                  length={4}
                  placeholder="_"
                  validChars="0-9"
                  inputProps={{ inputMode: "numeric" }}
                  onChange={(val) => {
                    setCode(val);
                  }}
                />
              </div>
              
              <Row justify={"center"}>
                  <Col>
                  <Button
                className={`${code?.length !== 4 ? "web-btn3" : "web-btn"}`}
                style={{
                  cursor: "pointer",
                  marginTop: "20px",
                }}
                onClick={handleSubmit}
                disabled={code?.length !== 4}
              >
                Continue <BsArrowUpRightCircleFill />
              </Button>
                </Col>
                </Row>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

export default ForgetPassword2;
