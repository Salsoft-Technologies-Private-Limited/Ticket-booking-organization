import { useEffect, useState } from "react";
import { Col, Row, Button, Image } from "antd";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  VENDORS
} from "../../config/constants/api";
import DashbordSidebar from "../../components/DashboardSidebar";
import {
  FaArrowLeftLong
} from "react-icons/fa6";
import phoneimg from "../../assets/phone-img.png";
import emailimg from "../../assets/email-img.png";
import { Put } from "../../config/api/put";
import swal from "sweetalert";
import { Get } from "../../config/api/get";
const StayUserDetails = () => {
  const [isBanned, setIsBanned] = useState(false);
  const [vendorDetails, setVendorDetails] = useState(null);
  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const { id } = useParams();
  const getVendorDetails = () => {
    Get(`${VENDORS.getVendor}${id}`, token)
      .then((response) => {
        setVendorDetails(response?.data);
        if (response?.data?.status === "BANNED") {
          setIsBanned(true);
        }
      })
      .catch((err) => {
        console.log("Error fetching vendor details ", err);
      });
  };
  useEffect(() => {
    getVendorDetails();
  }, []);
  //   useEffect(() => {
  //     if (!driver) {
  //       navigate(-1);
  //     } else {
  //       if (
  //         driver?.dropzoneProfile &&
  //         Object.keys(driver.dropzoneProfile).length !== 0
  //       ) {
  //         setAllImages([
  //           driver.dropzoneProfile.image,
  //           ...driver.dropzoneProfile.gallery,
  //         ]);
  //       }
  //       if (driver?.status === "BANNED") {
  //         setIsBanned(true);
  //       }
  //     }
  //   }, []);

  const banCompany = (id, status) => {
    Put(`${VENDORS.toggleStatus}${id}`, token, { status })
      .then((response) => {
        if (response.status) {
          swal("System Alert!", response?.message, "success");
          if (!(vendorDetails?.status==='PENDING')){
            setIsBanned(!isBanned);
          }else{
            navigate('/vendorManagement')
          }
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
                {vendorDetails && (
                  <div className="my-account-profile">
                    <section className="side-menu-parent">
                      <DashbordSidebar />
                      <div className="about-us-section">
                        <div className="bg-parent">
                          <Row
                            align={"middle"}
                            style={{
                              marginBottom: "15px",
                              width: "100%",
                              justifyContent: "space-between",
                            }}
                          >
                            <Col lg={14} md={12} xs={24}>
                              <div className="arrow-box2">
                                <div>
                                  <FaArrowLeftLong
                                    className="arrow"
                                    onClick={() => navigate(-1)}
                                  />
                                </div>
                                <h3 className="heading-28">Vendor Details</h3>
                              </div>
                            </Col>

                            {vendorDetails.status !== "PENDING" && (
                              <Button
                                type=""
                                className="web-btn"
                                onClick={() => {
                                  if (isBanned) {
                                    banCompany(vendorDetails?._id, "ACTIVE");
                                  } else {
                                    banCompany(vendorDetails?._id, "BANNED");
                                  }
                                }}
                              >
                                {isBanned ? "UNBAN USER" : "BAN USER"}
                              </Button>
                            )}
                          </Row>
                          <Row
                            gutter={[16, 16]}
                            align={"middle"}
                            justify={"space-between"}
                          >
                            <Col xs={12} md={8} lg={6} xl={6}>
                              <div className="wrapper-group-1000001858">
                                {/* <img
                                src={
                                  UPLOADS_URL + driver?.dropzoneProfile?.image
                                }
                                alt=""
                                className="img-fluid"
                                style={{ width: "100%" }}
                              /> */}
                                {/* {vendorManag?.pic} */}
                              </div>
                            </Col>
                            <Col xs={24} md={16} lg={16} xl={18}>
                              <div className="">
                                <div className="">
                                  <h4 className="booking-card-name">
                                    {vendorDetails?.firstName +
                                      " " +
                                      vendorDetails?.lastName}
                                  </h4>
                                  <div className="for-flex-gap">
                                    <div
                                      className="jump-inner-detail"
                                      style={{ gap: "10px" }}
                                    >
                                      <Image
                                        preview={false}
                                        alt={"Failed to load image"}
                                        src={phoneimg}
                                        className=""
                                      />
                                      <h4 className="text-16">
                                        {vendorDetails?.mobile}
                                      </h4>
                                    </div>
                                    <div
                                      className="jump-inner-detail"
                                      style={{ gap: "10px" }}
                                    >
                                      <Image
                                        preview={false}
                                        alt={"Failed to load image"}
                                        src={emailimg}
                                        className=""
                                      />
                                      <h4 className="text-16">
                                        {vendorDetails?.email}
                                      </h4>
                                    </div>
                                  </div>

                                  {vendorDetails?.status === "PENDING" ? (
                                    <div className="frame-group for-aprove-btn-group">
                                      <div className="">
                                        <Button
                                          type=""
                                          block
                                          size={"large"}
                                          style={{ marginBottom: "10px" }}
                                          className="web-btn"
                                          onClick={() => {
                                            banCompany(
                                              vendorDetails?._id,
                                              "ACTIVE"
                                            );
                                          
                                          }}
                                        >
                                          Approve
                                        </Button>
                                      </div>
                                      <div className="">
                                        <Button
                                          type=""
                                          block
                                          size={"large"}
                                          style={{ marginBottom: "10px" }}
                                          className="web-btn2"
                                          onClick={() => {
                                            navigate(-1);
                                          }}
                                        >
                                          Decline
                                        </Button>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="frame-group"></div>
                                  )}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </section>
                  </div>
                )}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StayUserDetails;
