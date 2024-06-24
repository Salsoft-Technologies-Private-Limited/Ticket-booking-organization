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
import { useDispatch, useSelector } from "react-redux";
import { FaCamera } from "react-icons/fa";
// const { Meta } = Card;
import { COMPANY, UPLOADS_URL } from "../../config/constants/api";
import { addProfileDetails } from "../../redux/slice/authSlice";
import { Put } from "../../config/api/put";

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
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
const { TextArea } = Input;

const DropzoneCompany = () => {
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = useState(false);
  const [initialProfileDetails, setInitialProfileDetails] = useState(null);

  const [selfieUrl, setSelfieUrl] = useState("");
  const [selfieObject, setSelfieObject] = useState(null);

  const [idCardFrontUrl, setIdCardFrontUrl] = useState("");
  const [idCardFrontObject, setIdCardFrontObject] = useState(null);

  const [idCardBackUrl, setIdCardBackUrl] = useState("");
  const [idCardBackObject, setIdCardBackObject] = useState(null);

  const [licenseUrl, setLicenseUrl] = useState("");
  const [licenseObject, setLicenseObject] = useState(null);
  const [oldImages, setOldImages] = useState([]);

  const [fileList, setFileList] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const profileDetails = useSelector((state) => state.user.profileDetails);
  const isEqual = (obj1, obj2) => {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  };
  useEffect(() => {
    if (!profileDetails) {
      navigate("/create-dropzone-company");
    }
    setInitialProfileDetails(profileDetails);
    const combinedImages = [
      ...(profileDetails?.image ? [UPLOADS_URL + profileDetails.image] : []),
      ...(profileDetails?.gallery || []).map(
        (filename) => UPLOADS_URL + filename
      ),
    ];

    setFileList(
      combinedImages.map((url) => ({ uid: url, name: url, url: url }))
    );
    setExistingImages(
      combinedImages.map((url) => ({ uid: url, name: url, url: url }))
    );
    form.setFieldsValue({
      address: profileDetails?.location?.address,
      street: profileDetails?.location?.street,
      city: profileDetails?.location?.city,
      state: profileDetails?.location?.state,
      country: profileDetails?.location?.country,
      zipCode: profileDetails?.location?.zipCode,
      apartment: profileDetails?.location?.apartment
        ? profileDetails?.location?.apartment
        : "",
      briefUrl: profileDetails?.briefUrl,
      briefTitle: profileDetails?.briefTitle,
      briefDescription: profileDetails?.briefDescription,
      title: profileDetails?.title,
      description: profileDetails?.description,
      accountName: profileDetails?.accountDetails?.name,
      bankAddress: profileDetails?.accountDetails?.bankAddress,
      branchName: profileDetails?.accountDetails?.branchName,
      iban: profileDetails?.accountDetails?.iban,
      swift: profileDetails?.accountDetails?.swift,
      bankName: profileDetails?.accountDetails?.bankName,
      accNumber: profileDetails?.accountDetails?.accNumber,
      accountCurrency: profileDetails?.accountDetails?.currency,
      accountCity: profileDetails?.accountDetails?.city,
      accountCountry: profileDetails?.accountDetails?.country,
    });
    setSelfieUrl(UPLOADS_URL + profileDetails?.selfie);
    setIdCardFrontUrl(UPLOADS_URL + profileDetails?.idCardFront);
    setIdCardBackUrl(UPLOADS_URL + profileDetails?.idCardBack);
    setLicenseUrl(UPLOADS_URL + profileDetails?.license);
  }, []);
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
    const formValuesChanged = () => {
      if (!initialProfileDetails) {
        return true;
      }
      return (
        values.address !== initialProfileDetails?.location?.address ||
        values.street !== initialProfileDetails?.location?.street ||
        values.city !== initialProfileDetails?.location?.city ||
        values.state !== initialProfileDetails?.location?.state ||
        values.country !== initialProfileDetails?.location?.country ||
        values.zipCode !== initialProfileDetails?.location?.zipCode ||
        values.apartment !==
          (initialProfileDetails?.location?.apartment
            ? initialProfileDetails?.location?.apartment
            : "") ||
        values.briefUrl !== initialProfileDetails?.briefUrl ||
        values.briefTitle !== initialProfileDetails?.briefTitle ||
        values.briefDescription !== initialProfileDetails?.briefDescription ||
        values.title !== initialProfileDetails?.title ||
        values.description !== initialProfileDetails?.description ||
        values.accountName !== initialProfileDetails?.accountDetails?.name ||
        values.bankAddress !==
          initialProfileDetails?.accountDetails?.bankAddress ||
        values.branchName !==
          initialProfileDetails?.accountDetails?.branchName ||
        values.iban !== initialProfileDetails?.accountDetails?.iban ||
        values.swift !== initialProfileDetails?.accountDetails?.swift ||
        values.bankName !== initialProfileDetails?.accountDetails?.bankName ||
        values.accNumber !== initialProfileDetails?.accountDetails?.accNumber ||
        values.accountCurrency !==
          initialProfileDetails?.accountDetails?.currency ||
        values.accountCity !== initialProfileDetails?.accountDetails?.city ||
        values.accountCountry !==
        initialProfileDetails?.accountDetails?.country ||
        selfieObject ||
        idCardFrontObject ||
        idCardFrontObject ||
        licenseObject ||
        oldImages.length > 0 ||
        newImages.length > 0
      );
    };
    if (formValuesChanged()) {
      let data = new FormData();
      if (newImages.length > 0) {
        const galleryToAppend = newImages.map((file, index) => {
          return file.originFileObj;
        });
        galleryToAppend.forEach((val) => {
          data.append("gallery", val);
        });
      }
      if (oldImages.length > 0) {
        const oldImagesToAppend = oldImages.map((file, index) => {
          const parts = file.url.split("/");
          const filename = parts[parts.length - 1];
          return filename;
        });
        oldImagesToAppend.forEach((val, index) => {
          data.append(`oldImages[${index}]`, val);
        });
      }
      data.append("image", fileList[0]?.originFileObj);
      data.append("selfie", selfieObject);
      data.append("license", licenseObject);
      data.append("idCardFront", idCardFrontObject);
      data.append("idCardBack", idCardBackObject);
      data.append("title", values.title);
      data.append("description", values.description);
      data.append("briefUrl", values.briefUrl);
      data.append("briefTitle", values.briefTitle);
      data.append("briefDescription", values.briefDescription);
      data.append("location", JSON.stringify(location));
      data.append("accountDetails", JSON.stringify(accountDetails));
      Put(
        `${COMPANY.updateProfile}${profileDetails?._id}`,
        authToken,
        data,
        null,
        "multipart"
      )
        .then((response) => {
          if (response.status) {
            dispatch(addProfileDetails({ details: response?.data }));
            form.resetFields();
            setIdCardFrontObject(null);
            setIdCardBackObject(null);
            setLicenseObject(null);
            setSelfieObject(null);
            setSelfieUrl("");
            setIdCardBackUrl("");
            setIdCardFrontUrl("");
            setLicenseUrl("");
            setSelfieUrl("");
            setFileList([]);
            setExistingImages([]);
            setNewImages([]);
            swal("System Alert", "Profile Updated Successfully", "success");
            navigate("/dropzone-company-form-view");
          }
        })
        .catch((err) => {
          console.log(err, "err");
          const message = err?.response?.data?.message;
          if (message) {
            swal("Oops", message, "error");
          }
        });
    } else {
      swal("System Alert!", "No changes detected", "error");
      return;
    }
  };
  const { TextArea } = Input;

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

  const multipleChange = ({ fileList: newFileList }) => {
    const existingImageUIDs = existingImages.map((image) => image.uid);
    const newImageUIDs = newFileList.map((file) => file.uid);
    const removedImages = existingImages.filter(
      (image) => !newImageUIDs.includes(image.uid)
    );
    setOldImages([...removedImages]);
    const updatedFileList = newFileList.filter(
      (file) => !existingImageUIDs.includes(file.uid)
    );
    setNewImages(updatedFileList);
    setFileList(newFileList);
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
        <Col xs={24} md={24}>
          <Row style={{ width: "100%", justifyContent: "center" }}>
            <Col lg={24}>
              <div className="arrow-box">
                <FaArrowLeftLong
                  className="arrow"
                  onClick={() => navigate(-1)}
                />
                <h3 className="main-heading">Edit Drop Zone Company Profile</h3>
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
                                  // fileList={fileList.length > 0 ? fileList : allImages?.map(url => ({ uid:  url, name: url, url : url }))}
                                  fileList={fileList}
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
                              <Form.Item label="Address" name="address">
                                <Input
                                  size="large"
                                  placeholder="Enter Address"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item label="Street" name="street">
                                <Input
                                  size="large"
                                  placeholder="Enter Street"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item label="Apartment" name="apartment">
                                <Input
                                  size="large"
                                  placeholder="Apartment #, Suite, etc. (Optional)"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item label="City" name="city">
                                <Input
                                  size="large"
                                  placeholder="Select City"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item label="State" name="state">
                                <Input
                                  size="large"
                                  placeholder="Select State"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item label="Zip Code" name="zipCode">
                                <Input
                                  size="large"
                                  placeholder="Enter Zip Code"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item label="Country" name="country">
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
                                          maxHeight: "280px",
                                          filter: "blur(1px)",
                                        }}
                                      />
                                    ) : (
                                      uploadButton
                                    )}
                                    <FaCamera
                                      style={{
                                        position: "absolute",
                                        color: "rgb(0,127,202)",
                                        fontSize: "25px",
                                      }}
                                    />
                                  </Upload>
                                </>
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Upload ID Card Pictures (front)"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
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
                                          maxHeight: "280px",
                                          filter: "blur(1px)",
                                        }}
                                      />
                                    ) : (
                                      uploadButton
                                    )}
                                    <FaCamera
                                      style={{
                                        position: "absolute",
                                        color: "rgb(0,127,202)",
                                        fontSize: "25px",
                                      }}
                                    />
                                  </Upload>
                                </>
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Upload ID Card Pictures (backsides)"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
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
                                          maxHeight: "280px",
                                          filter: "blur(1px)",
                                        }}
                                      />
                                    ) : (
                                      uploadButton
                                    )}
                                    <FaCamera
                                      style={{
                                        position: "absolute",
                                        color: "rgb(0,127,202)",
                                        fontSize: "25px",
                                      }}
                                    />
                                  </Upload>
                                </>
                              </Form.Item>
                            </Col>
                            <Col lg={24} md={24} xs={24}>
                              <Form.Item
                                label="Upload License/ Certification Image(s)"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
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
                                          maxHeight: "280px",
                                          filter: "blur(1px)",
                                        }}
                                      />
                                    ) : (
                                      uploadButton
                                    )}
                                    <FaCamera
                                      style={{
                                        position: "absolute",
                                        color: "rgb(0,127,202)",
                                        fontSize: "25px",
                                      }}
                                    />
                                  </Upload>
                                </>
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
                          <Row style={{ width: "100%" }} gutter={[16, 16]}>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item
                                label="Beneficiary Name"
                                name="accountName"
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
                              >
                                <Input
                                  size="large"
                                  placeholder="$"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item label="IBAN" name="iban">
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
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Account Number"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item label="Bank Name" name="bankName">
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
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Swift Code/Routing Number"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item label="Branch Name" name="branchName">
                                <Input
                                  size="large"
                                  placeholder="Enter Branch Name"
                                  className="web-input"
                                />
                              </Form.Item>
                            </Col>
                            <Col lg={12} md={12} xs={24}>
                              <Form.Item label="City" name="accountCity">
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
                                  className="web-btn2"
                                  style={{
                                    margin: "10px",
                                  }}
                                  onClick={() =>
                                    navigate("/dropzone-company-form-view")
                                  }
                                >
                                  CANCEL
                                </Button>
                                <Button
                                  type="submit"
                                  htmlType="submit"
                                  className="web-btn"
                                  style={{
                                    margin: "10px",
                                  }}
                                >
                                  UPDATE
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
