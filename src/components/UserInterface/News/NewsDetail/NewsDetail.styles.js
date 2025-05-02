import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

export const Loading = styled.div`
  text-align: center;
  margin-top: 100px;
  font-size: 18px;
`;

export const BoardTitle = styled.h1`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

export const ArticleTitle = styled.h2`
  background-color: #e0fbe0;
  padding: 10px;
  border-radius: 8px;
  font-size: 20px;
  text-align: center;
  margin-bottom: 20px;
`;

export const ArticleBox = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  background-color: #fff;
`;

export const ArticleContent = styled.div``;

export const ArticleCategory = styled.div`
  text-align: right;
  font-size: 14px;
  color: #888;
  margin-bottom: 10px;
`;

export const ArticleText = styled.div`
  font-size: 16px;
  line-height: 1.6;
  margin-bottom: 10px;

  div {
    margin-bottom: 6px;
  }

  img {
    width: 100%;
    max-width: 600px;
    margin: 10px 0;
    border-radius: 6px;
  }

  a {
    color: #0366d6;
    text-decoration: underline;
    font-size: 14px;
  }
`;

export const ArticleActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

export const ActionButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  background-color: #f1f1f1;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #ddd;
  }
`;

export const CommentInputWrapper = styled.div`
  display: flex;
  margin-top: 20px;
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
`;

export const CommentInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px 0 0 6px;
  font-size: 14px;
  outline: none;
`;

export const CommentButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #ddd;
  border-radius: 0 6px 6px 0;
  cursor: pointer;
  font-weight: bold;
`;

export const CommentList = styled.div`
  margin-top: 20px;
`;

export const CommentItem = styled.div`
  padding: 15px;
  border-bottom: 1px solid #eee;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 5px;
`;

export const CommentBody = styled.div`
  font-size: 15px;
`;

export const CommentActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 6px;
`;

export const CommentSectionContainer = styled.div`
  margin-top: 20px;
`;
