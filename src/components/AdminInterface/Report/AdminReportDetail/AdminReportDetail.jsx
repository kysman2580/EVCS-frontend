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
  FieldRow2,
} from "./AdminReportDetail.styled";
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
    content:
      "이 편지는 영국에서 시작하였으며, 한 평범한 우체국 직원이 우연히 받게 되었습니다. 그는 이 편지를 무시했고, 그로부터 7일 뒤, 그의 집 강아지가 발에 낀 이상한 종이 한 장 때문에 동네 신문에 실리게 되었고, 그는 그 날 이후로 계속 이상한 꿈을 꿨다고 합니다. 이후 이 편지는 프랑스로, 독일로, 스페인을 거쳐 전 세계를 돌며 이상한 일들을 만들어냈습니다.1995년, 미국 텍사스의 한 대학생은 이 편지를 10명에게 전달한 뒤 갑자기 로또에 당첨되었고, 그 다음날 고백한 상대에게 'YES'라는 대답을 들었습니다. 하지만 같은 해, 시카고의 한 은행원은 이 편지를 무시했고, 정확히 72시간 후, 커피를 쏟아 노트북을 망가뜨리고 말았습니다.이 편지는 단순한 이야기가 아닙니다. 수많은 사람들의 우연과 기묘한 일들이 얽혀 있는 미스터리한 고리이며, 이를 무시하는 자는 필시 무언가를 잃게 됩니다. 어떤 이는 애인을, 어떤 이는 직장을, 또 어떤 이는 아침마다 마시던 최애 커피숍의 쿠폰을 영영 잃게 되었죠.2003년 서울 강남구의 한 고등학생은 이 편지를 복사해 친구들에게 돌렸고, 그로부터 3개월 후 모의고사에서 전국 1등을 하였으며, 원하는 대학에 합격했습니다. 그는 훗날 방송에서 이렇게 말했죠. 그저 재미 삼아 돌렸을 뿐인데, 내 인생이 달라졌어요.이 편지의 진짜 힘은 공유 에 있습니다 믿거나 말거나 이 편지를 7명 이상에게 전달하면 당신의 삶에 놀라운 변화가 일어난다는 전설이 있습니다 하지만 단 한 명에게도 보내지 않는다면 당신이 예상치 못한 방향으로 하루가 꼬일 수도 있습니다.이 문장을 읽고 있는 당신도 예외는 아닙니다 지금 이 순간 누군가는 이 편지를 읽으며 웃고 있고 또 누군가는 그 기묘한 우연을 체험하고 있을지 모릅니다.이 편지를 받은 뒤 13명에게 전달한 사람은 꿈에 그리던 반려동물을 입양했고, 5명에게만 전달한 사람은 매일 타던 버스를 놓치기 시작했습니다 한 사람은 그냥 깔깔 웃고 무시했지만 이상하게도 이후 몇 주간 그가 하는 모든 게임의 가챠 확률이 최악이었다고 합니다",
  },
  {
    boardNo: 2,
    displayId: 2,
    title: "충전 대기 시간 지연",
    reporter: "김철수",
    defendant: "최민수",
    applicationDate: "2025-04-18",
    status: "처리중",
    content: "블라블라블라라라라라라라라 암튼 불만임!",
  },
  {
    boardNo: 3,
    displayId: 3,
    title: "결제 오류 발생",
    reporter: "이영희",
    defendant: "정유진",
    applicationDate: "2025-04-15",
    status: "완료",
    content: "블라블라블라라라라라라라라 암튼 불만임!",
  },
  {
    boardNo: 4,
    displayId: 4,
    title: "신고",
    reporter: "홍길동",
    defendant: "정유진",
    applicationDate: "2025-04-15",
    status: "완료",
    content: "블라블라블라라라라라라라라 암튼 불만임!",
  },
  {
    boardNo: 5,
    displayId: 5,
    title: "신고인데요~",
    reporter: "홍길동",
    defendant: "정유진",
    applicationDate: "2025-04-15",
    status: "완료",
    content: "블라블라블라라라라라라라라 암튼 불만임!",
  },
  {
    boardNo: 6,
    displayId: 6,
    title: "결제 오류 발생",
    reporter: "홍길동",
    defendant: "정유진",
    applicationDate: "2025-04-15",
    status: "완료",
    content: "블라블라블라라라라라라라라 암튼 불만임!",
  },
];

const AdminReportDetail = ({ useDummyData = true }) => {
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
      else if (role !== "admin") setError("접근 권한이 없습니다.");
      else setReport(found);

      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/reports/${id}`);
        if (role !== "admin") {
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
        <FieldRow2>
          <Label>상세 내용</Label>
          <Value style={{ whiteSpace: "pre-wrap" }}>{report.content}</Value>
        </FieldRow2>
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
        <div>
          <ActionButton onClick={handleDelete}>?</ActionButton>
          <ActionButton onClick={handleDelete}>?</ActionButton>
        </div>
      </ButtonGroup>
    </DetailContainer>
  );
};

export default AdminReportDetail;
