import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";

function StackedExample() {
  const navi = useNavigate();

  return (
    <Nav defaultActiveKey="/home" className="flex-column">
      <Nav.Link onClick={() => navi("/")}>시간별 렌터카</Nav.Link>
      <Nav.Link onClick={() => navi("/")}>장기 렌터카</Nav.Link>
      <Nav.Link onClick={() => navi("/")}>구독 렌터카</Nav.Link>
      <Nav.Link onClick={() => navi("/")}>등등</Nav.Link>
    </Nav>
  );
}
export default StackedExample;
