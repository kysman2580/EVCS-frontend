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




function LoginPage() {
    const navi = useNavigate();
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
                const { email, memberName, memberNo, refreshToken, accessToken } = response.data;
                login(email, memberName, memberNo, refreshToken, accessToken);

                alert('로그인 성공~~');
                window.location.href = "/";
            })
            .catch(error => {
                console.error('로그인 실패 : ', error);
                if (error.response) {
                    alert(`회원가입 실패 : ${error.response.data.message || '오류가 발생했습니다.'}`);
                } else {
                    alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
                }
            });
    };






    return (
        <StyledForm className="forms" action="">
            <StyledLoginForm>
                <StyledLogoDiv >
                    <StyledImg src="/images/Logo.png" alt="전기충만 로고" onClick={() => navi("/")} />
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
                    <Styled_a onClick={() => navi("/findByPwPage")}>비밀번호 찾기</Styled_a>
                    <a className="stick">|</a>
                    <Styled_a href="">아이디 찾기</Styled_a>
                    <a className="stick">|</a>
                    <Styled_a href="">회원가입</Styled_a>
                </StyledFindDiv>

                <StyledButtonDiv>
                    <StyledLoginButton type="button" onClick={handleLogin}>
                        로그인
                    </StyledLoginButton>
                </StyledButtonDiv>

                <StyledSocialDiv>
                    <StyledSocialImg src="/images/kakao_login_button.png" />
                    <StyledNaverButton>
                        <Styled_N id="Big_N">N</Styled_N> 네이버 로그인</StyledNaverButton>
                </StyledSocialDiv>


            </StyledLoginForm>
        </StyledForm>

    )
};

export default LoginPage;