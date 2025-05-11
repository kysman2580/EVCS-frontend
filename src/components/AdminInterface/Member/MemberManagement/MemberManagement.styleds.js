import styled from "styled-components";

export const MemberContainer = styled.div`
  padding: 2rem;
`;

export const MemberTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 0.75rem;
    border: 1px solid #ccc;
    text-align: center;
  }

  th {
    background-color: #f3f3f3;
  }

  tr:hover {
    background-color: #f9f9f9;
    cursor: pointer;
  }
`;
