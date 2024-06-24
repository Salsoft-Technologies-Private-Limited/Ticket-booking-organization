import { useEffect, useState } from "react";
import { Col, Row, Button, Image } from "antd";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  COMPANY,
  DRIVERS
} from "../../config/constants/api";
import DashbordSidebar from "../../components/DashboardSidebar";
import { driverManagementData } from "../../components/Data/data";
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
  const [driverDetails, setDriverDetails] = useState(null);
  const [vehicleDetails, setVehicleDetails] = useState(null);
  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const { id } = useParams();
  const getDriverDetails = () => {
    Get(`${DRIVERS.getDriver}${id}`, token)
      .then((response) => {
        if (response?.status) {
          setDriverDetails(response?.data);
          if (response?.data?.status === "BANNED") {
            setIsBanned(true);
          }
        }
      })
      .catch((err) => {
        console.log("Error fetching driver details ", err);
      });
  };
  const getDriverVehicle = () =>{
    Get(`${DRIVERS.getDriverVehicle}${id}`, token)
    .then((response) => {
      console.log(response,'response')
      if(response?.status){
        setVehicleDetails(response?.data)
      }
    })
    .catch((err) => {
      console.log("Error fetching vehicle details ", err);
    });
  }
  
  useEffect(() => {
    getDriverDetails();
    getDriverVehicle()
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
    Put(`${COMPANY.toggleStatus}${id}`, token, { status })
      .then((response) => {
        if (response.status) {
          swal("System Alert!", response?.message, "success");
          if (!(driverDetails?.status === "PENDING")) {
            setIsBanned(!isBanned);
          } else {
            navigate("/driverManagement");
          }
        }
      })
      .catch((err) => {
        let message = err?.response?.data?.message;
        console.log(":::;", err);
        if (message) swal("Oops!", message, "error");
      });
  };

  const [driver, setDriver] = useState(
    driverManagementData.find((item) => item.id == id)
  );
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
                    {driverDetails && (
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
                                <h3 className="heading-28">Review Details</h3>
                              </div>
                            </Col>

                            {driverDetails?.status !== "PENDING" && (
                              <Button
                                type=""
                                className="web-btn"
                                onClick={() => {
                                  if (isBanned) {
                                    banCompany(driverDetails?._id, "ACTIVE");
                                  } else {
                                    banCompany(driverDetails?._id, "BANNED");
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
                                {/* {driver?.pic} */}
                              </div>
                            </Col>
                            <Col xs={24} md={16} lg={16} xl={18}>
                              <div className="">
                                <div className="">
                                  <h4 className="booking-card-name">
                                    {driverDetails?.firstName +
                                      " " +
                                      driverDetails?.lastName}
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
                                        {driverDetails?.mobile}
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
                                        {driverDetails?.email}
                                      </h4>
                                    </div>
                                  </div>

                                  {driverDetails?.status === "PENDING" ? (
                                    <div className="frame-group for-aprove-btn-group">
                                      <div className="">
                                        <Button
                                          type=""
                                          block
                                          size={"large"}
                                          style={{ marginBottom: "10px" }}
                                          className="web-btn"
                                          onClick={() => {
                                            banCompany(driver._id, "ACTIVE");
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
                        <div
                          className="bg-parent"
                          style={{ marginTop: "30px" }}
                        >
                          <h6 className="booking-card-name">
                            Vehicle Registration
                          </h6>
                          {vehicleDetails &&<Row align="middle" gutter={[16, 16]}>
                            <Col lg={8}>
                              <h6 className="web-p">Vehicle Type</h6>
                              <p className="showing-entries">
                                {vehicleDetails?.type}
                              </p>
                            </Col>
                            <Col lg={8}>
                              <h6 className="web-p">Brand Name</h6>
                              <p className="showing-entries">{vehicleDetails?.brandName}</p>
                            </Col>
                            <Col lg={8}>
                              <h6 className="web-p">Model Name</h6>
                              <p className="showing-entries">{vehicleDetails?.modelName}</p>
                            </Col>
                            <Col lg={8}>
                              <h6 className="web-p">License Plate Number</h6>
                              <p className="showing-entries">{vehicleDetails?.licenseNo}</p>
                            </Col>
                            <Col lg={8}>
                              <h6 className="web-p">Registration Year</h6>
                              <p className="showing-entries">{vehicleDetails?.regYear}</p>
                            </Col>
                          </Row>}
                        </div>
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

export default StayUserDetails;
