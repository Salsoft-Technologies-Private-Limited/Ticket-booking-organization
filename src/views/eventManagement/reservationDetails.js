import { useEffect, useRef, useState } from "react";
import { Col, Row, Card, Typography, Badge, Spin, Image } from "antd";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import Slider from "react-slick";
import { Get } from "../../config/api/get";
import { BOOKING, UPLOADS_URL } from "../../config/constants/api";
import { useSelector } from "react-redux";
import moment from "moment";
import checkedIcon from "../../assets/checked.png";
import { convertTo12HourFormat } from "../../config/helpers";
// const { Meta } = Card;
const { Title , Text} = Typography;

const Calls = () => {
  const token = useSelector((state) => state.user.userToken);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allImages, setAllImages] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  
  const { id } = useParams();
  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, [slider1?.current, slider2?.current, allImages]);
  const getBookingDetails = () => {
    setLoading(true)
    Get(`${BOOKING.getBooking}${id}`, token)
    .then((response) => {
      setBooking(response?.data);
      setAllImages([
        response?.data?.event?.image,
        ...response?.data?.event?.gallery,
      ]);
      setLoading(false);
      })
      .catch((err) => {
        console.error("Error Fetching Booking Data", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getBookingDetails();
  }, []);

  const navigate = useNavigate();

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
          <Col xs={23} md={21}>
            <Row style={{ width: "100%", justifyContent: "center" }}>
              <Col lg={24}>
                <div className="arrow-box">
                  <FaArrowLeftLong
                    className="arrow"
                    onClick={() => navigate(-1)}
                  />
                  <h3 className="main-heading">Booking Details</h3>
                </div>
              </Col>
            </Row>
            {booking && (
              <Row gutter={16}>
                <Col lg={16}>
                  <Card className="details-card">
                    <Row align="middle" gutter={16}>
                      <Col lg={12}>
                        <div className="one-product">
                          <Badge.Ribbon
                            text={booking?.status}
                            color={
                              booking?.status === "COMPLETED"
                                ? "#00B31D"
                                : booking?.status === "UPCOMING"
                                ? "#DD9F00"
                                : booking?.status === "ONGOING"
                                ? "#2D308B"
                                : "red"
                            }
                            placement="start"
                          >
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
                                slidesToShow={booking?.event?.gallery?.length } 
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
                                                maxWidth: "100%",
                                              }}
                                          />
                                        </span>
                                      </div>
                                    );
                                  })}
                              </Slider>
                            </div>
                          </Badge.Ribbon>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <h2 className="booking-details-name">
                          {booking?.roomTitle}
                        </h2>
                        <div className="checked-box">
                          <Image
                            preview={false}
                            alt={"Failed to load image"}
                            src={checkedIcon}
                            className=""
                          />
                          <Text strong>Event Date:</Text>{" "}
                          {moment
                            .utc(booking?.event?.date)
                            .format("ddd, MMM DD, YYYY")}
                        </div>
                        <div className="checked-box">
                          <Image
                            preview={false}
                            alt={"Failed to load image"}
                            src={checkedIcon}
                            className=""
                          />
                          <Text strong>Event Time:</Text>{" "}
                          {/* {moment
                            .utc(booking?.checkOut)
                            .format("ddd, MMM DD, YYYY, [Until] hh:mm a")} */}
                            {convertTo12HourFormat(booking?.event?.time)}
                        </div>
                        <div className="checked-box">
                          <Image
                            preview={false}
                            alt={"Failed to load image"}
                            src={checkedIcon}
                            className=""
                          />
                          <Text strong>Total Number of Visitors:</Text>{" "}
                          {/* {booking?.totalStay.toString().length < 2
                            ? "0" + booking?.totalStay + " Nights"
                            : booking?.totalStay + " Nights"} */}
                            {booking?.visitors.length}
                        </div>
                        <div className="checked-box">
                          <Image
                            preview={false}
                            alt={"Failed to load image"}
                            src={checkedIcon}
                            className=""
                          />
                          {/* <Text strong>You Selected:</Text> {booking.roomType} */}
                          <Text strong>Location:</Text> {booking?.event?.location?.address}
                        </div>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col lg={8}>
                  <div className="details-card price-summary-card">
                    <h2 className="price-summary-heading">Price Summary</h2>
                    <div className="price-summary-detail">
                      {/* <p>Total Nights</p>
                      <p>
                        {booking?.totalStay.toString().length < 2
                          ? "0" + booking?.totalStay
                          : booking?.totalStay}
                      </p> */}
                    </div>
                    <div className="price-summary-detail">
                      <p>
                        Ticket Charges
                      </p>
                      <p>${booking?.event?.price}.00</p>
                    </div>
                   
                    <div className="price-summary-detail">
                      <p>% TAX</p>
                      <p>
                        $0.00
                      </p>
                    </div>
                  </div>
                  <div className="total-paid">
                    <p>Total Paid</p>
                    <p>${booking?.totalAmount}.00</p>
                  </div>
                </Col>
              </Row>
            )}
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

export default Calls;
