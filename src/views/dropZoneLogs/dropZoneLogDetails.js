import { useEffect, useRef, useState } from "react";
import {
  Col,
  Row,
  Card,
  Typography,
  Badge,
  Form,
  Input,
  Button,
  Spin,
  TimePicker
} from "antd";
import { useNavigate, useParams } from "react-router";
import { FaLocationDot, FaParachuteBox } from "react-icons/fa6";
import { dropzoneLogsData } from "../../components/Data/data";
import { MdSunny } from "react-icons/md";
import DashbordSidebar from "../../components/DashboardSidebar";
import Slider from "react-slick";
import { ClockCircleFilled, CalendarFilled } from "@ant-design/icons";
import { Get } from "../../config/api/get";
import { Put } from "../../config/api/put";
import { GIGS, JUMP, UPLOADS_URL } from "../../config/constants/api";
import { useSelector } from "react-redux";
import { extractDate } from "../../config/helpers";
import swal from "sweetalert";
import moment from "moment";

// const { Meta } = Card;
const { Title } = Typography;

const Calls = () => {
  const token = useSelector((state) => state.user.userToken);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [allImages, setAllImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [jumpDetails, setJumpDetails] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, [slider1?.current, slider2?.current, allImages]);

  const { id } = useParams();

  useEffect(() => {
    getDropzoneDetails();
  }, []);
  const getDropzoneDetails = () => {
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

  const onFinish = (values) => {
    const { flightTime, planeNumber, loadNumber } = values;
    let data = new FormData()
    const flightDetails = {
      planeNo : planeNumber,
      loadNo : loadNumber,
      flightTime : moment(flightTime?.$d).format("HH:mm:ss")
    }
    data.append('flightDetails', JSON.stringify(flightDetails))
    Put(`${GIGS.updateGig}${jumpDetails?.gig?._id}`, token , data , null , 'multipart').then((response)=>{
      if(response?.status){
        swal('System Alert!', response?.message, 'success')
        form.resetFields()
      }
    }).catch((err)=>{
      console.log(err)
      const message = err?.response?.data?.message
      if(message){
        swal('System Alert!', message, 'error')
      }
    })
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
                            Drop Zone Reservation Details
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
                                    </Badge.Ribbon>
                                  </div>
                                </Col>
                                <Col lg={14}>
                                  <div className="room-details">
                                    <div>
                                      <h4 className="text-26">
                                        {jumpDetails?.gigTitle}
                                      </h4>
                                      <div className="booking-card-span">
                                        <span>
                                          <ClockCircleFilled />{" "}
                                          {jumpDetails?.time}
                                        </span>
                                        <span>
                                          <CalendarFilled />{" "}
                                          {extractDate(
                                            jumpDetails?.selectedDate
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="search-result-detail-btnbox">
                                      <h6 className="per-day-price">
                                        ${jumpDetails?.charges + ".00"}
                                      </h6>
                                    </div>
                                  </div>
                                  <div className="search-img-box-right additional-details">
                                    <h5 className="heading-18">
                                      Additional Details
                                    </h5>
                                    <p className="web-p">
                                      {jumpDetails?.details}
                                    </p>
                                  </div>
                                </Col>
                              </Row>

                              {jumpDetails.status === "UPCOMING" && (
                                <Form
                                  className="row g-3"
                                  name="basic"
                                  layout="vertical"
                                  initialValues={{
                                    remember: true,
                                  }}
                                  onFinish={onFinish}
                                  autoComplete="off"
                                  form={form}
                                >
                                  <h4 className="text-26">
                                    Enter Flight Details
                                  </h4>
                                  <Row align="middle" gutter={16}>
                                    <Col lg={12}>
                                      <Form.Item
                                        label="Plane Number"
                                        name="planeNumber"
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Please enter your Plane Number!",
                                          },
                                        ]}
                                      >
                                        <Input
                                          size="large"
                                          placeholder="Enter Plane Number"
                                          className="web-input"
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col lg={12}>
                                      <Form.Item
                                        label="Load Number"
                                        name="loadNumber"
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Please enter your Load Number!",
                                          },
                                        ]}
                                      >
                                        <Input
                                          size="large"
                                          placeholder="Enter Load Number"
                                          className="web-input"
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col lg={12}>
                                      <Form.Item
                                        label="Flight Time"
                                        name="flightTime"
                                        rules={[
                                          {
                                            required: true,
                                            message:
                                              "Please enter your Flight Time!",
                                          },
                                        ]}
                                      >
                                        <TimePicker
                                          size="large"
                                          className="web-input"
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <div className="">
                                    <Button
                                      type=""
                                      htmlType="submit"
                                      className="btn web-btn px-5"
                                    >
                                      SEND ALERT TO CUSTOMERS
                                    </Button>
                                  </div>
                                </Form>
                              )}
                            </Card>
                          </div>
                        )}
                      </div>
                    </section>
                  </div>
                </Col>
              ) : (
                <Col
                  xs={24}
                  md={24}
                  lg={24}
                  xl={24}
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
