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
  Image
} from "antd";
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { ADMIN, COMPANY, UPLOADS_URL } from "../../config/constants/api";
import DashbordSidebar from "../../components/DashboardSidebar";
import { Get } from "../../config/api/get";
import { Put } from "../../config/api/put";
import { FaArrowLeftLong } from "react-icons/fa6";
import avatar from "../../assets/avatar.png";
import swal from "sweetalert";
import { userManagementDate } from "../../components/Data/data";
import { BsArrowUpRightCircleFill } from "react-icons/bs";


const CreateEvent = () => {
    const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-xxx',
        percent: 50,
        name: 'image.png',
        status: 'uploading',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      },
    ]);
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
            background: 'none',
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
  // const getUserDetails = () => {
  //   setLoading(true);
  //   Get(`${ADMIN.getUser}${id}`, token)
  //     .then((response) => {
  //       setUser(response?.data?.user);
  //       setProfile(response?.data?.profile);
  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching user details", err);
  //       setLoading(false);
  //     });
  // };
  // useEffect(() => {
  //   getUserDetails();
  // }, []);
  const banUser = (id, status) => {
    Put(`${ADMIN.toggleUser}${id}`, token, { status })
      .then((response) => {
        if (response.status) {
          swal("System Alert!", response?.message, "success");
          setIsBanned(!isBanned);
        }
      })
      .catch((err) => {
        let message = err?.response?.data?.message;
        console.log(":::;", err);
        if (message) swal("Oops!", message, "error");
      });
  };
  const onChange = (date, dateString) => {
    console.log(date, dateString);
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
                                    >
                                      <Row
                                        style={{ width: "100%" }}
                                        gutter={[16, 16]}
                                      >
                                        <Col xs={24}>
                                          <Form.Item
                                            label="Event Title"
                                            name="eventTitle"
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
                                        <Form.Item label="Description" name="description"
                                            required={true}>
                                            <TextArea rows={4} placeholder="Description"
                                              className="web-input"
                                              required={true} />
                                            </Form.Item>
                                        </Col>
                                        <Col lg={12} md={12} xs={24}>
                                          <Form.Item label="Date" name="Date"
                                            required={true}>
                                           
                                            <DatePicker onChange={onChange}
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
                                            <TimePicker onChange={onChange} className="web-input" defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
                                          </Form.Item>
                                        </Col>
                                        
                                        <Col xs={24}>
                                        <>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: 'none',
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
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
                                            label="Facility"
                                            name="facility"
                                            required={true}
                                          >
                                           <Select
      defaultValue="Facility"
      onChange={handleChange}
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
      ]}
    />
                                          </Form.Item>
                                        </Col>
                                        <Col lg={12} md={12} xs={24}>
                                          <Form.Item label="Venue Details" name="venueDetails" required={true}>
                                            <Input
                                              size="large"
                                              className="AuthFormInput"
                                              placeholder="Enter Venue Details"
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col lg={12} md={12} xs={24}>
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
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
        {
          value: 'disabled',
          label: 'Disabled',
          disabled: true,
        },
      ]}
    />
                                          </Form.Item>
                                        </Col>
                                        
                                        <div
                                          style={{ textAlign: "center", justifyContent:"center", width:"100%", display:"flex" }}
                                        >
                                          <Button
                                            type=""
                                            htmlType="submit"
                                            className="btn web-btn px-5"
                                          >
                                            CREATE EVENT <BsArrowUpRightCircleFill />
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
