import React from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

function StudentsList({ data }) {
  return (
    <Row justify="center">
      {data.map(({ name, _id, skills }) => (
        <Col id={_id} xs={24} sm={12} md={8} lg={6} xl={4}>
          <Link to={`/student/${_id}`}>
            <Card
              hoverable
              style={{ width: "fitContent", margin: "10px" }}
              cover={
                <img
                  alt="example"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                />
              }
            >
              <Meta title={name} />
              <h5>
                {skills.map((course) => (
                  <span>{course} </span>
                ))}
              </h5>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}

export default StudentsList;
