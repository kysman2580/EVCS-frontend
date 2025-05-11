// RoleCell.styles.js
import styled from 'styled-components';
// 또는 다른 스타일링 라이브러리를 사용하고 있을 수 있습니다

export const RoleCellContainer = styled.td`
  position: relative;
  cursor: pointer;
  padding: 8px;
`;

export const LoadingIndicator = styled.span`
  margin-left: 5px;
  color: #666;
  font-size: 0.9em;
`;

export const OptionsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 10;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

export const RoleButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px 16px;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  
  &:hover {
    background-color: #f5f5f5;
  }
  
  &.active {
    font-weight: bold;
    background-color: #e6f7ff;
  }
`;