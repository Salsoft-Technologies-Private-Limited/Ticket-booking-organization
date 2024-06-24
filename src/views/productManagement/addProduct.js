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
import { EVENT, PRODUCT } from "../../config/constants/api";
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
  const [gallery, setGallery] = useState([]);
  const [imageUrl, setImageUrl] = useState("");



  const multipleChange = (e) => {
    setGallery(e.fileList);
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
  const onFinish = (values) => {
    const { title, description, price } = values;
    let data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("price", price);
    data.append("image", imageObject);
    if (gallery.length > 1) {
      const galleryToAppend = gallery.map((file) => {
        return file.originFileObj;
      });
      galleryToAppend.forEach((val) => {
        data.append("gallery", val);
      });
    }
    Post(PRODUCT.addProduct, data, token, null , 'multipart')
      .then((response) => {
        if (response?.status) {
          form.resetFields();
          swal("System Alert!", response?.message, "success");
          navigate("/productManagement");
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

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("Invalid Uplaod, You can only upload image files!");
    }
    return isImage;
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
                              <h3 className="heading-28">Add Product</h3>
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
                                />
                              </Form.Item>

                              <p style={{ margin: "10px", fontWeight: "bold" }}>
                                Upload Image*
                              </p>

                              <Form.Item
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                
                              >
                                <>
                                  <Upload
                                    name="image"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    beforeUpload={beforeUpload}
                                    onChange={handleChangepro}
                                  >
                                    {imageUrl ? (
                                      <img
                                        src={imageUrl}
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

                              <p style={{ margin: "10px", fontWeight: "bold" }}>
                                Upload Gallery Images*
                              </p>
                              <Form.Item
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                              >
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
                                <p className="web-p">(Recommended PNG, JPG upto 5MB)</p>
                              </Form.Item>

                              <Form.Item
                                label="Price Of Product"
                                name="price"
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
                                      !imageObject 
                                        ? "web-btn3"
                                        : "web-btn"
                                    }
                                    disabled={
                                      !imageObject 
                                    }
                                  >
                                    Publish
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
