import React, { useEffect, useState } from "react";

import { Card, Col, Row } from "antd";
import {
  getCollegesByState,
  getCollegesByStream,
} from "../core/helperapicalls";
import Loading from "./Loading";
const { Meta } = Card;

function Colleges({ data, type }) {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = (data) => {
    if (type === "States") {
      getCollegesByState({ state: data })
        .then((data) => {
          setColleges(data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    } else if (type === "Stream") {
      getCollegesByStream({ stream: data })
        .then((data) => {
          setColleges(data);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    loadData(data);
  }, [data]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {!loading ? (
        <Row justify="center">
          {colleges.map(({ name, _id, courses, city, state }) => (
            <Col id={_id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <a href={`/college/${_id}`}>
                <Card hoverable style={{ width: "fitContent", margin: "10px" }}>
                  <Meta title={name} description={`${city}, ${state}`} />
                  <h5>
                    {courses.map((course) => (
                      <span>{course} </span>
                    ))}
                  </h5>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Colleges;
