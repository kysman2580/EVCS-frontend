import {
    StyledInput,
    StyledForm,
    StyledFindDiv,
    Styled_a,
    StyledLoginForm,
    StyledLogoDiv,
    StyledImg,
    StyledInputContainer,
    StyledLoginButton,
    StyledButtonDiv,
    StyledSocialDiv,
    StyledSocialImg,
    StyledNaverButton,
    Styled_N
} from "./LoginPage.styles"
import "./LoginPage.css"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { toast } from 'react-toastify';
import { useEffect } from "react";




function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }


    const handleLogin = (e) => {
        e.preventDefault();

        const loginData = {
            email: email,
            memberPw: password
        }

        axios.post('http://localhost:80/auth/login', loginData)
            .then(response => {
                console.log("로그인 응답 데이터:", response.data);
                const { email, memberName, memberNo, refreshToken, accessToken } = response.data;
                login(email, memberName, memberNo, refreshToken, accessToken);

                alert('로그인 성공!');
                window.location.href = "/";
            })
            .catch(error => {
                // 서버에서 반환된 응답이 있을 경우 처리
                if (error.response) {
                    // 400번 오류 처리 (예: 계정이 잠금 상태인 경우)
                    if (error.response.status === 400) {
                        const errorMessage = error.response.data.message;
                        toast.error(errorMessage || "로그인 실패");
                    }
                    // 401번 오류 처리 (예: 인증 실패)
                    else if (error.response.status === 401) {
                        toast.error("아이디 또는 비밀번호를 잘못 입력하셨습니다.");
                    }
                    // 기타 상태 코드 처리
                    else {
                        toast.error(error.response.data.message || "알 수 없는 오류가 발생했습니다.");
                    }
                }
                // 서버 응답이 없을 경우
                else {
                    toast.error('알 수 없는 오류가 발생했습니다.');
                }
            });
    };



    const handleKakaoLogin = () => {
        window.location.href = "http://localhost:80/auth/login/kakao";
    }



    return (
        <StyledForm className="forms" onSubmit={handleLogin}>
            <StyledLoginForm>
                <StyledLogoDiv >
                    <StyledImg src="/images/Logo.png" alt="전기충만 로고" onClick={() => navigate("/")} />
                </StyledLogoDiv>

                <StyledInputContainer>
                    <StyledInput
                        className="email"
                        type="email"
                        name="name"
                        value={email}
                        onChange={handleEmailChange}
                        autoComplete="username"
                        placeholder="이메일" />
                    <StyledInput
                        className="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        autoComplete="current-password"
                        placeholder="비밀번호" />
                </StyledInputContainer>

                <StyledFindDiv>
                    <Styled_a onClick={() => navigate("/findByPwPage")}>비밀번호 찾기</Styled_a>
                    <a className="stick">|</a>
                    <Styled_a onClick={() => navigate("/signUpPage")}>회원가입</Styled_a>
                </StyledFindDiv>

                <StyledButtonDiv>
                    <StyledLoginButton type="button" onClick={handleLogin}>
                        로그인
                    </StyledLoginButton>
                </StyledButtonDiv>

                <StyledSocialDiv>
                    <StyledSocialImg onClick={handleKakaoLogin} src="/images/kakao_login_button.png" />
                    <StyledNaverButton>
                        <Styled_N id="Big_N">N</Styled_N> 네이버 로그인
                    </StyledNaverButton>
                </StyledSocialDiv>


            </StyledLoginForm>
        </StyledForm>

    )
};

export default LoginPage;