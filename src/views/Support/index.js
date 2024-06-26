// import { useEffect, useState } from "react";
// import {
//   Col,
//   Row,
//   Card,
//   Input,
//   Button,
//   Popover,
//   Skeleton,
//   Table,
//   Select,
//   Pagination,
//   DatePicker,
// } from "antd";
// import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";
// import DashbordSidebar from "../../components/DashboardSidebar";
// import { AiOutlineEye } from "react-icons/ai";
// import { FaSearch, FaFilter } from "react-icons/fa";
// import { Get } from "../../config/api/get";
// import { COMPANY, DRIVERS, JUMP } from "../../config/constants/api";
// import { extractDate } from "../../config/helpers";
// import { useDebouncedCallback } from "use-debounce";
// import { driverManagementData } from "../../components/Data/data";
// import moment from "moment";

// const StaysManagement = () => {
//   const token = useSelector((state) => state.user.userToken);
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [drivers, setDrivers] = useState(null);

//   const [paginationConfig, setPaginationConfig] = useState({
//     pageNumber: 1,
//     limit: 10,
//     totalDocs: 0,
//     totalPages: 0,
//   });
//   const [filter, setFilter] = useState({
//     status: null,
//     type: null,
//     keyword: "",
//     from: null,
//     to: null,
//   });
//   const navigate = useNavigate();

//   const getDrivers = (
//     pageNumber,
//     pageSize,
//     status,
//     from,
//     to,
//     keyword
//   ) => {
//     setLoading(true);
//     Get(DRIVERS.getDrivers, token, {
//       status,
//       from,
//       to,
//       keyword,
//       page: pageNumber
//         ? pageNumber.toString()
//         : paginationConfig.pageNumber.toString(),
//       limit: pageSize ? pageSize.toString() : paginationConfig.limit.toString(),
//     })
//       .then((response) => {
//         if (response?.data?.docs) {
//           setDrivers(response?.data?.docs);
//           setPaginationConfig({
//             pageNumber: response?.data?.page,
//             limit: response?.data?.limit,
//             totalDocs: response?.data?.totalDocs,
//             totalPages: response?.data?.totalPages,
//           });
//           setLoading(false);
//         }
//       })
//       .catch((err) => {
//         console.log("Error Fetching Loads", err);
//         setLoading(false);
//       });
//   };
//     useEffect(()=>{
//       getDrivers()
//     },[])

//   const capitalizeFirstLetter = (str) => {
//     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//   };
//   const startIndex =
//     (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
//   const endIndex = Math.min(
//     startIndex + paginationConfig.limit - 1,
//     paginationConfig.totalDocs
//   );
//   const message = drivers
//     ? `Showing records ${endIndex} of ${paginationConfig.totalDocs}`
//     : "Showing records 0 of 0";

//   const handlePageChange = (pageNumber) => {
//     setPaginationConfig({
//       ...paginationConfig,
//       pageNumber: pageNumber,
//     });
//     getDrivers(pageNumber, paginationConfig.limit);
//   };

//   const handleSearch = useDebouncedCallback((value) => {
//     setFilter({
//       ...filter,
//       keyword: value,
//     });
//     getDrivers(
//       paginationConfig.pageNumber,
//       paginationConfig.limit,
//       null,
//       null,
//       null,
//       value
//     );
//   }, 1000);

//   const handleStatusChange = (value) => {
//     setFilter({
//       ...filter,
//       status: value,
//     });
//   };

//   const handleTypeChange = (value) => {
//     setFilter({
//       ...filter,
//       type: value,
//     });
//   };

//   const resetFilter = () => {
//     setFilter({
//       status: null,
//       keyword: "",
//       from: null,
//       to: null,
//     });
//   };

//   const handleOpenChange = (newOpen) => {
//     setOpen(newOpen);
//   };

//   const handleFrom = (date) => {
//     setFilter({
//       ...filter,
//       from: date,
//     });
//   };

//   const handleTo = (date) => {
//     setFilter({
//       ...filter,
//       to: date,
//     });
//   };
//   const data = {
//     status: filter.status,
//     keyword: filter.keyword,
//     from: filter.from,
//     to: filter.to,
//   };
//   const handleApply = () => {
//     let from;
//     let to;
//     let status = data.status;
//     if (data.from) {
//       from = moment(filter?.from?.$d).format("YYYY-MM-DD");
//     }
//     if (data.to) {
//       to = moment(filter?.to?.$d).format("YYYY-MM-DD");
//     }
//     if (from || to || status) {
//       getDrivers(
//         paginationConfig.pageNumber,
//         paginationConfig.limit,
//         status,
//         from,
//         to
//       );
//     } else {
//       return;
//     }
//   };
//   const handleClear = () => {
//     resetFilter();
//     getDrivers();
//   };

//   const itemRender = (_, type, originalElement) => {
//     if (type === "prev") {
//       return <a>Previous</a>;
//     }
//     if (type === "next") {
//       return <a>Next</a>;
//     }
//     return originalElement;
//   };

//   const columns = [
//     {
//       title: "S. No.	",
//       dataIndex: "key",
//       key: "key",
//       width: 100,
//       render: (value, item, index) => (index < 9 && "0") + (index + 1),
//     },
//     {
//       title: "First Name",
//       dataIndex: "firstName",
//       key: "firstName",
//       //   render: (value, item) => item?.dropzoneProfile?.title,
//     },
//     {
//       title: "Last Name",
//       dataIndex: "lastName",
//       key: "lastName",
//       //   render: (value, item) => item.firstName + " " + item.lastName,
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       render: (item) => (
//         <>
//           {item === "PENDING" ? (
//             <span style={{ color: "#DD9F00" }}>{item}</span>
//           ) : item === "BANNED" ? (
//             <span style={{ color: "#FF0E0E" }}>{item}</span>
//           ) : item === "ACTIVE" ? (
//             <span style={{ color: "#00D640" }}>{item}</span>
//           ) : (
//             <span>{item}</span>
//           )}
//         </>
//       ),
//     },
//     {
//       title: "Action",
//       dataIndex: "_id",
//       key: "_id",
//       render: (value, item, index) => (
//         <AiOutlineEye
//           style={{ fontSize: "18px", color: "grey", cursor: "pointer" }}
//           onClick={() =>
//             navigate(`/driverManagement/${value}`)
//           }
//         />
//       ),
//     },
//   ];

//   const filterContent = (
//     <div className="filterDropdown">
//       <div>
//         <p
//           className="mainLabel"
//           style={{ padding: "10px", fontSize: "18px", fontWeight: "bold" }}
//         >
//           Filter
//         </p>
//       </div>
//       <hr style={{ marginBottom: 10 }} />

//       <div className="filterDropdownBody">
//         <p className="mainLabel">From:</p>
//         <DatePicker
//           className="mainInput filterInput web-input"
//           value={filter.from}
//           onChange={(e) => handleFrom(e)}
//           style={{ width: "100%" }}
//         />
//         <p className="mainLabel">To:</p>
//         <DatePicker
//           className="mainInput filterInput web-input"
//           value={filter.to}
//           onChange={(e) => handleTo(e)}
//           style={{ width: "100%" }}
//         />

//         <p className="mainLabel"> Status:</p>

//         <Select
//           size={"large"}
//           className="filterSelectBox"
//           placeholder="Select Status"
//           value={filter.status}
//           onChange={(e) => handleStatusChange(e)}
//           style={{
//             width: "100%",
//             marginBottom: "10px",
//             textAlign: "left",
//           }}
//           options={[
//             { value: "PENDING", label: "Pending" },
//             { value: "ACTIVE", label: "Active" },
//             { value: "BANNED", label: "Bannned" },
//           ]}
//         />

//         <Button
//           type=""
//           block
//           size={"large"}
//           style={{ marginBottom: "10px" }}
//           className="web-btn"
//           //   onClick={() => getUsers()}
//           onClick={handleApply}
//         >
//           Apply
//         </Button>
//         <Button
//           type=""
//           block
//           size={"large"}
//           className="web-btn"
//           onClick={handleClear}
//         >
//           Clear All
//         </Button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="shop-page">
//       <Row style={{ width: "100%", justifyContent: "center" }}>
//         <Col xs={24} md={24}>
//           <div className="shop-page-main">
//             <Row>
//               <Col xs={24} md={24} lg={24} xl={24}>
//                 <div className="my-account-profile">
//                   <section className="side-menu-parent">
//                     <DashbordSidebar />
//                     <div className="about-us-section">
//                       <div className="">
//                         <Row justify="center">
//                           <Col xs={24} md={24} xl={24}>
//                             <Card>
//                               <Row align="middle" gutter={16}>
//                                 <Col lg={24}>
//                                   <div className="boxDetails">
//                                     <Row style={{ padding: "10px 20px" }}>
//                                       <Col xs={24} md={12}>
//                                         <h3 className="heading-28">
//                                           Review
//                                         </h3>
//                                       </Col>
//                                       <Col
//                                         xs={24}
//                                         md={12}
//                                         style={{
//                                           display: "flex",
//                                           justifyContent: "flex-end",
//                                           alignItems: "center",
//                                         }}
//                                       >
//                                         <Popover
//                                           content={filterContent}
//                                           trigger="click"
//                                           open={open}
//                                           onOpenChange={handleOpenChange}
//                                           placement="bottomRight"
//                                           arrow={false}
//                                         >
//                                           <Button
//                                             shape="circle"
//                                             style={{
//                                               padding: "12px 12px 5px",
//                                               height: "auto",
//                                               backgroundColor: "#7F00FF",
//                                             }}
//                                           >
//                                             <FaFilter
//                                               style={{
//                                                 fontSize: "16px",
//                                                 color: "white",
//                                               }}
//                                             />
//                                           </Button>
//                                         </Popover>
//                                         &emsp;
//                                         <Input
//                                           style={{ width: "250px" }}
//                                           className="mainInput dashInput table-search"
//                                           placeholder="Search Here"
//                                           onChange={(e) =>
//                                             handleSearch(e.target.value)
//                                           }
//                                           suffix={
//                                             <FaSearch
//                                               style={{
//                                                 color: "grey",
//                                                 fontSize: 16,
//                                                 cursor: "pointer",
//                                               }}
//                                               // onClick={() =>
//                                               //   getOrders(
//                                               //     1,
//                                               //     paginationConfig.limit,
//                                               //     filter.keyword
//                                               //   )
//                                               // }
//                                             />
//                                           }
//                                           // onPressEnter={(e) =>
//                                           //   getOrders(
//                                           //     1,
//                                           //     paginationConfig.limit,
//                                           //     filter.keyword
//                                           //   )
//                                           // }
//                                         />
//                                       </Col>
//                                     </Row>

//                                     <Row
//                                       style={{ padding: 20, overflow: "auto" }}
//                                     >
//                                       {loading ? (
//                                         <div
//                                           style={{
//                                             display: "flex",
//                                             justifyContent: "center",
//                                             alignItems: "center",
//                                             width: "100%",
//                                           }}
//                                         >
//                                           <Skeleton active />
//                                           <br />
//                                         </div>
//                                       ) : (
//                                         <Table
//                                           className="styledTable"
//                                           dataSource={drivers}
//                                           columns={columns}
//                                           pagination={false}
//                                         />
//                                       )}
//                                     </Row>
//                                     <Row style={{ padding: "10px 20px" }}>
//                                       <Col xs={24} md={12}>
//                                         <p>{message}</p>
//                                       </Col>
//                                       <Col
//                                         xs={24}
//                                         md={12}
//                                         style={{
//                                           display: "flex",
//                                           justifyContent: "flex-end",
//                                         }}
//                                       >
//                                         <Pagination
//                                           className="styledPagination"
//                                           onChange={(e) => handlePageChange(e)}
//                                           current={parseInt(
//                                             paginationConfig.pageNumber
//                                           )}
//                                           pageSize={paginationConfig.limit}
//                                           total={paginationConfig.totalDocs}
//                                           itemRender={itemRender}
//                                         />
//                                       </Col>
//                                     </Row>
//                                     <br />
//                                   </div>
//                                 </Col>
//                               </Row>
//                             </Card>
//                           </Col>
//                         </Row>
//                       </div>
//                     </div>
//                   </section>
//                 </div>
//               </Col>
//             </Row>
//           </div>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default StaysManagement;
import React, { useState } from "react";
import { Col, Row, Image, Form, Input, Button, theme, Card } from "antd";
import { useNavigate, useParams } from "react-router";
import { FaPhoneVolume, FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import { BsArrowUpRightCircleFill } from "react-icons/bs";
import { Post } from "../../config/api/post";
import DashbordSidebar from "../../components/DashboardSidebar";
import { ImageUrl } from "../../config/helper";
import { FEEDBACK } from "../../config/constants/api";
import fbimg from "../../assets/fb-icon.png";
import instaimg from "../../assets/insta-icon.png";
import scimg from "../../assets/snapchat-icon.png";

// const { Meta } = Card;
const { TextArea } = Input;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const ContactUs = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const userToken = useSelector((state) => state.user.userToken);
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const { id } = useParams();

  const onFinish = (values) => {
    // Handle form submission
    setLoading(true);
    const { firstName, lastName, email, message, subject } = values;
    let body = {
      firstName,
      lastName,
      email,
      message,
      subject,
      type : 'ORGANIZATION',
      organization : userData?._id
    };
    Post(FEEDBACK.addFeedback, body, userToken)
      .then((response) => {
        setLoading(false);
        form.resetFields();
        handleChange();
      })
      .catch((err) => {
        let message = err?.response?.data?.message;
        setLoading(false);
        console.log(":::;", err);
        if (message) swal("Oops!", message, "error");
      });
  };
  const { TextArea } = Input; 
  const handleChange = () => {
    swal("system Alert", "Your Response has been Recorded", "success");
  };
  const { token } = theme.useToken();
  const panelStyle = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
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
                      <Row style={{ padding: "10px 20px" }}>
                        <Col xs={24}>
                          <h3 className="heading-28">Contact Us</h3>
                        </Col>
                      </Row>
                      <div className="">
                        <Row justify="center">
                          <Col xs={24} md={24} xl={24}>
                            <Card>
                              <Row align="middle" gutter={16}>
                                <Col lg={24}>
                                  <div className="boxDetails">
                                    <div className="details-card my-4">
                                      <Row gutter={[16, 16]}>
                                        <Col xl={9} lg={10}>
                                          <div className="help-frame">
                                            <div>
                                              <h6>Contact Information</h6>
                                              <span>ABC Company Name</span>
                                              <p>
                                                <FaPhoneVolume />{" "}
                                                email@email.com
                                              </p>
                                              <p>
                                                <MdEmail /> demo@gmail.com
                                              </p>
                                              <p>
                                                <FaLocationDot /> 132 Dartmouth
                                                Street, Boston, Massachusetts
                                                02156, United States
                                              </p>
                                            </div>
                                            <div className="social-icons">
                                              <Link className="socialicon">
                                                <Image
                                                  preview={false}
                                                  src={fbimg}
                                                />
                                              </Link>
                                              <Link className="socialicon">
                                                <Image
                                                  preview={false}
                                                  src={instaimg}
                                                />
                                              </Link>
                                              <Link className="socialicon">
                                                <Image
                                                  preview={false}
                                                  src={scimg}
                                                />
                                              </Link>
                                            </div>
                                          </div>
                                        </Col>
                                        <Col xl={15} lg={14}>
                                          <Form
                                            className="row g-3"
                                            name="basic"
                                            layout="vertical"
                                            initialValues={{
                                              remember: true,
                                            }}
                                            // onFinish={onFinish}
                                            autoComplete="off"
                                            form={form}
                                            onFinish={onFinish}
                                          >
                                            <Row
                                              style={{ width: "100%" }}
                                              gutter={[16, 16]}
                                            >
                                              <Col lg={12} md={12} xs={24}>
                                                <Form.Item
                                                  label="First Name"
                                                  name="firstName"
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "Please enter your First Name!",
                                                    },
                                                  ]}
                                                >
                                                  <Input
                                                    size="large"
                                                    placeholder="Enter First Name"
                                                    className="web-input"
                                                  />
                                                </Form.Item>
                                              </Col>
                                              <Col lg={12} md={12} xs={24}>
                                                <Form.Item
                                                  label="Last Name"
                                                  name="lastName"
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "Please enter your Last Name!",
                                                    },
                                                  ]}
                                                >
                                                  <Input
                                                    size="large"
                                                    placeholder="Enter Last Name"
                                                    className="web-input"
                                                  />
                                                </Form.Item>
                                              </Col>
                                              <Col lg={24} md={24} xs={24}>
                                                <Form.Item
                                                  label="Email"
                                                  name="email"
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "Please enter your Email!",
                                                    },
                                                  ]}
                                                >
                                                  <Input
                                                    size="large"
                                                    placeholder="Enter Email address"
                                                    className="web-input"
                                                  />
                                                </Form.Item>
                                              </Col>
                                              <Col lg={24} md={24} xs={24}>
                                                <Form.Item
                                                  label="Subject"
                                                  name="subject"
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "Please enter your Subject!",
                                                    },
                                                  ]}
                                                >
                                                  <Input
                                                    size="large"
                                                    placeholder="Enter Subject"
                                                    className="web-input"
                                                  />
                                                </Form.Item>
                                              </Col>
                                              <Col lg={24} md={24} xs={24}>
                                                <Form.Item
                                                  label="Message"
                                                  name="message"
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "Please enter your Message!",
                                                    },
                                                  ]}
                                                >
                                                  <TextArea
                                                    rows={4}
                                                    placeholder="Write your message.."
                                                    className="web-textarea"
                                                  />
                                                </Form.Item>
                                              </Col>
                                              <div
                                                className=""
                                                style={{ textAlign: "center" }}
                                              >
                                                <Button
                                                  type=""
                                                  htmlType="submit"
                                                  className="mainbtn"
                                                  style={{marginLeft:'10px'}}
                                                >
                                                  {loading
                                                    ? "Loading..."
                                                    : "Send Feedback"}
                                                  <BsArrowUpRightCircleFill />
                                                </Button>
                                              </div>
                                            </Row>
                                          </Form>
                                        </Col>
                                      </Row>
                                    </div>
                                    <br />
                                  </div>
                                </Col>
                              </Row>
                            </Card>
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

export default ContactUs;
