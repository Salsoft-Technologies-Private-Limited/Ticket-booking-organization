import { useEffect, useRef, useState } from "react";
import { Col, Row, Card, Button, Typography, Rate, Checkbox, Spin } from "antd";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import DashbordSidebar from "../../components/DashboardSidebar";
import { AudioOutlined } from "@ant-design/icons";
import { dropzoneData, reviews } from "../../components/Data/data";
import { GiCampingTent, GiBoxUnpacking } from "react-icons/gi";
import { IoRestaurantSharp } from "react-icons/io5";
import { MdCarRental, MdElectricBolt } from "react-icons/md";
import { SlOrganization } from "react-icons/sl";
import { FaSquareParking } from "react-icons/fa6";
import { GiHook } from "react-icons/gi";
import { FcElectricity } from "react-icons/fc";
import { FaSwimmingPool } from "react-icons/fa";
import {
  FaArrowLeftLong,
  FaBed,
  FaPersonSwimming,
  FaParachuteBox,
  FaVideo,
} from "react-icons/fa6";
import Slider from "react-slick";
import { Get } from "../../config/api/get";
import { Delete } from "../../config/api/delete";
import { GIGS, REVIEWS, UPLOADS_URL } from "../../config/constants/api";
import { calculateReviewsAverage, toCamelCase } from "../../config/helpers";
import avatar from "../../assets/avatar.png";
import swal from "sweetalert";

const Dashboard = () => {
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [gigReviews, setGigReviews] = useState(null);
  const [gigDetails, setGigDetails] = useState(null);
  const [open, setOpen] = useState(false);
  const { Meta } = Card;
  const showDrawer = () => {
    setOpen(true);
  };
  const { id } = useParams();
  const [allImages, setAllImages] = useState(null);
  const getGigDetails = () => {
    Get(`${GIGS.getGig}${id}`, token)
      .then((response) => {
        setGigDetails(response?.data);
        setAllImages([response?.data?.image, ...response?.data?.gallery]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error Fetching Gig Details", err);
        setLoading(false);
      });
  };
  const getReviews = () => {
    Get(`${REVIEWS.getGigReviews}${id}`, token)
      .then((response) => {
        setGigReviews(response?.data?.docs);
      })
      .catch((err) => {
        console.log("Error Fetching Reviews", err);
      });
  };
  const handleDelete = () => {
    Delete(`${GIGS.deleteGig}${id}`, token)
      .then((response) => {
        if (response.status) {
          swal("Success", "Dropzone Deleted Successfully", "success");
          navigate("/dropZoneListing");
        }
      })
      .catch((err) => {
        console.log("Error", err);
        swal("Error", err?.response?.data?.message, "error");
      });
  };
  const getRank = (rating) => {
    const ratingCounts = gigReviews?.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {});
    const sortedRatings = Object.keys(ratingCounts).sort(
      (a, b) => ratingCounts[b] - ratingCounts[a]
    );
    let rank = 1;
    let prevCount = null;
    for (let i = 0; i < sortedRatings.length; i++) {
      const currentRating = parseInt(sortedRatings[i]);
      const currentCount = ratingCounts[currentRating];

      if (currentCount !== prevCount) {
        rank = i + 1;
        prevCount = currentCount;
      }
      if (currentRating === rating) {
        return rank;
      }
    }
    return 0;
  };
  useEffect(() => {
    if (!id) {
      navigate(-1);
    }
    getGigDetails();
    getReviews();
  }, []);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);

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

  const { Title } = Typography;

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
                      <div className="bg-parent dashboard-right-card">
                        <Row
                          style={{ width: "100%", justifyContent: "center" }}
                        >
                          <Col lg={24}>
                            <div className="arrow-box">
                              <FaArrowLeftLong
                                className="arrow"
                                onClick={() => navigate(-1)}
                              />
                              <h3 className="heading-28">Drop Zone Details</h3>
                            </div>
                          </Col>
                        </Row>

                        {!loading ? (
                          <Row justify="center">
                            {gigDetails ? (
                              <Col lg={23}>
                                <Row align="" gutter={16}>
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
                                              allImages?.length
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
                                    </div>
                                  </Col>
                                  <Col lg={14}>
                                    <div className="room-details">
                                      <div>
                                        <h4 className="text-26">
                                          {gigDetails?.title}
                                        </h4>
                                        <p className="">
                                          {toCamelCase(gigDetails?.jumpType) +
                                            " Jump"}
                                        </p>
                                      </div>
                                      <div className="search-result-detail-btnbox">
                                        <h6 className="per-day-price">
                                          ${gigDetails?.charges + ".00"}
                                        </h6>
                                      </div>
                                    </div>
                                    <div className="search-img-box-right additional-details">
                                      <h5 className="heading-18">
                                        Additional Details
                                      </h5>
                                      <p className="web-p">
                                        {gigDetails?.details}
                                      </p>
                                    </div>
                                    <div>
                                      <Button
                                        type=""
                                        className="web-btn2"
                                        style={{
                                          marginRight: "10px",
                                        }}
                                        onClick={() =>
                                          navigate(`/editDropZone/${id}`)
                                        }
                                      >
                                        Edit
                                      </Button>
                                      <Button
                                        type=""
                                        className="web-btn"
                                        onClick={handleDelete}
                                        style={{ background: "#b91717" }}
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            ) : (
                              <p
                                style={{
                                  textAlign: "center",
                                  fontSize: "22px",
                                  fontWeight: "bold",
                                }}
                              >
                                No Details to Show
                              </p>
                            )}
                          </Row>
                        ) : (
                          <Card>
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
                          </Card>
                        )}
                        <Row gutter={[16, 16]}>
                          <Col lg={24}>
                            <h5 className="heading-18">AMENITIES</h5>
                            <div className="offer-tabs">
                              <Checkbox.Group
                                options={gigDetails?.amenities.map(
                                  (option) => ({
                                    label: (
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                        }}
                                        className="check-icon"
                                      >
                                        {amenityIcons[option?.title]}
                                        {option.title}
                                      </div>
                                    ),
                                    value: option.title,
                                    style: {
                                      backgroundColor: "#0f75bd",
                                      color: "#ffff",
                                    },
                                  })
                                )}
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row justify="center">
                          <Col lg={24}>
                            <div className="details-card">
                              <Title level={3} className="text-24-bold pb-5">
                                Rating & Reviews
                              </Title>

                              {gigReviews && (
                                <Row justify={"space-between"}>
                                  <Col lg={12} xs={24}>
                                    <Title level={2} className="rating-5">
                                      {calculateReviewsAverage(gigReviews)}
                                      <span>/{gigReviews?.length}</span>
                                    </Title>
                                    <div className="pb-3">
                                      <Rate
                                        allowHalf
                                        defaultValue={calculateReviewsAverage(
                                          gigReviews
                                        )}
                                        disabled
                                      />
                                    </div>
                                    <a href="#_" className="blue-link">
                                      {gigReviews?.length + " Reviews"}
                                    </a>
                                  </Col>

                                  {Array.isArray(gigReviews) && (
                                    <Col lg={12} xs={24}>
                                      {Array.from({ length: 5 }, (_, i) => (
                                        <div
                                          key={i}
                                          className=""
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <div className="side">
                                            <div className="star-18">
                                              <Rate
                                                allowHalf
                                                defaultValue={i + 1}
                                                disabled
                                              />
                                            </div>
                                          </div>
                                          <div className="middle">
                                            <div
                                              className={`bar-container bar-${
                                                6 - getRank(i + 1)
                                              }`}
                                            ></div>
                                          </div>
                                          <div className="side right">
                                            <div>
                                              {
                                                gigReviews?.filter(
                                                  (review) =>
                                                    review.rating === i + 1
                                                ).length
                                              }
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </Col>
                                  )}
                                </Row>
                              )}

                              {Array.isArray(gigReviews) &&
                              gigReviews.length > 0 ? (
                                gigReviews.map((review, index) => {
                                  return (
                                    <div key={index} className="review-box">
                                      <div className="for-media-object">
                                        <div className="flex-shrink-0">
                                          <img
                                            src={
                                              review?.image === ""
                                                ? avatar
                                                : UPLOADS_URL + review?.image
                                            }
                                            alt=""
                                            className="img-fluid"
                                          />
                                        </div>
                                        <div className="flex-grow-1 ms-3">
                                          <div className="star-18">
                                            <Rate
                                              allowHalf
                                              defaultValue={review?.rating}
                                              disabled
                                            />
                                          </div>
                                          <h6>{review?.personName}</h6>
                                          <p>{review?.description}</p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                              ) : (
                                <p
                                  style={{
                                    textAlign: "center",
                                    margin: "30px 0px",
                                    fontWeight: "bold",
                                    fontSize: "20px",
                                  }}
                                >
                                  No Reviews to Show
                                </p>
                              )}
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

export default Dashboard;
