import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Card,
  Input,
  Button,
  Popover,
  Skeleton,
  Table,
  Select,
  Pagination,
  DatePicker,
} from "antd";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import DashbordSidebar from "../../components/DashboardSidebar";
import { AiOutlineEye } from "react-icons/ai";
import { FaSearch, FaFilter } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { ADMIN, EVENT, UPLOADS_URL } from "../../config/constants/api";
import { useDebouncedCallback } from "use-debounce";
import { userManagementDate } from "../../components/Data/data";
import moment from "moment";
import { convertTo12HourFormat, extractDate } from "../../config/helpers";

const DropZoneLogs = () => {
  const token = useSelector((state) => state.user.userToken);
  const user = useSelector((state) => state.user.userData);
  const [events, setEvents] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const [filter, setFilter] = useState({
    status: null,
    type: null,
    keyword: "",
    from: null,
    to: null,
  });
  const navigate = useNavigate();

  const getEvents = (pageNumber, pageSize, from, to, keyword) => {
    setLoading(true);
    Get(`${EVENT.getOrganizationEvents}${user?._id}`, token, {
      from,
      to,
      keyword,
      page: pageNumber
        ? pageNumber.toString()
        : paginationConfig.pageNumber.toString(),
      limit: pageSize ? pageSize.toString() : paginationConfig.limit.toString(),
    })
      .then((response) => {
        if (response?.data?.docs) {
          setEvents(response?.data?.docs);
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
        console.log("Error Fetching Events", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getEvents();
  }, []);

  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = events
    ? `Showing records ${endIndex} of ${paginationConfig.totalDocs}`
    : "Showing records 0 of 0";

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });
    getEvents(pageNumber, paginationConfig.limit);
  };

  const handleSearch = useDebouncedCallback((value) => {
    setFilter({
      ...filter,
      keyword: value,
    });
    getEvents(
      paginationConfig.pageNumber,
      paginationConfig.limit,
      null,
      null,
      value
    );
  }, 1000);

  const handleStatusChange = (value) => {
    setFilter({
      ...filter,
      status: value,
    });
  };

  const handleTypeChange = (value) => {
    setFilter({
      ...filter,
      type: value,
    });
  };

  const resetFilter = () => {
    setFilter({
      status: null,
      keyword: "",
      from: null,
      to: null,
    });
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const handleFrom = (date) => {
    setFilter({
      ...filter,
      from: date,
    });
  };

  const handleTo = (date) => {
    setFilter({
      ...filter,
      to: date,
    });
  };
  const data = {
    keyword: filter.keyword,
    from: filter.from,
    to: filter.to,
  };
  const handleApply = () => {
    let from;
    let to;
    if (data.from) {
      from = moment(filter?.from?.$d).format("YYYY-MM-DD");
    }
    if (data.to) {
      to = moment(filter?.to?.$d).format("YYYY-MM-DD");
    }
    if (from || to) {
      getEvents(paginationConfig.pageNumber, paginationConfig.limit, from, to);
    } else {
      return;
    }
  };
  const handleClear = () => {
    resetFilter();
    getEvents();
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

  const columns = [
    {
      title: "S. No.	",
      dataIndex: "key",
      key: "key",
      width: 100,
      render: (value, item, index) => (index < 9 && "0") + (index + 1),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (value, item, index) => (
        <img
          src={UPLOADS_URL + value}
          alt="event image"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      ),
    },
    {
      title: "Event Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (value, item, index) =>
        value.length > 25 ? value.slice(0, 25) + "..." : value,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (value, item, index) => extractDate(value),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (value, item, index) => convertTo12HourFormat(value),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location.address",
      render: (value, item, index) => value.address,
    },
    {
      title: "Ticket Price",
      dataIndex: "price",
      key: "price",
      render: (value, item, index) => "USD " + value,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (item) => (
        <>
          {item === "UPCOMING" ? (
            <span style={{ color: "#DD9F00" }}>{item}</span>
          ) : item === "ONGOING" ? (
            <span style={{ color: "#2D308B" }}>{item}</span>
          ) : item === "COMPLETED" ? (
            <span style={{ color: "#00D640" }}>{item}</span>
          ) : item === "CANCELLED" ? (
            <span style={{ color: "red" }}>{item}</span>
          ) : (
            <span>{item}</span>
          )}
        </>
      ),
    },

    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (value, item, index) => (
        <AiOutlineEye
          style={{ fontSize: "18px", color: "grey", cursor: "pointer" }}
          onClick={() => navigate(`/eventManagement/${value}`)}
        />
      ),
    },
  ];

  const filterContent = (
    <div className="filterDropdown">
      <div>
        <p
          className="mainLabel"
          style={{ padding: "10px", fontSize: "18px", fontWeight: "bold" }}
        >
          Filter
        </p>
      </div>
      <hr style={{ marginBottom: 10 }} />

      <div className="filterDropdownBody">
        <p className="mainLabel">From:</p>
        <DatePicker
          className="mainInput filterInput web-input"
          value={filter.from}
          onChange={(e) => handleFrom(e)}
          style={{ width: "100%" }}
        />
        <p className="mainLabel">To:</p>
        <DatePicker
          className="mainInput filterInput web-input"
          value={filter.to}
          onChange={(e) => handleTo(e)}
          style={{ width: "100%" }}
        />

        <Button
          type=""
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="web-btn"
          //   onClick={() => getUsers()}
          onClick={handleApply}
        >
          Apply
        </Button>
        <Button
          type=""
          block
          size={"large"}
          className="web-btn"
          onClick={handleClear}
        >
          Clear All
        </Button>
      </div>
    </div>
  );

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
                        <Col xs={24} md={12}>
                          <h3 className="heading-28">Event Management</h3>
                        </Col>
                        <Col
                          xs={24}
                          md={12}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                          }}
                        >
                          <Popover
                            content={filterContent}
                            trigger="click"
                            open={open}
                            onOpenChange={handleOpenChange}
                            placement="bottomRight"
                            arrow={false}
                          >
                            <Button
                              shape="circle"
                              style={{
                                padding: "12px 12px 5px",
                                height: "auto",
                                backgroundColor: "#7F00FF",
                              }}
                            >
                              <FaFilter
                                style={{
                                  fontSize: "16px",
                                  color: "white",
                                }}
                              />
                            </Button>
                          </Popover>
                          &emsp;
                          <Input
                            style={{ width: "250px" }}
                            className="mainInput dashInput table-search"
                            placeholder="Search By Title Here.."
                            onChange={(e) => handleSearch(e.target.value)}
                            suffix={
                              <FaSearch
                                style={{
                                  color: "grey",
                                  fontSize: 16,
                                  cursor: "pointer",
                                }}
                                // onClick={() =>
                                //   getOrders(
                                //     1,
                                //     paginationConfig.limit,
                                //     filter.keyword
                                //   )
                                // }
                              />
                            }
                            // onPressEnter={(e) =>
                            //   getOrders(
                            //     1,
                            //     paginationConfig.limit,
                            //     filter.keyword
                            //   )
                            // }
                          />
                          <Button
                            className="web-btn"
                            onClick={() => navigate("/createEvent")}
                            style={{ margin: "0 0 0 10px" }}
                          >
                            CREATE EVENT
                          </Button>
                        </Col>
                      </Row>
                      <div className="">
                        <Row justify="center">
                          <Col xs={24} md={24} xl={24}>
                            <Card>
                              <Row align="middle" gutter={16}>
                                <Col lg={24}>
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
                                          className="styledTable"
                                          columns={columns}
                                          dataSource={events}
                                          // dataSource={userManagementDate}
                                          pagination={false}
                                        />
                                      )}
                                    </Row>
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
                                          current={parseInt(
                                            paginationConfig.pageNumber
                                          )}
                                          pageSize={paginationConfig.limit}
                                          total={paginationConfig.totalDocs}
                                          itemRender={itemRender}
                                        />
                                      </Col>
                                    </Row>
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

export default DropZoneLogs;
