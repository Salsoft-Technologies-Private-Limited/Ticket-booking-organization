import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Avatar,
  Card,
  Spin,
  Button,
  Input,
  Form,
  Select,
  DatePicker,
  Upload,
  message,
  TextArea,
  TimePicker,
  Checkbox,
  Image,
} from "antd";
import dayjs from "dayjs";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  ADMIN,
  ARTIST,
  COMPANY,
  EVENT,
  UPLOADS_URL,
} from "../../config/constants/api";
import DashbordSidebar from "../../components/DashboardSidebar";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { FaArrowLeftLong } from "react-icons/fa6";
import avatar from "../../assets/avatar.png";
import swal from "sweetalert";
import { userManagementDate } from "../../components/Data/data";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import moment from "moment";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const normFile = (e) => {
  if (Array.isArray(e)) {
    console.log(e);
    return e;
  }
  return e?.fileList;
};

const CreateEvent = () => {
  const [form] = Form.useForm();
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [checkedArray, setCheckedArray] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [artists, setArtists] = useState(null);
  const [fileList, setFileList] = useState([]);
  const handleLocChange = (newAddress) => {
    setAddress(newAddress);
  };
  const handleSelect = (newAddress) => {
    setAddress(newAddress);
    geocodeByAddress(newAddress)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        setLongitude(latLng?.lng);
        setLatitude(latLng?.lat);
      })
      .catch((error) => console.error("Error", error));
  };
  const getOrganizationArtists = () => {
    Get(ARTIST.getOrganizationArtists, token)
      .then((response) => {
        if (response?.status) {
          setArtists(response?.data?.docs);
        }
      })
      .catch((err) => {
        console.log("Error Fetching Artists", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getOrganizationArtists();
  }, []);
  const handleUploadChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  const onArtistsChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setCheckedArray(checkedValues);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
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
        Upload
      </div>
    </button>
  );
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [userManagement, setUserManagement] = useState(
    userManagementDate.find((item) => item.id == id)
  );
  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const onFinish = (values) => {
    if (longitude === "" || latitude === "") {
      swal("Error!", "Location is Required", "error");
    }
    let data = new FormData();
    const location = {
      coordinates: [longitude , latitude ],
      address: address,
    };
    data.append("title", values?.title);
    data.append("description", values?.description);
    data.append("type", values?.type);
    data.append("date", moment(values?.date?.$d).format("YYYY-MM-DD"));
    data.append("time", values?.time);
    data.append("location", JSON.stringify(location));
    data.append("price", values?.price);
    data.append("facilities", values?.facilities);
    data.append("venueDetails", values?.venueDetails);
    // checkedArray.forEach((val) => {
    //   const foundArtist = artists.find((artist) => {
    //     return artist.fullName === val;
    //   });
    //   if (foundArtist) {
    //     data.append("artists", {id : foundArtist._id});
    //   }
    // });
    const selectedArtists = checkedArray
      .map((val) => {
        const foundArtist = artists.find((artist) => {
          return artist.fullName === val;
        });
        if (foundArtist) {
          return { id: foundArtist._id };
        }
        return null;
      })
      .filter((artist) => artist !== null);
    data.append("artists", JSON.stringify(selectedArtists));
    if (fileList.length > 1) {
      const fileListToAppend = fileList.slice(1).map((file) => {
        return file.originFileObj;
      });
      fileListToAppend.forEach((val) => {
        data.append("gallery", val);
      });
    }
    if (fileList[0]) {
      data.append("image", fileList[0].originFileObj);
    }
    Post(EVENT.addEvent, data, token, null, "multipart")
      .then((response) => {
        if (response?.status) {
          form.resetFields();
          swal("System Alert!", response?.message, "success");
          navigate("/eventManagement");
        }
      })
      .catch((err) => {
        console.log(err);
        const message = err?.response?.data?.message;
        if (message) {
          swal("Error!", message, "error");
        }
      });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { TextArea } = Input;
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
                    {!loading ? (
                      <div className="about-us-section">
                        <Row align={"middle"} style={{ marginBottom: "15px" }}>
                          <Col lg={24}>
                            <div class="arrow-box2">
                              <div>
                                <FaArrowLeftLong
                                  className="arrow"
                                  onClick={() => navigate(-1)}
                                />
                              </div>
                              <h3 className="main-heading">Create Event</h3>
                            </div>
                          </Col>
                        </Row>

                        <div className="bg-parent">
                          <Row gutter={[16, 16]} align={""} justify={"center"}>
                            <Col md={14} lg={12} xl={16}>
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
                                        <Col xs={24}>
                                          <Form.Item
                                            label="Event Title"
                                            name="title"
                                            required={true}
                                          >
                                            <Input
                                              size="large"
                                              placeholder="Enter Event Title"
                                              className="web-input"
                                              required={true}
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col xs={24}>
                                          <Form.Item
                                            label="Description"
                                            name="description"
                                            required={true}
                                          >
                                            <TextArea
                                              rows={4}
                                              placeholder="Description"
                                              className="web-input"
                                              required={true}
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col xs={24}>
                                          <p
                                            style={{
                                              marginLeft: "10px",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            Location*
                                          </p>

                                          <PlacesAutocomplete
                                            value={address}
                                            onChange={handleLocChange}
                                            onSelect={handleSelect}
                                          >
                                            {({
                                              getInputProps,
                                              suggestions,
                                              getSuggestionItemProps,
                                              loading,
                                            }) => {
                                              return (
                                                <div className="location-drop">
                                                  <input
                                                    {...getInputProps({
                                                      placeholder:
                                                        "Search location here...",
                                                      className:
                                                        "location-search-input",
                                                      style: {
                                                        position: "relative",
                                                        width: "100%",
                                                        marginBottom: "10px",
                                                        height: "52px",
                                                        borderRadius: "6px",
                                                        border:
                                                          "1px solid #E3E3E3",
                                                        backgroundColor:
                                                          "#F8F8F8",
                                                        padding:
                                                          "10px 50px 10px 10px",
                                                      },
                                                    })}
                                                  />
                                                  <div className="autocomplete-dropdown-container">
                                                    {loading && (
                                                      <div>Loading...</div>
                                                    )}
                                                    {suggestions.map(
                                                      (suggestion) => {
                                                        const className =
                                                          suggestion.active
                                                            ? "suggestion-item--active googleSuggestion"
                                                            : "suggestion-item googleSuggestion";
                                                        const style =
                                                          suggestion.active
                                                            ? {
                                                                backgroundColor:
                                                                  "#fafafa",
                                                                cursor:
                                                                  "pointer",
                                                                padding:
                                                                  "5px 10px",
                                                              }
                                                            : {
                                                                backgroundColor:
                                                                  "#ffffff",
                                                                cursor:
                                                                  "pointer",
                                                                padding:
                                                                  "5px 10px",
                                                              };
                                                        return (
                                                          <div
                                                            {...getSuggestionItemProps(
                                                              suggestion,
                                                              {
                                                                className,
                                                                style,
                                                              }
                                                            )}
                                                          >
                                                            <span>
                                                              {
                                                                suggestion.description
                                                              }
                                                            </span>
                                                          </div>
                                                        );
                                                      }
                                                    )}
                                                  </div>
                                                </div>
                                              );
                                            }}
                                          </PlacesAutocomplete>
                                        </Col>
                                        <Col lg={12} md={12} xs={24}>
                                          <Form.Item
                                            label="Date"
                                            name="date"
                                            required={true}
                                          >
                                            <DatePicker
                                              onChange={onChange}
                                              size="large"
                                              className="web-input"
                                              required={true}
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col lg={12} md={12} xs={24}>
                                          <Form.Item
                                            label="Time"
                                            name="time"
                                            required={true}
                                          >
                                            <TimePicker
                                              onChange={onChange}
                                              className="web-input"
                                              defaultOpenValue={dayjs(
                                                "00:00:00",
                                                "HH:mm:ss"
                                              )}
                                            />
                                          </Form.Item>
                                        </Col>

                                        <Col xs={24}>
                                          <>
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
                                                {fileList.length >= 8
                                                  ? null
                                                  : uploadButton}
                                              </Upload>
                                            </Form.Item>
                                            {previewImage && (
                                              <Image
                                                wrapperStyle={{
                                                  display: "none",
                                                }}
                                                preview={{
                                                  visible: previewOpen,
                                                  onVisibleChange: (visible) =>
                                                    setPreviewOpen(visible),
                                                  afterOpenChange: (visible) =>
                                                    !visible &&
                                                    setPreviewImage(""),
                                                }}
                                                src={previewImage}
                                              />
                                            )}
                                          </>
                                        </Col>
                                        <Col lg={12} md={12} xs={24}>
                                          <Form.Item
                                            label="Price"
                                            required={true}
                                            name="price"
                                          >
                                            <Input
                                              size="large"
                                              className="web-input"
                                              required={true}
                                              type="number"
                                              placeholder="Enter Price"
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col lg={12} md={12} xs={24}>
                                          <Form.Item
                                            label="Facilities"
                                            name="facilities"
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Please input facilities",
                                              },
                                            ]}
                                          >
                                            <Select
                                              mode="tags"
                                              style={{
                                                width: "100%",
                                              }}
                                              placeholder="Write here"
                                              className="tag-input"
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col lg={12} md={12} xs={24}>
                                          <Form.Item
                                            label="Venue Details"
                                            name="venueDetails"
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Please input venue Details",
                                              },
                                            ]}
                                          >
                                            <Select
                                              mode="tags"
                                              style={{
                                                width: "100%",
                                              }}
                                              placeholder="Write here"
                                              className="tag-input"
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col lg={12} md={12} xs={24}>
                                          <Form.Item
                                            label="Type"
                                            name="type"
                                            required={true}
                                          >
                                            <Select
                                              defaultValue="Type"
                                              // onChange={handleChange}
                                              options={[
                                                {
                                                  value: "Playground",
                                                  label: "Playground",
                                                },
                                                {
                                                  value: "Attractions",
                                                  label: "Attractions",
                                                },
                                                {
                                                  value: "Entertainment",
                                                  label: "Entertainment",
                                                },
                                              ]}
                                            />
                                          </Form.Item>
                                        </Col>
                                        {/* <Col lg={12} md={12} xs={24}>
                                          <Form.Item
                                            label="Artist"
                                            name="artist"
                                            required={true}
                                          >
                                            <Select
                                              defaultValue="Artist"
                                              onChange={handleChange}
                                              options={[
                                                {
                                                  value: "jack",
                                                  label: "Jack",
                                                },
                                                {
                                                  value: "lucy",
                                                  label: "Lucy",
                                                },
                                                {
                                                  value: "Yiminghe",
                                                  label: "yiminghe",
                                                },
                                                {
                                                  value: "disabled",
                                                  label: "Disabled",
                                                  disabled: true,
                                                },
                                              ]}
                                            />
                                          </Form.Item>
                                        </Col> */}
                                        <Col lg={24}>
                                          <h5 className="heading-18">
                                            SELECT ARTISTS
                                          </h5>
                                          {Array.isArray(artists) && (
                                            <div className="offer-tabs">
                                              <Checkbox.Group
                                                options={
                                                  Array.isArray(artists) &&
                                                  artists.map((option) => ({
                                                    label: (
                                                      <div
                                                        style={{
                                                          display: "flex",
                                                          flexDirection:
                                                            "column",
                                                        }}
                                                        className="check-icon"
                                                      >
                                                        {option?.fullName}
                                                      </div>
                                                    ),
                                                    value: option?.fullName,
                                                    style: {
                                                      backgroundColor:
                                                        checkedArray.includes(
                                                          option?.fullName
                                                        )
                                                          ? "#0f75bd"
                                                          : "",
                                                    },
                                                  }))
                                                }
                                                onChange={onArtistsChange}
                                              />
                                            </div>
                                          )}
                                        </Col>
                                        <div
                                          style={{
                                            textAlign: "center",
                                            justifyContent: "center",
                                            width: "100%",
                                            display: "flex",
                                          }}
                                        >
                                          <Button
                                            type=""
                                            htmlType="submit"
                                            className="btn web-btn px-5"
                                          >
                                            CREATE EVENT{" "}
                                            <BsArrowUpRightCircleFill />
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
                    ) : (
                      <div>
                        <Spin style={{ margin: "250px 600px" }} />
                      </div>
                    )}
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

export default CreateEvent;
