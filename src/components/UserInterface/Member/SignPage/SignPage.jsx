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
    SendCodeButton,
    EmailInputWrapper,
} from "../LoginPage/LoginPage.styles"
import { useNavigate } from "react-router-dom";





function SignUpPage() {

    const navi = useNavigate();





    return (
        <StyledForm className="forms" action="">
            <StyledLoginForm>
                <StyledLogoDiv >
                    <StyledImg src="/images/Logo.png" alt="전기충만 로고" onClick={() => navi("/")} />
                </StyledLogoDiv>

                <StyledInputContainer>
                    <EmailInputWrapper>
                        <StyledInput className="email" type="email" name="name" autoComplete="username" placeholder="이메일" />
                        <SendCodeButton>인증코드</SendCodeButton>
                    </EmailInputWrapper>
                    <StyledInput className="password" type="password" name="password" autoComplete="current-password" placeholder="비밀번호" />
                    <StyledInput className="password-check" type="password" name="password" autoComplete="current-password" placeholder="비밀번호 확인" />
                    <StyledInput className="niackName" type="name" placeholder="닉네임"></StyledInput>
                </StyledInputContainer>

                <StyledButtonDiv>
                    <StyledLoginButton>회원가입</StyledLoginButton>
                </StyledButtonDiv>

            </StyledLoginForm>
        </StyledForm>

    )
};

export default SignUpPage;