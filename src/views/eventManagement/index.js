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
import { ADMIN } from "../../config/constants/api";
import { useDebouncedCallback } from "use-debounce";
import { userManagementDate } from "../../components/Data/data";
import moment from "moment";

const DropZoneLogs = () => {
  const token = useSelector((state) => state.user.userToken);
  const [users, setUsers] = useState(null);
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

  const getUsers = (pageNumber, pageSize, from, to, keyword) => {
    setLoading(true);
    Get(ADMIN.getUsers, token, {
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
          setUsers(response?.data?.docs);
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
        console.log("Error Fetching Loads", err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getUsers();
  }, []);

  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = users
    ? `Showing records ${endIndex} of ${paginationConfig.totalDocs}`
    : "Showing records 0 of 0";

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });
    getUsers(pageNumber, paginationConfig.limit);
  };

  const handleSearch = useDebouncedCallback((value) => {
    setFilter({
      ...filter,
      keyword: value,
    });
    getUsers(
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
      getUsers(paginationConfig.pageNumber, paginationConfig.limit, from, to);
    } else {
      return;
    }
  };
  const handleClear = () => {
    resetFilter();
    getUsers();
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
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },

    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
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
                                        <h3 className="heading-28">
                                          Event Management
                                        </h3>
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
                                          placeholder="Search Here"
                                          onChange={(e) =>
                                            handleSearch(e.target.value)
                                          }
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
                                        <Button className="web-btn" onClick={() => navigate("/createEvent")} style={{  margin:"0 0 0 10px" }}>CREATE EVENT</Button>
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
                                          // dataSource={users}
                                          dataSource={userManagementDate}
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
