import {
    StyledInput,
    StyledForm,
    StyledLoginForm,
    StyledLogoDiv,
    StyledImg,
    StyledInputContainer,
    StyledButtonDiv,
    SendCodeButton,
    EmailInputWrapper,
    StyledSignUpButton,
    VerificationWrapper,
    VerifyButton,
} from "../LoginPage/LoginPage.styles"
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

function SignUpPage() {
    const navi = useNavigate();
    const [showVerificationInput, setShowVerificationInput] = useState(false);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [isVerified, setIsVerified] = useState(false);
    // 추가 상태
    const [password, setPassword] = useState('');
    const [nickname, setNickname] = useState('');

    // 이메일 입력 핸들러
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // 인증코드 입력 핸들러
    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    // 비밀번호 입력 핸들러
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };


    // 닉네임 입력 핸들러
    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleSendCode = (e) => {
        e.preventDefault();

        // 이메일 유효성 검사 (trim()은 메서드이므로 ()가 필요)
        if (!email || !email.trim()) {
            alert('이메일을 입력해주세요.');
            return;
        }

        axios.post('http://localhost:80/mail/send', {
            email: email
        })
            .then(response => {
                console.log('인증코드 발송 성공:', response.data);
                setShowVerificationInput(true);
                toast.success('인증번호가 발송되었습니다. 이메일을 확인해주세요.');
            })
            .catch(error => {
                console.error('인증코드 발송 실패:', error);
                toast.error('인증코드 발송에 실패했습니다. 다시 시도해주세요.');
            });
    };

    const handleVerify = (e) => {
        e.preventDefault();


        if (!code || !code.trim()) {
            toast.error('인증코드를 입력해주세요.');
            return;
        }

        axios.post('http://localhost:80/mail/verify', {
            email: email,
            code: code
        })
            .then(response => {
                console.log('인증코드 확인 성공:', response.data);
                setIsVerified(true);
                toast.success('인증이 완료되었습니다.');
            })
            .catch(error => {
                console.error('인증코드 확인 실패:', error);
                toast.error('인증번호가 일치하지 않습니다. 다시 확인해주세요.');
            });
    };

    // 회원가입 요청 함수 추가
    const handleSignUp = (e) => {
        e.preventDefault();

        // 필요한 유효성 검사 추가
        if (!email || !password || !nickname) {
            toast.error('모든 항목을 입력해주세요.');
            return;
        }

        // 이메일 인증 확인 (옵션)
        if (!isVerified) {
            toast.error('이메일 인증이 필요합니다.');
            return;
        }

        // 회원가입 요청 데이터
        const memberData = {
            email: email,
            memberPw: password,
            memberNickname: nickname
            // 필요한 다른 회원 정보가 있다면 추가
        };

        // axios로 회원가입 요청
        axios.post('http://localhost:80/members', memberData)
            .then(response => {
                if (response.status === 201) {
                    toast.success('회원가입이 완료되었습니다!');
                    navi('/loginPage'); // 로그인 페이지로 이동
                }
            })
            .catch(error => {
                console.error('회원가입 실패:', error);
                if (error.response) {
                    // 서버에서 응답을 받았으나 오류 상태 코드인 경우
                    toast.error(`회원가입 실패: ${error.response.data.message || '오류가 발생했습니다.'}`);
                } else {
                    toast.error('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
                }
            });
    };

    return (
        <StyledForm className="forms" action="" onSubmit={(e) => e.preventDefault()}>
            <StyledLoginForm>
                <StyledLogoDiv>
                    <StyledImg src="/images/Logo.png" alt="전기충만 로고" onClick={() => navi("/")} />
                </StyledLogoDiv>

                <StyledInputContainer>
                    <EmailInputWrapper>
                        <StyledInput
                            className="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmailChange}
                            autoComplete="username"
                            placeholder="이메일"
                        />
                        <SendCodeButton
                            type="button"
                            onClick={handleSendCode}
                            disabled={isVerified}
                        >
                            인증코드
                        </SendCodeButton>
                    </EmailInputWrapper>

                    {showVerificationInput && (
                        <VerificationWrapper>
                            <StyledInput
                                type="text"
                                name="code"
                                value={code}
                                onChange={handleCodeChange}
                                placeholder="인증코드 입력"
                                disabled={isVerified}
                            />
                            <VerifyButton
                                type="button"
                                onClick={handleVerify}
                                disabled={isVerified}
                            >
                                확인
                            </VerifyButton>
                        </VerificationWrapper>
                    )}

                    <StyledInput
                        className="password"
                        type="password"
                        name="memberPw"
                        value={password}
                        onChange={handlePasswordChange}
                        autoComplete="new-password"
                        placeholder="비밀번호"
                    />
                    
                    <StyledInput
                        className="nickname"
                        type="text"
                        name="nickname"
                        value={nickname}
                        onChange={handleNicknameChange}
                        placeholder="닉네임"
                    />
                </StyledInputContainer>

                <StyledButtonDiv>
                    <StyledSignUpButton
                        type="button"
                        onClick={handleSignUp}
                    >
                        회원가입
                    </StyledSignUpButton>
                </StyledButtonDiv>
            </StyledLoginForm>
        </StyledForm>
    );
}

export default SignUpPage;