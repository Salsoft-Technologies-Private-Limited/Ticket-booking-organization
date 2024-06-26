import { useEffect, useRef, useState } from "react";
import { Col, Row, Button, Image, Divider, Spin } from "antd";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { COMPANY, EVENT, STAY, UPLOADS_URL } from "../../config/constants/api";
import DashbordSidebar from "../../components/DashboardSidebar";
import { convertTo12HourFormat, extractDate } from "../../config/helpers";
import { Get } from "../../config/api/get";
import { staysManagementDate } from "../../components/Data/data";
import { FaCalendarDays } from "react-icons/fa6";
import {
  FaArrowLeftLong,
  FaLocationDot,
  FaParachuteBox,
} from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { GiWashingMachine } from "react-icons/gi";
import {
  MdOutlineShareLocation,
  MdOutlineAccessTimeFilled,
} from "react-icons/md";
import { FaBuilding, FaSnowflake } from "react-icons/fa";
import phoneimg from "../../assets/phone-img.png";
import emailimg from "../../assets/email-img.png";
import roomimg from "../../assets/main-p.png";
import { Put } from "../../config/api/put";
import swal from "sweetalert";
import Slider from "react-slick";

const StayUserDetails = () => {
  const [isBanned, setIsBanned] = useState(false);
  const token = useSelector((state) => state.user.userToken);
  const [allImages, setAllImages] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const getEventDetails = () => {
    Get(`${EVENT.getEvent}${id}`, token)
      .then((response) => {
        if (response.status) {
          setDetails(response?.data);
          setAllImages([response?.data?.image, ...response?.data?.gallery]);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getEventDetails();
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
  return (
    <div className="shop-page">
      <Row style={{ justifyContent: "center" }}>
        <Col xs={24} md={24}>
          <div className="shop-page-main">
            <Row>
              <Col xs={24} md={24} lg={24} xl={24}>
                <div className="my-account-profile">
                  <section className="side-menu-parent">
                    <DashbordSidebar />
                    <div className="about-us-section">
                      <div className="bg-parent" style={{ marginTop: "30px" }}>
                        {!loading ? (
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
                                      slidesToShow={details?.gallery?.length}
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
                                                    maxWidth: "100%",
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
                                  <h4 className="text-26">{details?.title}</h4>
                                  <h3 className="purple-text">
                                    ${details?.price}
                                  </h3>
                                  <div className="jump-inner-detail">
                                    <div>
                                      <p>
                                        <FaLocationDot />{" "}
                                        {details?.location?.address}
                                      </p>
                                    </div>

                                    <div>
                                      <p>
                                        <FaCalendarDays />{" "}
                                        {extractDate(details?.date)}
                                      </p>
                                    </div>

                                    <div>
                                      <p>
                                        <MdOutlineShareLocation />{" "}
                                        {convertTo12HourFormat(details?.time)}
                                      </p>
                                    </div>
                                  </div>
                                  <Divider dashed />
                                  <h6 className="booking-card-name">
                                    Description
                                  </h6>
                                  <p className="web-p">
                                    {details?.description}
                                  </p>
                                </div>
                                <Button
                                  className="mainbtn"
                                  style={{
                                    marginTop: "15px",
                                    borderRadius: "10px",
                                  }}
                                  onClick={() => navigate("/eventManagement/reservationLogs", {state : {eventId : details._id}})}
                                >
                                  View Reservation
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        ) : (
                          <Row align="middle" gutter={16}>
                            <Col
                              lg={19}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "150px 0px",
                              }}
                            >
                              <Spin />
                            </Col>
                          </Row>
                        )}
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

export default StayUserDetails;
