import { useEffect, useRef, useState } from "react";
import { Col, Row, Button, Card, Space, Rate, Input } from "antd";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import DashbordSidebar from "../../components/DashboardSidebar";
import { listingData } from "../../components/Data/data";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { GIGS, UPLOADS_URL } from "../../config/constants/api";
import { toCamelCase } from "../../config/helpers";

const StayUserDetails = () => {
  const [companyGigs, setCompanyGigs] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const location = useLocation();
  const companyId = location?.state?.companyId;
  useEffect(() => {
    if (!companyId) {
      navigate(-1);
    } else {
      getCompanyGigs();
    }
  }, []);
  const getCompanyGigs = (type, log, lat) => {
    setLoading(true);
    let params = {
      type: type !== "" ? type : null,
      log: log !== "" ? log : null,
      lat: lat !== "" ? lat : null,
    };
    Get(`${GIGS.getCompanyGigs}${companyId}`, token, params)
      .then((response) => {
        if (response?.status) {
          setCompanyGigs(response?.data?.docs);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("Error Fetching Company Gigs", err);
        setLoading(false);
      });
  };
  const { Meta } = Card;
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
                      <div className="bg-parent" style={{ marginTop: "30px" }}>
                        <Row align={"middle"}>
                          <Col lg={12}>
                            <div class="arrow-box2">
                              <div>
                                <FaArrowLeftLong
                                  className="arrow"
                                  onClick={() => navigate(-1)}
                                />
                              </div>
                              <h3 className="heading-28">Stay User Details</h3>
                            </div>
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
                            </div>
                          </Col>
                        </Row>
                        <Row gutter={16}>
                          {Array.isArray(companyGigs) &&
                            companyGigs.length > 0 &&
                            companyGigs.map((gig, index) => (
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
                                        cover={<span> <img
                                          src={UPLOADS_URL + gig?.image}
                                          alt=""
                                          className="img-fluid"
                                          style={{ width: "100%" }}
                                        /></span>}
                                      >
                                        <Meta title={gig?.title} />
                                        <p className="web-p">
                                          {toCamelCase(gig?.jumpType) + ' Jump' }
                                        </p>
                                        <h6 className="booking-card-price">
                                          ${gig?.charges}
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
                                              "/dropZoneManagement/dropZoneListing//" +
                                               gig._id
                                            )
                                          }
                                        >
                                          View Details
                                        </Button>
                                      </Card>
                                      {/* <div className="rating-box">
                                        <Rate
                                          allowHalf
                                          defaultValue={listingData.rating}
                                          disabled
                                        />
                                      </div> */}
                                    </div>
                                  </Space>
                                </div>
                              </Col>
                            ))}
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

export default StayUserDetails;
