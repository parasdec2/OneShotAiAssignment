import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
import {
  getCollegesByState,
  getCollegesByStream,
} from "../core/helperapicalls";
import { Link } from "react-router-dom";
const { Meta } = Card;

function StateColleges({ data, type }) {
  const [colleges, setColleges] = useState([]);

  useEffect(() => {
    const loadData = (data) => {
      if (type === "States") {
        getCollegesByState({ state: data })
          .then((data) => {
            setColleges(data);
          })
          .catch((err) => console.log(err));
      } else if (type === "Stream") {
        getCollegesByStream({ stream: data })
          .then((data) => {
            setColleges(data);
          })
          .catch((err) => console.log(err));
      }
    };

    loadData(data);
  }, [data]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Row justify="center">
        {colleges.map(({ name, _id, courses, city, state }) => (
          <Col span={6} id={_id} xs={7} md={4}>
            <Link to={`/college/${_id}`}>
              <Card hoverable style={{ width: 200, margin: "10px" }}>
                <Meta title={name} description={`${city}, ${state}`} />
                <h5>
                  {courses.map((course) => (
                    <span>{course} </span>
                  ))}
                </h5>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default StateColleges;
