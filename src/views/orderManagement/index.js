import { Layout } from "antd";
import MyorderInfo from "../../views/orderManagement/myorderInfo";

function DropZone() {

  return (
    <Layout
      className=""
      style={{ backgroundColor: "transparent", minHeight: "100vh" }}
    >
      <MyorderInfo />
    </Layout>
  );
}

export default DropZone;
