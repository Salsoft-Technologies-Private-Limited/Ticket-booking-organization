import { useState } from "react";
// import { images } from '../../../Assets'
// import { images } from '../../Assets';
import { Button, Modal, Image, Typography } from "antd";
import "./style.css";
import Done from "../../assets/done.png";

const Modals = ({open,handleOk,handleCancel,text,footer, okText , cancelText}) => {
  return (
    <div>
       <Modal
        open={open}
        onOk={() => handleOk()}
        onCancel={()=>handleCancel()}
        footer={footer}
        okText={okText}
        className="StyledModal"
        style={{
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
        cancelText={cancelText}
        cancelButtonProps={{
          className: "web-btn2",
        }}
        okButtonProps={{
          className: "web-btn2",
        }}
      >
        <Image src={Done} preview={false} width={80} height={80} />
        <Typography.Title level={2} style={{ fontSize: "16px" ,  fontFamily:'Qanelas', padding:"20px", fontWeight: 600}} >
         {text}
        </Typography.Title>
      </Modal>
    </div>
  );
};

export default Modals;
