import { Col, Row, Card } from "antd";
const { Meta } = Card;

function SimilarColleges({ data }) {
  return (
    <Row justify="center">
      {data.map(({ name, _id, courses, city, state }) => (
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
  );
}

export default SimilarColleges;
