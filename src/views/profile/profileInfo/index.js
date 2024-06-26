import { useEffect } from "react";
import { Col, Row, Button } from "antd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { UPLOADS_URL } from "../../../config/constants/api";
import DashbordSidebar from "../../../components/DashboardSidebar";
import { myprofiledata } from "../../../components/Data/data";
import { extractDate } from "../../../config/helpers/index";

const DropzoneFiltercards = () => {
  const userData = useSelector((state) => state?.user?.userData);
  const navigate = useNavigate();


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
                        <h3 className="main-heading">Profile Information</h3>
                      </div>
                      <div className="bg-parent">
                        <Row
                          gutter={[16, 16]}
                          align={"middle"}
                          justify={"center"}
                        >
                          <Col md={14} lg={14} xl={14}>
                            <div className="">
                              <div className="logo-rectangle">
                                <div className="profile-info">
                                <div className="wrapper-group-1000001858" style={{width:"150px"}}>
                                      <img
                                        src={UPLOADS_URL + userData?.image}
                                        alt="event image"
                                        preview="false"
                                        style={{
                                          borderRadius: "100%",
                                          objectFit: "cover",
                                          objectPosition: "center",
                                          height:"150px",
                                          width:"150px"
                                        }}
                                      />
                                    </div>
                                  <div className="full-name">
                                    <div className="jake-dawson">
                                      <div className="phone-number">
                                        <div className="full-name1">
                                          <p className="full-name2">
                                            First Name
                                          </p>
                                        </div>
                                        <div className="jake-dawson1">
                                          {userData?.firstName}
                                        </div>
                                      </div>
                                      <div className="gender">
                                        <div className="phone-number1">
                                          Email
                                        </div>
                                        <div className="frame-parent">
                                          <div className="a-b-c">
                                            {userData?.email}
                                          </div>
                                        </div>
                                      </div>
                                      {/* <div className="location">Location</div> */}
                                    </div>
                                    <div className="changepassword">
                                      <div className="b-g">
                                        <div className="email">Last Name</div>
                                        <div className="jakesamplecom">
                                          {userData?.lastName}
                                        </div>
                                      </div>
                                      <div className="b-g1">
                                        <div className="gender1">Phone</div>
                                        <div className="male">
                                          {userData?.phone}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className="abc-location-town">
                                      {userData?.location?.street +
                                        ", " +
                                        userData?.location?.state +
                                        ", " +
                                        userData?.location?.city +
                                        ", " +
                                        userData?.location?.country}
                                    </div> */}
                                </div>
                                {/* <div className="f-a-qs">
                                    <div className="career">
                                      <div className="date-of-birth">
                                        Date Of Birth
                                      </div>
                                    </div>
                                    <div className="termsconditions">
                                      <div className="jan-28-1998">
                                        {extractDate(
                                          userData?.dateOfBirth
                                        )}
                                      </div>
                                    </div>
                                  </div> */}
                                <div className="frame-group" style={{margin:'0px auto'}}>
                                  <div className="">
                                    <Button
                                      type=""
                                      block
                                      size={"large"}
                                      style={{ marginBottom: "10px" }}
                                      className="web-btn"
                                      onClick={() => navigate("/editProfile")}
                                    >
                                      Edit Profile
                                    </Button>
                                  </div>
                                  <div className="">
                                    <Button
                                      type=""
                                      block
                                      size={"large"}
                                      style={{ marginBottom: "10px" }}
                                      className="web-btn"
                                      onClick={() =>
                                        navigate("/changePassword")
                                      }
                                    >
                                      Change password
                                    </Button>
                                  </div>
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
