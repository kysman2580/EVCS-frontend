// src/components/UserInterface/Report/ReportDetail.styled.js
import styled from "styled-components";

export const DetailContainer = styled.div`
  padding: 24px;
  background: #fff;
  border-radius: 8px;
  max-width: 600px;
  margin: 20px auto;
`;

export const FieldRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  align-items: flex-start;

  /* 라벨 열 고정 */
  & > div:first-child {
    width: 100px;
    font-weight: bold;
  }
`;

export const FieldRow2 = styled.div`
  margin-bottom: 16px;
  align-items: flex-start;

  /* 라벨 열 고정 */
  & > div:first-child {
    width: 100px;
    font-weight: bold;
  }
`;

export const Label = styled.div``;
export const Value = styled.div``;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

export const ActionButton = styled.button`
  padding: 8px 16px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #115293;
  }
`;

export const BackButton = styled(ActionButton)`
  background: #4caf50;
  &:hover {
    background: #357a38;
  }
`;
