import styled from "styled-components";

export const H1 = styled.h1`
  margin-left: 200px;
`;

export const H3 = styled.h3`
  margin-left: 400px;
`;

export const InsertButton = styled.div`
  width: 200px;
  float: right;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  margin: 30px auto;
`;
export const ContentBox = styled.div`
  width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
`;

export const NickName = styled.div`
  margin-top: 30px;
`;

export const Images = styled.div`
  width: 100%;
  height: 70%;
  margin: 10px auto;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  margin: 10px auto;
`;

export const Content = styled.div`
  margin: 10px 20px;
  display: flex;
  justify-content: space-between;
`;

export const PostIcon = styled.div`
  margin: 10px;
`;

export const RentBodyDiv = styled.div`
  width: 90%;
  height: auto;
  margin-top: 30px;
`;

export const RentContainerDiv = styled.div`
  border-top: 1px solid #a0a0a0;
  display: flex;
`;

// 게시물 만들기 모달

export const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
`;

export const CloseBtn = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 80px;
  margin-right: 30px;
  cursor: pointer;
  color: white;
`;

export const ModalLabel = styled.div`
  width: 1000px;
  height: 700px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 1000;
  border: 1px solid grey;
`;

export const ModalHeader = styled.div`
  display: flex;
  height: 5%;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 100%;
  font-weight: bold;
  border-bottom: 1px solid black;
`;

export const ModalSubmit = styled.button`
  width: 20%;
  text-align: right;
  margin-right: 10px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #2962ff;
  font-weight: bold;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  display: flex;
  height: 95%;
  border: 1px solid black;
  font-weight: bold;
`;

export const LeftContent = styled.div`
  border: 1px solid black;
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

export const RightContent = styled.div`
  border: 1px solid black;
  width: 40%;
  height: 100%;
  font-weight: bold;
`;

export const DriveRoute = styled.div`
  height: 5%;
  border: 1px solid black;
`;

export const DriveContent = styled.div`
  height: 95%;
  border: 1px solid black;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
`;

// 댓글 모달달
export const SeeDriveRoute = styled.div`
  height: 5%;
`;
export const Comments = styled.div`
  height: 80%;
`;

export const InsertComment = styled.div`
  height: 15%;
  display: flex;
  border-top: 1px solid black;
`;

export const Commentarea = styled.textarea`
  width: 80%;
  border: none;
`;

export const CommentSubmit = styled.div`
  height: 20%;
  border: none;
  color: #2962ff;
  font-weight: bold;
`;
