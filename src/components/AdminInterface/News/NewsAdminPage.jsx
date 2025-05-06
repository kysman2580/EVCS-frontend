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
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const [selectedCategory, setSelectedCategory] = useState("");

  const [newCategory, setNewCategory] = useState("");
  const [editingCategoryNo, setEditingCategoryNo] = useState(null);
  const [editingCategoryName, setEditingCategoryName] = useState("");

  const [searchClicked, setSearchClicked] = useState(false);

  const navigate = useNavigate();
  const page = parseInt(searchParams.get("page") || "1");
  const size = 5;

  useEffect(() => {
    fetchCategories();
    fetchNews();
    setSearchParams({ page: 1 });
  }, []);

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

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage });
  };

  const handleChatClick = async (item) => {
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

  const handleSearchClick = () => {
    setSearchClicked(!searchClicked); // 강제 렌더링 트리거
  };

  const filteredNews = newsList
    .filter(
      (n) =>
        (!searchTerm ||
          removeHtmlTags(n.title || "").includes(searchTerm) ||
          (n.query && n.query.includes(searchTerm))) &&
        (!selectedCategory || n.query === selectedCategory)
    )
    .sort((a, b) => {
      if (sortOption === "latest")
        return new Date(b.pubDate) - new Date(a.pubDate);
      if (sortOption === "views") return b.count - a.count;
      return 0;
    });

  const pagedList = filteredNews.slice((page - 1) * size, page * size);
  const totalPages = Math.ceil(filteredNews.length / size);

  return (
    <Report2>
      <CommunityNav />
      <Report3>
        <h1 className="text-2xl font-bold mb-4">뉴스 관리</h1>

        <div className="flex gap-8">
          {/* 좌측: 카테고리 관리 */}
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

          {/* 우측: 뉴스 목록 */}
          <div className="w-2/3">
            <h2 className="text-xl font-semibold mb-2">뉴스 게시판 관리</h2>
            <div className="report-filters mb-4 flex gap-2">
              <input
                type="text"
                placeholder="제목 또는 키워드 검색"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                    <th>상세</th>
                  </tr>
                </thead>
                <tbody>
                  {pagedList.map((item) => (
                    <tr key={item.newsNo} className="hover:bg-gray-50">
                      <td>{removeHtmlTags(item.title)}</td>
                      <td>{item.query}</td>
                      <td>{formatDate(item.pubDate)}</td>
                      <td>{item.count}</td>
                      <td>
                        <button onClick={() => handleChatClick(item)}>
                          📄
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination mt-4">
              <button
                onClick={() => handlePageChange(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                ◀ 이전
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={page === i + 1 ? "active" : ""}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
              >
                다음 ▶
              </button>
            </div>
          </div>
        </div>
      </Report3>
    </Report2>
  );
};

export default NewsAdminPage;
