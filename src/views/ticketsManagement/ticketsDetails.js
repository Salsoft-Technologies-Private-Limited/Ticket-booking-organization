import { useEffect, useState } from "react";
import { Col, Row, Button, Avatar, Card, Spin } from "antd";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { ADMIN, COMPANY, UPLOADS_URL } from "../../config/constants/api";
import DashbordSidebar from "../../components/DashboardSidebar";
import { Get } from "../../config/api/get";
import { Put } from "../../config/api/put";
import { FaArrowLeftLong } from "react-icons/fa6";
import avatar from "../../assets/avatar.png";
import swal from "sweetalert";
import { userManagementDate } from "../../components/Data/data";

const DropzoneFiltercards = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [userManagement, setUserManagement] = useState(
    userManagementDate.find((item) => item.id == id)
  );
  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  // const getUserDetails = () => {
  //   setLoading(true);
  //   Get(`${ADMIN.getUser}${id}`, token)
  //     .then((response) => {
  //       setUser(response?.data?.user);
  //       setProfile(response?.data?.profile);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching user details", err);
  //       setLoading(false);
  //     });
  // };
  // useEffect(() => {
  //   getUserDetails();
  // }, []);
  const banUser = (id, status)  => {
    Put(`${ADMIN.toggleUser}${id}`, token, { status })
      .then((response) => {
        if (response.status) {
          swal("System Alert!", response?.message, "success");
          setIsBanned(!isBanned);
        }
      })
      .catch((err) => {
        let message = err?.response?.data?.message;
        console.log(":::;", err);
        if (message) swal("Oops!", message, "error");
      });
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
                    {!loading ? (
                      <div className="about-us-section">
                        <Row
                              align={"middle"}
                              style={{ marginBottom: "15px" }}
                            >
                              <Col lg={24}>
                                <div class="arrow-box2">
                                  <div>
                                    <FaArrowLeftLong
                                      className="arrow"
                                      onClick={() => navigate(-1)}
                                    />
                                  </div>
                                  <h3 className="main-heading">User Details</h3>
                                </div>
                              </Col>
                              <Col lg={10} style={{ textAlign: "end" }}>
                                {/* <Button
                                  type=""
                                  className="web-btn"
                                  onClick={() => {
                                    if (isBanned) {
                                      banUser(user._id, "ACTIVE");
                                    } else {
                                      banUser(user._id, "INACTIVE");
                                    }
                                  }}
                                >
                                  {isBanned ? "UNBAN USER" : "BAN USER"}
                                </Button> */}
                              </Col>
                            </Row>
                        {/* {user && ( */}
                        {userManagement && (
                          <div className="bg-parent">
                            
                            <Row
                              
                              align={"middle"}
                              justify={"center"}
                            >
                             
                              
                              <Col xs={24} lg={16}>
                                <div className="">
                                  <div className="logo-rectangle">
                                    <div className="profile-info">
                                    <div className="wrapper-group-1000001858">
                                      {userManagement?.pic}
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
                                            {userManagement?.firstName}
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
                                              {userManagement?.email}
                                            </div>
                                            </div>
                                          </div>
                                          
                                        </div>
                                        <div className="changepassword">
                                          <div className="b-g">
                                            <div className="email">
                                              Last Name
                                            </div>
                                            {/* <div className="jakesamplecom">
                                              {user?.lastName}
                                            </div> */}
                                             <div className="jakesamplecom">
                                            {userManagement?.lastName}
                                          </div>
                                          </div>
                                          <div className="b-g">
                                            <div className="email">
                                            Registration Date
                                            </div>
                                            {/* <div className="jakesamplecom">
                                              {user?.lastName}
                                            </div> */}
                                             <div className="jakesamplecom">
                                            {userManagement?.userManagementDate}
                                          </div>
                                          </div>
                                        </div>
                                      </div>
                                      
                                       
                                    </div>
                                    
                                  
                                  </div>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        )}
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
};

export default DropzoneFiltercards;
