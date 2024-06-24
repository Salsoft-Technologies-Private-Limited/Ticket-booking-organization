import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  Button,
  Image,
  Table,
  Badge,
  Skeleton,
  Spin,
  Select,
} from "antd";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import DashbordSidebar from "../../../components/DashboardSidebar";
import OrderSummary from "../../../components/orderSummary";
import { useLocation } from "react-router-dom";
import image1 from "../../../assets/gloves.png";
import { myordersData } from "../../../components/Data/data";
import dayjs from "dayjs";
import { Get } from "../../../config/api/get";
import { ORDER, UPLOADS_URL } from "../../../config/constants/api";

const DropzoneFiltercards = () => {
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const location = useLocation()
  const status = location?.state?.status
  console.log(status)
  useEffect(()=>{
    setSelectedStatus(status)
  },[])
  // const [orderDetails, setOrderDetails] = useState(null);
  // const [products, setProducts] = useState(null);
  const [products, setProducts] = useState([
    {
      _id: 1,
      image: "ORDER_001_4567",
      title: "Akando Wind Stopper Gloves",
      price: "100",
      quantity: 2,
      totalPrice: "100",
    },
    {
      _id: 2,
      image: "ORDER_001_4567",
      title: "Akando Wind Stopper Gloves",
      price: "100",
      quantity: 4,
      totalPrice: "150",
    },
  ]);
  const { id } = useParams();
  const [myorders, setMyorders] = useState(
    myordersData.find((item) => item.id == id)
  );
  const navigate = useNavigate();
  // const { id } = useParams();
  // useEffect(() => {
  //   getOrderDetails();
  // }, []);
  // const getOrderDetails = () => {
  //   Get(`${ORDER.getOrder}${id}`, token)
  //   .then((response) => {
  //     setOrderDetails(response?.data);
  //     const { products } = response?.data;
  //     const updatedProducts = products.map((product) => ({
  //       ...product,
  //       ...product.product,
  //       totalPrice: product.price * product.quantity,
  //     }));
  //     setProducts(updatedProducts);
  //     setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log("Error fetching order details", err);
  //       setLoading(false);
  //     });
  // };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (item) => (
        <Image
          preview={false}
          src={UPLOADS_URL + item}
          width={"48px"}
          height={"48px"}
          style={{ objectFit: "contain" }}
        />
      ),
    },
    {
      title: "PRODUCT",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "UNIT PRICE",
      dataIndex: "price",
      key: "price",
      render: (item) => <span>${item}</span>,
    },
    {
      title: "Total",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (item) => <span>${item}</span>,
    },
  ];

  const handleChangeStatus = (value) => {
    setSelectedStatus(value);
    // You can perform any additional actions here when the status changes
  };
  const ribbonColor =
    myorders?.status === "COMPLETED"
      ? "#00B31D"
      : myorders?.status === "PENDING"
      ? "#DD9F00"
      : myorders?.status === "ONGOING"
      ? "#2D308B"
      : "red";

  const statusOptions = [
    { value: "COMPLETED", label: "Completed" },
    { value: "PENDING", label: "Pending" },
    { value: "ONGOING", label: "Ongoing" },
  ];
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
                        <h3 className="main-heading">My Orders</h3>
                      </div>
                      <div className="bg-paren">
                        <Row justify="center">
                          {!loading ? (
                            <Col xs={24} md={24} xl={24}>
                              <Card className="orderDetails">
                                <Row
                                  gutter={30}
                                  style={{ marginBottom: "50px" }}
                                >
                                  <Col xs={24}>
                                    <h6 className="heading-18">Order Status</h6>
                                    <Select
                                      options={statusOptions}
                                      value={selectedStatus}
                                      onChange={handleChangeStatus}
                                    />
                                    {/* <Badge.Ribbon
                                      text={myorders?.status}
                                      color={
                                        myorders?.status === "COMPLETED"
                                          ? "#00B31D"
                                          : myorders?.status === "PENDING"
                                          ? "#DD9F00"
                                          : myorders?.status === "ONGOING"
                                          ? "#2D308B"
                                          : "red"
                                      }
                                      placement="start"
                                    ></Badge.Ribbon> */}
                                  </Col>
                                </Row>
                                <Row gutter={30}>
                                  <Col xs={24} md={15} lg={17}>
                                    <h3>Order Information</h3>
                                    <h4>Order ID: {"#" + myorders?.orderId}</h4>
                                    <h5>
                                      Order Date:{" "}
                                      {dayjs(myorders?.createdAt).format(
                                        "M/D/YYYY"
                                      )}
                                    </h5>

                                    <h3>Account Information</h3>
                                    <h5>
                                      Customer Name: {myorders?.customerName}
                                    </h5>
                                    <h5>Email Address: {myorders?.email}</h5>

                                    <h3>Billing Address</h3>
                                    <Row gutter={[16, 16]}>
                                      <Col lg={6}>
                                        <h6 className="heading-18">
                                          User Name
                                        </h6>
                                        <h5>{myorders?.customerName}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">
                                          Phone Number
                                        </h6>
                                        <h5>{myorders?.phoneNumber}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">Address</h6>
                                        <h5>{myorders?.address}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">Country</h6>
                                        <h5>{myorders?.country}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">City</h6>
                                        <h5>{myorders?.citycity}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">State</h6>
                                        <h5>{myorders?.state}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">Zipcode</h6>
                                        <h5>{myorders?.zipcode}</h5>
                                      </Col>
                                    </Row>

                                    <h3>Payment & Shipping</h3>

                                    <Row gutter={[16, 16]}>
                                      <Col lg={6}>
                                        <h6 className="heading-18">
                                          User Name
                                        </h6>
                                        <h5>{myorders?.customerName}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">
                                          Phone Number
                                        </h6>
                                        <h5>{myorders?.phoneNumber}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">Address</h6>
                                        <h5>{myorders?.address}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">Country</h6>
                                        <h5>{myorders?.country}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">City</h6>
                                        <h5>{myorders?.city}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">State</h6>
                                        <h5>{myorders?.state}</h5>
                                      </Col>
                                      <Col lg={6}>
                                        <h6 className="heading-18">Zipcode</h6>
                                        <h5>{myorders?.zipcode}</h5>
                                      </Col>
                                    </Row>
                                  </Col>
                                  <Col xs={24} md={9} lg={7}>
                                    <OrderSummary
                                      subTotal={myorders?.totalPrice}
                                    />
                                  </Col>
                                </Row>
                                <div className="boxDetails">
                                  <Row
                                    style={{ padding: 20, overflow: "auto" }}
                                  >
                                    {loading ? (
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "center",
                                          width: "100%",
                                        }}
                                      >
                                        <Skeleton active />
                                        <br />
                                      </div>
                                    ) : (
                                      <Table
                                        className="styledTable2"
                                        dataSource={products}
                                        columns={columns}
                                        pagination={false}
                                      />
                                    )}
                                  </Row>
                                </div>
                              </Card>
                            </Col>
                          ) : (
                            <Col
                              xs={24}
                              md={24}
                              xl={24}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "150px 0px",
                              }}
                            >
                              <Spin />
                            </Col>
                          )}
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
