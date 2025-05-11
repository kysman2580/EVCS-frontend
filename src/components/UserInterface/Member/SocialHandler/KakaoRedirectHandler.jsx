import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { toast } from "react-toastify";

function KakaoRedirectHandler() {
    const navigate = useNavigate();
    const { login } = useAuth();

    // KakaoRedirectHandler.jsx
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const nickname = decodeURIComponent(params.get("nickname"));
        const email = params.get("email");
        const memberNo = params.get("memberNo");
        const accessToken = decodeURIComponent(params.get("accessToken"));
        const refreshToken = decodeURIComponent(params.get("refreshToken"));

        if (nickname && email && memberNo && accessToken && refreshToken) {
            // 토큰 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            toast.success(`${nickname}님, 로그인 성공!`);
            login(email, nickname, memberNo, accessToken, refreshToken);

            // 로그인 성공 확인
            console.log("토큰 설정 완료:", accessToken.substring(0, 10) + "...");

            window.location.href = "/";
        } else {
            toast.error("로그인 실패");
            navigate("/loginPage");
        }
    }, [navigate, login]);

    return <div>로그인 처리 중입니다...</div>;
}

export default KakaoRedirectHandler;
