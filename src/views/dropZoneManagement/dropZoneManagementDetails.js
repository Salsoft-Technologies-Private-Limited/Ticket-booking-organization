import { useEffect, useRef, useState } from "react";
import { Col, Row, Button, Image, Divider } from "antd";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { COMPANY, UPLOADS_URL } from "../../config/constants/api";
import DashbordSidebar from "../../components/DashboardSidebar";
import {
  FaArrowLeftLong,
  FaLocationDot,
  FaBed,
  FaPersonSwimming,
  FaParachuteBox,
  FaVideo,
} from "react-icons/fa6";
import { SlOrganization } from "react-icons/sl";
import { GiCampingTent, GiBoxUnpacking } from "react-icons/gi";
import { FaBuilding } from "react-icons/fa";
import { GiHook } from "react-icons/gi";
import {
  MdCarRental,
  MdElectricBolt,
  MdOutlineShareLocation,
} from "react-icons/md";
import phoneimg from "../../assets/phone-img.png";
import emailimg from "../../assets/email-img.png";
import Slider from "react-slick";
import { IoRestaurantSharp } from "react-icons/io5";
import { FaSwimmingPool } from "react-icons/fa";
import { Put } from "../../config/api/put";
import swal from "sweetalert";
const StayUserDetails = () => {
  const [isBanned, setIsBanned] = useState(false);
  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const location = useLocation();
  const [allImages, setAllImages] = useState(null);
  const dropzoneCompany = location?.state?.dropzoneCompany;

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);
  useEffect(() => {
    if (!dropzoneCompany) {
      navigate(-1);
    } else {
      if (
        dropzoneCompany?.dropzoneProfile &&
        Object.keys(dropzoneCompany.dropzoneProfile).length !== 0
      ) {
        setAllImages([
          dropzoneCompany.dropzoneProfile.image,
          ...dropzoneCompany.dropzoneProfile.gallery,
        ]);
      }
      if (dropzoneCompany?.status === "BANNED") {
        setIsBanned(true);
      }
    }
  }, []);
  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, [slider1?.current, slider2?.current, allImages]);
  const sliderSettings = {
    arrows: false,
    // other settings...
  };
  const sliderSettings2 = {
    // arrows: false,
    // style: {
    //   margin: "20px",
    // },
  };
  const banCompany = (id, status) => {
    Put(`${COMPANY.toggleStatus}${id}`, token, { status })
      .then((response) => {
        if (response.status) {
          swal("System Alert!", response?.message, "success");
          if (!(dropzoneCompany?.status==='PENDING')){
            setIsBanned(!isBanned);
          }
          else{
            navigate('/dropZoneManagement')
          }
        }

      })
      .catch((err) => {
        let message = err?.response?.data?.message;
        console.log(":::;", err);
        if (message) swal("Oops!", message, "error");
      });
  };
  const amenityIcons = {
    "Bunkhouse with Beds": <FaBed />,
    "Designated Camping Area": <GiCampingTent />,
    "Equipment Rental/Sales": <MdCarRental />,
    "Full-Service Restaurant": <IoRestaurantSharp />,
    "Load Organizers": <SlOrganization />,
    "Packing Service": <GiBoxUnpacking />,
    "Rigging Service": <GiHook />,
    "RV Space w/ Electricity": <MdElectricBolt />,
    "Showers Facilities Swimming": <FaPersonSwimming />,
    Pool: <FaSwimmingPool />,
    "Swoop Pond": <FaParachuteBox />,
    "Team Rooms Videographers": <FaVideo />,
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
                      {dropzoneCompany && (
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
                                <h3 className="heading-28">
                                  Drop Zone Company Details
                                </h3>
                              </div>
                            </Col>

                            {dropzoneCompany.status !== "PENDING" && (
                              <Button
                                type=""
                                className="web-btn"
                                onClick={() => {
                                  if (isBanned) {
                                    banCompany(dropzoneCompany._id, "ACTIVE");
                                  } else {
                                    banCompany(dropzoneCompany._id, "BANNED");
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
                                <img
                                  src={
                                    UPLOADS_URL +
                                    dropzoneCompany?.dropzoneProfile?.image
                                  }
                                  alt=""
                                  className="img-fluid"
                                  style={{ width: "100%" }}
                                />
                              </div>
                            </Col>
                            <Col xs={24} md={16} lg={16} xl={18}>
                              <div className="">
                                <div className="">
                                  <h4 className="booking-card-name">
                                    {dropzoneCompany?.firstName +
                                      " " +
                                      dropzoneCompany.lastName}
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
                                        {dropzoneCompany?.mobile}
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
                                        {dropzoneCompany?.email}
                                      </h4>
                                    </div>
                                  </div>

                                  {dropzoneCompany?.status === "PENDING" ? (
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
                                              dropzoneCompany._id,
                                              "ACTIVE"
                                            );
                                            navigate(-1)
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
                                    <div className="frame-group">
                                      <div className="">
                                        <Button
                                          type=""
                                          block
                                          size={"large"}
                                          style={{ marginBottom: "10px" }}
                                          className="web-btn"
                                          onClick={() =>
                                            navigate(
                                              "/dropZoneManagement/reservationLogs"
                                            )
                                          }
                                        >
                                          View Reservation
                                        </Button>
                                      </div>
                                      <div className="">
                                        <Button
                                          type=""
                                          block
                                          size={"large"}
                                          style={{ marginBottom: "10px" }}
                                          className="web-btn2"
                                          onClick={() =>
                                            navigate(
                                              "/dropZoneManagement/dropZoneListing", {state : {companyId : dropzoneCompany?._id}}
                                            )
                                          }
                                        >
                                          View Listing
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      )}

                      {dropzoneCompany?.dropzoneProfile &&
                        Object.keys(dropzoneCompany.dropzoneProfile).length !==
                          0 && (
                          <div
                            className="bg-parent"
                            style={{ marginTop: "30px" }}
                          >
                            <Row align="middle" gutter={16}>
                              <Col lg={10}>
                                <div
                                  className="one-product"
                                  style={{ paddingRight: "30px" }}
                                >
                                  <div className="search-img">
                                    <div>
                                      <Slider
                                        asNavFor={nav2}
                                        ref={slider1}
                                        {...sliderSettings}
                                      >
                                        {Array.isArray(allImages) &&
                                          allImages.map((image, index) => {
                                            return (
                                              <div key={index}>
                                                <span>
                                                  <img
                                                    src={UPLOADS_URL + image}
                                                    alt=""
                                                    className="img-fluid"
                                                    style={{
                                                      width: "100%",
                                                      maxHeight: "300px",
                                                      objectFit: "cover",
                                                      objectPosition: "center",
                                                    }}
                                                  />
                                                </span>
                                              </div>
                                            );
                                          })}
                                      </Slider>
                                      <Slider
                                        asNavFor={nav1}
                                        ref={slider2}
                                        slidesToShow={
                                          dropzoneCompany.dropzoneProfile.gallery?.length
                                        }
                                        swipeToSlide={true}
                                        focusOnSelect={true}
                                        {...sliderSettings2}
                                      >
                                        {Array.isArray(allImages) &&
                                          allImages.map((image, index) => {
                                            return (
                                              <div
                                                key={index}
                                                className="slider-nav"
                                              >
                                                <span>
                                                  <img
                                                    src={UPLOADS_URL + image}
                                                    alt=""
                                                    className="img-fluid"
                                                    style={{
                                                      width: "100%",
                                                      height: "90px",
                                                      objectFit: "cover",
                                                      objectPosition: "center",
                                                      maxWidth: "150px",
                                                    }}
                                                  />
                                                </span>
                                              </div>
                                            );
                                          })}
                                      </Slider>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                              <Col lg={14}>
                                <div className="">
                                  <div>
                                    <h4 className="text-26">
                                      {dropzoneCompany?.firstName +
                                        " " +
                                        dropzoneCompany?.lastName}
                                    </h4>
                                    <p className="web-p">
                                      {
                                        dropzoneCompany?.dropzoneProfile
                                          ?.description
                                      }
                                    </p>
                                  </div>
                                </div>
                                <Divider dashed />
                                <div className="jump-inner-detail">
                                  <div>
                                    <h6>Location</h6>
                                    <p>
                                      <FaLocationDot />
                                      {dropzoneCompany?.dropzoneProfile
                                        ?.location?.address +
                                        ", " +
                                        dropzoneCompany?.dropzoneProfile
                                          ?.location?.street +
                                        " " +
                                        dropzoneCompany?.dropzoneProfile
                                          ?.location?.state}
                                    </p>
                                  </div>

                                  <div>
                                    <h6>City</h6>
                                    <p>
                                      <FaBuilding />{" "}
                                      {
                                        dropzoneCompany?.dropzoneProfile
                                          ?.location?.city
                                      }
                                    </p>
                                  </div>

                                  <div>
                                    <h6>Country</h6>
                                    <p>
                                      <MdOutlineShareLocation />
                                      {
                                        dropzoneCompany?.dropzoneProfile
                                          ?.location?.country
                                      }
                                    </p>
                                  </div>
                                </div>
                                {/* <h6 className="booking-card-name">Amenities</h6>
                            <div
                              className="jump-inner-detail"
                              style={{ padding: "5px 0" }}
                            >
                              {dropzoneCompany?.amenitiesInfo?.map((element, index) => {
                                return (
                                  <div>
                                    <p>
                                      {amenityIcons[element.title]}{" "}
                                      {element.title}
                                    </p>
                                  </div>
                                );
                              })}
                             
                            </div> */}
                              </Col>
                            </Row>
                          </div>
                        )}

                      {dropzoneCompany?.dropzoneProfile &&
                        Object.keys(dropzoneCompany.dropzoneProfile).length !==
                          0 && (
                          <div
                            className="bg-parent"
                            style={{ marginTop: "30px" }}
                          >
                            <h6 className="booking-card-name">
                              Back Account Details
                            </h6>
                            <Row align="middle" gutter={[16, 16]}>
                              <Col lg={8}>
                                <h6 className="web-p">Beneficiary Name</h6>
                                <p className="showing-entries">
                                  {
                                    dropzoneCompany?.dropzoneProfile
                                      ?.accountDetails?.name
                                  }
                                </p>
                              </Col>
                              <Col lg={8}>
                                <h6 className="web-p">IBAN</h6>
                                <p className="showing-entries">
                                  {
                                    dropzoneCompany?.dropzoneProfile
                                      ?.accountDetails?.iban
                                  }
                                </p>
                              </Col>
                              <Col lg={8}>
                                <h6 className="web-p">Account Currency</h6>
                                <p className="showing-entries">
                                  {
                                    dropzoneCompany?.dropzoneProfile
                                      ?.accountDetails?.currency
                                  }
                                </p>
                              </Col>
                              <Col lg={8}>
                                <h6 className="web-p">Remittance Country</h6>
                                <p className="showing-entries">
                                  {
                                    dropzoneCompany?.dropzoneProfile
                                      ?.accountDetails?.country
                                  }
                                </p>
                              </Col>
                              <Col lg={8}>
                                <h6 className="web-p">
                                  SWIFT Code/Routing Number
                                </h6>
                                <p className="showing-entries">
                                  {
                                    dropzoneCompany?.dropzoneProfile
                                      ?.accountDetails?.swift
                                  }
                                </p>
                              </Col>
                              <Col lg={8}>
                                <h6 className="web-p">Bank Name</h6>
                                <p className="showing-entries">
                                  {
                                    dropzoneCompany?.dropzoneProfile
                                      ?.accountDetails?.bankName
                                  }
                                </p>
                              </Col>
                              <Col lg={8}>
                                <h6 className="web-p">Account Number</h6>
                                <p className="showing-entries">
                                  {
                                    dropzoneCompany?.dropzoneProfile
                                      ?.accountDetails?.accNumber
                                  }
                                </p>
                              </Col>
                              <Col lg={8}>
                                <h6 className="web-p">Branch Name</h6>
                                <p className="showing-entries">
                                  {
                                    dropzoneCompany?.dropzoneProfile
                                      ?.accountDetails?.branchName
                                  }
                                </p>
                              </Col>
                              <Col lg={8}>
                                <h6 className="web-p">City</h6>
                                <p className="showing-entries">
                                  {
                                    dropzoneCompany?.dropzoneProfile
                                      ?.accountDetails?.city
                                  }
                                </p>
                              </Col>
                            </Row>
                          </div>
                        )}
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

export default StayUserDetails;
