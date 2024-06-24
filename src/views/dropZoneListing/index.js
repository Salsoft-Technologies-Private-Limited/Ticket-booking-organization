import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  Button,
  Pagination,
  Rate,
  Space,
  Input,
  Spin,
} from "antd";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import DashbordSidebar from "../../components/DashboardSidebar";
import { Get } from "../../config/api/get";
import { COMPANY, UPLOADS_URL } from "../../config/constants/api";
import { toCamelCase } from "../../config/helpers";
import { FaSearch } from "react-icons/fa";
import { useDebouncedCallback } from "use-debounce";

const Dashboard = () => {
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const token = useSelector((state) => state.user.userToken);
  const profileDetails = useSelector((state) => state.user.profileDetails);
  const navigate = useNavigate();
  const [gigs, setGigs] = useState(null);
  const [loading, setLoading] = useState(true);
  const { Meta } = Card;

  const getMyGigs = (pageNumber, keyword) => {
    if (pageNumber) {
      setPaginationConfig({
        ...paginationConfig,
        pageNumber: pageNumber,
      });
    }
    let params = {
      page: pageNumber
        ? pageNumber.toString()
        : paginationConfig.pageNumber.toString(),
      limit: paginationConfig.limit.toString(),
      name: keyword,
    };
    setLoading(true);
    Get(COMPANY.getMyGigs, token, params)
      .then((response) => {
        setGigs(response?.data?.docs);
        setPaginationConfig({
          pageNumber: response?.data?.page,
          limit: response?.data?.limit,
          totalDocs: response?.data?.totalDocs,
          totalPages: response?.data?.totalPages,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error Fetching Gigs", err);
        setLoading(false);
      });
  };
  const { Search } = Input;
  useEffect(() => {
    // if (!profileDetails) {
    //   navigate("/createProfile");
    // }
    getMyGigs();
  }, []);

  const onSearch = (value) => console.log(value);
  const handleSearch = useDebouncedCallback((val) => {
    getMyGigs(paginationConfig.pageNumber, val);
  }, 1000);
  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = gigs
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
                      <div className="bg-parent dashboard-right-card">
                        <Row align={"middle"}>
                          <Col lg={12}>
                            <h3 className="heading-28">Drop Zone Listing</h3>
                          </Col>
                          <Col lg={12}>
                            <div className="searchBox-with-button">
                              <Input
                                style={{ width: "250px" }}
                                className="mainInput dashInput"
                                placeholder="Search Here"
                                onChange={(e) => handleSearch(e.target.value)}
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
                                onClick={() => navigate("/addDropZone")}
                              >
                                + Add Drop Zone
                              </Button>
                            </div>
                          </Col>
                        </Row>
                        {!loading ? (
                          <Row gutter={16}>
                            {Array.isArray(gigs) && gigs?.length > 0 ? (
                              gigs.map((gigData, index) => (
                                <Col xs={24} lg={8} key={index}>
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
                                          className="card booking-card dropzone-card"
                                          cover={
                                            <span>
                                              <img
                                                src={
                                                  UPLOADS_URL + gigData?.image
                                                }
                                                alt=""
                                                className="img-fluid"
                                                style={{ width: "100%" }}
                                              />
                                            </span>
                                          }
                                        >
                                          <Meta title={gigData?.title} />
                                          <p className="web-p">
                                            {toCamelCase(gigData?.jumpType) +
                                              " Jump"}
                                          </p>
                                          <h6 className="booking-card-price">
                                            ${gigData?.charges + ".00"}
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
                                                "/dropZoneListing/" +
                                                  gigData._id
                                              )
                                            }
                                          >
                                            View Details
                                          </Button>
                                        </Card>
                                        <div className="rating-box">
                                          <Rate
                                            allowHalf
                                            defaultValue={4}
                                            disabled
                                          />
                                        </div>
                                      </div>
                                    </Space>
                                  </div>
                                </Col>
                              ))
                            ) : (
                              <p
                                style={{
                                  fontSize: "22px",
                                  fontWeight: "bold",
                                  margin: "200px auto",
                                }}
                              >
                                No Dropzones Data to Show
                              </p>
                            )}
                          </Row>
                        ) : (
                          <Card>
                            <Col
                              xs={23}
                              md={21}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "150px 0px",
                              }}
                            >
                              <Spin />
                            </Col>
                          </Card>
                        )}
                        <Row align="middle">
                          <Col span={24}>
                            <div
                              className="d-md-flex align-items-center justify-content-between"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <p className="m-grey-text mb-0">{message}</p>
                              <div aria-label="...">
                                <Pagination
                                  current={paginationConfig?.pageNumber}
                                  total={paginationConfig?.totalDocs}
                                />
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

export default Dashboard;
