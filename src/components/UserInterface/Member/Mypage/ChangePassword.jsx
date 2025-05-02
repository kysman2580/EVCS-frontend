import MyPageNav from "../../Common/Nav/MyPageNav";
import {
    Form,
    MyPageDiv,
    Container,
    Title,
    Description,
    PwInput,
    ButtonGroup,
    PwButton,
    PwCancelButton,
    CaptionText,
    CaptchaControl,


} from "../../Member/Mypage/MyPage.styles";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


const ChangePasswordPage = () => {







    return (
        <MyPageDiv>
            <MyPageNav />
            <Container>
                <Title>비밀번호 변경</Title>
                <Description>
                    안전한 비밀번호로 내정보를 보호하세요
                    <br />
                    <span> 다른 아이디/사이트에서 사용한 적 없는 비밀번호</span>
                    <br />
                    <span> 이전에 사용한 적 없는 비밀번호가 안전합니다.</span>
                </Description>

                <PwInput type="password" placeholder="현재 비밀번호" />
                <PwInput type="password" placeholder="새 비밀번호" />
                <PwInput type="password" placeholder="새 비밀번호 확인" />

                <ButtonGroup>
                    <PwButton>확인</PwButton>
                    <PwCancelButton>취소</PwCancelButton>
                </ButtonGroup>
            </Container>
        </MyPageDiv>


    )
}

export default ChangePasswordPage;
