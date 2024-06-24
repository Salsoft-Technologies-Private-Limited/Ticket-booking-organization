// import { useEffect, useRef, useState } from "react";
// import { Col, Row, Button, Image, Divider } from "antd";
// import { useLocation, useNavigate } from "react-router";
// import { useSelector } from "react-redux";
// import { STAY, UPLOADS_URL } from "../../config/constants/api";
// import DashbordSidebar from "../../components/DashboardSidebar";
// import { FaArrowLeftLong, FaLocationDot } from "react-icons/fa6";
// import { ImSpoonKnife } from "react-icons/im";
// import { GiWashingMachine } from "react-icons/gi";
// import {
//   MdOutlineShareLocation,
//   MdAirportShuttle,
//   MdFitnessCenter,
//   MdOutlineRestaurantMenu,
// } from "react-icons/md";
// import {
//   FaBuilding,
//   FaSnowflake,
//   FaWifi,
//   FaParking,
//   FaSwimmingPool,
//   FaSpa,
// } from "react-icons/fa";
// import { Tb24Hours } from "react-icons/tb";
// import phoneimg from "../../assets/phone-img.png";
// import emailimg from "../../assets/email-img.png";
// import { Put } from "../../config/api/put";
// import swal from "sweetalert";
// import Slider from "react-slick";

// const StayUserDetails = () => {
//   const [allImages, setAllImages] = useState(null);
//   const [isBanned, setIsBanned] = useState(false);
//   const token = useSelector((state) => state.user.userToken);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const stay = location?.state?.stay;

//   useEffect(() => {
//     if (!stay) {
//       navigate(-1);
//     } else {
//       setAllImages([stay?.stayProfile?.image, ...stay?.stayProfile?.gallery]);
//     }
//   }, []);
//   const amenityIcons = {
//     "Kitchen": <ImSpoonKnife />,
//     "Washer": <GiWashingMachine />,
//     "Air Conditioner": <FaSnowflake />,
//     "Wifi": <FaWifi />,
//     "Parking": <FaParking />,
//     "Airport Shuttle": <MdAirportShuttle />,
//     "Swimming Pool": <FaSwimmingPool />,
//     "Fitness Center": <MdFitnessCenter />,
//     "Spa and Wellness": <FaSpa />,
//     "Restaurant": <MdOutlineRestaurantMenu />,
//     "24-Hour Front Desk": <Tb24Hours />,
//   };
//   const amenityOptions = [
//     {
//       label: "Kitchen",
//       value: "Kitchen",
//       image: <ImSpoonKnife />,
//     },
//     {
//       label: "Washer",
//       value: "Washer",
//       image: <GiWashingMachine />,
//     },
//     {
//       label: "Air Conditioner",
//       value: "Air Conditioner",
//       image: <FaSnowflake />,
//     },
//   ];
//   const banStay = (id, status) => {
//     Put(`${STAY.toggleStay}${id}`, token, { status })
//       .then((response) => {
//         if (response.status) {
//           swal("System Alert!", response?.message, "success");
//           setIsBanned(!isBanned);
//         }
//       })
//       .catch((err) => {
//         let message = err?.response?.data?.message;
//         console.log(":::;", err);
//         if (message) swal("Oops!", message, "error");
//       });
//   };

//   const [nav1, setNav1] = useState(null);
//   const [nav2, setNav2] = useState(null);

//   const slider1 = useRef(null);
//   const slider2 = useRef(null);

//   useEffect(() => {
//     setNav1(slider1.current);
//     setNav2(slider2.current);
//   }, [slider1?.current, slider2?.current, allImages]);
//   const sliderSettings = {
//     arrows: false,
//     // other settings...
//   };
//   const sliderSettings2 = {
//     // arrows: false,
//     // style: {
//     //   margin: "20px",
//     // },
//   };
//   return (
//     <div className="shop-page">
//       <Row style={{ width: "100%", justifyContent: "center" }}>
//         <Col xs={24} md={24}>
//           <div className="shop-page-main">
//             <Row gutter={[16, 16]}>
//               <Col xs={24} md={24} lg={24} xl={24}>
//                 <div className="my-account-profile">
//                   <section className="side-menu-parent">
//                     <DashbordSidebar />
//                     <div className="about-us-section">
//                       {stay && (
//                         <div className="bg-parent">
//                           <Row
//                             align={"middle"}
//                             style={{
//                               marginBottom: "15px",
//                               width: "100%",
//                               justifyContent: "space-between",
//                             }}
//                           >
//                             <Col lg={14} md={12} xs={24}>
//                               <div class="arrow-box2">
//                                 <div>
//                                   <FaArrowLeftLong
//                                     className="arrow"
//                                     onClick={() => navigate(-1)}
//                                   />
//                                 </div>
//                                 <h3 className="heading-28">
//                                   Stay User Details
//                                 </h3>
//                               </div>
//                             </Col>
//                             <Col
//                               lg={10}
//                               md={12}
//                               xs={24}
//                               style={{ textAlign: "end" }}
//                             >
//                               <Button
//                                 type=""
//                                 className="web-btn"
//                                 onClick={() => {
//                                   if (isBanned) {
//                                     banStay(stay._id, "ACTIVE");
//                                   } else {
//                                     banStay(stay._id, "INACTIVE");
//                                   }
//                                 }}
//                               >
//                                 {isBanned ? "UNBAN USER" : "BAN USER"}
//                               </Button>
//                             </Col>
//                           </Row>
//                           <Row
//                             gutter={[16, 16]}
//                             align={"middle"}
//                             justify={"space-between"}
//                           >
//                             <Col xs={12} md={8} lg={6} xl={6}>
//                               <div className="wrapper-group-1000001858">
//                                 <img
//                                   src={UPLOADS_URL + stay?.stayProfile?.image}
//                                   alt=""
//                                   className="img-fluid"
//                                   style={{ width: "100%" }}
//                                 />
//                               </div>
//                             </Col>
//                             <Col xs={24} md={16} lg={16} xl={18}>
//                               <div className="">
//                                 <div className="">
//                                   <h4 className="booking-card-name">
//                                     {stay?.firstName + " " + stay.lastName}
//                                   </h4>
//                                   <div className="for-flex-gap">
//                                     <div
//                                       className="jump-inner-detail"
//                                       style={{ gap: "10px" }}
//                                     >
//                                       <Image
//                                         preview={false}
//                                         alt={"Failed to load image"}
//                                         src={phoneimg}
//                                         className=""
//                                       />
//                                       <h4 className="text-16">
//                                         {stay?.mobile}
//                                       </h4>
//                                     </div>
//                                     <div
//                                       className="jump-inner-detail"
//                                       style={{ gap: "10px" }}
//                                     >
//                                       <Image
//                                         preview={false}
//                                         alt={"Failed to load image"}
//                                         src={emailimg}
//                                         className=""
//                                       />
//                                       <h4 className="text-16">{stay?.email}</h4>
//                                     </div>
//                                   </div>
//                                   <div className="frame-group">
//                                     <div className="">
//                                       <Button
//                                         type=""
//                                         block
//                                         size={"large"}
//                                         style={{ marginBottom: "10px" }}
//                                         className="web-btn"
//                                         onClick={() => navigate("/staysManagement/reservationLogs")}
//                                       >
//                                         View Reservation
//                                       </Button>
//                                     </div>
//                                     <div className="">
//                                       <Button
//                                         type=""
//                                         block
//                                         size={"large"}
//                                         style={{ marginBottom: "10px" }}
//                                         className="web-btn2"
//                                         onClick={() =>
//                                           navigate(
//                                             "/staysManagement/viewRooms/",
//                                             { state: { companyId: stay._id } }
//                                           )
//                                         }
//                                       >
//                                         View Rooms
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </Col>
//                           </Row>
//                         </div>
//                       )}

//                       <div className="bg-parent" style={{ marginTop: "30px" }}>
//                         <Row align="middle" gutter={16}>
//                           <Col lg={10}>
//                             <div
//                               className="one-product"
//                               style={{ paddingRight: "30px" }}
//                             >
//                               <div className="search-img">
//                                 <div>
//                                   <Slider
//                                     asNavFor={nav2}
//                                     ref={slider1}
//                                     {...sliderSettings}
//                                   >
//                                     {Array.isArray(allImages) &&
//                                       allImages.map((image, index) => {
//                                         return (
//                                           <div key={index}>
//                                             <span>
//                                               <img
//                                                 src={UPLOADS_URL + image}
//                                                 alt=""
//                                                 className="img-fluid"
//                                                 style={{
//                                                   width: "100%",
//                                                   maxHeight: "300px",
//                                                   objectFit: "cover",
//                                                   objectPosition: "center",
//                                                 }}
//                                               />
//                                             </span>
//                                           </div>
//                                         );
//                                       })}
//                                   </Slider>
//                                   <Slider
//                                     asNavFor={nav1}
//                                     ref={slider2}
//                                     slidesToShow={
//                                       stay?.stayProfile?.gallery?.length
//                                     }
//                                     swipeToSlide={true}
//                                     focusOnSelect={true}
//                                     {...sliderSettings2}
//                                   >
//                                     {Array.isArray(allImages) &&
//                                       allImages.map((image, index) => {
//                                         return (
//                                           <div
//                                             key={index}
//                                             className="slider-nav"
//                                           >
//                                             <span>
//                                               <img
//                                                 src={UPLOADS_URL + image}
//                                                 alt=""
//                                                 className="img-fluid"
//                                                 style={{
//                                                   width: "100%",
//                                                   height: "90px",
//                                                   objectFit: "cover",
//                                                   objectPosition: "center",
//                                                   maxWidth: "150px",
//                                                 }}
//                                               />
//                                             </span>
//                                           </div>
//                                         );
//                                       })}
//                                   </Slider>
//                                 </div>
//                               </div>
//                             </div>
//                           </Col>
//                           <Col lg={14}>
//                             <div className="">
//                               <div>
//                                 <h4 className="text-26">
//                                   {stay?.firstName + " " + stay?.lastName}
//                                 </h4>
//                                 <p className="web-p">
//                                   {stay?.stayProfile?.description}
//                                 </p>
//                               </div>
//                             </div>
//                             <Divider dashed />
//                             <div className="jump-inner-detail">
//                               <div>
//                                 <h6>Location</h6>
//                                 <p>
//                                   <FaLocationDot />{" "}
//                                   {stay?.stayProfile?.location?.address +
//                                     ", " +
//                                     stay?.stayProfile?.location?.street +
//                                     " " +
//                                     stay?.stayProfile?.location?.state}
//                                 </p>
//                               </div>

//                               <div>
//                                 <h6>City</h6>
//                                 <p>
//                                   <FaBuilding />{" "}
//                                   {stay?.stayProfile?.location?.city}
//                                 </p>
//                               </div>

//                               <div>
//                                 <h6>Country</h6>
//                                 <p>
//                                   <MdOutlineShareLocation />{" "}
//                                   {stay?.stayProfile?.location?.country}
//                                 </p>
//                               </div>
//                             </div>
//                             <h6 className="booking-card-name">Amenities</h6>
//                             <div
//                               className="jump-inner-detail"
//                               style={{ padding: "5px 0" }}
//                             >
//                               {stay?.amenitiesInfo?.map((element, index) => {
//                                 return (
//                                   <div>
//                                     <p>
//                                       {amenityIcons[element.title]}{" "}
//                                       {element.title}
//                                     </p>
//                                   </div>
//                                 );
//                               })}
//                             </div>
//                           </Col>
//                         </Row>
//                       </div>
//                     </div>
//                   </section>
//                 </div>
//               </Col>
//             </Row>
//           </div>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default StayUserDetails;
import { useEffect, useRef, useState } from "react";
import { Col, Row, Button, Image, Divider } from "antd";
import { useLocation, useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import { COMPANY, STAY, UPLOADS_URL } from "../../config/constants/api";
import DashbordSidebar from "../../components/DashboardSidebar";
import { extractDate } from "../../config/helpers";
import { Get } from "../../config/api/get";
import { staysManagementDate } from "../../components/Data/data";
import {
  FaArrowLeftLong,
  FaLocationDot,
  FaParachuteBox,
} from "react-icons/fa6";
import { ImSpoonKnife } from "react-icons/im";
import { GiWashingMachine } from "react-icons/gi";
import { MdOutlineShareLocation } from "react-icons/md";
import { FaBuilding, FaSnowflake } from "react-icons/fa";
import phoneimg from "../../assets/phone-img.png";
import emailimg from "../../assets/email-img.png";
import roomimg from "../../assets/main-p.png";
import { Put } from "../../config/api/put";
import swal from "sweetalert";
import Slider from "react-slick";

const StayUserDetails = () => {
  const [isBanned, setIsBanned] = useState(false);
  const token = useSelector((state) => state.user.userToken);
  const navigate = useNavigate();
  const location = useLocation();
  const stay = location?.state?.stay;
  // useEffect(() => {
  //   if (!stay) {
  //     navigate(-1);
  //   }
  // }, []);
  const banStay = (id, status) => {
    Put(`${STAY.toggleStay}${id}`, token, { status })
      .then((response) => {
        console.log(response);
        if (response.status) {
          swal("System Alert!", response?.message, "success");
          setIsBanned(!isBanned);
        }
      })
      .catch((err) => {
        let message = err?.response?.data?.message;
        console.log(":::;", err);
        if (message) swal("Oops!", message, "error");
      });
  };

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);
  const sliderSettings = {
    arrows: false,
    // other settings...
  };
  const sliderSettings2 = {
    // arrows: false,
    // style: {
    //   margin: "20px",
    // },
  };
  return (
    <div className="shop-page">
      <Row style={{ justifyContent: "center" }}>
        <Col xs={24} md={24}>
          <div className="shop-page-main">
            <Row>
              <Col xs={24} md={24} lg={24} xl={24}>
                <div className="my-account-profile">
                  <section className="side-menu-parent">
                    <DashbordSidebar />
                    <div className="about-us-section">
                      {stay && (
                        <div className="bg-parent">
                          <Row
                            align={"middle"}
                            style={{
                              marginBottom: "15px",
                              width: "100%",
                              justifyContent: "space-between",
                            }}
                          >
                            <Col lg={14} md={12} xs={24}>
                              <div class="arrow-box2">
                                <div>
                                  <FaArrowLeftLong
                                    className="arrow"
                                    onClick={() => navigate(-1)}
                                  />
                                </div>
                                <h3 className="heading-28">
                                  Stay User Details
                                </h3>
                              </div>
                            </Col>
                            <Col
                              lg={10}
                              md={12}
                              xs={24}
                              style={{ textAlign: "end" }}
                            >
                              <Button
                                type=""
                                className="web-btn"
                                onClick={() => {
                                  if (isBanned) {
                                    banStay(stay._id, "ACTIVE");
                                  } else {
                                    banStay(stay._id, "INACTIVE");
                                  }
                                }}
                              >
                                {isBanned ? "UNBAN USER" : "BAN USER"}
                              </Button>
                            </Col>
                          </Row>
                          <Row
                            gutter={[16, 16]}
                            align={"middle"}
                            justify={"space-between"}
                          >
                            <Col xs={12} md={8} lg={6} xl={6}>
                              <div className="wrapper-group-1000001858">
                                <img
                                  src={UPLOADS_URL + stay?.stayProfile?.image}
                                  alt=""
                                  className="img-fluid"
                                  style={{ width: "100%" }}
                                />
                              </div>
                            </Col>
                            <Col xs={24} md={16} lg={16} xl={18}>
                              <div className="">
                                <div className="">
                                  <h4 className="booking-card-name">
                                    {stay?.firstName + " " + stay.lastName}
                                  </h4>
                                  <div className="for-flex-gap">
                                    <div
                                      className="jump-inner-detail"
                                      style={{ gap: "10px" }}
                                    >
                                      <Image
                                        preview={false}
                                        alt={"Failed to load image"}
                                        src={phoneimg}
                                        className=""
                                      />
                                      <h4 className="text-16">
                                        {stay?.mobile}
                                      </h4>
                                    </div>
                                    <div
                                      className="jump-inner-detail"
                                      style={{ gap: "10px" }}
                                    >
                                      <Image
                                        preview={false}
                                        alt={"Failed to load image"}
                                        src={emailimg}
                                        className=""
                                      />
                                      <h4 className="text-16">{stay?.email}</h4>
                                    </div>
                                  </div>
                                  <div className="frame-group">
                                    <div className="">
                                      <Button
                                        type=""
                                        block
                                        size={"large"}
                                        style={{ marginBottom: "10px" }}
                                        className="web-btn"
                                        onClick={() => navigate("/editProfile")}
                                      >
                                        View Reservation
                                      </Button>
                                    </div>
                                    <div className="">
                                      <Button
                                        type=""
                                        block
                                        size={"large"}
                                        style={{ marginBottom: "10px" }}
                                        className="web-btn2"
                                        onClick={() =>
                                          navigate(
                                            "/staysManagement/viewRooms"
                                          )
                                        }
                                      >
                                        View Rooms
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      )}

                      <div className="bg-parent" style={{marginTop:"30px"}}>
                        <Row align="middle" gutter={16}>
                          <Col lg={10}>
                            <div
                              className="one-product"
                              style={{ paddingRight: "30px" }}
                            >
                              <div className="search-img">
                                <div>
                                  <Slider
                                    asNavFor={nav2}
                                    ref={slider1}
                                    {...sliderSettings}
                                  >
                                    <div>
                                      <span>
                                        <Image
                                          preview={false}
                                          alt={"Failed to load image"}
                                          src={roomimg}
                                          className=""
                                        />
                                      </span>
                                    </div>
                                    <div>
                                      <span>
                                        <Image
                                          preview={false}
                                          alt={"Failed to load image"}
                                          src={roomimg}
                                          className=""
                                        />
                                      </span>
                                    </div>
                                    <div>
                                      <span>
                                        <Image
                                          preview={false}
                                          alt={"Failed to load image"}
                                          src={roomimg}
                                          className=""
                                        />
                                      </span>
                                    </div>
                                    <div>
                                      <span>
                                        <Image
                                          preview={false}
                                          alt={"Failed to load image"}
                                          src={roomimg}
                                          className=""
                                        />
                                      </span>
                                    </div>
                                    <div>
                                      <span>
                                        <Image
                                          preview={false}
                                          alt={"Failed to load image"}
                                          src={roomimg}
                                          className=""
                                        />
                                      </span>
                                    </div>
                                    <div>
                                      <span>
                                        <Image
                                          preview={false}
                                          alt={"Failed to load image"}
                                          src={roomimg}
                                          className=""
                                        />
                                      </span>
                                    </div>
                                  </Slider>
                                  <Slider
                                    asNavFor={nav1}
                                    ref={slider2}
                                    slidesToShow={4}
                                    swipeToSlide={true}
                                    focusOnSelect={true}
                                    {...sliderSettings2}
                                  >
                                    <div className="slider-nav">
                                      <span>
                                        <Image
                                          preview={false}
                                          alt={"Failed to load image"}
                                          src={roomimg}
                                          className=""
                                        />
                                      </span>
                                    </div>
                                    <div className="slider-nav">
                                      <span>
                                        <Image
                                          preview={false}
                                          alt={"Failed to load image"}
                                          src={roomimg}
                                          className=""
                                        />
                                      </span>
                                    </div>
                                    <div className="slider-nav">
                                      <span>
                                        <Image
                                          preview={false}
                                          alt={"Failed to load image"}
                                          src={roomimg}
                                          className=""
                                        />
                                      </span>
                                    </div>
                                    <div className="slider-nav">
                                      <span>
                                        <Image
                                          preview={false}
                                          alt={"Failed to load image"}
                                          src={roomimg}
                                          className=""
                                        />
                                      </span>
                                    </div>
                                    <div className="slider-nav">
                                      <span>
                                        <Image
                                          preview={false}
                                          alt={"Failed to load image"}
                                          src={roomimg}
                                          className=""
                                        />
                                      </span>
                                    </div>
                                    <div className="slider-nav">
                                      <span>
                                        <Image
                                          preview={false}
                                          alt={"Failed to load image"}
                                          src={roomimg}
                                          className=""
                                        />
                                      </span>
                                    </div>
                                  </Slider>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col lg={14}>
                            <div className="">
                              <div>
                                <h4 className="text-26">
                                  Stella Stays Mesmerising
                                </h4>
                                <p className="web-p">
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry. Lorem Ipsum
                                  has been the industry's standard dummy text
                                  ever since the when an unknown printer took a
                                  galley of type and scrambled it to make a type
                                  specimen book. <br />
                                  <br />
                                  It has survived not only five centuries, but
                                  also the leap into electronic typesetting,
                                  remaining essentially unchanged.
                                </p>
                              </div>
                            </div>
                            <Divider dashed />
                            <div className="jump-inner-detail">
                              <div>
                                <h6>Location</h6>
                                <p>
                                  <FaLocationDot /> ABC road, 123 street New
                                  York
                                </p>
                              </div>

                              <div>
                                <h6>City</h6>
                                <p>
                                  <FaBuilding /> Rome
                                </p>
                              </div>

                              <div>
                                <h6>Country</h6>
                                <p>
                                  <MdOutlineShareLocation /> Italy
                                </p>
                              </div>
                            </div>
                            <h6 className="booking-card-name">Amenities</h6>
                            <div className="jump-inner-detail" style={{padding:"5px 0"}}>
                              <div>
                                <p>
                                <ImSpoonKnife /> Kitchen
                                </p>
                              </div>
                              <div>
                                <p>
                                <GiWashingMachine /> Washer
                                </p>
                              </div>
                              <div>
                                <p>
                                <FaSnowflake /> Air Conditioner
                                </p>
                              </div>
                            </div>
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

export default StayUserDetails;
