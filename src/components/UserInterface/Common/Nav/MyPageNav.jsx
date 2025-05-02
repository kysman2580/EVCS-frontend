import { NavDiv, StyledHeaderBtn, NavRentContentDiv } from "./Nav.styles";
import { useNavigate } from "react-router-dom";

// prettier-ignore
const MyPageNav = () => {
    const navi = useNavigate();

    return (
        <>
            <NavDiv>
                <NavRentContentDiv>
                    <StyledHeaderBtn onClick={() => navi("/myPage")}>
                        내 정보
                    </StyledHeaderBtn>

                    <StyledHeaderBtn onClick={() => navi("/#")}>
                        내 리뷰
                    </StyledHeaderBtn>

                    <StyledHeaderBtn onClick={() => navi("/newsMyPage")}>
                        내 뉴스
                    </StyledHeaderBtn>

                    <StyledHeaderBtn onClick={() => navi("/#")}>
                        내 평점
                    </StyledHeaderBtn>

                    <StyledHeaderBtn onClick={() => navi("/#")}>
                        신고 내역
                    </StyledHeaderBtn>

                    <StyledHeaderBtn onClick={() => navi("/#")}>
                        구매 내역
                    </StyledHeaderBtn>
                </NavRentContentDiv>
            </NavDiv>
        </>

    );
};
export default MyPageNav;
