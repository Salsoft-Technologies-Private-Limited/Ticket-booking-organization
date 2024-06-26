import { useEffect, useState } from "react";
import { Image } from "antd";
import { MdMenu } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  Layout,
  Row,
  Col,
  Menu,
  Button,
  Badge,
  Modal,
  Drawer,
  Popover,
  Dropdown,
  Avatar,
  Typography,
  Input,
  Alert,
  message,
} from "antd";
import {
  FaBars,
  FaEllipsisV,
  FaUser,
  FaSignOutAlt,
  FaShoppingBag,
} from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { removeUser } from "../../redux/slice/authSlice";
import { clearCart } from "../../redux/slice/cartSlice";
import { IoIosChatbubbles } from "react-icons/io";
import {
  UPLOADS_URL,
  AUTH,
  NOTIFICATIONS,
  COMPANY,
} from "../../config/constants/api";
import { GoBellFill } from "react-icons/go";
import { useNavigate } from "react-router";
import { ImCross } from "react-icons/im";
import { AiFillCaretDown, AiFillApple } from "react-icons/ai";
import Logo from "../../assets/logo-header.png";
import avatar from "../../assets/avatar.png";
import { Get } from "../../config/api/get";
// import socket from "../../config/socket";
// import Link from 'next/link'
import { setCount } from "../../redux/slice/notificationSlice";
import swal from "sweetalert";
import { Put } from "../../config/api/put";

const { Header } = Layout;

const ClientHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const user = useSelector((state) => state.user.userData);
  const userData = useSelector((state) => state.user.userData);
  const cart = useSelector((state) => state.cart.cartItems);
  const token = useSelector((state) => state.user.userToken);
  const notificationsCount = useSelector((state) => state.notification.count);
  const cartCount = cart?.length;
  const [logoutModal, setLogoutModal] = useState(false);
  const [profile, setProfile] = useState(null);
  const handleLogout = () => {
    setLogoutModal(false);
    dispatch(removeUser());
    dispatch(clearCart());
    navigate("/login");
  };
  const [latestNotifications, setLatestNotifications] = useState(null);
  // useEffect(() => {
  //   getAllNotifications();
  // }, []);

  // useEffect(() => {
  //   socket.on("notification", (data) => {
  //     getAllNotifications();
  //   });
  //   return () => {
  //     socket.off("notification");
  //   };
  // }, []);
  const getAllNotifications = () => {
    Get(NOTIFICATIONS.getAllAdminNotifications, token, {
      page: "1",
      limit: "3",
      isRead: false,
    })
      .then((response) => {
        if (response?.status) {
          setLatestNotifications(response?.data?.notifications?.docs);
          dispatch(setCount(response?.data?.unreadCount));
        }
      })
      .catch((err) => {
        console.log("Error fetching notifications ", err);
      });
  };
  

  const items = [
    {
      key: "1",
      label: (
        <div
          className="headerDropdown"
          style={{
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            padding: "2px 8px",
          }}
          onClick={() => navigate("/profile")}
        >
          My Profile
          {/* <FaUser style={{ fontSize: "14px" }} /> &nbsp; My Profile */}
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          style={{
            fontSize: "14px",
            display: "flex",
            alignItems: "center",
            padding: "2px 8px",
          }}
          onClick={handleLogout}
        >
          Logout
        </div>
      ),
    },
  ];

  const content = (
    <div style={{ width: "350px" }}>
      <div
        style={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Notifications</h3>
        <Alert
          message={`${notificationsCount} New`}
          type="success"
          style={{ fontSize: "12px", padding: "2px 10px", color: "green" }}
        />
      </div>
      <hr
        style={{
          borderLeft: "none",
          borderBottom: "none",
          borderRight: "none",
          borderTop: "1px solid rgb(0 0 0 / 15%)",
        }}
      />
      <div style={{ height: "250px", overflow: "auto" }}>
        {latestNotifications &&
          latestNotifications.length > 0 &&
          latestNotifications.map((item) => {
            return (
              <div
                style={{
                  padding: 10,
                  minHeight: "100px",
                  borderBottom: "1px solid #dadada",
                  marginBottom: "5px",
                  cursor:'pointer',
                }}
                onClick={() => navigate("/notifications")}
              >
                <Row
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Col xs={4}>
                    <div
                      style={{
                        // padding: "10px 10px 10px 10px",

                        display: "flex",
                        width: "40px",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "40px",
                        backgroundColor: "#385790",
                        borderRadius: "5px",
                      }}
                    >
                      <GoBellFill
                        style={{ fontSize: "20px", color: "white" }}
                      />
                    </div>
                  </Col>
                  <Col xs={18}>
                    <Typography.Title
                      className="fontFamily1"
                      style={{ fontSize: "14px", color: "black", margin: 0 }}
                    >
                      {item.title}
                    </Typography.Title>

                    <Typography.Text
                      className="fontFamily1"
                      style={{ fontSize: "12px", color: "black", margin: 0 }}
                    >
                      {item?.content?.slice(0, 100)}{" "}
                      {item.content.length > 100 && "..."}
                    </Typography.Text>
                  </Col>
               
                </Row>
              </div>
            );
          })}
      </div>

      <hr
        style={{
          borderLeft: "none",
          borderBottom: "none",
          borderRight: "none",
          borderTop: "1px solid rgb(0 0 0 / 15%)",
        }}
      />

      <div
        style={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button onClick={() => navigate("/notifications")} type="link">
          View All
        </Button>
      </div>
    </div>
  );

  return (
    <Header
      style={{
        height: "auto",
        width: "100%",
        top: 0,
        zIndex: 20,
        padding: "0px",
        background: "#fff",
        scrollBehavior: "smooth",
      }}
    >
      <Row
        style={{
          padding: "5px 0",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col xs={24} md={22} lg={24}>
          <Row className="header-row">
            <Col xs={12} md={12} xl={3} className="" style={{textAlign:"center"}}>
              <Image
                preview={false}
                alt={"Failed to load image"}
                src={Logo}
                onClick={() => navigate("/")}
              />
            </Col>
            <Col xs={0} sm={0} xl={0} lg={0}>
              <Menu
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  backgroundColor: "transparent",
                }}
                mode="horizontal"
                className="header-menu hide-on-phone"
              >
                <Menu.Item
                  key="home"
                  className="hover"
                  onClick={() => navigate("/")}
                >
                  Home
                </Menu.Item>
                <Menu.Item
                  key="earlyyears"
                  className="hover"
                  onClick={() => navigate("/aboutUs")}
                >
                  About Us
                </Menu.Item>
                <Menu.Item
                  key="help"
                  className="hover"
                  onClick={() => navigate("/help")}
                >
                  Contact Us
                </Menu.Item>
                {/* <Menu.Item
                  key="jumpReservationLogs"
                  className="hover"
                  onClick={() => navigate("/jumpReservationLogos")}
                >
                  Log Book
                </Menu.Item>
                <Menu.Item
                  key="products"
                  className="hover"
                  onClick={() => navigate("/upcomingEvents")}
                >
                  Upcoming Events
                </Menu.Item> */}
              </Menu>
            </Col>

            <Col xs={12} lg={12} xl={21}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                }}
                className="header-find-box"
              >
                {!token ? (
                  <>
                    
                  </>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "right",
                      gap: "5%",
                    }}
                    className="header-btn-container"
                  >
                    <Popover
                      content={content}
                      placement="bottomRight"
                      arrow={false}
                      className="headerPopover"
                    >
                      <Badge
                        count={notificationsCount}
                        style={{
                          backgroundColor: "red",
                          padding: "0",
                          minWidth: "15px",
                          height: "15px",
                          fontSize: "10px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <GoBellFill
                          style={{ fontSize: "25px", color: "#000" }}
                        />
                      </Badge>
                    </Popover>
                    &emsp;
                    <div
                      style={{
                        minWidth: "220px",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        size={30}
                        src={
                          !userData?.image
                            ? avatar
                            : UPLOADS_URL + "/" + userData?.image
                        }
                      />

                      <Dropdown
                        menu={{
                          items,
                        }}
                        trigger={["click"]}
                        placement="bottomRight"
                      >
                        <p
                          style={{
                            marginLeft: 10,
                            fontSize: "16px",
                            textTransform: "capitalize",
                            color: "#000",
                          }}
                        >
                          {user?.firstName} <AiFillCaretDown fontSize={12} />{" "}
                        </p>
                      </Dropdown>
                    </div>
                  </div>
                )}
              </div>
            </Col>

            <Col xs={0} lg={0} xl={0} style={{ textAlign: "end" }}>
              <MdMenu
                style={{ fontSize: 26, color: "#000" }}
                onClick={() => setVisible(true)}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Drawer
        className="drawer"
        placement={"left"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={"drawer"}
      >
        <ImCross
          onClick={() => setVisible(false)}
          style={{
            fontSize: "18px",
            color: "#000",
            display: "block",
            cursor: "pointer",
            marginBottom: "14px",
          }}
        />
        <Image
          preview={false}
          alt={"Failed to load image"}
          width={100}
          height={100}
          src={Logo}
          style={{ maxWidth: 100 }}
        />
        <br />
        <br />
        <br />
        {!token ? (
          <span
            onClick={() => navigate("/login")}
            className="hover signin-link"
            key="products"
          >
            Login I Sign Up
          </span>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
            className="header-btn-container"
          >
            <Popover
              content={content}
              placement="bottomRight"
              arrow={false}
              className="headerPopover"
            >
              <Badge
                count={notificationsCount}
                style={{
                  backgroundColor: "red",
                  padding: "0",
                  minWidth: "15px",
                  height: "15px",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <GoBellFill style={{ fontSize: "25px", color: "#000" }} />
              </Badge>
            </Popover>
            &emsp;
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                size={40}
                src={
                  !userData?.image
                    ? "/images/avatar.png"
                    : UPLOADS_URL + "/" + userData.image
                }
              />

              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <p
                  style={{
                    marginLeft: 10,
                    fontSize: "16px",
                    textTransform: "capitalize",
                    color: "#000",
                  }}
                >
                  {user?.firstName} <AiFillCaretDown fontSize={12} />{" "}
                </p>
              </Dropdown>
            </div>
          </div>
        )}
        <Menu
          style={{
            fontSize: 18,
            fontWeight: 500,
            color: "#000",
          }}
          mode="inline"
          className="header-menu-mobile "
        >
          <Menu.Item
            key="home"
            className="hover fontFamily1"
            onClick={() => {
              setVisible(false);
              navigate("/");
            }}
          >
            Home
          </Menu.Item>
          <Menu.Item
            key="about"
            className="hover fontFamily1"
            onClick={() => {
              setVisible(false);
              navigate("/aboutUs");
            }}
          >
            About us
          </Menu.Item>
          <Menu.Item
            key="help"
            className="hover fontFamily1"
            onClick={() => {
              setVisible(false);
              navigate("/help");
            }}
          >
            Contact Us
          </Menu.Item>
        </Menu>
        <br />
        <br />
      </Drawer>
    </Header>
  );
};

export default ClientHeader;
