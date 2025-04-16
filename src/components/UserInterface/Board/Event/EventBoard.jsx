import {} from "./EventBoard.styles";
import NoticeNav from "../../Common/Nav/NoticeNav";
import { BoardContainerDiv, BoardBodyDiv } from "../Board.styles";

const EventBoard = () => {
  return (
    <>
      <BoardContainerDiv>
        <NoticeNav />
        <BoardBodyDiv>ㅎㅇㅎㅇ여긴 이벤트 페이지야</BoardBodyDiv>
      </BoardContainerDiv>
    </>
  );
};

export default EventBoard;
