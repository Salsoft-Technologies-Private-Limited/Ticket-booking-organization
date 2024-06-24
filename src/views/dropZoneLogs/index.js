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
  Tabs,
} from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import DashbordSidebar from "../../components/DashboardSidebar";
import { AiOutlineEye } from "react-icons/ai";
import { FaSearch, FaFilter } from "react-icons/fa";
import { dropzoneLogsData } from "../../components/Data/data";
import { Get } from "../../config/api/get";
import { JUMP } from "../../config/constants/api";
import { extractDate } from "../../config/helpers";
import { useDebouncedCallback } from "use-debounce";
import moment from "moment";


const DropZoneLogs = () => {
  const token = useSelector((state) => state.user.userToken);
  const [loads, setLoads] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

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
  const getCompanyJumps = (pageNumber, pageSize, status, from, to, keyword) => {
    setLoading(true);
    Get(JUMP.getCompanyJumps, token, {
      status,
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
          setLoads(response?.data?.docs);
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
    getCompanyJumps();
  }, []);
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const startIndex =
    (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
  const endIndex = Math.min(
    startIndex + paginationConfig.limit - 1,
    paginationConfig.totalDocs
  );
  const message = loads ? `Showing records ${endIndex} of ${paginationConfig.totalDocs}` : 'Showing records 0 of 0';

  // useEffect(() => {
  //   getOrders();
  // }, []);


  const handlePageChange = (pageNumber) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: pageNumber,
    });
    getCompanyJumps(pageNumber, paginationConfig.limit);
  };

  const handleSearch = useDebouncedCallback((value) => {
    setFilter({
      ...filter,
      keyword: value,
    });
    getCompanyJumps(
      paginationConfig.pageNumber,
      paginationConfig.limit,
      null,
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
    status: filter.status,
    keyword: filter.keyword,
    from: filter.from,
    to: filter.to,
  };
  const handleApply = () => {
    let from;
    let to;
    let status = data.status;
    if (data.from) {
      from = moment(filter?.from?.$d).format("YYYY-MM-DD");
    }
    if (data.to) {
      to = moment(filter?.to?.$d).format("YYYY-MM-DD");
    }
    if (from || to || status) {
      getCompanyJumps(
        paginationConfig.pageNumber,
        paginationConfig.limit,
        status,
        from,
        to
      );
    } else {
      return;
    }
  };
  const handleClear = () => {
    resetFilter();
    getCompanyJumps();
  };
  // const handleLimitChange = (pageSize) => {
  //   setPaginationConfig({
  //     ...paginationConfig,
  //     limit: pageSize,
  //     current: 1,
  //   });

  //   // getOrders(1, pageSize);
  // };

  // const getOrders = async (pageNumber, pageSize, search, reset = false) => {
  //     setLoading(true);
  //   try {
  //     const response = await Get(ORDER.getOrderLogs, token, {
  //       page: pageNumber
  //         ? pageNumber.toString()
  //         : paginationConfig.pageNumber.toString(),
  //       limit: pageSize
  //         ? pageSize.toString()
  //         : paginationConfig.limit.toString(),
  //       status: reset ? "" : filter.status || null,
  //       type: reset ? "" : filter.type || null,
  //       keyword: search ? search : null,
  //       from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
  //       to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
  //     });
  //     setLoading(false);
  //     console.log("response", response);
  //     if (response?.status) {
  //       setOrders(response?.data?.docs);
  //       setPaginationConfig({
  //         pageNumber: response?.data?.page,
  //         limit: response?.data?.limit,
  //         totalDocs: response?.data?.totalDocs,
  //         totalPages: response?.data?.totalPages,
  //       });
  //     } else {
  //       message.error(response.message);
  //       console.log("error====>", response);
  //     }
  //   } catch (error) {
  //     console.log(error.message);
  //     setLoading(false);
  //   }
  // };


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
      title: "Booking ID",
      dataIndex: "_id",
      key: "_id",
      render: (value, item) => "#" + value.slice(-4),
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Dropzone Name",
      dataIndex: "gigTitle",
      key: "gigTitle",
    },
    {
      title: "Jump Name",
      dataIndex: "jumpType",
      key: "jumpType",
      render: (value, item) => capitalizeFirstLetter(value) + " Jump",
    },
    {
      title: "Date",
      dataIndex: "selectedDate",
      key: "selectedDate",
      render: (item) => <span>{extractDate(item)}</span>,
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
          ) : (
            <span>{item}</span>
          )}
        </>
      ),
    },
    {
      title: "Cost",
      dataIndex: "charges",
      key: "charges",
      render: (value, item) => "$" + value,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (value, item, index) => (
        <AiOutlineEye
          style={{ fontSize: "18px", color: "grey", cursor: "pointer" }}
          onClick={() =>
            navigate(`/dropzoneLogs/${value}`)
          }
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
            { value: "UPCOMING", label: "Upcoming" },
            { value: "ONGOING", label: "Ongoing" },
            { value: "COMPLETED", label: "Completed" },
          ]}
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
                      <div className="profile-information-wrapper">
                        <h3 className="main-heading">
                          Drop Zone Reservation Logs
                        </h3>
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
                                          dataSource={loads}
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

export default DropZoneLogs;
