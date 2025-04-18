import Button from "react-bootstrap/Button";
import DriveRouteBoardNav from "../../../Common/Nav/DriveRouteBoardNav";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DriveEtaTwoToneIcon from "@mui/icons-material/DriveEtaTwoTone";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  H1,
  H3,
  Wrapper,
  ContentBox,
  NickName,
  Images,
  Img,
  Content,
  RentBodyDiv,
  RentContainerDiv,
  PostIcon,
  InsertButton,
  ModalWrapper,
  ModalLabel,
  ModalHeader,
  ModalContent,
  LeftContent,
  RightContent,
  ModalSubmit,
} from "./DRBoard.styles";

const DRBoard = () => {
  const [openModal, setOpenModal] = useState(false);
  const navi = useNavigate();

  return (
    <>
      <RentContainerDiv>
        <DriveRouteBoardNav />
        <RentBodyDiv>
          <H1>일상 공유 게시판</H1>

          <br />
          <br />

          <H3>당신의 일상과 드라이브 루트를 공유해보세요~</H3>

          <br />
          <InsertButton onClick={() => setOpenModal(true)}>
            <AddCircleOutlineRoundedIcon />
            게시물 작성하기
          </InsertButton>
          <br />

          <Wrapper onClick={() => setOpenModal(false)}>
            <ContentBox>
              <NickName>ksy1029 18시간 전</NickName>
              <Images>
                <Img src="images/calendar.png" alt="dk" />
              </Images>
              <PostIcon>
                <FavoriteBorderIcon style={{ marginRight: "10px" }} />
                <ChatIcon />
              </PostIcon>
              <Content>
                <div>
                  <div>여의나루 한강공원</div>
                  <div>한강라면 맛나게 먹음~~</div>
                </div>
                <div>
                  <div style={{ cursor: "pointer" }}>
                    <DriveEtaTwoToneIcon />
                    드라이브 코스 보기
                  </div>
                </div>
              </Content>
            </ContentBox>
            <ContentBox>
              <NickName>ksy1029 18시간 전</NickName>
              <Images>
                <Img src="images/calendar.png" alt="dk" />
              </Images>
              <PostIcon>
                <FavoriteBorderIcon style={{ marginRight: "10px" }} />
                <ChatIcon />
              </PostIcon>
              <Content>
                <div>
                  <div>여의나루 한강공원</div>
                  <div>한강라면 맛나게 먹음~~</div>
                </div>
                <div>
                  <div style={{ cursor: "pointer" }}>
                    <DriveEtaTwoToneIcon />
                    드라이브 코스 보기
                  </div>
                </div>
              </Content>
            </ContentBox>
          </Wrapper>

          {openModal && (
            <ModalWrapper onClick={() => setOpenModal(true)}>
              <ModalLabel>
                <ModalHeader>
                  새 게시물 만들기
                  <ModalSubmit>공유하기</ModalSubmit>
                </ModalHeader>
                <ModalContent>
                  <LeftContent>
                    <InsertPhotoRoundedIcon /> 사진을 선택해주세요
                  </LeftContent>
                  <RightContent>내용 작성</RightContent>
                </ModalContent>
              </ModalLabel>
            </ModalWrapper>
          )}
        </RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};
export default DRBoard;
