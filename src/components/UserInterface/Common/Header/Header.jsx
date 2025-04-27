import {
  StyledHeaderDiv,
  StyledHomeDiv,
  StyledHeaderBtn,
  StyledHomeCenterDiv,
  StyledMemberDiv,
  StyledLogoDiv,
  LogoImg,
  NavLink,
} from "./Header.styles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";


const Header = () => {
  const navi = useNavigate();
  const { auth, logout } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (auth.user && auth.user.isAuthenticated) {
      checkAdminRole();
    }
  }, [auth.user]);

  const checkAdminRole = () => {
    const accessToken = auth.user.accessToken;
    console.log("권한 확인 요청 시작", { token: accessToken });

    axios.get("http://localhost:80/admin/user/info", {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        console.log("권한 확인 응답:", response.data);
        setIsAdmin(response.data && response.data.isAdmin);
      })
      .catch((error) => {
        console.error("권한 확인 중 오류 발생:", error);
        setIsAdmin(false);
      });
  };



  const handleAdminAccess = () => {

    const accessToken = auth.user.accessToken;

    axios.post("http://localhost:80/admin", {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then((response) => {
        if (response.status === 200) {
          alert('관리자 페이지 이동');
          navi("/admin/main")
        }
      }).catch((error) => {
        if (error.response && error.response.status === 403) {
          toast.error("관리자만 접속할 수 있습니다.");
        } else {
          toast.error("오류가 발생했습니다.");
        }
      });
  };





  return (
    <>
      <StyledHeaderDiv>
        <StyledLogoDiv>
          <NavLink onClick={() => navi("/")}>
            <LogoImg src="/images/Logo.png" />
          </NavLink>
        </StyledLogoDiv>
        <StyledHomeCenterDiv>
          <StyledHeaderBtn onClick={() => navi("/timerentalPage")}>
            렌트카
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/driveRouteBoard")}>
            커뮤니티
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/chargingMap")}>
            충전소 조회
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/newsMain")}>
            뉴스
          </StyledHeaderBtn>
          <StyledHeaderBtn onClick={() => navi("/notice")}>
            공지사항
          </StyledHeaderBtn>
        </StyledHomeCenterDiv>
        <StyledMemberDiv>
          {auth.user.isAuthenticated ? (
            <>
              <StyledHeaderBtn>{auth.user.memberName}님</StyledHeaderBtn>
              <StyledHeaderBtn onClick={logout}>로그아웃</StyledHeaderBtn>
              <StyledHeaderBtn>아이콘</StyledHeaderBtn>
              {isAdmin && (
                <StyledHeaderBtn onClick={handleAdminAccess}>
                  관리자페이지로
                </StyledHeaderBtn>
              )}
            </>
          ) : (
            <>
              <StyledHeaderBtn onClick={() => navi("/loginPage")}>
                로그인
              </StyledHeaderBtn>
              <StyledHeaderBtn onClick={() => navi("/signUpPage")}>
                회원가입
              </StyledHeaderBtn>
            </>
          )}
        </StyledMemberDiv>
      </StyledHeaderDiv>
    </>
  );
};

export default Header;
