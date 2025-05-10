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
  margin: 50px auto;
`;
export const ContentBox = styled.div`
  position: relative;
  width: 500px;
  background: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const NickName = styled.div`
  padding: 15px;
  font-weight: bold;
  font-size: 15px;
`;

export const Images = styled.div`
  width: 100%;
  height: auto;
  .slider-container img {
    border-radius: 0;
    width: 100%;
    max-height: 500px;
    object-fit: cover;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  margin: 10px auto;
`;

export const Content = styled.div`
  margin: 0 15px 15px 15px;
  font-size: 14px;
  line-height: 1.6;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${({ expanded }) => (expanded ? "unset" : 2)};
  -webkit-box-orient: vertical;
  position: relative;
`;

export const PostIcon = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  gap: 12px;
  font-size: 22px;
`;
export const DriveRouteIcon = styled.div`
  margin-left: 253px;
  gap: 12px;
  font-size: 22px;
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
  border-radius: 2rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  height: 5%;
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

export const ModalBack = styled.div`
  width: 20%;
  text-align: right;
  margin-right: 10px;
  position: absolute;
  right: 100px;
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
  font-weight: bold;
`;

export const LeftContent = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;
export const LeftComment = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ddd;
  padding: 20px;
  box-sizing: border-box;
  background-color: #fafafa;
`;

export const BoardImage = styled.div`
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export const BoardContent = styled.div`
  margin-top: 20px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  font-size: 16px;
  line-height: 1.6;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  white-space: pre-wrap;
`;
export const DriveRoute = styled.div`
  height: 100%;
  width: 100%;
  border-left: 1px solid black;
  text-align: center;
`;
export const RightContent = styled.div`
  width: 40%;
  height: 100%;
  font-weight: bold;
`;

export const MapImg = styled.img`
  margin-top: 75px;
  width: 500px;
  height: 500px;
  border: 1px solid black;
`;

export const DriveContent = styled.div`
  height: 100%;
  border-left: 1px solid black;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 90%;
  border: none;
  resize: none;
  &:focus {
    outline: none;
    border: none;
  }
`;

// 댓글 모달달

export const CommentModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
`;

export const CommentModalLabel = styled.div`
  width: 1200px;
  height: 900px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  overflow: hidden; /* 바깥 스크롤 제거 */
  border-radius: 1rem;
`;
export const SeeDriveRoute = styled.div`
  height: 3%;
  text-align: center;
  align-items: center;
  font-weight: bold;
  border-bottom: 1px solid black;
  font-size: 20px;
`;
export const Comments = styled.div`
  height: 85%;
  overflow-y: auto;
  padding: 10px 15px;
  background-color: transparent;

  /* 스크롤바 투명하게 */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1); /* 연한 회색 */
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const InsertComment = styled.div`
  height: 10%;
  display: flex;
  border-top: 1px solid #ddd;
  padding: 10px;
  background-color: #f9f9f9;
`;

export const Commentarea = styled.textarea`
  width: 80%;
  border: none;
  padding: 10px;
  font-size: 14px;
  border-radius: 8px;
  background-color: #f1f3f5;
  resize: none;

  &:focus {
    outline: none;
  }
`;

export const CommentSubmit = styled.div`
  padding: 10px 15px;
  color: #2962ff;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ModalDriveRoute = styled.div`
  margin: 10px;
`;
export const ModalDriveRouteImg = styled.img`
  width: 80%;
  height: 100%;
`;

export const MoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const MoreText = styled.div`
  color: #999;
  cursor: pointer;
  font-size: 13px;
  margin: 0 15px 10px;
  align-self: flex-start;
`;

export const StyledMoreButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const CommentItem = styled.div`
  padding: 10px 15px;
  margin-bottom: 8px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
`;

export const CommentAuthor = styled.div`
  font-weight: 600;
  color: #2962ff;
  margin-bottom: 4px;
`;

export const CommentText = styled.div`
  font-size: 14px;
  color: #333;
  line-height: 1.4;
  white-space: pre-wrap;
`;

export const DeleteButton = styled.button`
  top: 10px;
  right: 10px;
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  z-index: 10;

  &:hover {
    background-color: #fa5252;
  }
`;

export const UpdateButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const CommentTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CommentButtonGroup = styled.div`
  display: flex;
  gap: 8px;

  .edit {
    color: black;
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
  }

  .delete {
    color: #ff4d4f;
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
  }

  .save {
    color: rgb(44, 72, 233);
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
  }
  .cancel {
    color: black;
    cursor: pointer;
    font-size: 13px;
    font-weight: bold;
  }
`;
