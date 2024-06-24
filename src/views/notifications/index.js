import { useState, useEffect } from "react";
import { Row, Col, Card, Pagination } from "antd";
import NotificationCard from "../../components/NotificationCard";
import DashbordSidebar from "../../components/DashboardSidebar";
import { Get } from "../../config/api/get.js";
import { COMPANY, NOTIFICATIONS } from "../../config/constants/api.js";
import { useSelector } from "react-redux";
import { extractDate, extractTime } from "../../config/helpers/index.js";
import socket from "../../config/socket/index.js";
import { Put } from "../../config/api/put.js";
import swal from "sweetalert";

function Notifications() {
  const [notificationState, setNotificationState] = useState(null);
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = notificationState
    ? `Showing records ${endIndex} of ${paginationConfig.totalDocs}`
    : "Showing records 0 of 0";
  const token = useSelector((state) => state.user.userToken);
  const getAllNotifications = (pageNumber, pageSize) => {
    Get(NOTIFICATIONS.getAllAdminNotifications, token, {
      page: pageNumber
        ? pageNumber.toString()
        : paginationConfig.pageNumber.toString(),
      limit: pageSize ? pageSize.toString() : paginationConfig.limit.toString(),
    })
      .then((response) => {
        if (response?.status) {
          setNotificationState(response?.data?.notifications?.docs);
          setPaginationConfig({
            pageNumber: response?.data?.notifications?.page,
            limit: response?.data?.notifications?.limit,
            totalDocs: response?.data?.notifications?.totalDocs,
            totalPages: response?.data?.notifications?.totalPages,
          });
        }
      })
      .catch((err) => {
        console.log("Error fetching notifications ", err);
      });
  };
  useEffect(() => {
    getAllNotifications();
  }, []);
  useEffect(() => {
    socket.on("notification", (data) => {
      getAllNotifications();
    });
    return () => {
      socket.off("notification");
    };
  }, []);
  const itemRender = (_, type, originalElement) => {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  };
  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    getAllNotifications(pageNumber);
  };
  const handleAccountApprove = (id, status) =>{
    Put(`${COMPANY.toggleStatus}${id}`, token, { status })
      .then((response) => {
        if (response.status) {
          swal("System Alert!", response?.message, "success");
          getAllNotifications()
        }
      })
      .catch((err) => {
        let message = err?.response?.data?.message;
        console.log(":::;", err);
        if (message) swal("Oops!", message, "error");
      });
  }
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
                      <div className="bg-paren dashboard-right-card">
                        <Card className="details-card for-tag-input">
                          <h3 className="heading-28">Notifications</h3>
                          <Row
                            align="middle"
                            justify="space-between"
                            gutter={16}
                          >
                            <Col lg={24}>
                              {Array.isArray(notificationState) &&
                                notificationState.map((notification, index) => (
                                  <>
                                    <div className="col-12" key={index}>
                                      <NotificationCard
                                        text={notification?.content}
                                        date={extractDate(
                                          notification?.createdAt
                                        )}
                                        time={extractTime(
                                          notification?.createdAt
                                        )}
                                        read={notification?.isRead}
                                        notificationState={notificationState}
                                        setNotificationState={
                                          setNotificationState
                                        }
                                        index={index}
                                        item={notification}
                                        payload={notification?.payload ?  notification?.payload : null}
                                        category={notification?.category}
                                        handleAccountApprove={handleAccountApprove}
                                      />
                                    </div>
                                  </>
                                ))}
                            </Col>
                          </Row>
                        </Card>
                        <Row style={{ padding: "10px 20px" }}>
                          <Col xs={24} md={12}>
                            <p
                              className="fontFamily1"
                              style={{ color: "#999" }}
                            >
                              {message}
                            </p>
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
}

export default Notifications;
