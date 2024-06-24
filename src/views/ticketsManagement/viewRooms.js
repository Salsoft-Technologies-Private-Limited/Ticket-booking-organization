import { useEffect, useState } from "react";
import { Col, Row, Button, Pagination, Spin, Rate } from "antd";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { STAY, UPLOADS_URL } from "../../config/constants/api";
import DashbordSidebar from "../../components/DashboardSidebar";
import { FaArrowLeftLong } from "react-icons/fa6";
import { MdBalcony, MdOutlineKingBed } from "react-icons/md";
import { FaShower } from "react-icons/fa";
import { roomViewDate } from "../../components/Data/data";
import { Get } from "../../config/api/get";

const StayUserDetails = () => {
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const location = useLocation();
  const companyId = location?.state?.companyId;
  const [rooms, setRooms] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCompanyRooms = (pageNumber, pageSize) => {
    setLoading(true);
    Get(`${STAY.getCompanyRooms}${companyId}`, token, {
      page: pageNumber
        ? pageNumber.toString()
        : paginationConfig.pageNumber.toString(),
      limit: pageSize ? pageSize.toString() : paginationConfig.limit.toString(),
    })
      .then((response) => {
        if (response.status) {
          console.log(response?.data?.docs);
          setRooms(response?.data?.docs);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log("Error Fetching Rooms", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    if (!companyId) {
      navigate(-1);
    } else {
      getCompanyRooms();
    }
  }, []);
  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );

  const message = rooms
    ? `Showing records ${endIndex} of ${paginationConfig.totalDocs}`
    : "Showing records 0 of 0";

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });
    getCompanyRooms(pageNumber, paginationConfig.limit);
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
                        <Row
                          align={"middle"}
                          style={{
                            marginBottom: "15px",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <Col lg={24} md={24} xs={24}>
                            <div class="arrow-box2">
                              <div>
                                <FaArrowLeftLong
                                  className="arrow"
                                  onClick={() => navigate(-1)}
                                />
                              </div>
                              <h3 className="heading-28">Stay Management</h3>
                            </div>
                          </Col>
                        </Row>
                        <Row justify="center">
                          {!loading ? (
                            <Col span={24} lg={24}>
                              {Array.isArray(rooms) && rooms.length > 0 ? (
                                rooms.map((roomData, index) => (
                                  <div key={index} className="details-card">
                                    <Row align="middle" gutter={[16, 16]}>
                                      <Col xl={18} lg={24} xs={24}>
                                        <div className="search-img-box rooms-views">
                                          <div className="search-img">
                                            <span>
                                              {" "}
                                              <img
                                                src={
                                                  UPLOADS_URL + roomData?.image
                                                }
                                                alt=""
                                                className="img-fluid"
                                              />
                                              ,
                                            </span>
                                            {/* <div className="rating-box">
                                              <Rate
                                                allowHalf
                                                defaultValue={
                                                  roomViewDate[0].rating
                                                }
                                                disabled
                                              />
                                            </div> */}
                                          </div>
                                          <div className="search-img-box-right">
                                            <h4>{roomData?.title}</h4>
                                            <p>
                                              <MdBalcony />
                                              {roomData?.description}
                                            </p>
                                            <p>
                                              <FaShower />
                                              {roomData?.bathrooms +
                                                " Bathrooms"}
                                            </p>
                                            <p>
                                              <MdOutlineKingBed />
                                              {roomData?.beds + " Beds"}
                                            </p>
                                          
                                          </div>
                                        </div>
                                      </Col>
                                      <Col xl={6} lg={24} xs={24}>
                                        <div className="search-result-detail-btnbox">
                                          <h6 className="per-day-price">
                                            ${roomData?.pricing}
                                            <span>/Per day</span>
                                          </h6>
                                          <p>
                                            {roomData?.guests} Guests,{" "}
                                            {roomData?.vat}% Vat
                                          </p>

                                          <Button
                                            type=""
                                            htmlType="submit"
                                            className="btn web-btn"
                                            onClick={() =>
                                              navigate(
                                                "/staysManagement/viewRooms/" +
                                                  // roomViewDate[0].id
                                                  roomData?._id
                                              )
                                            }
                                          >
                                            View Details
                                          </Button>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                ))
                              ) : (
                                <p
                                  style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: "22px",
                                    margin: "100px 0",
                                  }}
                                >
                                  No Rooms to Show
                                </p>
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
                                    <p className="m-grey-text mb-0">
                                      {message}
                                    </p>
                                    <div aria-label="...">
                                      <Pagination
                                        current={parseInt(
                                          paginationConfig.pageNumber
                                        )}
                                        pageSize={paginationConfig.limit}
                                        total={paginationConfig.totalDocs}
                                        onChange={(e) => handlePageChange(e)}
                                      />
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          ) : (
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

export default StayUserDetails;
