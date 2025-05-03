import styled from "styled-components";

export const Report2 = styled.div`
  margin: 10px;
  background: #fafafa;
  display: flex;
  margin: 20px auto;

  h2 {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    margin-bottom: 16px;
    position: relative;

    &::before {
      content: "";
      display: block;
      width: 4px;
      height: 24px;
      background-color: rgb(190, 190, 190);
      margin-right: 8px;
      border-radius: 2px;
    }
  }

  /* 검색 필터 스타일 */
  .report-filters {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;

    input[type="date"],
    input[type="text"] {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 0.9rem;
      min-width: 120px;
    }

    span {
      margin: 0 4px;
      font-size: 1rem;
    }

    button {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      font-size: 0.9rem;
      cursor: pointer;
      background-color: #e8f5e9;
      color: #333;
      transition: background-color 0.2s;
    }

    button:hover {
      background-color: #c8e6c9;
    }

    .search-button {
      background-color: rgb(190, 190, 190);
      color: #fff;
    }

    .search-button:hover {
      background-color: rgb(190, 190, 190);
    }
  }

  .report-table-container {
    overflow-x: auto;
  }

  .report-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
  }

  .report-table thead th {
    background-color: rgb(190, 190, 190);
    color: #fff;
    font-weight: 500;
    padding: 12px 16px;
    text-align: left;
  }

  .report-table tbody tr:nth-child(even) {
    background-color: #f3fdf3;
  }

  .report-table tbody td {
    padding: 12px 16px;
    border-bottom: 1px solid #eee;
  }

  .load-more-container {
    text-align: center;
    margin: 16px 0;
  }

  .end-of-list {
    text-align: center;
    margin: 16px 0;
    color: #666;
  }

  .pagination {
    margin-top: 1rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }

  .pagination button {
    padding: 6px 12px;
    background: #f9f9f9;
    border: 1px solid #ccc;
    cursor: pointer;
  }

  .pagination button.active {
    font-weight: bold;
    background: #dcefff;
    border-color: #007bff;
  }
`;
export const Report3 = styled.div`
  margin: 0 auto;
`;
