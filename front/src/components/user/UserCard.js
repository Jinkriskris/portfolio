import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";

function UserCard({
  user,
  setIsEditing,
  isEditable,
  isNetwork,
  setChangingPW,
}) {
  const navigate = useNavigate();

  const stateReset = () => {
    setIsEditing(true);
    setChangingPW(false);
  };

  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src="http://placekitten.com/250/250"
            alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        {/* optional 대신 ex) 스켈레톤 */}

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button variant="outline-info" size="sm" onClick={stateReset}>
                  편집
                </Button>
                <Button
                  className="ms-2"
                  variant="outline-info"
                  size="sm"
                  onClick={() => setChangingPW(true)}
                >
                  비밀번호 변경
                </Button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <Card.Link
            className="mt-3"
            href="#"
            onClick={() => navigate(`/users/${user.id}`)}
          >
            포트폴리오
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
