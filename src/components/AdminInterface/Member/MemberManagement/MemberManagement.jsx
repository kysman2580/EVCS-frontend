import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MemberManagementNav from "../../AdminCommon/AdminNav/MemberManagementNav";
import {
    MemberContainer,
    MemberTable,
} from "./MemberManagement.styleds";

const MemberManagement = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");

    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [emailQueryInput, setEmailQueryInput] = useState("");
    const [emailQuery, setEmailQuery] = useState("");

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);


    const fetchMembers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {
                email: emailQuery || undefined,
                page: page,
                size: 10,
            };
            const res = await axios.get("http://localhost:80/api/members", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params,
            });
            const payload = res.data;
            const list = Array.isArray(payload)
                ? payload
                : Array.isArray(payload.content)
                    ? payload.content
                    : [];
            setMembers(list);
            setTotalPages(payload.totalPages || 1);
        } catch (err) {
            console.error(err);
            setError("회원 정보를 불러오는 데 실패했습니다.");
        } finally {
            setLoading(false);
        }
    }, [emailQuery, page]);

    useEffect(() => {
        fetchMembers();
    }, [fetchMembers]);

    const handleSearch = () => {
        setPage(0);
        setEmailQuery(emailQueryInput);
    };

    const handleRowClick = (email) => {
        navigate(`/admin/adminMembers/${email}`);
    };

    return (
        <MemberContainer>
            <MemberManagementNav />
            <h2>회원 관리</h2>

            <div className="filters">
                <input
                    type="text"
                    placeholder="이메일 검색"
                    value={emailQueryInput}
                    onChange={(e) => setEmailQueryInput(e.target.value)}
                />
                <button onClick={handleSearch}>검색</button>
            </div>

            {loading && <p>불러오는 중...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && members.length === 0 && !error && <p>회원 정보가 없습니다.</p>}

            {members.length > 0 && (
                <>
                    <MemberTable>
                        <thead>
                            <tr>
                                <th>이메일</th>
                                <th>이메일 인증 여부</th>
                                <th>닉네임</th>
                                <th>권한</th>
                                <th>회원 상태</th>
                                <th>계정 생성 일자</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((m, idx) => (
                                <tr key={idx} onClick={() => handleRowClick(m.email)}>
                                    <td>{m.email}</td>
                                    <td>{m.emailVerified === "Y" ? "인증됨" : "미인증"}</td>
                                    <td>{m.nickname}</td>
                                    <td>{m.role}</td>
                                    <td>{m.status === "ACTIVE" ? "정상" : "비활성화"}</td>
                                    <td>{new Date(m.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </MemberTable>

                    <div className="pagination">
                        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
                            ◀ 이전
                        </button>
                        {Array.from({ length: totalPages }, (_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setPage(idx)}
                                className={page === idx ? "active" : ""}
                            >
                                {idx + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page >= totalPages - 1}
                        >
                            다음 ▶
                        </button>
                    </div>
                </>
            )}
        </MemberContainer>
    );
};

export default MemberManagement;