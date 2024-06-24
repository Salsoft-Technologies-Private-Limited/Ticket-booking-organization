import { useEffect, useRef, useState } from "react";
import { Col, Row, Card, Spin, Button } from "antd";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeftLong } from "react-icons/fa6";
import DashbordSidebar from "../../components/DashboardSidebar";
import { marketplaceData } from "../../components/Data/data";
import Slider from "react-slick";
import { PRODUCT, UPLOADS_URL } from "../../config/constants/api";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { Get } from "../../config/api/get";
import { Delete } from "../../config/api/delete";
import { useSelector } from "react-redux";
import swal from "sweetalert";

const ProductDetails = () => {
  const { id } = useParams();
  const [marketplace, setMarketplace] = useState(
    marketplaceData.find((item) => item.id == id)
  );
  const navigate = useNavigate();
  const { Meta } = Card;
  const [loading, setLoading] = useState(true);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [allImages, setAllImages] = useState(null);
  const [productDetails, setProductDetails] = useState(null);
  const token = useSelector((state) => state.user.userToken);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const sliderSettings = {
    arrows: false,
  };
  const sliderSettings2 = {};
  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, [slider1?.current, slider2?.current, allImages]);
  const getProductDetails = () => {
    setLoading(true);
    Get(`${PRODUCT.getProduct}${id}`, token)
      .then((response) => {
        setProductDetails(response?.data);
        setAllImages([response?.data?.image, ...response?.data?.gallery]);
      })
      .catch((err) => {
        console.log("Error Fetching Product Details", err);
      });
    setLoading(false);
  };
  useEffect(() => {
    getProductDetails();
  }, []);
  const handleDelete = (id) => {
    Delete(`${PRODUCT.deleteProduct}${id}`, token)
      .then((response) => {
        if (response?.status) {
          swal("System Alert!", response?.message, "success");
          navigate("/productManagement");
        }
      })
      .catch((err) => {
        console.log(err);
        const message = err?.response?.data?.message;
        if (message) {
          swal("Oops!", message, "error");
        }
      });
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
                        <Row align={"middle"} style={{ marginBottom: "15px" }}>
                          <Col lg={24}>
                            <div className="arrow-box2">
                              <div>
                                <FaArrowLeftLong
                                  className="arrow"
                                  onClick={() => navigate(-1)}
                                />
                              </div>
                              <h3 className="heading-28">
                                Marketplace Product Details
                              </h3>
                            </div>
                            <div className="delete-and-edit">
                              <Button
                                type="danger"
                                className="edit-btn"
                                style={{ padding: "5px" }}
                                onClick={() =>
                                  navigate("/editProduct")
                                }
                                // onClick={() =>
                                //   navigate(
                                //     `/upcomingEvents/editProduct/${upcomingEvent._id}`,
                                //     { state: { upcomingEvent } }
                                //   )
                                // }
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                type="danger"
                                className="delete-btn"
                                onClick={() => handleDelete(productDetails._id)}
                              >
                                <RiDeleteBin6Line />
                              </Button>
                            </div>
                          </Col>
                        </Row>
                        {!loading ? (
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
                                      {Array.isArray(allImages) &&
                                        allImages.map((image, index) => {
                                          return (
                                            <div
                                              className="gray-bg"
                                              key={index}
                                            >
                                              <span>
                                                {" "}
                                                <img
                                                  src={UPLOADS_URL + image}
                                                  alt=""
                                                  className="img-fluid"
                                                  style={{ width: "100%" }}
                                                />
                                              </span>
                                            </div>
                                          );
                                        })}
                                    </Slider>
                                    <Slider
                                      asNavFor={nav1}
                                      ref={slider2}
                                      slidesToShow={
                                        productDetails?.gallery?.length
                                      }
                                      swipeToSlide={true}
                                      focusOnSelect={true}
                                      {...sliderSettings2}
                                    >
                                      {Array.isArray(allImages) &&
                                        allImages.map((image, index) => {
                                          return (
                                            <div
                                              key={index}
                                              className="slider-nav"
                                            >
                                              <span>
                                                <img
                                                  src={UPLOADS_URL + image}
                                                  alt=""
                                                  className="img-fluid"
                                                  style={{
                                                    width: "100%",
                                                    height: "90px",
                                                    objectFit: "cover",
                                                    objectPosition: "center",
                                                    maxWidth: "150px",
                                                  }}
                                                />
                                              </span>
                                            </div>
                                          );
                                        })}
                                    </Slider>
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col lg={14}>
                              <div
                                className="room-details"
                                style={{ paddingBottom: "0" }}
                              >
                                <div>
                                  <h4 className="text-26">
                                    {productDetails?.title}
                                  </h4>
                                </div>
                                <div className="search-result-detail-btnbox">
                                  <h6 className="per-day-price">
                                    ${productDetails?.price + ".00"}
                                  </h6>
                                </div>
                              </div>
                              <div className="search-img-box-right additional-details">
                                <h5 className="heading-18">Description</h5>
                                <p className="web-p">
                                  {productDetails?.description}
                                </p>
                              </div>
                            </Col>
                          </Row>
                        ) : (
                          <Row align="middle" gutter={16}>
                            <Col
                              lg={19}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "150px 0px",
                              }}
                            >
                              <Spin />
                            </Col>
                          </Row>
                        )}
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

export default ProductDetails;
