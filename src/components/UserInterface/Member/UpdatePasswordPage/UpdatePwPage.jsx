import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
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


const UpdatePwPage = () => {
    const navi = useNavigate();
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const location = useLocation();
    const email = location.state?.email;

    console.log("넘겨받은 이메일:", email);

    const updatePw = (e) => {
        e.preventDefault();

        const updatePw = {
            email: email,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        }

        axios.post('http://localhost:80/mail/password-verify', updatePw)
            .then(response => {
                console.log("찎찎 : ", response.data);
                toast.success('비밀번호 변경 성공!!');
            })
            .catch(error => {
                console.error('변경 실패!');
                if (error.response) {
                    toast.error(error.response.data.message);
                } else {
                    toast.error('뭐야 오류 발생');
                }
            });
    };



    return (
        <FindContainer>
            <FindLogoImg src="/images/Logo.png" />
            <FindSubtitle>새롭게 변경할 비밀번호를 입력해주세요.</FindSubtitle>
            <FindForm>
                <FindInput
                    type="password"
                    placeholder="신규 비밀번호를 입력해주세요."
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />

                <FindInput
                    type="password"
                    placeholder="신규 비밀번호를  재입력해주세요."
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <FindButton type="submit">변경</FindButton>
            </FindForm>
        </FindContainer>
    )
}

export default UpdatePwPage;