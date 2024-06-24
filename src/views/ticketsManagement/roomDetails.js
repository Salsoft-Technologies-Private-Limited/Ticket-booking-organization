import { useEffect, useRef, useState } from "react";
import { Col, Row, Typography, Rate, Spin } from "antd";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { REVIEWS, STAY, UPLOADS_URL } from "../../config/constants/api";
import DashbordSidebar from "../../components/DashboardSidebar";
import { FaArrowLeftLong } from "react-icons/fa6";
import Slider from "react-slick";
import { MdBalcony, MdOutlineKingBed } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import { Get } from "../../config/api/get";
import avatar from "../../assets/avatar.png";
import { calculateReviewsAverage } from "../../config/helpers/index";
const { Title } = Typography;

const StayUserDetails = () => {
  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const [allImages, setAllImages] = useState(null);
  const { id } = useParams();
  const [roomDetails, setRoomDetails] = useState(null);
  const [roomReviews, setRoomReviews] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRank = (rating) => {
    const ratingCounts = roomReviews?.reduce((acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1;
      return acc;
    }, {});
    const sortedRatings = Object.keys(ratingCounts).sort(
      (a, b) => ratingCounts[b] - ratingCounts[a]
    );
    let rank = 1;
    let prevCount = null;
    for (let i = 0; i < sortedRatings?.length; i++) {
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
    } else {
      getRoomDetails();
      getRoomReviews();
    }
  }, []);
  const getRoomDetails = () => {
    setLoading(true);
    Get(`${STAY.getRoom}${id}`, token)
      .then((response) => {
        setRoomDetails(response?.data?.room);
        setAllImages([
          response?.data?.room?.image,
          ...response?.data?.room?.gallery,
        ]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error fetching Room Details ", err);
        setLoading(false);
      });
  };
  const getRoomReviews = () => {
    Get(`${REVIEWS.getRoomReviews}${id}`, token)
      .then((response) => {
        setRoomReviews(response?.data?.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
  return (
    <div className="shop-page">
      <Row style={{ width: "100%", justifyContent: "center" }}>
        <Col xs={24} md={24}>
          <div className="shop-page-main">
            <Row>
             {!loading ? (<Col xs={24} md={24} lg={24} xl={24}>
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
                          <Col lg={24} md={24} xs={24}>
                            <div class="arrow-box2">
                              <div>
                                <FaArrowLeftLong
                                  className="arrow"
                                  onClick={() => navigate(-1)}
                                />
                              </div>
                              <h3 className="heading-28">Stay Details</h3>
                            </div>
                          </Col>
                        </Row>
                        <Row
                          align="middle"
                          gutter={16}
                          style={{
                            width: "100%",
                          }}
                        >
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
                                    slidesToShow={roomDetails?.gallery?.length}
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
                          <Col lg={14} md={24} xs={24}>
                            <div className="">
                              <div className="search-result-detail-btnbox">
                                <h6 className="per-day-price">
                                  ${roomDetails?.pricing}
                                  <span>/Per day</span>
                                </h6>
                                <p>
                                  {" "}
                                  {roomDetails?.guests} Guests,{" "}
                                  {roomDetails?.vat}% Vat
                                </p>
                              </div>
                              <div>
                                <h4 className="text-26">
                                  {roomDetails?.title}
                                </h4>
                                <div className="search-img-box-right">
                                  <p>
                                    <MdBalcony />
                                    {roomDetails?.description}
                                  </p>
                                  <p>
                                    <FaShower />
                                    {roomDetails?.bathrooms + " Bathrooms"}
                                  </p>
                                  <p>
                                    <MdOutlineKingBed />
                                    {roomDetails?.beds + " Beds"}
                                  </p>
                                </div>
                                <div
                                  className="search-img-box-right"
                                  style={{ paddingBottom: "20px" }}
                                >
                                  <h5 className="heading-18 py-2">
                                    Extra Charges
                                  </h5>
                                  {/* <Checkbox
                                    id="inlineCheckbox2"
                                    className="form-check-input"
                                    value="option2"
                                  > */}
                                  $20 extra charges for room cleaning
                                  {/* </Checkbox> */}
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>

                        <Row justify="center" style={{ margin: "50px 0" }}>
                          <Col lg={24}>
                            <div className="details-card">
                              <Title level={3} className="text-24-bold pb-5">
                                Rating & Reviews
                              </Title>

                              <Row justify={"space-between"}>
                                <Col lg={12} xs={24}>
                                  <Title level={2} className="rating-5">
                                    {calculateReviewsAverage(roomReviews)}
                                    <span>/{roomReviews?.length}</span>
                                  </Title>
                                  <div className="pb-3">
                                    <Rate
                                      allowHalf
                                      defaultValue={calculateReviewsAverage(
                                        roomReviews
                                      )}
                                      disabled
                                    />
                                  </div>
                                  <a href="#_" className="blue-link">
                                    {roomReviews?.length + " "} Reviews
                                  </a>
                                </Col>

                                {Array.isArray(roomReviews) && (
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
                                              roomReviews?.filter(
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

                              {Array.isArray(roomReviews) &&
                              roomReviews.length > 0 ? (
                                roomReviews.map((review, index) => {
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
              </Col>) : ( <Col
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
                            </Col>)}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StayUserDetails;
