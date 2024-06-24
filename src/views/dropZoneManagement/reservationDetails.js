import { useEffect, useRef, useState } from "react";
import { Col, Row, Card, Typography, Badge, Divider, Spin } from "antd";
import { useParams } from "react-router";
import {
  FaBed,
  FaLocationDot,
  FaParachuteBox,
  FaPersonSwimming,
  FaVideo
} from "react-icons/fa6";
import { FaSwimmingPool } from "react-icons/fa";
import DashbordSidebar from "../../components/DashboardSidebar";
import Slider from "react-slick";
import { Get } from "../../config/api/get";
import { JUMP, UPLOADS_URL } from "../../config/constants/api";
import { useSelector } from "react-redux";
import { MdCarRental, MdElectricBolt, MdSunny } from "react-icons/md";
import { GiBoxUnpacking, GiCampingTent, GiHook } from "react-icons/gi";
import { IoRestaurantSharp } from "react-icons/io5";
import { SlOrganization } from "react-icons/sl";
// const { Meta } = Card;
const { Title } = Typography;

const Calls = () => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jumpDetails, setJumpDetails] = useState(null);
  const [allImages, setAllImages] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const token = useSelector((state) => state.user.userToken);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, [slider1?.current, slider2?.current, allImages]);

  const { id } = useParams();

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
  useEffect(() => {
    getDropzoneDetails();
  }, []);
  const getDropzoneDetails = () => {
    setLoading(true);
    Get(`${JUMP.getJump}${id}`, token)
      .then((response) => {
        setJumpDetails(response?.data);
        setAllImages([
          response?.data?.gig?.image,
          ...response?.data?.gig?.gallery,
        ]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error Fetching Jump Details", err);
        setLoading(false);
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
    "Pool": <FaSwimmingPool />,
    "Swoop Pond": <FaParachuteBox />,
    "Team Rooms Videographers": <FaVideo />,
  };



  return (
    <div className="shop-page">
      <Row style={{ width: "100%", justifyContent: "center" }}>
        <Col xs={24} md={24}>
          <div className="shop-page-main">
            <Row>
              {!loading ? (
                <Col xs={24} md={24} lg={24} xl={24}>
                  <div className="my-account-profile">
                    <section className="side-menu-parent">
                      <DashbordSidebar />
                      <div className="about-us-section">
                        <div className="profile-information-wrapper">
                          <h3 className="main-heading">
                            Jump Reservation Details
                          </h3>
                        </div>
                        {jumpDetails && (
                          <div className="bg-paren">
                            <Card className="details-card">
                              <Row align="middle" gutter={16}>
                                <Col lg={10}>
                                  <div
                                    className="one-product"
                                    style={{ paddingRight: "30px" }}
                                  >
                                    <Badge.Ribbon
                                      text={jumpDetails.status}
                                      color={
                                        jumpDetails.status === "COMPLETED"
                                          ? "#00B31D"
                                          : jumpDetails.status === "UPCOMING"
                                          ? "#DD9F00"
                                          : jumpDetails.status === "ONGOING"
                                          ? "#2D308B"
                                          : "red"
                                      }
                                      placement="start"
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
                                                        src={
                                                          UPLOADS_URL + image
                                                        }
                                                        alt=""
                                                        className="img-fluid"
                                                        style={{
                                                          width: "100%",
                                                          maxHeight: "300px",
                                                          objectFit: "cover",
                                                          objectPosition:
                                                            "center",
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
                                              jumpDetails?.gig?.gallery.length
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
                                                        src={
                                                          UPLOADS_URL + image
                                                        }
                                                        alt=""
                                                        className="img-fluid"
                                                        style={{
                                                          width: "100%",
                                                          height: "90px",
                                                          objectFit: "cover",
                                                          objectPosition:
                                                            "center",
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
                                    </Badge.Ribbon>
                                  </div>
                                </Col>
                                <Col lg={14}>
                                  <div className="room-details">
                                    <div>
                                      <h4 className="text-26">
                                        {jumpDetails?.gigTitle}
                                      </h4>
                                    </div>
                                    <div className="search-result-detail-btnbox">
                                      <h6 className="per-day-price">
                                        ${jumpDetails?.charges}
                                      </h6>
                                    </div>
                                  </div>
                                  <Divider dashed />
                                  <div className="search-img-box-right additional-details">
                                    <h5 className="heading-18">
                                      Additional Details
                                    </h5>
                                    <p className="web-p">
                                      {jumpDetails?.gig?.details}
                                    </p>
                                  </div>
                                  <div className="jump-inner-detail">
                                    {jumpDetails?.gig?.location && (
                                      <div>
                                        <h6>Location</h6>
                                        <p>
                                          <FaLocationDot />{" "}
                                          {jumpDetails?.gig?.location?.street +
                                            " " +
                                            jumpDetails?.gig?.location?.state +
                                            " " +
                                            jumpDetails?.gig?.location?.city}
                                        </p>
                                      </div>
                                    )}

                                    <div>
                                      <h6>Local Weather</h6>
                                      <p>
                                        <MdSunny /> {jumpDetails?.weather}
                                      </p>
                                    </div>

                                    <div>
                                      <h6>Jump Type</h6>
                                      <p>
                                        <FaParachuteBox />{" "}
                                        {jumpDetails?.jumpType}
                                      </p>
                                    </div>
                                  </div>
                                  <div
                                    className="search-img-box-right"
                                    style={{ paddingBottom: "20px" }}
                                  >
                                    <h5 className="heading-18 py-2">
                                      Amenities
                                    </h5>
                                    <div className="">
                                      {jumpDetails?.amenities.map(
                                        (amenity, index) => {
                                          return (
                                            <div key={index}>
                                              <p>{amenityIcons[amenity.title]} {amenity.title}</p>
                                            </div>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Card>
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                </Col>
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
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Calls;
