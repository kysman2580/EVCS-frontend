import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 900px;
  margin: 70px auto;
  padding: 0 20px;
`;
export const Title = styled.h2`
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 20px;
`;

export const InsertBtn = styled.button`
  display: block;
  margin: 0 2px 30px auto;
  padding: 8px 16px;
  background-color: black;
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
`;

export const TableHeader = styled.div`
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
  color: #333;
`;

export const Row = styled.div`
  display: flex;
  padding: 14px 0;
  border-bottom: 1px solid #eee;
  font-size: 15px;
  color: #444;
`;

export const Cell = styled.span`
  width: ${({ width }) => width || "auto"};
  text-align: center;
`;
