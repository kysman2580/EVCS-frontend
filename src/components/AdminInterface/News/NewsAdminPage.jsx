import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  removeHtmlTags,
  formatDate,
} from "../../UserInterface/News/NewsMain/NewsItemComponents";
import { Report2, Report3 } from "../Report/AdminReport/AdminReport.styled";
import CommunityNav from "../AdminCommon/AdminNav/AdminComunityNav";

const backendUrl = "http://localhost:80";

const NewsAdminPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [categories, setCategories] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [newCategory, setNewCategory] = useState("");
  const [editingCategoryNo, setEditingCategoryNo] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const size = 5;

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/admin/news/category/all`);
      setCategories(res.data);
    } catch (err) {
      console.error("카테고리 목록 불러오기 실패", err);
    }
  };

  const fetchNews = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/admin/news/list`);
      setNewsList(res.data || []);
    } catch (err) {
      console.error("뉴스 목록 불러오기 실패", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchNews();
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setSearchParams({ page: newPage });
  };

  const handleRowClick = (item) => {
    navigate("/newsDetail", {
      state: {
        title: removeHtmlTags(item.title),
        description: removeHtmlTags(item.description),
        pubDate: formatDate(item.pubDate),
        imageUrl: item.imageUrl,
        originallink: item.originUrl,
        query: item.query,
      },
    });
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await axios.post(`${backendUrl}/api/admin/news/category`, {
        newsCategory: newCategory,
      });
      setNewCategory("");
      fetchCategories();
    } catch (err) {
      console.error("카테고리 추가 실패", err);
    }
  };

  const handleDeleteCategory = async (newsCategoryNo) => {
    try {
      await axios.delete(
        `${backendUrl}/api/admin/news/category/${newsCategoryNo}`
      );
      fetchCategories();
    } catch (err) {
      console.error("카테고리 삭제 실패", err);
    }
  };

  const handleEditCategory = async (newsCategoryNo) => {
    try {
      await axios.put(
        `${backendUrl}/api/admin/news/category/${newsCategoryNo}`,
        {
          newsCategory: editingCategoryName,
        }
      );
      setEditingCategoryNo(null);
      setEditingCategoryName("");
      fetchCategories();
    } catch (err) {
      console.error("카테고리 수정 실패", err);
    }
  };

  const handlePreset = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setStartDate(start.toISOString().slice(0, 10));
    setEndDate(end.toISOString().slice(0, 10));
  };

  const filteredNews = newsList
    .filter((n) => {
      const pub = new Date(n.pubDate);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;
      return (
        (!searchTerm ||
          removeHtmlTags(n.title || "").includes(searchTerm) ||
          (n.query && n.query.includes(searchTerm))) &&
        (!selectedCategory || n.query === selectedCategory) &&
        (!start || pub >= start) &&
        (!end || pub <= end)
      );
    })
    .sort((a, b) => {
      if (sortOption === "latest")
        return new Date(b.pubDate) - new Date(a.pubDate);
      if (sortOption === "views") return b.count - a.count;
      return 0;
    });

  const totalPages = Math.ceil(filteredNews.length / size);
  const pagedList = filteredNews.slice((page - 1) * size, page * size);
  const currentBlock = Math.floor((page - 1) / 10);
  const startPage = currentBlock * 10 + 1;
  const endPage = Math.min(startPage + 9, totalPages);
  const visiblePages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <Report2>
      <CommunityNav />
      <Report3>
        <h1 className="text-2xl font-bold mb-4">뉴스 관리</h1>

        <div className="flex gap-8">
          <div className="w-1/3">
            <h2 className="text-xl font-semibold mb-2">카테고리 관리</h2>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="새 카테고리 입력"
              />
              <button onClick={handleAddCategory}>추가</button>
            </div>
            <ul className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <li
                  key={cat.newsCategoryNo}
                  className="px-3 py-1 bg-gray-200 rounded-full flex items-center gap-2"
                >
                  {editingCategoryNo === cat.newsCategoryNo ? (
                    <>
                      <input
                        value={editingCategoryName}
                        onChange={(e) => setEditingCategoryName(e.target.value)}
                      />
                      <button
                        onClick={() => handleEditCategory(cat.newsCategoryNo)}
                      >
                        확인
                      </button>
                      <button onClick={() => setEditingCategoryNo(null)}>
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <span>{cat.newsCategory}</span>
                      <button
                        onClick={() => {
                          setEditingCategoryNo(cat.newsCategoryNo);
                          setEditingCategoryName(cat.newsCategory);
                        }}
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(cat.newsCategoryNo)}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-2/3">
            <h2 className="text-xl font-semibold mb-2">뉴스 게시판 관리</h2>
            <div className="report-filters mb-4 flex gap-2 flex-wrap items-center">
              <input
                type="text"
                placeholder="제목 또는 키워드 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <button onClick={() => handlePreset(7)}>1주일</button>
              <button onClick={() => handlePreset(30)}>1개월</button>
              <button onClick={() => handlePreset(180)}>6개월</button>
              <button onClick={() => handlePreset(365)}>1년</button>
              <button
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                }}
              >
                날짜 초기화
              </button>{" "}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="latest">최신순</option>
                <option value="views">조회수순</option>
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">전체</option>
                {categories.map((cat) => (
                  <option key={cat.newsCategoryNo} value={cat.newsCategory}>
                    {cat.newsCategory}
                  </option>
                ))}
              </select>
            </div>

            <div className="report-table-container">
              <table className="report-table">
                <thead>
                  <tr>
                    <th>제목</th>
                    <th>카테고리</th>
                    <th>등록일</th>
                    <th>조회수</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedList.map((item) => (
                    <tr
                      key={item.newsNo}
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleRowClick(item)}
                    >
                      <td>{removeHtmlTags(item.title)}</td>
                      <td>{item.query}</td>
                      <td>{formatDate(item.pubDate)}</td>
                      <td>{item.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination mt-4">
              {page > 1 && (
                <button onClick={() => handlePageChange(1)}>{"<<"}</button>
              )}
              {startPage > 1 && (
                <button onClick={() => handlePageChange(startPage - 1)}>
                  {"<"}
                </button>
              )}
              {visiblePages.map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={page === p ? "active" : ""}
                >
                  {p}
                </button>
              ))}
              {endPage < totalPages && (
                <button onClick={() => handlePageChange(endPage + 1)}>
                  {">"}
                </button>
              )}
              {page < totalPages && (
                <button onClick={() => handlePageChange(totalPages)}>
                  {">>"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Report3>
    </Report2>
  );
};

export default NewsAdminPage;
