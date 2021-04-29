import { Card } from "antd";
import React, { useState, useEffect } from "react";
import { getStudentById } from "../core/helperapicalls";
import Loading from "./Loading";

function Student({ match }) {
  const [student, setStudent] = useState(null);

  const loadData = () => {
    getStudentById(match.params.studentId)
      .then((data) => {
        setStudent(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {student ? (
        <Card
          hoverable
          style={{ margin: "10px", width: "300px" }}
          cover={
            <img
              alt="example"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              height="300px"
              width="300px"
            />
          }
        >
          <h3>{student?.name}</h3>
          <h3>{student?.batch}</h3>
          <h3>{student?.collegeName}</h3>
          <h3>
            {student?.skills?.map((skill) => (
              <span>{skill} </span>
            ))}
          </h3>
        </Card>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Student;
