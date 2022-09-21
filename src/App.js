import { Layout, Typography, Menu, Breadcrumb, message } from "antd";
import React, { useState } from "react";
import Papa from "papaparse";
import Table from "./components/Table";
function App() {
  const { Header, Footer, Sider, Content } = Layout;
  const { Title } = Typography;
  const [data, setData] = useState([]);
  return (
    <div className="App">
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Title style={{ color: "white", margin: "2px" }} level={2}>
            Ennea Solutions - GuruF
          </Title>
        </Header>
        <Layout>
          <Layout>
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Upload</Breadcrumb.Item>
                <Breadcrumb.Item>CSV</Breadcrumb.Item>
              </Breadcrumb>
              <input
                style={{ marginBottom: "10px" }}
                type="file"
                accept=".csv"
                onChange={(e) => {
                  const files = e.target.files;
                  if (!files[0].type.includes("csv")) {
                    message.error(
                      "XLSX File is Not Supported, Please Upload a CSV File"
                    );
                    return;
                  }
                  if (files) {
                    message.success("File Uploaded");
                    Papa.parse(files[0], {
                      header: true,
                      dynamicTyping: true,
                      skipEmptyLines: true,
                      complete: function (results) {
                        message.success("File Parsed Successfully");
                        setData(results.data);
                      },
                    });
                  }
                }}
              />
              <Table data={data} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
