import Button from "react-bootstrap/Button";
import {
  H2,
  Wrapper,
  ContentBox,
  CommentBox,
  NickName,
  Images,
  Img,
  Content,
  CommentList,
  InputBox,
  ButtonBox,
} from "./drBoard.styles";

const DRBoard = () => {
  return (
    <>
      <H2>당신의 드라이브 루트를 공유해보세요</H2>
      <Wrapper>
        <ContentBox>
          <NickName>ksy1029 18시간 전</NickName>
          <Images>
            <Img src="images/calendar.png" alt="dk" />
          </Images>
          <Content>
            <div>
              <div>여의나루 한강공원</div>
              <div>한강라면 맛나게 먹음~~</div>
            </div>
            <div>
              <div>드라이브 코스 보기</div>
            </div>
          </Content>
          <div>좋아요 댓글</div>
        </ContentBox>

        <CommentBox>
          <InputBox>
            ksy1029 :
            <input type="text" placeholder="댓글을 입력해주세요"></input>
          </InputBox>
          <ButtonBox>
            <Button variant="outline-primary">취소</Button>
            <Button variant="outline-primary">댓글</Button>
          </ButtonBox>
          <CommentList></CommentList>
        </CommentBox>
      </Wrapper>
    </>
  );
};
export default DRBoard;
