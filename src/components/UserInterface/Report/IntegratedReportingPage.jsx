import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Title,
  Form,
  Fieldset,
  Legend,
  InfoRow,
  LabelText,
  TextArea,
  FileInput,
  ButtonGroup,
  Button,
  CancelButton,
} from "./IntegratedReportingPage.styled";

const IntegratedReportingPage = () => {
  // 이전 게시판에서 전달한 데이터를 location.state로 받음
  // 예: boardInfo에는 { boardId, boardTitle } 형식, reporter에는 { userId, userName }, reported에는 { userId, userName }
  const location = useLocation();
  const navigate = useNavigate();
  const { boardInfo, reporter, reported } = location.state || {};

  const [content, setContent] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // 신고취소 시 이전 페이지로 돌아감
  const handleCancel = () => {
    navigate(-1);
  };

  // 신고하기 버튼 클릭 시 신고 내용 제출 처리 (백엔드 연동은 추후 구현)
  const handleSubmit = (e) => {
    e.preventDefault();

    // DB TB_REPORT 테이블에 맞춰 데이터 구성
    const reportData = {
      // 'Key' 컬럼: 게시글 번호 (boardInfo.boardId)
      boardId: boardInfo?.boardId || null,
      // 신고자: MEMBER_NO (신고자 id)
      reporterId: reporter?.userId || null,
      // 신고받는 사람: 게시글 작성자 id
      reportedId: reported?.userId || null,
      // 신고 내용 (RP_CONTENT)
      content,
      // 첨부파일 관련 (FILE_NO 관련, 실제 파일 업로드 후 파일번호 처리 필요)
      file: selectedFile,
      // RP_ENROLLDATE, RP_MODIFY_DATE: 신고 제출 시간 (백엔드에서 처리 가능)
      // RP_STATUS는 기본 'Y'로 지정됨.
    };

    console.log("신고 제출 데이터:", reportData);
    alert("신고가 완료되었습니다");
    // 추후 백엔드 API 연동 예시
    // axios.post('/api/report', reportData)
    //   .then(response => {
    //     // 신고 성공 후 이전 게시판으로 돌아가기
    //     navigate(-1);
    //   })
    //   .catch(error => {
    //     console.error("신고 제출 실패:", error);
    //   });

    // 현재는 단순 시뮬레이션 후 이전 페이지로 이동
  };

  return (
    <Container>
      <Title>통합 신고 페이지</Title>
      <Form onSubmit={handleSubmit}>
        {/* 1. 이전 게시판 정보 */}
        <Fieldset>
          <Legend>이전 게시판 정보</Legend>
          <InfoRow>
            <LabelText>게시글 번호:</LabelText>
            <span>{boardInfo ? boardInfo.boardId : "N/A"}</span>
          </InfoRow>
          <InfoRow>
            <LabelText>게시글 제목:</LabelText>
            <span>{boardInfo ? boardInfo.boardTitle : "N/A"}</span>
          </InfoRow>
        </Fieldset>

        {/* 2. 신고자 정보 */}
        <Fieldset>
          <Legend>신고자</Legend>
          <InfoRow>
            <LabelText>신고자 ID:</LabelText>
            <span>{reporter ? reporter.userId : "N/A"}</span>
          </InfoRow>
          <InfoRow>
            <LabelText>신고자 이름:</LabelText>
            <span>{reporter ? reporter.userName : "N/A"}</span>
          </InfoRow>
        </Fieldset>

        {/* 3. 신고받는 사람 정보 */}
        <Fieldset>
          <Legend>신고받는 사람</Legend>
          <InfoRow>
            <LabelText>게시글 작성자 ID:</LabelText>
            <span>{reported ? reported.userId : "N/A"}</span>
          </InfoRow>
          <InfoRow>
            <LabelText>게시글 작성자 이름:</LabelText>
            <span>{reported ? reported.userName : "N/A"}</span>
          </InfoRow>
        </Fieldset>

        {/* 4. 신고 내용 작성 */}
        <div>
          <LabelText>내용작성:</LabelText>
          <TextArea
            placeholder="신고 내용을 입력해 주세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {/* 5. 첨부파일 선택 */}
        <div style={{ margin: "20px 0" }}>
          <LabelText>첨부파일 (선택):</LabelText>
          <br />
          <FileInput type="file" onChange={handleFileChange} />
        </div>

        {/* 6. 신고취소 및 신고하기 버튼 */}
        <ButtonGroup>
          <CancelButton type="button" onClick={handleCancel}>
            신고취소
          </CancelButton>
          <Button type="submit">신고하기</Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default IntegratedReportingPage;
