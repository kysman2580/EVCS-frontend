import "../Notice/Notice.css";
import NoticeNav from "../../Common/Nav/NoticeNav";
import { BoardContainerDiv } from "../Board.styles";

function Notice() {
  return (
    <BoardContainerDiv>
      <NoticeNav />
      <div className="Notice">
        <h1>공지사항</h1>
        <div className="Notice-container">
          <table>
            <tr>
              <th>제목</th>
              <th>작성일시</th>
              <th>작성자</th>
            </tr>
            <tr>
              <td>안녕하세요 공지사항 입니다. 이번에 망했스빈다</td>
              <td>2025.07.05</td>
              <td>admin</td>
            </tr>
            <tr>
              <td>안녕하세요 공지사항 입니다. 이번에 망했스빈다</td>
              <td>2025.07.05</td>
              <td>admin</td>
            </tr>
            <tr>
              <td>안녕하세요 공지사항 입니다. 이번에 망했스빈다</td>
              <td>2025.07.05</td>
              <td>admin</td>
            </tr>
            <tr>
              <td>안녕하세요 공지사항 입니다. 이번에 망했스빈다</td>
              <td>2025.07.05</td>
              <td>admin</td>
            </tr>
            <tr>
              <td>안녕하세요 공지사항 입니다. 이번에 망했스빈다</td>
              <td>2025.07.05</td>
              <td>admin</td>
            </tr>
          </table>
        </div>
      </div>
    </BoardContainerDiv>
  );
}

export default Notice;
