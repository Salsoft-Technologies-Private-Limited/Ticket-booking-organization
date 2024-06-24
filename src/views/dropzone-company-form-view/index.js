import { useEffect, useRef, useState } from "react";
import {
  Col,
  Row,
  Form,
  Input,
  message,
  Upload,
  theme,
  Button,
  Image,
  TimePicker,
} from "antd";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import paymentImg from "../../assets/payment-img.png";
import { companyProfileDate } from "../../components/Data/data";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { UPLOADS_URL } from "../../config/constants/api";
// const { Meta } = Card;

const normFile = (e) => {
  if (Array.isArray(e)) {
    console.log(e);
    return e;
  }
  return e?.fileList;
};

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 1MB!");
  }
  return isJpgOrPng && isLt2M;
};
const { TextArea } = Input;

const DropzoneCompany = () => {
  const [allImages, setAllImages] = useState(null);
  const profileDetails = useSelector((state) => state.user.profileDetails);
  useEffect(()=>{
    // console.log(profileDetails,'profileDetails')
    if(!profileDetails){
      navigate('/create-dropzone-company')
    }
    else{
      setAllImages([profileDetails?.image, ...profileDetails?.gallery])
    }
  },[])
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, [slider1?.current, slider2?.current, allImages]);
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

  const onFinish = (values) => {
    // Handle form submission
    console.log("Received values:", values);
  };
  const { TextArea } = Input;
  const handleChange2 = () => {
    swal("system Alert", "Your Message has been Send", "success");
  };
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const [loading, setLoading] = useState(false);

  const [selfieUrl, setSelfieUrl] = useState("");
  const [selfieObject, setSelfieObject] = useState({});

  const [idCardFrontUrl, setIdCardFrontUrl] = useState("");
  const [idCardFrontObject, setIdCardFrontObject] = useState({});

  const [idCardBackUrl, setIdCardBackUrl] = useState("");
  const [idCardBackObject, setIdCardBackObject] = useState({});

  const [licenseUrl, setLicenseUrl] = useState("");
  const [licenseObject, setLicenseObject] = useState({});

  const handleChange = (info, name) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        if (name === "selfie") {
          setSelfieObject(info.file.originFileObj);
          setSelfieUrl(url);
        } else if (name === "idCardFront") {
          setIdCardFrontObject(info.file.originFileObj);
          setIdCardFrontUrl(url);
        } else if (name === "idCardBack") {
          setIdCardBackObject(info.file.originFileObj);
          setIdCardBackUrl(url);
        } else if (name === "license") {
          setLicenseObject(info.file.originFileObj);
          setLicenseUrl(url);
        }
        setLoading(false);
      });
    }
  };
  const multipleChange = (e) => {
    console.log(e);
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Image (Recommended PNG, JPG upto 1MB)
      </div>
    </button>
  );
  return (
    <div className="shop-page">
      <Row style={{ width: "100%", justifyContent: "center" }}>
        <Col xs={24} md={24}>
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <Col lg={24}>
              <div className="arrow-box">
                <FaArrowLeftLong
                  className="arrow"
                  onClick={() => navigate('/')}
                />
                <h3 className="main-heading">Drop Zone Company Profile</h3>
              </div>
            </Col>
          </Row>
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <Col lg={24}>
              <Row justify="center">
                <Col xl={24} lg={20}>
                  <div className="details-card my-4">
                    <Row style={{ width: "100%" }} gutter={[16, 16]}>
                      <Col lg={12} md={12} xs={24}>
                        <Row style={{ width: "100%" }} gutter={[16, 16]}>
                          <Col lg={24} md={24} xs={24}>
                            <div
                              className="one-product"
                              style={{ paddingRight: "30px" }}
                            >
                              <div className="slider-img-height">
                                <Slider
                                  asNavFor={nav2}
                                  ref={slider1}
                                  {...sliderSettings}
                                  className="main-slider-img"
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
                                  slidesToShow={profileDetails?.gallery?.length>=4 ? profileDetails?.gallery?.length : allImages?.length}
                                  swipeToSlide={true}
                                  focusOnSelect={true}
                                  {...sliderSettings2}
                                  className="sub-slider-img"
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
                                              // maxWidth: "150px",
                                            }}
                                          />
                                        </span>
                                      </div>
                                    );
                                  })}
                                </Slider>
                              </div>
                            </div>
                          </Col>
                          <Col lg={24} md={24} xs={24}>
                            <h3 style={{ padding: "10px 0" }}>
                              Location
                            </h3>
                            <label
                              style={{ paddingLeft: "0", color: "#696969" }}
                            >
                              Address
                            </label>
                            <p className="text-16" style={{ padding: "8px 0" }}>
                            {profileDetails?.location?.address}
                            </p>
                          </Col>
                          <Col lg={24} md={24} xs={24}>
                            <label
                              style={{ paddingLeft: "0", color: "#696969" }}
                            >
                              City
                            </label>
                            <p className="text-16" style={{ padding: "8px 0" }}>
                            {profileDetails?.location?.city}
                            </p>
                          </Col>
                          <Col lg={24} md={24} xs={24}>
                            <label
                              style={{ paddingLeft: "0", color: "#696969" }}
                            >
                              Country
                            </label>
                            <p className="text-16" style={{ padding: "8px 0" }}>
                            {profileDetails?.location?.country}
                            </p>
                          </Col>
                          <Col lg={24} md={24} xs={24}>
                            <label
                              style={{ paddingLeft: "0", color: "#696969" }}
                            >
                              Enter a YT Video URL for DZ Briefing
                            </label>
                            <p className="text-16" style={{ padding: "8px 0" }}>
                            {profileDetails?.briefUrl}
                            </p>
                          </Col>
                          <Col lg={24} md={24} xs={24}>
                            <label
                              style={{ paddingLeft: "0", color: "#696969" }}
                            >
                              DZ Briefing Description
                            </label>
                            <p className="text-16" style={{ padding: "8px 0" }}>
                            {profileDetails?.briefDescription}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={12} md={12} xs={24}>
                        <Row style={{ width: "100%" }} gutter={[16, 16]}>
                          <Col lg={24} md={24} xs={24}>
                            <h3>Drop Zone Company Title</h3>
                            <p className="text-16" style={{ padding: "8px 0" }}>
                              {profileDetails?.title}
                            </p>
                          </Col>
                          <Col lg={24} md={24} xs={24}>
                            <h5 style={{ paddingLeft: "0" }}>Description</h5>
                            <p className="text-16" style={{ padding: "8px 0" }}>
                              {profileDetails?.description}
                            </p>
                          </Col>
                          <Col lg={24} md={24} xs={24}>
                            <h5>Selfie</h5>
                            <span className="selfie-box">
                              <img
                                src={UPLOADS_URL + profileDetails?.selfie}
                                alt=""
                                className="img-fluid"
                              />
                            </span>
                          </Col>
                          <Col lg={12} md={12} xs={24}>
                            <h5 style={{ padding: "10px 0" }}>ID Card Front</h5>
                            <span className="">
                              <img
                                src={UPLOADS_URL + profileDetails?.idCardFront}
                                alt=""
                                className="img-fluid"
                                style={{ width: "100%" }}
                              />
                            </span>
                          </Col>
                          <Col lg={12} md={12} xs={24}>
                            <h5 style={{ padding: "10px 0" }}>ID Card Back</h5>
                            <span className="">
                              <img
                                src={UPLOADS_URL + profileDetails?.idCardBack}
                                alt=""
                                className="img-fluid"
                                style={{ width: "100%" }}
                              />
                            </span>
                          </Col>
                          <Col lg={16} md={16} xs={24}>
                            <h5 style={{ padding: "10px 0" }}>
                              License/ Certification
                            </h5>
                            <span className="">
                              <img
                                src={UPLOADS_URL + profileDetails?.license}
                                alt=""
                                className="img-fluid"
                                style={{ width: "100%" }}
                              />
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row style={{ width: "100%", margin: "40px 0" }}>
                      <Col lg={10} md={10} xs={24}>
                        <Image
                          preview={false}
                          alt={"Failed to load image"}
                          src={paymentImg}
                          className=""
                        />
                      </Col>
                      <Col lg={14} md={14} xs={24}>
                        <h2 className="booking-card-price">
                          Bank Account Details
                        </h2>
                        <Row style={{ width: "100%" }} gutter={[16, 16]}>
                          <Col lg={12} md={12} xs={24}>
                            <h5 style={{ padding: "10px 0" }}>
                              Beneficiary Name*
                            </h5>
                            <span className="">
                              {profileDetails?.accountDetails?.name}
                            </span>
                          </Col>
                          <Col lg={12} md={12} xs={24}>
                            <h5 style={{ padding: "10px 0" }}>
                              Remittance Country*
                            </h5>
                            <span className="">
                            {profileDetails?.accountDetails?.country}
                            </span>
                          </Col>
                          <Col lg={12} md={12} xs={24}>
                            <h5 style={{ padding: "10px 0" }}>
                              Account Currency*
                            </h5>
                            <span className="">
                            {profileDetails?.accountDetails?.currency}
                            </span>
                          </Col>
                          <Col lg={12} md={12} xs={24}>
                            <h5 style={{ padding: "10px 0" }}>IBAN*</h5>
                            <span className="">
                            {profileDetails?.accountDetails?.iban}
                            </span>
                          </Col>
                          <Col lg={12} md={12} xs={24}>
                            <h5 style={{ padding: "10px 0" }}>
                              Account Number*
                            </h5>
                            <span className="">
                            {profileDetails?.accountDetails?.accNumber}
                            </span>
                          </Col>
                          <Col lg={12} md={12} xs={24}>
                            <h5 style={{ padding: "10px 0" }}>Bank Name*</h5>
                            <span className="">
                            {profileDetails?.accountDetails?.bankName}
                            </span>
                          </Col>
                          <Col lg={12} md={12} xs={24}>
                            <h5 style={{ padding: "10px 0" }}>
                              SWIFT Code/Routing Number*
                            </h5>
                            <span className="">
                            {profileDetails?.accountDetails?.swift}
                            </span>
                          </Col>
                          <Col lg={12} md={12} xs={24}>
                            <h5 style={{ padding: "10px 0" }}>Branch Name*</h5>
                            <span className="">
                            {profileDetails?.accountDetails?.branchName}
                            </span>
                          </Col>
                          <Col lg={12} md={12} xs={24}>
                            <h5 style={{ padding: "10px 0" }}>City*</h5>
                            <span className="">
                            {profileDetails?.accountDetails?.city}
                            </span>
                          </Col>
                          <Col lg={12} md={12} xs={24}>
                            <h5 style={{ padding: "10px 0" }}>Bank Address*</h5>
                            <span className="">
                            {profileDetails?.accountDetails?.bankAddress}
                            </span>
                          </Col>
                          <Col lg={24} md={24} xs={24}>
                            <div className="">
                              <Button
                                type="submit"
                                htmlType="submit"
                                className="web-btn2"
                                style={{
                                  margin: "10px",
                                }}
                                onClick={() =>
                                  navigate("/dropzone-company-form-edit")
                                }
                              >
                                Edit
                              </Button>
                              <Button
                                type="submit"
                                htmlType="submit"
                                className="web-btn"
                                style={{
                                  margin: "10px",
                                }}
                              >
                                View Drop Zone Logs
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DropzoneCompany;
