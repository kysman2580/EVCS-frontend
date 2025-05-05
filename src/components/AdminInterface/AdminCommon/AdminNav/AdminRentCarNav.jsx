import { NavDiv, StyledHeaderBtn, NavRentContentDiv } from "./Nav.styles";
import { useNavigate } from "react-router-dom";

const RentCarNav = () => {
  const navi = useNavigate();

  return (
    <>
      <NavDiv>
        <NavRentContentDiv>
          <StyledHeaderBtn onClick={() => navi("/admin/carManagement")}>
            차종 관리
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/admin/rentCarManagement")}>
            렌트카 관리
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/admin/hotDealRentCar")}>
            핫딜 렌트카 관리
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/admin/garagePage")}>
            차고지 관리
          </StyledHeaderBtn>
        </NavRentContentDiv>
      </NavDiv>
    </>
  );
};
export default RentCarNav;
