import Button from "react-bootstrap/Button";
import DriveRouteBoardNav from "../../../Common/Nav/DriveRouteBoardNav";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DriveEtaTwoToneIcon from "@mui/icons-material/DriveEtaTwoTone";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
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
  CloseBtn,
  DriveRoute,
  DriveContent,
  Textarea,
  SeeDriveRoute,
  Comments,
  CommentSubmit,
  InsertComment,
  Commentarea,
} from "./DRBoard.styles";

const DRBoard = () => {
  const [openContentModal, setOpenContentModal] = useState(false);
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [heart, setHeart] = useState(false);
  const navi = useNavigate();

  return (
    <>
      <RentContainerDiv>
        {!openContentModal && !openCommentModal && <DriveRouteBoardNav />}
        <RentBodyDiv>
          <H1>일상 공유 게시판</H1>

          <br />
          <br />

          <H3>당신의 일상과 드라이브 루트를 공유해보세요~</H3>

          <br />
          <InsertButton onClick={() => setOpenContentModal(true)}>
            <AddBoxOutlinedIcon /> <bsnp />
            게시물 만들기
          </InsertButton>
          <br />

          <Wrapper>
            <ContentBox>
              <NickName>ksy1029 18시간 전</NickName>
              <Images>
                <Img src="images/calendar.png" alt="dk" />
              </Images>
              <PostIcon>
                {heart ? (
                  <FavoriteRoundedIcon
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => setHeart(false)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => setHeart(true)}
                  />
                )}
                <ChatIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpenCommentModal(true)}
                />
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
                <FavoriteBorderIcon
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                <ChatIcon
                  onClick={() => setOpenCommentModal(true)}
                  style={{ cursor: "pointer" }}
                />
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

          {openContentModal && (
            <ModalWrapper>
              <CloseBtn onClick={() => setOpenContentModal(false)}>
                <CloseRoundedIcon style={{ fontSize: "40px" }} />
              </CloseBtn>
              <ModalLabel>
                <ModalHeader>
                  새 게시물 만들기
                  <ModalSubmit>공유하기</ModalSubmit>
                </ModalHeader>
                <ModalContent>
                  <LeftContent>
                    <InsertPhotoRoundedIcon /> 사진을 선택해주세요
                  </LeftContent>
                  <RightContent>
                    <DriveRoute>드라이브 루트 선택하기</DriveRoute>
                    <DriveContent>
                      <Textarea type="text" placeholder="내용을 작성해주세요" />
                    </DriveContent>
                  </RightContent>
                </ModalContent>
              </ModalLabel>
            </ModalWrapper>
          )}

          {openCommentModal && (
            <ModalWrapper>
              <CloseBtn onClick={() => setOpenCommentModal(false)}>
                <CloseRoundedIcon style={{ fontSize: "40px" }} />
              </CloseBtn>
              <ModalLabel>
                <ModalContent>
                  <LeftContent>
                    <InsertPhotoRoundedIcon /> 사진
                  </LeftContent>
                  <RightContent>
                    <SeeDriveRoute>드라이브 루트 보기</SeeDriveRoute>
                    <Comments>댓글댓글글</Comments>
                    <InsertComment>
                      <Commentarea type="text" placeholder="댓글 달기.." />
                      <CommentSubmit>게시</CommentSubmit>
                    </InsertComment>
                  </RightContent>
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
