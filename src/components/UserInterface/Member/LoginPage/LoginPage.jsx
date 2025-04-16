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
    Styled_N,
} from "./LoginPageStyled"



function LoginPage() {





    return (
        <StyledForm className="forms" action="">
            <StyledLoginForm>
                <StyledLogoDiv >
                    <StyledImg src="/images/Logo.png" alt="전기충만 로고" />
                </StyledLogoDiv>

                <StyledInputContainer>
                    <StyledInput className="email" type="email" name="name" autoComplete="username" placeholder="이메일" />
                    <StyledInput className="password" type="password" name="password" autoComplete="current-password" placeholder="비밀번호" />
                </StyledInputContainer>

                <StyledFindDiv>
                    <Styled_a href="">비밀번호 찾기</Styled_a>
                    <a className="stick">|</a>
                    <Styled_a href="">아이디 찾기</Styled_a>
                    <a className="stick">|</a>
                    <Styled_a href="">회원가입</Styled_a>
                </StyledFindDiv>

                <StyledButtonDiv>
                    <StyledLoginButton>
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