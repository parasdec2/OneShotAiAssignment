import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import CanvasJSReact from "../canvasjs.react";
import { getStats } from "../core/helperapicalls";
import Colleges from "./Colleges";
import Loading from "./Loading";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Dashboard() {
  const [states, setStates] = useState([]);
  const [stream, setStream] = useState([]);
  const [showColleges, setShowColleges] = useState(false);
  const [dataSelected, setDataSelected] = useState(null);
  const [type, setType] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    getStats()
      .then((data) => {
        setStates(data.collegesByStates);
        setStream(data.collegesByStream);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Col>
        {!loading ? (
          <Row>
            <Col xs={24} md={11}>
              {Array.isArray(states) && states.length && (
                <Pie
                  data={states}
                  title={"State"}
                  dataSelected={setDataSelected}
                  showColleges={setShowColleges}
                  type={setType}
                />
              )}
            </Col>
            <Col xs={24} md={2}></Col>
            <Col xs={24} md={11}>
              {Array.isArray(stream) && stream.length && (
                <Pie
                  data={stream}
                  title={"Stream"}
                  dataSelected={setDataSelected}
                  showColleges={setShowColleges}
                  type={setType}
                />
              )}
            </Col>
          </Row>
        ) : (
          <Loading />
        )}
      </Col>

      {showColleges && <Colleges data={dataSelected} type={type} />}
    </div>
  );
}

export default Dashboard;

const Pie = ({ data, title, showColleges, dataSelected, type }) => {
  const dataList = [];
  data.map(({ _id, count }) => {
    dataList.push({
      y: count,
      x: 1,
      label: _id,
      click: function (e) {
        title === "State" ? type("States") : type("Stream");
        dataSelected(e.dataPoint.label);
        showColleges(true);
      },
    });
  });

  const options = {
    animationEnabled: true,
    title: {
      text: `${title} wise distribution of colleges`,
    },
    data: [
      {
        type: "pie",
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        dataPoints: dataList,
      },
    ],
  };
  return (
    <div style={{ padding: "10px 0px" }}>
      <CanvasJSChart options={options} />
    </div>
  );
};
