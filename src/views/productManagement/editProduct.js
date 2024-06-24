import React, { useState } from "react";
import { Col, Row, Form, Input, Upload, Button, message } from "antd";
import DashbordSidebar from "../../components/DashboardSidebar";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import AddressApi from "../../config/api/map";
import { useDebouncedCallback } from "use-debounce";
import moment from "moment";
import { Post } from "../../config/api/post";
import { EVENT } from "../../config/constants/api";
import { useSelector } from "react-redux";
import swal from "sweetalert";

const { TextArea } = Input;
dayjs.extend(customParseFormat);
const onChangetime = (time, timeString) => {
  console.log(time, timeString);
};

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const normFile = (e) => {
  if (Array.isArray(e)) {
    console.log(e);
    return e;
  }
  return e?.fileList;
};
const DropzoneFiltercards = () => {
  const token = useSelector((state) => state.user.userToken);
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [address, setAddress] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageObject, setImageObject] = useState(null);

  const onSelect = (value, options) => {
    setQuery(options?.label);
    AddressApi.getLatlngByAddress(value, (res) => {
      setAddress(res?.results[0]?.formatted_address);
      const { lat, lng } = res?.results[0]?.geometry?.location;
      setLongitude(lng);
      setLatitude(lat);
    });
  };
  const handleSearch = useDebouncedCallback((text) => {
    if (text.length > 0) {
      AddressApi.getAddressPrediction(text, (data) => {
        if (Array.isArray(data?.predictions)) {
          const formattedOptions = data.predictions.map((prediction) => ({
            label: prediction.description,
            value: prediction.place_id,
          }));
          setOptions(formattedOptions);
        }
      });
    } else {
      setOptions([]);
    }
  }, 1000);
  const onFinish = (values) => {
    console.log("Success:", values);
    const { title, date, time, description } = values;
    const location = {
      coordinates: [longitude, latitude],
      type: "Point",
      address: address,
    };
    let data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("time", moment(time?.$d).format("HH:mm:ss"));
    data.append("date", moment(date?.$d).format("YYYY-MM-DD"));
    data.append("location", JSON.stringify(location));
    Post(EVENT.addEvent, data, token)
      .then((response) => {
        if (response?.status) {
          form.resetFields();
          swal("System Alert!", response?.message, "success");
          navigate("/upcomingEvents");
        }
      })
      .catch((err) => {
        console.log(err);
        const message = err?.response?.data?.message;
        if (message) {
          swal("Oops", message, "error");
        }
      });
  };

  const handleUploadChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);

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
        Upload
      </div>
    </button>
  );

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const [imageUrl, setImageUrl] = useState();

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

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setImageObject(info?.file?.originFileObj);
        setLoading(false);
        setImageUrl(url);
      });
    }
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
                      <div className="bg-parent">
                        <Row align={"middle"} style={{ marginBottom: "15px" }}>
                          <Col lg={24}>
                            <div className="arrow-box2">
                              <div>
                                <FaArrowLeftLong
                                  className="arrow"
                                  onClick={() => navigate(-1)}
                                />
                              </div>
                              <h3 className="heading-28">Edit Product</h3>
                            </div>
                          </Col>
                        </Row>

                        <Row align="middle" gutter={24}>
                          <Col lg={12} md={24} xs={24}>
                            <Form
                              className="row g-3"
                              name="basic"
                              layout="vertical"
                              initialValues={{
                                remember: true,
                              }}
                              onFinish={onFinish}
                              autoComplete="off"
                              onFinishFailed={onFinishFailed}
                              form={form}
                            >
                              <Form.Item
                                label="Title Of Product"
                                name="title"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Title!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Title of Product"
                                  className="web-input"
                                  defaultValue="Dark Skydiving Goggles"
                                />
                              </Form.Item>

                              <p style={{ margin: "10px", fontWeight: "bold" }}>
                                Upload Image*
                              </p>

                              <Form.Item
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                              >
                                <Upload
                                  name="avatar"
                                  listType="picture-card"
                                  className="avatar-uploader"
                                  showUploadList={false}
                                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                  beforeUpload={beforeUpload}
                                  onChange={handleChange}
                                >
                                  {imageUrl ? (
                                    <img
                                      src={imageUrl}
                                      alt="avatar"
                                      style={{
                                        maxWidth: "350px",
                                      }}
                                    />
                                  ) : (
                                    uploadButton
                                  )}
                                </Upload>
                                <p className="web-p">(Recommended PNG, JPG upto 5MB)</p>
                              </Form.Item>

                              <p style={{ margin: "10px", fontWeight: "bold" }}>
                                Upload Gallery Images*
                              </p>
                              <Form.Item
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                              >
                                <Upload
                                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                  listType="picture-card"
                                  fileList={fileList}
                                  onChange={handleUploadChange}
                                >
                                  {fileList.length >= 8 ? null : uploadButton}
                                </Upload>
                                <p className="web-p">(Recommended PNG, JPG upto 5MB)</p>
                              </Form.Item>

                              <Form.Item
                                label="Price Of Product"
                                name="title"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Title!",
                                  },
                                ]}
                              >
                                <Input
                                  size="large"
                                  placeholder="Enter Price of Product"
                                  className="web-input"
                                  defaultValue="$100"
                                />
                              </Form.Item>
                              <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter Description!",
                                  },
                                ]}
                              >
                                <TextArea
                                  rows={4}
                                  placeholder="Enter Description"
                                  className="web-input"
                                  defaultValue="Enter Description"
                                />
                              </Form.Item>
                              <div
                                className="frame-group"
                                style={{ alignItems: "baseline" }}
                              >
                                <div className="">
                                  <Button
                                    type=""
                                    htmlType="submit"
                                    block
                                    size={"large"}
                                    style={{ marginBottom: "10px" }}
                                    className={
                                      longitude === "" || latitude === ""
                                        ? "web-btn3"
                                        : "web-btn"
                                    }
                                    disabled={
                                      longitude === "" || latitude === ""
                                    }
                                  >
                                    Update
                                  </Button>
                                </div>
                                <div className="">
                                  <Button
                                    type=""
                                    block
                                    size={"large"}
                                    style={{
                                      marginBottom: "10px",
                                      background: "#b91717",
                                      color: "#fff",
                                    }}
                                    className="web-btn hover-white"
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            </Form>
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
