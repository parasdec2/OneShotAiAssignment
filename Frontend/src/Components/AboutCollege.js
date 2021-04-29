import { Card } from "antd";
import React from "react";

function AboutCollege({ data }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        hoverable
        style={{ width: "300px", padding: "10px" }}
        cover={
          <img
            alt="example"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            height="300px"
            width="300px"
          />
        }
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>{data?.name}</h3>
          <h3>Founded in {data?.year}</h3>
          <h3>{data?.collegeName}</h3>
          <h3>
            Courses offered :
            {data?.courses?.map((course) => (
              <span>{course} </span>
            ))}
          </h3>
          <h3>No. of students : {data?.studentCount}</h3>
          <h3> Address :</h3>
          <h3>
            {" "}
            {data?.city},{data?.state},{data?.country}
          </h3>
        </div>
      </Card>
    </div>
  );
}

export default AboutCollege;
