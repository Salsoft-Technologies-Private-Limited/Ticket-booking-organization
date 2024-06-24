import React, { useEffect, useState } from "react";
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
import { Post } from "../../config/api/post";
import { COMPANY } from "../../config/constants/api";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addProfileDetails } from "../../redux/slice/authSlice";
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
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 4;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const { TextArea } = Input;

const DropzoneCompany = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const authToken = useSelector((state) => state.user.userToken);
  const profileDetails = useSelector((state) => state.user.profileDetails);
  // useEffect(() => {
  //   if (profileDetails) {
  //     navigate("/");
  //   }
  // }, []);
  const onFinish = (values) => {
    // Handle form submission
    const location = {
      address: values.address,
      apartment: values.apartment,
      street: values.street,
      state: values.state,
      city: values.city,
      country: values.country,
      zipCode: values.zipCode,
    };
    const accountDetails = {
      name: values.accountName,
      country: values.accountCountry,
      city: values.accountCity,
      iban: values.iban,
      accNumber: values.accNumber,
      swift: values.swift,
      bankName: values.bankName,
      branchName: values.branchName,
      bankAddress: values.bankAddress,
      currency: values.accountCurrency,
    };
    const pricing = {
      tandemJump : values.tandem,
      soloJump : values.solo,
      affJump : values.aff
    }
    let data = new FormData();
    if (gallery.length > 1) {
      const galleryToAppend = gallery.slice(1).map((file) => {
        return file.originFileObj;
      });
      galleryToAppend.forEach((val) => {
        data.append("gallery", val);
      });
    }
    data.append("image", gallery[0]?.originFileObj);
    data.append("selfie", selfieObject);
    data.append("license", licenseObject);
    data.append("idCardFront", idCardFrontObject);
    data.append("idCardBack", idCardBackObject);
    data.append("title", values.title);
    data.append("description", values.description);
    data.append("briefUrl", values.briefUrl);
    data.append("briefTitle", values.briefTitle);
    data.append("briefDescription", values.briefDescription);
    data.append(
      "startTime",
      moment(values.timings[0]?.$d).format("HH:mm:ss")
    );
    data.append(
      "endTime",
      moment(values.timings[1]?.$d).format("HH:mm:ss")
    );
    
    data.append("location", JSON.stringify(location));
    data.append("pricing", JSON.stringify(pricing));
    data.append("accountDetails", JSON.stringify(accountDetails));
    Post(COMPANY.createProfile, data, authToken, null, "multipart")
      .then((response) => {
        if (response.status) {
          dispatch(addProfileDetails({ details: response?.data }));
          form.resetFields();
          setIdCardFrontObject(null);
          setIdCardBackObject(null);
          setLicenseObject(null);
          setGallery([]);
          setSelfieObject(null);
          setSelfieUrl("");
          setIdCardBackUrl("");
          setIdCardFrontUrl("");
          setLicenseUrl("");
          setSelfieUrl("");
          swal("System Alert", "Profile Created Successfully", "success");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err, "err");
        const message = err?.response?.data?.message;
        if (message) {
          swal("Oops", message, "error");
        }
      });
  };
  const { TextArea } = Input;

  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  const [loading, setLoading] = useState(false);

  const [selfieUrl, setSelfieUrl] = useState("");
  const [selfieObject, setSelfieObject] = useState(null);

  const [idCardFrontUrl, setIdCardFrontUrl] = useState("");
  const [idCardFrontObject, setIdCardFrontObject] = useState(null);

  const [idCardBackUrl, setIdCardBackUrl] = useState("");
  const [idCardBackObject, setIdCardBackObject] = useState(null);

  const [licenseUrl, setLicenseUrl] = useState("");
  const [licenseObject, setLicenseObject] = useState(null);

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
    setGallery(e.fileList);
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
        Upload Image (Recommended PNG, JPG upto 2MB)
      </div>
    </button>
  );

  return (
    <div className="shop-page">
      <Row style={{ width: "100%", justifyContent: "center" }}>
        <Col xs={23} md={24}>
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <Col lg={24}>
              <div className="arrow-box">
                <FaArrowLeftLong
                  className="arrow"
                  onClick={() => navigate(-1)}
                />
                <h3 className="main-heading">
                  Create Drop Zone Company Profile
                </h3>
              </div>
            </Col>
          </Row>
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <Col lg={24}>
              <Row justify="center">
                <Col xl={24} lg={20}>
                  <div className="details-card my-4">
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
                      <Row style={{ width: "100%" }} gutter={[16, 16]}>
                        <Col lg={12} md={12} xs={24}>
                          <Row style={{ width: "100%" }} gutter={[16, 16]}>
                            <Col lg={24} md={24} xs={24}>
                              <Form.Item
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                              >
                                <Upload
                                  action="/upload.do"
                                  listType="picture-card"
                                  onChange={multipleChange}
                                >
                                  <button
                                    style={{
                                      border: 0,
                                      background: "none",
                                    }}
                                    type="button"
                                  >
                                    <PlusOutlined />
                                    <div
                                      style={{
                                        marginTop: 8,
                                      }}
                                    >
                                      Upload Gallery Images
                                    </div>
                                  </button>
                                </Upload>
                              </Form.Item>
                            </Col>
                            <Col lg={24} md={24} xs={24}>
                              <h3>Enter Location</h3>
                              <Form.Item
                                label="Address"
                                name="address"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your Address!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Address"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Street"
                                name="street"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your Street!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Street"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Apartment"
                                name="apartment"
                                rules={[
                                  {
                                    message: "Please enter your Apartment!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Apartment #, Suite, etc. (Optional)"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="City"
                                name="city"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your City!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Select City"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="State"
                                name="state"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your State!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Select State"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Zip Code"
                                name="zipCode"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your Zip Code!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Zip Code"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Country"
                                name="country"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your Country!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Select Country"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={24} md={24} xs={24}>
                              <Form.Item
                                label="Enter a Brief Video title for DZ Briefing"
                                name="briefTitle"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Enter a Brief Video title for DZ Briefing",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter a Brief Video title for DZ Briefing"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={24} md={24} xs={24}>
                              <Form.Item
                                label="Enter a YT Video URL for DZ Briefing"
                                name="briefUrl"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Enter a YT Video URL for DZ Briefing!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter a YT Video URL for DZ Briefing!"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={24} md={24} xs={24}>
                              <Form.Item
                                label="Enter DZ Briefing Description"
                                name="briefDescription"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your Description!",
                                  },
                                ]}
                              >
                                <TextArea
                                  rows={10}
                                  placeholder="Write your Description.."
                                  maxLength={14}
                                  className="web-textarea"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={8} md={24} xs={24}>
                              <Form.Item
                                label="Tandem Jump Price"
                                name="tandem"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter price",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Please enter price"
                                  className="web-input"  
                                  inputMode="numeric"
                                  type="number"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={8} md={24} xs={24}>
                              <Form.Item
                                label="Solo Jump Price"
                                name="solo"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter price",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Please enter price"
                                  className="web-input"
                                  inputMode="numeric"
                                  type="number"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={8} md={24} xs={24}>
                              <Form.Item
                                label="AFF Jump Price"
                                name="aff"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter price",
                                  },
                                ]}
                              >
                                 <Input
                                  size="large"
                                  placeholder="Please enter price"
                                  className="web-input"
                                  inputMode="numeric"
                                  type="number"
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                        <Col lg={12} md={12} xs={24}>
                          <Row style={{ width: "100%" }} gutter={[16, 16]}>
                            <Col lg={24} md={24} xs={24}>
                              <Form.Item
                                label="Drop Zone Company Title"
                                name="title"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please enter your Drop Zone Company Title!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Drop Zone Company Title Here"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={24} md={24} xs={24}>
                              <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your Description!",
                                  },
                                ]}
                              >
                                <TextArea
                                  rows={4}
                                  placeholder="Bring the whole family to this great place with lots of room for fun."
                                  maxLength={6}
                                  className="web-textarea"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={24} md={24} xs={24}>
                              <Form.Item
                                label="Upload Your Selfie"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[
                                  {
                                    required: true,
                                  },
                                ]}
                              >
                                <>
                                  <Upload
                                    name="selfie"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    beforeUpload={beforeUpload}
                                    onChange={(e) => {
                                      handleChange(e, "selfie");
                                    }}
                                  >
                                    {selfieUrl ? (
                                      <img
                                        src={selfieUrl}
                                        alt="avatar"
                                        style={{
                                          maxWidth: "100%",
                                          maxHeight:'280px'
                                        }}
                                      />
                                    ) : (
                                      uploadButton
                                    )}
                                  </Upload>
                                </>
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Upload ID Card Pictures (front)"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[
                                  {
                                    required: true,
                                  },
                                ]}
                              >
                                <>
                                  <Upload
                                    name="idCardFront"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    beforeUpload={beforeUpload}
                                    onChange={(e) => {
                                      handleChange(e, "idCardFront");
                                    }}
                                  >
                                    {idCardFrontUrl ? (
                                      <img
                                        src={idCardFrontUrl}
                                        alt="avatar"
                                        style={{
                                          maxWidth: "100%",
                                          maxHeight:'280px'
                                        }}
                                      />
                                    ) : (
                                      uploadButton
                                    )}
                                  </Upload>
                                </>
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Upload ID Card Pictures (backsides)"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[
                                  {
                                    required: true,
                                  },
                                ]}
                              >
                                <>
                                  <Upload
                                    name="idCardBack"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    beforeUpload={beforeUpload}
                                    onChange={(e) => {
                                      handleChange(e, "idCardBack");
                                    }}
                                  >
                                    {idCardBackUrl ? (
                                      <img
                                        src={idCardBackUrl}
                                        alt="avatar"
                                        style={{
                                          maxWidth: "100%",
                                          maxHeight:'280px'
                                        }}
                                      />
                                    ) : (
                                      uploadButton
                                    )}
                                  </Upload>
                                </>
                              </Form.Item>
                            </Col>
                            <Col lg={24} md={24} xs={24}>
                              <Form.Item
                                label="Upload License/ Certification Image(s)"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[
                                  {
                                    required: true,
                                  },
                                ]}
                              >
                                <>
                                  <Upload
                                    name="license"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    beforeUpload={beforeUpload}
                                    onChange={(e) => {
                                      handleChange(e, "license");
                                    }}
                                  >
                                    {licenseUrl ? (
                                      <img
                                        src={licenseUrl}
                                        alt="avatar"
                                        style={{
                                          maxWidth: "100%",
                                          maxHeight:'280px'
                                        }}
                                      />
                                    ) : (
                                      uploadButton
                                    )}
                                  </Upload>
                                </>
                              </Form.Item>
                            </Col>
                            <Col lg={24} md={24} xs={24}>
                              <Form.Item
                                label="Set Business Hours"
                                name="timings"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please enter your Set Business Hours!",
                                  },
                                ]}
                              >
                                <TimePicker.RangePicker className="web-input" />
                                <TimePicker.RangePicker className="web-input" />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                      </Row>

                      <Row style={{ width: "100%" }} gutter={[16, 16]}>
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
                          <h2 className="booking-card-price">
                            Bank Account Details
                          </h2>
                          <Row style={{ width: "100%" }} gutter={[16, 16]}>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Beneficiary Name"
                                name="accountName"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter Beneficiary Name!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Beneficiary Name"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Remittance Country"
                                name="accountCountry"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please enter Remittance Country*!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Country"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Account Currency"
                                name="accountCurrency"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter Account Currency!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="$"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="IBAN"
                                name="iban"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter IBAN!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter IBAN"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Account Number"
                                name="accNumber"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter Account Number!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Account Number"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Bank Name"
                                name="bankName"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter Bank Name!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Bank Name"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="SWIFT Code/Routing Number"
                                name="swift"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please enter SWIFT Code/Routing Number*!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Swift Code/Routing Number"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Branch Name"
                                name="branchName"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter Branch Name*!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Branch Name"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="City"
                                name="accountCity"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter City!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter City"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Bank Address"
                                name="bankAddress"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter Bank Address!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Bank Address"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={24} md={24} xs={24}>
                              <div className="">
                                <Button
                                  type="submit"
                                  htmlType="submit"
                                  className={
                                    !selfieObject ||
                                    !idCardFrontObject ||
                                    !idCardBackObject ||
                                    !licenseObject ||
                                    !gallery.length > 0
                                      ? "web-btn3"
                                      : "web-btn"
                                  }
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                  disabled={
                                    !selfieObject ||
                                    !idCardFrontObject ||
                                    !idCardBackObject ||
                                    !licenseObject ||
                                    !gallery.length > 0
                                  }
                                >
                                  Create Company Profile
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Form>
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
