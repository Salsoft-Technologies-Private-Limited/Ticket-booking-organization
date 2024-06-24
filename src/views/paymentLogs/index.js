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
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import DashbordSidebar from "../../components/DashboardSidebar";
import { AiOutlineEye } from "react-icons/ai";
import { FaSearch, FaFilter } from "react-icons/fa";
import { paymentData } from "../../components/Data/data";

const JumpReservationInfo = () => {
  const token = useSelector((state) => state.user.userToken);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    status: null,
    type: null,
    keyword: "",
    from: null,
    to: null,
  });

  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = `Showing records ${endIndex} of ${paginationConfig.totalDocs}`;

  useEffect(() => {
    getOrders();
  }, []);

  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });

    getOrders(pageNumber);
  };

  const handleSearch = (value) => {
    setFilter({
      ...filter,
      keyword: value,
    });
  };

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
    getOrders(paginationConfig.pageNumber, paginationConfig.limit, "", true);
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

  const handleLimitChange = (pageSize) => {
    setPaginationConfig({
      ...paginationConfig,
      limit: pageSize,
      current: 1,
    });

    getOrders(1, pageSize);
  };

  const getOrders = async (pageNumber, pageSize, search, reset = false) => {
    //   setLoading(true);
    try {
      // const response = await Get(ORDER.getOrderLogs, token, {
      //   page: pageNumber
      //     ? pageNumber.toString()
      //     : paginationConfig.pageNumber.toString(),
      //   limit: pageSize
      //     ? pageSize.toString()
      //     : paginationConfig.limit.toString(),
      //   status: reset ? "" : filter.status || null,
      //   type: reset ? "" : filter.type || null,
      //   keyword: search ? search : null,
      //   from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
      //   to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
      // });
      // setLoading(false);
      // console.log("response", response);
      // if (response?.status) {
      //   setOrders(response?.data?.docs);
      //   setPaginationConfig({
      //     pageNumber: response?.data?.page,
      //     limit: response?.data?.limit,
      //     totalDocs: response?.data?.totalDocs,
      //     totalPages: response?.data?.totalPages,
      //   });
      // } else {
      //   message.error(response.message);
      //   console.log("error====>", response);
      // }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  console.log("paginationConfig", paginationConfig);

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
      title: "Drop Zone ID",
      dataIndex: "dropZoneID",
      key: "dropZoneID",
    },
    {
      title: "Drop Zone Name",
      dataIndex: "customername",
      key: "customername",
    },
    {
      title: "Customer name",
      dataIndex: "customername",
      key: "customername",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (item) => <span>{dayjs(item).format("M/D/YYYY")}</span>,
    },
    {
      title: "Skydive Type",
      dataIndex: "skydiveType",
      key: "skydiveType",
    },
    {
      title: "Amount Paid to You",
      dataIndex: "amountPaid",
      key: "amountPaid",
    },
    {
      title: "Commission 10%",
      dataIndex: "commission",
      key: "commission",
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
        <p className="mainLabel">Sort By Date:</p>
        <DatePicker
          className="mainInput filterInput web-input"
          value={filter.from}
          onChange={(e) => handleFrom(e)}
          style={{ width: "100%" }}
        />
        <DatePicker
          className="mainInput filterInput web-input"
          value={filter.to}
          onChange={(e) => handleTo(e)}
          style={{ width: "100%" }}
        />

        <p className="mainLabel"> Status:</p>

        <Select
          size={"large"}
          className="filterSelectBox"
          placeholder="Select Status"
          value={filter.status}
          onChange={(e) => handleStatusChange(e)}
          style={{
            width: "100%",
            marginBottom: "10px",
            textAlign: "left",
          }}
          options={[
            { value: "PENDING", label: "Pending" },
            { value: "INPROCESS", label: "In-Process" },
            { value: "DELIEVRED", label: "Delieverd" },
            { value: "DISPATCHED", label: "Dispatched" },
          ]}
        />

        <Button
          type=""
          block
          size={"large"}
          style={{ marginBottom: "10px" }}
          className="web-btn"
          //   onClick={() => getUsers()}
        >
          Apply
        </Button>
        <Button
          type=""
          block
          size={"large"}
          className="web-btn"
          onClick={() => resetFilter()}
        >
          Clear All
        </Button>
      </div>
    </div>
  );

  const onChange = (key) => {
    console.log(key);
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
                      <div className="profile-information-wrapper">
                        <h3 className="main-heading">Payment Logs</h3>
                      </div>
                      <div className="">
                        <Row justify="center">
                          <Col xs={24} md={24} xl={24}>
                            <Card>
                              <Row align="middle" gutter={16}>
                                <Col lg={24}>
                                  <div className="boxDetails">
                                    <Row style={{ padding: "10px 20px" }}>
                                      <Col xs={24} md={12}></Col>
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
                                              onClick={() =>
                                                getOrders(
                                                  1,
                                                  paginationConfig.limit,
                                                  filter.keyword
                                                )
                                              }
                                            />
                                          }
                                          onPressEnter={(e) =>
                                            getOrders(
                                              1,
                                              paginationConfig.limit,
                                              filter.keyword
                                            )
                                          }
                                        />
                                      </Col>
                                    </Row>

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
                                          dataSource={paymentData}
                                          columns={columns}
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

export default JumpReservationInfo;
