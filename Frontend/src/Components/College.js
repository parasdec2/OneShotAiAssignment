import React, { useState, useEffect } from "react";

import { Tabs } from "antd";
import StudentsList from "./StudentsList";
import AboutCollege from "./AboutCollege";
import { getCollege } from "../core/helperapicalls";
import SimilarColleges from "./SimilarColleges";
import Loading from "./Loading";

const { TabPane } = Tabs;

function College({ match }) {
  const [about, setAbout] = useState(null);
  const [students, setStudents] = useState(null);
  const [colleges, setColleges] = useState(null);

  const loadData = () => {
    getCollege(match.params.collegeId)
      .then((data) => {
        setAbout(data.college);
        setStudents(data.students);
        setColleges(data.similar);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Tabs defaultActiveKey="1" centered>
      <TabPane tab="About" key="1">
        {about ? <AboutCollege data={about} /> : <Loading />}
      </TabPane>
      <TabPane tab="Students" key="2">
        {students ? <StudentsList data={students} /> : <Loading />}
      </TabPane>
      <TabPane tab="Similar Colleges" key="3">
        {colleges ? <SimilarColleges data={colleges} /> : <Loading />}
      </TabPane>
    </Tabs>
  );
}

export default College;
