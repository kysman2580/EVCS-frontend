import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
    FindContainer,
    FindTitle,
    FindSubtitle,
    FindForm,
    FindInput,
    FindButton,
    VerifyButton,
    FindLogoImg,
    VerifyField,
    AuthenticationBtn,
} from "../../Member/FindByPasswordPage/FindPwPage.styles"



const FindByPwPage = () => {
    const navi = useNavigate();

    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [showCodeInput, setShowCodeInput] = useState(false);

    const sendCode = (e) => {
        e.preventDefault();

        const sendCode = {
            email: email
        }

        axios.post('http://localhost:80/mail/password-reset', sendCode)
            .then(response => {
                console.log("뭐가 찍히나 : ", response.data);
                toast.success('인증코드 전송 성공!');
            })
            .catch(error => {
                console.error('코드 전송 실패!');
                if (error.response) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('뭐야 오류 발생');
                }
            });
        setShowCodeInput(true);
    };

    const codeVerify = (e) => {
        e.preventDefault();

        const sendCode = {
            email: email,
            code: code
        }

        axios.post('http://localhost:80/mail/password-verify', sendCode)
            .then(response => {
                console.log("뭐가 찍히나 : ", response.data);
                toast.success('인증 성공!');
                navi("/updatePwPage", { state: { email } }); // <-- 인증된 이메일 넘김

            })
            .catch(error => {
                console.error('인증 실패');
                if (error.response) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('알수 없는 오류 발생~');
                }
            })
    };






    return (
        <FindContainer>
            <FindLogoImg src="/images/Logo.png" />
            <FindSubtitle>비밀번호를 찾고자하는 이메일을 입력해주세요.</FindSubtitle>
            <FindForm onSubmit={sendCode}>
                <FindInput
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {showCodeInput && (
                    <VerifyField>
                        <FindInput
                            type="text"
                            placeholder="인증번호를 입력하세요"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                        <AuthenticationBtn onClick={codeVerify}>확인</AuthenticationBtn>
                    </VerifyField>
                )}
                <FindButton type="submit" onClick={() => navi('/updatePwPage')}>
                    {showCodeInput ? "다음" : "인증코드 전송"}
                </FindButton>


            </FindForm>
        </FindContainer>
    )
}

export default FindByPwPage;