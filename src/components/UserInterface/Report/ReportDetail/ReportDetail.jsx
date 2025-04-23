import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  DetailContainer,
  FieldRow,
  Label,
  Value,
  ButtonGroup,
  ActionButton,
  BackButton,
} from "./ReportDetail.styled";
import { useAuth } from "../../Context/AuthContext/AuthContext";
import axios from "axios";

// (더미 테스트용)
const dummyReports = [
  {
    boardNo: 1,
    displayId: 1,
    title: "전기차 충전소 오류 신고",
    reporter: "홍길동",
    defendant: "박영수",
    applicationDate: "2025-04-20",
    status: "접수",
  },
  {
    boardNo: 2,
    displayId: 2,
    title: "충전 대기 시간 지연",
    reporter: "김철수",
    defendant: "최민수",
    applicationDate: "2025-04-18",
    status: "처리중",
  },
  {
    boardNo: 3,
    displayId: 3,
    title: "결제 오류 발생",
    reporter: "이영희",
    defendant: "정유진",
    applicationDate: "2025-04-15",
    status: "완료",
  },
  {
    boardNo: 4,
    displayId: 4,
    title: "신고",
    reporter: "홍길동",
    defendant: "정유진",
    applicationDate: "2025-04-15",
    status: "완료",
  },
  {
    boardNo: 5,
    displayId: 5,
    title: "신고인데요~",
    reporter: "홍길동",
    defendant: "정유진",
    applicationDate: "2025-04-15",
    status: "완료",
  },
  {
    boardNo: 6,
    displayId: 6,
    title: "결제 오류 발생",
    reporter: "홍길동",
    defendant: "정유진",
    applicationDate: "2025-04-15",
    status: "완료",
  },
];

const ReportDetail = ({ useDummyData = true }) => {
  const { boardNo } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { name: currentUser, role } = auth.user;

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const id = Number(boardNo);
    if (isNaN(id)) {
      setError("잘못된 요청입니다.");
      setLoading(false);
      return;
    }

    if (useDummyData) {
      const found = dummyReports.find((r) => r.boardNo === id);
      if (!found) setError("해당 신고를 찾을 수 없습니다.");
      else if (role !== "admin" && found.reporter !== currentUser)
        setError("접근 권한이 없습니다.");
      else setReport(found);

      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/reports/${id}`);
        if (role !== "admin" && data.reporter !== currentUser) {
          setError("접근 권한이 없습니다.");
        } else {
          setReport(data);
        }
      } catch (err) {
        console.error(err);
        setError("신고 상세를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [boardNo, useDummyData, currentUser, role]);

  const handleDelete = async () => {
    if (!window.confirm("정말 취소하시겠습니까?")) return;

    if (useDummyData) {
      alert("더미 모드: 신고 취소됨");
      navigate(-1);
      return;
    }

    try {
      await axios.delete(`/api/reports/${boardNo}`);
      alert("취소되었습니다.");
      navigate(-1);
    } catch (err) {
      console.error(err);
      alert("취소 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <DetailContainer>불러오는 중...</DetailContainer>;
  if (error)
    return (
      <DetailContainer style={{ color: "red" }}>
        {error}
        <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
      </DetailContainer>
    );

  return (
    <DetailContainer>
      <h2>신고 상세보기 (#{report.displayId})</h2>

      <FieldRow>
        <Label>제목</Label>
        <Value>{report.title}</Value>
      </FieldRow>
      <FieldRow>
        <Label>신고자</Label>
        <Value>{report.reporter}</Value>
      </FieldRow>
      <FieldRow>
        <Label>피의자</Label>
        <Value>{report.defendant}</Value>
      </FieldRow>
      <FieldRow>
        <Label>신청일</Label>
        <Value>{report.applicationDate}</Value>
      </FieldRow>
      <FieldRow>
        <Label>진행상황</Label>
        <Value>{report.status}</Value>
      </FieldRow>

      {report.content && (
        <FieldRow>
          <Label>상세 내용</Label>
          <Value style={{ whiteSpace: "pre-wrap" }}>{report.content}</Value>
        </FieldRow>
      )}

      {/* 첨부파일이 있으면 500x500 고정 크기로 보여주기 */}
      {report.attachmentUrl && (
        <FieldRow>
          <Label>첨부파일</Label>
          <Value>
            <img
              src={report.attachmentUrl}
              alt="첨부이미지"
              style={{
                width: "500px",
                height: "500px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          </Value>
        </FieldRow>
      )}

      {/* 삭제 버튼 */}
      <ButtonGroup>
        <BackButton onClick={() => navigate(-1)}>뒤로가기</BackButton>
        <ActionButton onClick={handleDelete}>신고 취소</ActionButton>
      </ButtonGroup>
    </DetailContainer>
  );
};

export default ReportDetail;
