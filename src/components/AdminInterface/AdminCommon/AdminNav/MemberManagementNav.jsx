import { NavDiv, StyledHeaderBtn, NavRentContentDiv } from "./Nav.styles";
import { useNavigate } from "react-router-dom";

const MemberManagementNav = () => {
    const navi = useNavigate();

    return (
        <>
            <NavDiv>
                <NavRentContentDiv>
                    <StyledHeaderBtn onClick={() => navi("/admin/adminReport")}>
                        회원 신고 관리
                    </StyledHeaderBtn>
                    <StyledHeaderBtn onClick={() => navi("/admin/adminReport")}>
                        2
                    </StyledHeaderBtn>
                    <StyledHeaderBtn onClick={() => navi("/admin/adminReport")}>
                        3
                    </StyledHeaderBtn>
                </NavRentContentDiv>
            </NavDiv>
        </>
    );
};
export default MemberManagementNav;
