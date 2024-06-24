import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  Upload,
  message,
} from "antd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import DashbordSidebar from "../../../components/DashboardSidebar";
import "react-phone-number-input/style.css";
import swal from "sweetalert";
import { PROFILE, UPLOADS_URL } from "../../../config/constants/api";
import { Put } from "../../../config/api/put";
import moment from "moment";
import { addProfileDetails } from "../../../redux/slice/authSlice";
import { FaCamera } from "react-icons/fa";
import dayjs from "dayjs";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isImage = file.type.startsWith("image/");
  if (!isImage) {
    message.error("Invalid Uplaod, You can only upload image files!");
  }
  return isImage;
};
const DropzoneFiltercards = () => {
  const [loading, setLoading] = useState(false);
  const [imageObject, setImageObject] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [form] = Form.useForm();
  const token = useSelector((state) => state.user.userToken);
  const profileDetails = useSelector((state) => state.user.profileDetails);
  useEffect(() => {
    form.setFieldsValue({
      FullName: profileDetails?.fullName,
      email: profileDetails?.email,
      Gender: profileDetails?.gender,
      Country: profileDetails.location?.country,
      City: profileDetails.location?.city,
      State: profileDetails.location?.state,
      Street: profileDetails.location?.street,
      DOB: dayjs(profileDetails.dateOfBirth),
    });
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!profileDetails) {
      navigate("/createProfile");
    }
  }, []);
  const navigate = useNavigate();
  const onFinish = (values) => {
    const { Country, City, State, Street, FullName, Gender, Phone, DOB } =
      values;
    const formValuesChanged = () => {
      return (
        profileDetails?.fullName !== FullName ||
        profileDetails?.location?.street !== Street ||
        profileDetails?.location?.country !== Country ||
        profileDetails?.location?.city !== City ||
        profileDetails?.location?.state !== State ||
        profileDetails?.gender !== Gender ||
        !dayjs(profileDetails?.dateOfBirth).isSame(DOB) ||
        profileDetails?.phone !== Phone ||
        imageObject
      );
    };
    if (formValuesChanged()) {
      let data = new FormData();
      if (imageObject) {
        data.append("image", imageObject);
      }
      if (FullName) {
        data.append("fullName", FullName);
      }
      if (DOB) {
        data.append("dateOfBirth", moment(DOB?.$d).format("YYYY-MM-DD"));
      }
      if (Phone) {
        data.append("mobile", Phone);
      }
      if (Gender) {
        data.append("gender", Gender);
      }
      data.append(
        "location",
        JSON.stringify({
          country: Country ? Country : profileDetails?.location?.country,
          city: City ? City : profileDetails?.location?.city,
          state: State ? State : profileDetails?.location?.state,
          street: Street ? Street : profileDetails?.location?.street,
        })
      );
      Put(PROFILE.updateMyProfile, token, data, {}, "multipart")
        .then((response) => {
          if (response.status) {
            console.log(response)
            form.resetFields();
            swal("Success", "Profile Updated Successfully", "success");
            dispatch(
              addProfileDetails({
                details: {
                  fullName: FullName ? FullName : profileDetails.fullName,
                  gender: Gender ? Gender : profileDetails.gender,
                  dateOfBirth: DOB
                    ? moment(DOB?.$d).format("YYYY-MM-DD")
                    : profileDetails.dateOfBirth,
                  phone: Phone ? Phone : profileDetails.phone,
                  location: {
                    country: Country
                      ? Country
                      : profileDetails?.location?.country,
                    city: City ? City : profileDetails?.location?.city,
                    state: State ? State : profileDetails?.location?.state,
                    street: Street ? Street : profileDetails?.location?.street,
                  },
                  image: response?.data?.image
                    ? response?.data?.image
                    : profileDetails?.image,
                  email: profileDetails.email,
                },
              })
            );
            navigate("/Profile");
          }
        })
        .catch((err) => {
          console.log("Error", err);
          swal("Error", err?.response?.data?.message, "error");
        });
    } else {
      swal("System Alert", "No Changes Detected", "error");
      return;
    }
  };
  const handleChangepro = (info) => {
    setLoading(true);
    getBase64(
      info?.fileList[info?.fileList?.length - 1]?.originFileObj,
      (url) => {
        setImageObject(
          info?.fileList[info?.fileList?.length - 1]?.originFileObj
        );
        setLoading(false);
        setImageUrl(url);
      }
    );
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
              <Col xs={24} md={24} lg={24} xl={24}>
                <div className="my-account-profile">
                  <section className="side-menu-parent">
                    <DashbordSidebar />
                    <div className="about-us-section">
                      <div className="profile-information-wrapper">
                        <h3 className="main-heading">Edit Profile</h3>
                      </div>
                      <div className="bg-parent">
                        <Row
                          gutter={[16, 16]}
                          align={""}
                          justify={"space-between"}
                        >
                          <Col md={10} lg={10} xl={8}>
                            <div className="wrapper-group-1000001858">
                              <>
                                <Upload
                                  name="image"
                                  showUploadList={false}
                                  style={{ position: "relative" }}
                                  onChange={handleChangepro}
                                  beforeUpload={beforeUpload}
                                >
                                  {" "}
                                  <div
                                    style={{
                                      height: "300px",
                                      border: "1px solid gray",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      cursor: "pointer",
                                    }}
                                  >
                                    {imageUrl ? (
                                      <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                          width: "100%",
                                          maxHeight: "300px",
                                        }}
                                      />
                                    ) : (
                                      <img
                                        src={
                                          UPLOADS_URL + profileDetails?.image
                                        }
                                        alt="avatar"
                                        style={{
                                          width: "100%",
                                          maxHeight: "300px",
                                          objectFit: "cover",
                                          objectPosition: "center",
                                          filter: "blur(1px)",
                                        }}
                                      />
                                    )}
                                    <FaCamera
                                      style={{
                                        position: "absolute",
                                        color: "rgb(0,127,202)",
                                        fontSize: "25px",
                                      }}
                                    />
                                  </div>{" "}
                                </Upload>

                                {/* <div>
                                  <div>
                                    <input
                                      id="media"
                                      type="file"
                                      accept="image/*"
                                      style={{ display: "none" }}
                                      onChange={handleImageChange}
                                    />
                                  </div>
                                  <div style={{ marginTop: "1rem" }}>
                                    {imageObject ? (
                                      <div>
                                        <img
                                          src={URL.createObjectURL(imageObject)}
                                          alt="Preview"
                                          style={{
                                            maxWidth: "100%",
                                            maxHeight: "200px",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                          }}
                                        />
                                        <button onClick={handleRemoveImage}>
                                          Remove Image
                                        </button>
                                      </div>
                                    ) : (
                                      <div
                                        style={{
                                          textAlign: "center",
                                          // border: "2px solid black",
                                          height: "350px",
                                          cursor: "pointer",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                        onClick={() =>
                                          document
                                            .getElementById("media")
                                            .click()
                                        }
                                      >
                                        <img
                                          src={
                                            UPLOADS_URL + profileDetails?.image
                                          }
                                          alt="avatar"
                                          style={{
                                            maxHeight: "360px",
                                            filter: "blur(1px)",
                                            objectFit: "cover",
                                            objectPosition: "center",
                                          }}
                                        />
                                        <FaCamera
                                          style={{
                                            position: "absolute",
                                            color: "rgb(0,127,202)",
                                            fontSize: "25px",
                                          }}
                                        />
                                      </div>
                                    )}
                                  </div>
                                </div>  */}
                              </>
                            </div>
                          </Col>

                          <Col md={14} lg={14} xl={16}>
                            <div className="">
                              <div className="logo-rectangle">
                                <div className="edit-profile-info">
                                  <Form
                                    className="row g-3"
                                    name="basic"
                                    layout="vertical"
                                    initialValues={{
                                      remember: true,
                                    }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    form={form}
                                  >
                                    <Row
                                      style={{ width: "100%" }}
                                      gutter={[16, 16]}
                                    >
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item
                                          label="Full Name"
                                          name="FullName"
                                        >
                                          <Input
                                            size="large"
                                            placeholder={
                                              profileDetails?.fullName
                                            }
                                            className="web-input"
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item label="Email" name="Email">
                                          <Input
                                            size="large"
                                            placeholder={profileDetails?.email}
                                            className="web-input"
                                            disabled
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item
                                          label="Phone Number"
                                          name="Phone"
                                        >
                                          <Input
                                            size="large"
                                            placeholder={profileDetails?.phone}
                                            className="web-input"
                                            type="number"
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item label="Gender" name="Gender">
                                          <Select placeholder="Select">
                                            <Select.Option value="MALE">
                                              Male
                                            </Select.Option>
                                            <Select.Option value="FEMALE">
                                              Female
                                            </Select.Option>
                                            <Select.Option value="OTHERS">
                                              Others
                                            </Select.Option>
                                          </Select>
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item
                                          label="Country"
                                          name="Country"
                                        >
                                          <Input
                                            size="large"
                                            placeholder={
                                              profileDetails?.location?.country
                                            }
                                            className="AuthFormInput"
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item label="City" name="City">
                                          <Input
                                            size="large"
                                            placeholder={
                                              profileDetails?.location?.city
                                            }
                                            className="AuthFormInput"
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item label="State" name="State">
                                          <Input
                                            size="large"
                                            placeholder={
                                              profileDetails?.location?.state
                                            }
                                            className="AuthFormInput"
                                          />
                                        </Form.Item>
                                      </Col>
                                      <Col lg={12} md={12} xs={24}>
                                        <Form.Item label="Street" name="Street">
                                          <Input
                                            size="large"
                                            placeholder={
                                              profileDetails?.location?.street
                                            }
                                            className="AuthFormInput"
                                          />
                                        </Form.Item>
                                      </Col>

                                      {/* <Col lg={24} md={12} xs={24}>
                                        <Form.Item
                                          label="Date Of Birth"
                                          name="DOB"
                                        >
                                          <DatePicker className="web-input" />
                                        </Form.Item>
                                      </Col> */}
                                      <div
                                        className=""
                                        style={{ textAlign: "center" }}
                                      >
                                        <Button
                                          type=""
                                          htmlType="submit"
                                          className="btn web-btn px-5"
                                        >
                                          Update
                                        </Button>
                                      </div>
                                    </Row>
                                  </Form>
                                </div>
                              </div>
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

export default DropzoneFiltercards;
