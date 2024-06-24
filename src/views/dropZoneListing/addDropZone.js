import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Card,
  Typography,
  Input,
  Upload,
  Form,
  message,
  Checkbox,
  DatePicker,
  Button,
  Select,
  AutoComplete,
} from "antd";
import { useNavigate, useParams } from "react-router";
import DashbordSidebar from "../../components/DashboardSidebar";
import { AudioOutlined } from "@ant-design/icons";
import {
  FaArrowLeftLong,
  FaBed,
  FaPersonSwimming,
  FaParachuteBox,
  FaVideo,
} from "react-icons/fa6";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { GiCampingTent, GiBoxUnpacking } from "react-icons/gi";
import { IoRestaurantSharp } from "react-icons/io5";
import { MdCarRental, MdElectricBolt } from "react-icons/md";
import { SlOrganization } from "react-icons/sl";
import { GiHook } from "react-icons/gi";
import { FaSwimmingPool } from "react-icons/fa";
import moment from "moment";
import { Get } from "../../config/api/get";
import { AMENITY, GIGS } from "../../config/constants/api";
import { useSelector } from "react-redux";
import AddressApi from "../../config/api/map";
import { Post } from "../../config/api/post";
import swal from "sweetalert";
import { useDebouncedCallback } from "use-debounce";
import { disabledDate } from "../../config/helpers";

const { TextArea } = Input;
const onChangedate = (date, dateString) => {
  console.log(date, dateString);
};
const handleChangeslect = (value) => {
  console.log(`selected ${value}`);
};
const normFile = (e) => {
  if (Array.isArray(e)) {
    console.log(e);
    return e;
  }
  return e?.fileList;
};

const AddDropZone = () => {
  const [form] = Form.useForm();
  const [options, setOptions] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [query, setQuery] = useState("");
  const [dates, setDates] = useState([null]);
  const [checkedArray, setCheckedArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [address, setAddress] = useState("");

  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const onFinish = (values) => {
    if (
      checkedArray.length < 1 ||
      dates.length < 1 ||
      dates[0] === null ||
      fileList.length < 1 ||
      longitude === "" ||
      latitude === ""
    ) {
      swal("Error!", "Please Provide complete Information", "error");
    } else {
      const location = {
        coordinates: [longitude, latitude],
        address: address,
        type: "Point", 
      };
      let data = new FormData();
      data.append("location", JSON.stringify(location));
      data.append("title", values?.title);
      data.append("details", values?.details);
      data.append("jumpType", values?.jumpType);
      data.append("charges", values?.charges);
      dates.forEach((val) => {
        data.append("availableDates", val);
      });
      checkedArray.forEach((val) => {
        const foundAmenity = amenities.find((amenity) => {
          return amenity.title === val;
        });
        if (foundAmenity) {
          data.append("amenities", foundAmenity._id);
        }
      });
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
      Post(GIGS.createGig, data, token, null, "multipart")
        .then((response) => {
          if (response?.status) {
            form.resetFields();
            swal("System Alert!", response?.message, "success");
            navigate("/dropZoneListing");
          }
        })
        .catch((err) => {
          console.log(err);
          const message = err?.response?.data?.message;
          if (message) {
            swal("Error!", message, "error");
          }
        });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleUploadChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const getJumpAmenities = () => {
    Get(AMENITY.getAmenities, token, { type: "JUMP" })
      .then((response) => {
        setAmenities(response?.data?.docs);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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

  useEffect(() => {
    getJumpAmenities();
  }, []);

  const onAmenityChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
    setCheckedArray(checkedValues);
  };

  const amenityOptions = [
    {
      label: "Bunkhouse with Beds",
      value: "Bunkhouse with Beds",
      image: <FaBed />,
    },
    {
      label: "Designated Camping Area",
      value: "Designated Camping Area",
      image: <GiCampingTent />,
    },
    {
      label: "Equipment Rental/Sales",
      value: "Equipment Rental/Sales",
      image: <MdCarRental />,
    },
    {
      label: "Full-Service Restaurant",
      value: "Full-Service Restaurant",
      image: <IoRestaurantSharp />,
    },
    {
      label: "Load Organizers",
      value: "Load Organizers",
      image: <SlOrganization />,
    },
    {
      label: "Packing Service",
      value: "Packing Service",
      image: <GiBoxUnpacking />,
    },
    {
      label: "Rigging Service",
      value: "Rigging Service",
      image: <GiHook />,
    },
    {
      label: "RV Space w/ Electricity",
      value: "RV Space w/ Electricity",
      image: <MdElectricBolt />,
    },
    {
      label: "Showers Facilities Swimming",
      value: "Showers Facilities Swimming",
      image: <FaPersonSwimming />,
    },
    {
      label: "Pool",
      value: "Pool",
      image: <FaSwimmingPool />,
    },
    {
      label: "Swoop Pond",
      value: "Swoop Pond",
      image: <FaParachuteBox />,
    },
    {
      label: "Team Rooms Videographers",
      value: "Team Rooms Videographers",
      image: <FaVideo />,
    },
  ];

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

  const addMoreDate = () => {
    setDates([...dates, null]);
  };
  const handleChangeDate = (date, index) => {
    const updatedDates = [...dates];
    updatedDates[index] = moment(date?.$d).format("YYYY-MM-DD");
    setDates(updatedDates);
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
                      <div className="bg-parent dashboard-right-card">
                        <Row
                          style={{ width: "100%", justifyContent: "center" }}
                        >
                          <Col lg={24}>
                            <div className="arrow-box">
                              <FaArrowLeftLong
                                className="arrow"
                                onClick={() => navigate(-1)}
                              />
                              <h3 className="heading-28">Add Drop Zone</h3>
                            </div>
                          </Col>
                        </Row>

                        <Row
                          style={{ width: "100%", justifyContent: "center" }}
                        >
                          <Col lg={24}>
                            <Row justify="center">
                              <Col xl={24} lg={20}>
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
                                      <Row
                                        style={{ width: "100%" }}
                                        gutter={[16, 16]}
                                      >
                                        <Col lg={24} md={24} xs={24}>
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
                                        </Col>
                                        <strong style={{marginLeft:'10px'}}>Enter Location</strong>
                                        <AutoComplete
                                          options={options}
                                          style={{
                                            width: "100%",
                                          }}
                                          onSelect={(value, options) => {
                                            onSelect(value, options);
                                          }}
                                          onSearch={(text) => {
                                            handleSearch(text);
                                            setQuery(text);
                                          }}
                                          value={query}
                                          placeholder="Search Location here.."
                                        />
                                        <Col lg={24} md={24} xs={24}>
                                          <Form.Item
                                            label="Enter Charges For Jump"
                                            name="charges"
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Please enter your Jump Charges!",
                                              },
                                            ]}
                                          >
                                            <Input
                                              size="large"
                                              placeholder="$200"
                                              className="web-input"
                                              inputMode="numeric"
                                              type="number"
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    </Col>

                                    <Col lg={12} md={12} xs={24}>
                                      <Row
                                        style={{ width: "100%" }}
                                        gutter={[16, 16]}
                                      >
                                        <Col lg={24} md={24} xs={24}>
                                          <Form.Item
                                            label="Title of the Drop Zone"
                                            name="title"
                                            rules={[
                                              {
                                                required: true,
                                                message: "Please enter Title!",
                                              },
                                            ]}
                                          >
                                            <Input
                                              size="large"
                                              placeholder="Enter Stay Title Here"
                                              className="web-input"
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col lg={24} md={24} xs={24}>
                                          <Form.Item
                                            label="Additional Details"
                                            name="details"
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Please enter your Description!",
                                              },
                                            ]}
                                          >
                                            <TextArea
                                              rows={10}
                                              placeholder="Bring the whole family to this great place with lots of room for fun."
                                              className="web-textarea"
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col lg={24} md={24} xs={24}>
                                          <Form.Item
                                            label="Please choose a Jump type:"
                                            name="jumpType"
                                            rules={[
                                              {
                                                required: true,
                                                message:
                                                  "Please enter Jump Type!",
                                              },
                                            ]}
                                          >
                                            <Select
                                              defaultValue=""
                                              onChange={handleChangeslect}
                                              options={[
                                                {
                                                  value: "",
                                                  label: "Select",
                                                },
                                                {
                                                  value: "TANDEM",
                                                  label: "Tandem Jump",
                                                },
                                                {
                                                  value: "SOLO",
                                                  label: "Solo Jump",
                                                },
                                                {
                                                  value: "AFF",
                                                  label: "Aff Jump",
                                                },
                                              ]}
                                            />
                                          </Form.Item>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                  <Row gutter={[16, 16]}>
                                    <Col lg={24}>
                                      <h5 className="heading-18">
                                        ADD AMENITIES
                                      </h5>
                                      <div className="offer-tabs">
                                        <Checkbox.Group
                                          options={amenityOptions.map(
                                            (option) => ({
                                              label: (
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                  }}
                                                  className="check-icon"
                                                >
                                                  {option.image}
                                                  {option.label}
                                                </div>
                                              ),
                                              value: option.value,
                                              style: {
                                                backgroundColor:
                                                  checkedArray.includes(
                                                    option.value
                                                  )
                                                    ? "#0f75bd"
                                                    : "",
                                              },
                                            })
                                          )}
                                          onChange={onAmenityChange}
                                        />
                                      </div>
                                    </Col>
                                  </Row>
                                  <h3 className="booking-card-name">
                                    Set Your Availability Dates
                                  </h3>
                                  <Row
                                    style={{ width: "100%" }}
                                    gutter={[16, 16]}
                                  >
                                    <Col lg={8} md={12} xs={24}>
                                      {dates.map((date, index) => (
                                        <div key={index}>
                                          <DatePicker
                                            className="web-input"
                                            onChange={(date) =>
                                              handleChangeDate(date, index)
                                            }
                                            disabledDate={disabledDate}
                                          />
                                        </div>
                                      ))}
                                      <Button
                                        className="web-btn2"
                                        type="link"
                                        onClick={addMoreDate}
                                      >
                                        Add More Dates
                                      </Button>
                                    </Col>
                                  </Row>
                                  <div style={{ margin: "20px 0" }}>
                                    <Button
                                      type=""
                                      className="web-btn2"
                                      style={{
                                        marginRight: "10px",
                                      }}
                                      onClick={() => {
                                        navigate("/dropZoneListing");
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      type="submit"
                                      htmlType="submit"
                                      className="web-btn"
                                    >
                                      PUBLISH
                                    </Button>
                                  </div>
                                </Form>
                              </Col>
                            </Row>
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

export default AddDropZone;
