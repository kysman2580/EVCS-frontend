import MyPageNav from "../../Common/Nav/MyPageNav";
import {
    Form,
    MyPageDiv,
    TitleH1,
    TitleDiv,
    InputGroup,
    InputLabel,
    StyledInput,
    InputWrap,
    SubmitButton,
    SubmitWrapDiv,
    DeleteButton,
    RatingDiv,
    ChangeButton,
    InputWrapByPassword,
    DeleteButtonWrap,


} from "../../Member/Mypage/MyPage.styles";
import { useNavigate } from "react-router-dom";
import { use, useEffect, useState } from 'react';
import axios from "axios";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import { toast } from 'react-toastify';
import RatingGauge from "./RatingGauge";


const MyPage = () => {
    const { auth } = useAuth();
    const userRating = 3.7; // 임시 값, 나중에 지우형한테 값 받아와야함.
    const navi = useNavigate();




    return (
        <MyPageDiv>
            <MyPageNav />
            <Form>
                <TitleDiv>
                    <TitleH1>내 정보</TitleH1>
                </TitleDiv>

                <InputGroup>
                    {auth.user.isAuthenticated && (
                        <>
                            <InputWrap>
                                <InputLabel>닉네임</InputLabel>
                                <StyledInput id="name" type="text" name="nickName" value={auth.user.memberName} />
                            </InputWrap>

                            <InputWrap>
                                <InputLabel>이메일</InputLabel>
                                <StyledInput id="name" type="text" name="email" value={auth.user.email} />
                            </InputWrap>

                            <InputWrapByPassword>
                                <InputLabel>비밀번호
                                    <ChangeButton type="button" onClick={() => navi("/changePasswordPage")}>수정</ChangeButton>
                                </InputLabel>
                            </InputWrapByPassword>

                            <InputWrap>
                                <InputLabel>ㅇㅅㅇ</InputLabel>
                                <StyledInput id="name" type="text" />
                            </InputWrap>
                        </>

                    )}

                    <SubmitWrapDiv>
                        <SubmitButton>정보 수정</SubmitButton>
                    </SubmitWrapDiv>
                    <DeleteButtonWrap>
                        <DeleteButton>회원 탈퇴</DeleteButton>
                    </DeleteButtonWrap>
                </InputGroup>
            </Form>
            <RatingDiv>
                <RatingGauge rating={userRating} />
            </RatingDiv>
        </MyPageDiv>
    )

};

export default MyPage;