import { React, useEffect, useState } from "react";
import WebButton from "../../components/Buttons/WebButton";
import notibell from "../../assets/noti-bell.png";
import "./style.css";
import { Button, Image } from "antd";
import {
  incrementCount,
  decrementCount,
} from "../../redux/slice/notificationSlice";
import { Post } from "../../config/api/post";
import { useDispatch, useSelector } from "react-redux";
import { NOTIFICATIONS } from "../../config/constants/api";

const NotificationCard = (props) => {
  const token = useSelector((state) => state.user.userToken);
  const [notIsRead, setNotIsRead] = useState(props.read);
  const dispatch = useDispatch();
  const toggleNotification = () => {
    try {
      let _notifications = [...props.notificationState];
      Post(NOTIFICATIONS.toggleNotification + props.item._id, {}, token).then(
        (response) => {
          if (response?.status) {
            if (_notifications[props.index].isRead) {
              dispatch(incrementCount());
            } else {
              dispatch(decrementCount());
            }
            _notifications[props.index].isRead =
              !_notifications[props.index].isRead;
            props.setNotificationState(_notifications);
            setNotIsRead(!notIsRead);
          }
        }
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <div
        className={`notificationWrapper ${notIsRead ? "unread" : ""}`}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div className="for-notification-flex" key={props.id}>
          <div className="for-notification-flex">
            <div className="notificationImageIcon">
              <Image
                preview={false}
                alt={"Failed to load image"}
                src={notibell}
                className=""
              />
            </div>
            <div className="flex-grow-1">
              <p className="notificationText">{props?.text}</p>
              <div className="dateTime">
                <p className="p-sm theme-text-color mb-0"> {props?.date}</p>
                <span className="mx-2">|</span>
                <p className="p-sm theme-text-color mb-0"> {props?.time}</p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 text-end">
            <WebButton
              onClick={toggleNotification}
              variant={notIsRead ? "secondaryButton" : "primaryButton"}
              className="customButton2"
              text={notIsRead ? "Mark as Unread" : "Mark as Read"}
            />
          </div>
        </div>
        {props?.category === "companysignup" &&
          props?.item?.user?.status === "PENDING" && (
            <div style={{ textAlign: "end" }}>
              <Button
                className="web-btn"
                onClick={() => {
                  props.handleAccountApprove(props?.item?.user?._id, "ACTIVE");
                }}
              >
                Approve
              </Button>
            </div>
          )}
        {props?.category === "companysignup" &&
          props?.item?.user?.status !== "PENDING" && <p className="blue-text">Approved</p>}
      </div>
    </div>
  );
};

export default NotificationCard;
