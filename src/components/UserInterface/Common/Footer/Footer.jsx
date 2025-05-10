import React from "react";
import {
  FooterWrapper,
  FooterContent,
  FooterTitle,
  FooterSubtitle,
  FooterText,
  FooterList,
  FooterListItem,
  FooterLink,
  FooterBottom,
  Copyright,
} from "./Footer.styles";

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterContent>
        <div>
          <FooterTitle>전기충만</FooterTitle>
          <FooterText>어디서든 시작하는 렌트 서비스</FooterText>
        </div>
        <div>
          <FooterSubtitle>회사 정보</FooterSubtitle>
          <FooterList>
            <FooterListItem>주소: 서울특별시 중구</FooterListItem>
            <FooterListItem>전화: 02-123-4567</FooterListItem>
            <FooterListItem>이메일: info@rentCar.com</FooterListItem>
          </FooterList>
        </div>
        <div>
          <FooterSubtitle>서비스</FooterSubtitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="#">렌트 서비스</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">예약 방법</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">자주 묻는 질문</FooterLink>
            </FooterListItem>
          </FooterList>
        </div>
        <div>
          <FooterSubtitle>고객 지원</FooterSubtitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="#">고객센터</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">문의하기</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">개인정보처리방침</FooterLink>
            </FooterListItem>
          </FooterList>
        </div>
      </FooterContent>
      <FooterBottom>
        <Copyright>© 2025 Zero-Rent. All rights reserved.</Copyright>
      </FooterBottom>
    </FooterWrapper>
  );
}
