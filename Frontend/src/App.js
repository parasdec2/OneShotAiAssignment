import React from "react";
import "antd/dist/antd.css";
import { Layout } from "antd";
import { HomeFilled } from "@ant-design/icons";
import Dashboard from "./Components/Dashboard";
import College from "./Components/College";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Student from "./Components/Student";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout
      style={{
        backgroundColor: "#001529",
      }}
    >
      <Header
        style={{
          padding: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a href="/">
          <HomeFilled style={{ fontSize: "30px" }} />
        </a>
      </Header>
      <Content
        className="site-layout-background"
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: "100vh",
        }}
      >
        <Router>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/college/:collegeId" component={College} />
            <Route exact path="/student/:studentId" component={Student} />
          </Switch>
        </Router>
      </Content>
    </Layout>
  );
}

export default App;
