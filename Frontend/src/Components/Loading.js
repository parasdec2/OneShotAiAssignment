import { Spin } from "antd";
import React from "react";

function Loading() {
  return (
    <Spin
      tip="Loading..."
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ></Spin>
  );
}

export default Loading;
