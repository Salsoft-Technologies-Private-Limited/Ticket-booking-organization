import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Button,
  Card,
  Space,
  Input,
  message,
  Pagination,
  Spin,
} from "antd";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  ADMIN,
  COMPANY,
  PRODUCT,
  UPLOADS_URL,
} from "../../config/constants/api";
import DashbordSidebar from "../../components/DashboardSidebar";
import { Get } from "../../config/api/get";
import { Put } from "../../config/api/put";
import { FaSearch } from "react-icons/fa";
import swal from "sweetalert";
import { marketplaceData } from "../../components/Data/data";
import glasses from "../../assets/glasses.png";

const DropzoneFiltercards = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBanned, setIsBanned] = useState(false);
  const [products, setProducts] = useState(null);
  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const getAdminProducts = (pageNumber, pageSize) => {
    Get(PRODUCT.getAdminProducts, token, {
      page: pageNumber
        ? pageNumber.toString()
        : paginationConfig.pageNumber.toString(),
      limit: pageSize ? pageSize.toString() : paginationConfig.limit.toString(),
    })
      .then((response) => {
        if (response?.data?.docs) {
          setProducts(response?.data?.docs);
          setPaginationConfig({
            pageNumber: response?.data?.page,
            limit: response?.data?.limit,
            totalDocs: response?.data?.totalDocs,
            totalPages: response?.data?.totalPages,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("Error Fetching Products", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getAdminProducts();
  }, []);

  const { Meta } = Card;

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    // getOrders(pageNumber);
  };
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };
  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = products
    ? `Showing records ${endIndex} of ${paginationConfig.totalDocs}`
    : "Showing records 0 of 0";
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
                          <Col lg={12}>
                            <h3 className="heading-28">Product Management</h3>
                          </Col>
                          <Col lg={12}>
                            <div className="searchBox-with-button">
                              <Input
                                style={{ width: "250px" }}
                                className="mainInput dashInput"
                                placeholder="Search Here"
                                // onChange={(e) => handleSearch(e.target.value)}
                                suffix={
                                  <FaSearch
                                    style={{
                                      color: "grey",
                                      fontSize: 16,
                                      cursor: "pointer",
                                    }}
                                  />
                                }
                              />
                              <Button
                                type="link"
                                className="web-btn"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                                onClick={() => navigate("/addProduct")}
                              >
                                + ADD PRODUCT
                              </Button>
                            </div>
                          </Col>
                        </Row>

                        {!loading && (
                          <Row gutter={16}>
                            {Array.isArray(products) &&
                              products.length > 0 &&
                              products?.map((item, index) => (
                                <Col key={index} xs={24} lg={8}>
                                  <div>
                                    <Space
                                      direction="vertical"
                                      size="middle"
                                      style={{
                                        width: "100%",
                                        padding: "8px",
                                      }}
                                    >
                                      <div className="search-img">
                                        <Card
                                          className="card booking-card dropzone-card product-cards"
                                          alt=""
                                          cover={
                                            <span>
                                              {" "}
                                              <img
                                                src={UPLOADS_URL + item?.image}
                                                alt=""
                                                className="img-fluid"
                                                style={{ width: "100%" }}
                                              />
                                            </span>
                                          }
                                        >
                                          <Meta title={item?.title} />
                                          <h6 className="booking-card-price">
                                            ${item?.price + ".00"}
                                          </h6>
                                          <Button
                                            type="link"
                                            className="web-btn"
                                            style={{
                                              display: "flex",
                                              alignItems: "center",
                                              width: "100%",
                                            }}
                                            onClick={() =>
                                              navigate(
                                                "/productManagement/" + item._id
                                              )
                                            }
                                          >
                                            View Details
                                          </Button>
                                        </Card>
                                      </div>
                                    </Space>
                                  </div>
                                </Col>
                              ))}
                          </Row>
                        )}

                        {loading && (
                          <Row
                            justify={"center"}
                            gutter={16}
                            style={{ width: "100%" }}
                          >
                            <Spin style={{ margin: "100px 0px" }} />
                          </Row>
                        )}
                        <Row style={{ padding: "10px 20px" }}>
                          <Col xs={24} md={12}>
                            <p>{message}</p>
                          </Col>
                          <Col
                            xs={24}
                            md={12}
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <Pagination
                              className="styledPagination"
                              onChange={(e) => handlePageChange(e)}
                              current={parseInt(paginationConfig.pageNumber)}
                              pageSize={paginationConfig.limit}
                              total={paginationConfig.totalDocs}
                              itemRender={itemRender}
                            />
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
