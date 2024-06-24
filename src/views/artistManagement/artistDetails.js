import { Col, Row, Card, Typography, Form, Spin, Button } from "antd";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import DashbordSidebar from "../../components/DashboardSidebar";
import { Get } from "../../config/api/get";
import { FEEDBACK } from "../../config/constants/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
// const { Meta } = Card;
const { Title } = Typography;

const FeedbackDetails = () => {
  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const getFeedbackDetails = () => {
    setLoading(true);
    Get(`${FEEDBACK.getFeedback}${id}`, token)
      .then((response) => {
        console.log(response);
        if (response.status) {
          setDetails(response?.data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getFeedbackDetails();
  }, []);
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
                        <Row
                          align={"middle"}
                          style={{
                            marginBottom: "15px",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <Col lg={24} md={24} xs={24}>
                            <div className="arrow-box2">
                              <div>
                                <FaArrowLeftLong
                                  className="arrow"
                                  onClick={() => navigate(-1)}
                                />
                              </div>
                              <h3 className="heading-28">Artist details</h3>
                            </div>
                          </Col>
                        </Row>
                        <div className="bg-parent">
                          <Row align={"middle"} justify={"center"}>
                            <Col xs={24} lg={16}>
                              <div className="">
                                <div className="logo-rectangle">
                                  <div className="profile-info">
                                    <div className="wrapper-group-1000001858">
                                      {/* {userManagement?.pic} */}
                                    </div>
                                    <div className="full-name">
                                      <div className="jake-dawson">
                                        <div className="phone-number">
                                          <div className="full-name1">
                                            <p className="full-name2">
                                              First Name
                                            </p>
                                          </div>
                                          {/* <div className="jake-dawson1">
                                              {user?.firstName}
                                            </div> */}
                                          <div className="jake-dawson1">
                                            {/* {userManagement?.firstName} */}
                                          </div>
                                        </div>

                                        <div className="gender">
                                          <div className="phone-number1">
                                            Email Address
                                          </div>
                                          <div className="frame-parent">
                                            {/* <div className="a-b-c">
                                                {user?.mobile}
                                              </div> */}
                                            <div className="a-b-c">
                                              {/* {userManagement?.email} */}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="gender">
                                          <div className="phone-number1">
                                            Event Type
                                          </div>
                                          <div className="frame-parent">
                                            {/* <div className="a-b-c">
                                                {user?.mobile}
                                              </div> */}
                                            <div className="a-b-c">
                                              {/* {userManagement?.email} */}
                                            </div>
                                          </div>
                                        </div>

                                        <div className="gender">
                                          <div className="phone-number1">
                                            Artist
                                          </div>
                                          <div className="frame-parent">
                                            {/* <div className="a-b-c">
                                                {user?.mobile}
                                              </div> */}
                                            <div className="a-b-c">
                                              {/* {userManagement?.email} */}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="changepassword">
                                        <div className="b-g">
                                          <div className="email">Last Name</div>
                                          {/* <div className="jakesamplecom">
                                              {user?.lastName}
                                            </div> */}
                                          <div className="jakesamplecom">
                                            {/* {userManagement?.lastName} */}
                                          </div>
                                        </div>
                                        <div className="b-g">
                                          <div className="email">Gender</div>
                                          {/* <div className="jakesamplecom">
                                              {user?.lastName}
                                            </div> */}
                                          <div className="jakesamplecom">
                                            {/* {userManagement?.userManagementDate} */}
                                          </div>
                                        </div>
                                        <div className="b-g">
                                          <div className="email">Date</div>
                                          {/* <div className="jakesamplecom">
                                              {user?.lastName}
                                            </div> */}
                                          <div className="jakesamplecom">
                                            {/* {userManagement?.userManagementDate} */}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <Row justify={"center"} style={{width:"100%"}}>
                                    <Col xs={12} md={8} lg={6} >
                                      <Form.Item
                                        
                                      >
                                        <Button
                                          type="submit"
                                          htmlType="submit"
                                          className="web-btn"
                                          style={{
                                            cursor: "pointer",
                                          }}
                                        >
                                          {loading
                                            ? "Loading..."
                                            : "EDIT DETAILS"}
                                          <BsArrowUpRightCircleFill />
                                        </Button>
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    ) : (
                      <Col
                        xs={23}
                        md={21}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "150px 0px",
                        }}
                      >
                        <Spin />
                      </Col>
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
};

export default FeedbackDetails;
