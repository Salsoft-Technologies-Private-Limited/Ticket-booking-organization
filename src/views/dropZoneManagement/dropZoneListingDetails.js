import { useEffect, useRef, useState } from "react";
import {
  Col,
  Row,
  Image,
  Typography,
  Rate,
  Input,
  Button,
  Divider,
  DatePicker,
  Form,
  Card,
  Spin,
} from "antd";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { GIGS, REVIEWS, STAY, UPLOADS_URL } from "../../config/constants/api";
import DashbordSidebar from "../../components/DashboardSidebar";
import { FaArrowLeftLong, FaLocationDot, FaParachuteBox } from "react-icons/fa6";
import { Put } from "../../config/api/put";
import swal from "sweetalert";
import skydiveimg from "../../assets/skydrive-img.png";
import Slider from "react-slick";
import { listingData, reviews } from "../../components/Data/data";
import { MdBalcony, MdOutlineKingBed, MdFreeBreakfast } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { calculateReviewsAverage, toCamelCase } from "../../config/helpers";
import avatar from "../../assets/avatar.png";

const { Title } = Typography;

const StayUserDetails = () => {
  const [gigReviews, setGigReviews] = useState(null);
  const [dropzoneDetails, setDropzoneDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allImages, setAllImages] = useState(null);
  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const location = useLocation();
  const stay = location?.state?.stay;
  const { id } = useParams();
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

  const getDropzoneDetails = () => {
    Get(`${GIGS.getGig}${id}`, token)
      .then((response) => {
        setDropzoneDetails(response?.data);
        setAllImages([response?.data?.image, ...response?.data?.gallery]);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error Fetching Dropzone Details", err);
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
  useEffect(() => {
    if(!id){
      navigate(-1)
    }else{
      getDropzoneDetails();
      getReviews();
    }
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
  return (
    <div className="shop-page">
      <Row style={{ width: "100%", justifyContent: "center" }}>
        {!loading ? (
          <Col xs={24} md={24}>
            <Row style={{ width: "100%", justifyContent: "center" }}>
              <Col lg={24}>
                <div class="arrow-box">
                  <FaArrowLeftLong
                    className="arrow"
                    onClick={() => navigate(-1)}
                  />
                  <h3 className="main-heading">Jump Details</h3>
                </div>
              </Col>
            </Row>
            <Row justify="center">
              <Col lg={19}>
                {dropzoneDetails && (
                  <Card className="details-card">
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
                                slidesToShow={dropzoneDetails?.gallery?.length}
                                swipeToSlide={true}
                                focusOnSelect={true}
                                {...sliderSettings2}
                              >
                                {Array.isArray(allImages) &&
                                  allImages.map((image, index) => {
                                    return (
                                      <div key={index} className="slider-nav">
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
                            {gigReviews.length>0 && <div className="rating-box">
                              <Rate
                                allowHalf
                                defaultValue={calculateReviewsAverage(gigReviews)}
                                disabled
                              />
                            </div>}
                          </div>
                        </div>
                      </Col>
                      <Col lg={14}>
                        <div className="room-details">
                          <div>
                            <h4 className="text-26">
                              {dropzoneDetails?.title}
                            </h4>
                            <p className="">{dropzoneDetails?.subtitle}</p>
                          </div>
                          <div className="search-result-detail-btnbox">
                            <h6 className="per-day-price">
                              ${dropzoneDetails?.charges}
                            </h6>
                          </div>
                        </div>
                        <Divider dashed />
                        <div className="search-img-box-right additional-details">
                          <h5 className="heading-18">Additional Details</h5>
                          <p className="web-p">{dropzoneDetails?.details}</p>
                        </div>
                        <div className="jump-inner-detail">
                        {dropzoneDetails?.location && <div>
                            <h6>Location</h6>
                            <p>
                              <FaLocationDot />
                              {" " +
                                dropzoneDetails?.location?.address +
                                " ," +
                                dropzoneDetails?.location?.street +
                                " " +
                                dropzoneDetails?.location?.state}
                            </p>
                          </div>}

                       

                          <div>
                            <h6>Jump Type</h6>
                            <p>
                              <FaParachuteBox />
                              {" " + toCamelCase(dropzoneDetails?.jumpType)}
                            </p>
                          </div>
                        </div>
               
                     
                   
                      </Col>
                    </Row>
                  </Card>
                )}
              </Col>
            </Row>

            <Row justify="center">
              <Col lg={19}>
                <div className="details-card">
                  <Title level={3} className="text-24-bold pb-5">
                    Rating & Reviews
                  </Title>

                  <Row justify={"space-between"}>
                    <Col lg={12} xs={24}>
                      <Title level={2} className="rating-5">
                        {calculateReviewsAverage(gigReviews)}
                        <span>/{gigReviews?.length}</span>
                      </Title>
                      {gigReviews.length > 0 && <div className="pb-3">
                        <Rate
                          allowHalf
                          defaultValue={calculateReviewsAverage(gigReviews)}
                          disabled
                        />
                      </div>}
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
                                <Rate allowHalf defaultValue={i + 1} disabled />
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
                                    (review) => review.rating === i + 1
                                  ).length
                                }
                              </div>
                            </div>
                          </div>
                        ))}
                      </Col>
                    )}
                  </Row>

                  {Array.isArray(gigReviews) && gigReviews.length > 0 ? (
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
  );
};

export default StayUserDetails;
