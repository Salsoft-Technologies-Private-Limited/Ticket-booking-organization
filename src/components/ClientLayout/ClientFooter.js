import { Col, Layout, Row, Input, Image } from "antd";
import Fotrlogo from "../../assets/fotrlogo.png";
import Facebook from "../../assets/facebook.png";
import Twitter from "../../assets/twitter.png";
import Icn3 from "../../assets/icn3.png";
import fb from "../../assets/fb.png";
import inst from "../../assets/inst.png";
import snap from "../../assets/snap.png";
import footerlogo from "../../assets/footer-logo.png";
import { useNavigate } from "react-router";

const { Footer } = Layout;
const { TextArea } = Input;
const { Search } = Input;

const options = [
  {
    value: "zhejiang",
    label: "Zhejiang",
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
  },
];
const ClientFooter = () => {
  const navigate = useNavigate();

  const ourProdutcimages3 = [Facebook, Twitter, Icn3];
  return (
    <footer className="ant-footer">
      <div className="ant-container-fluid">
        <Row justify="center">
          <Col lg={20}>
            <div className="footer-box ant-footer-box">
              <Row>
                <Col lg={24} xs={24}>
                  <div style={{ textAlign: "center" }}>
                    <Image
                      preview={false}
                      alt={"Failed to load image"}
                      src={footerlogo}
                      className=""
                    />
                  </div>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col lg={6} xs={24}>
                  <div className="for-footer-nav ant-for-footer-nav">
                    <ul className="brd-right">
                      <li>
                        <a onClick={() => navigate("/aboutUs")}>About us / Our VISIONARIES</a>
                      </li>
                      <li>
                        <a href="about.php">News</a>
                      </li>
                      <li>
                        <a href="news.php">FAQs</a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg={6} xs={24}>
                  <div className="for-footer-nav ant-for-footer-nav">
                    <ul className="brd-right">
                      <li>
                        <a href="index.php">Career</a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/help")}>Help</a>
                      </li>
                      <li>
                        <a onClick={() => navigate("/termsConditions")}>Terms & conditions</a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg={6} xs={24}>
                  <div className="for-footer-nav ant-for-footer-nav">
                    <ul className="brd-right">
                      <li>
                        <a href="index.php">Investor</a>
                      </li>
                      <li>
                        <a href="about.php">Relations Partnership</a>
                      </li>
                      <li>
                        <a href="news.php">Sitemap</a>
                      </li>
                    </ul>
                  </div>
                </Col>
                <Col lg={6} xs={24}>
                  <div className="for-footer-nav ant-for-footer-nav">
                    <ul>
                      <li>
                        <a onClick={() => navigate("/privacyPolicy")}>
                          Privacy Policy Sales & refund policy
                        </a>
                      </li>
                      <li>
                        <a href="about.php">Wind load Calculator</a>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={24} xs={24}>
                  <div className="social-links ant-social-links">
                    <a href="#_">
                      <Image
                        preview={false}
                        alt={"Failed to load image"}
                        src={fb}
                        className=""
                      />
                    </a>
                    <a href="#_">
                      <Image
                        preview={false}
                        alt={"Failed to load image"}
                        src={inst}
                        className=""
                      />
                    </a>
                    <a href="#_">
                      <Image
                        preview={false}
                        alt={"Failed to load image"}
                        src={snap}
                        className=""
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={24} xs={24}>
                  <p className="copyright-p ant-copyright-p">
                    Copyrights 2023 - All Rights Reserved - Jump Community
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default ClientFooter;
