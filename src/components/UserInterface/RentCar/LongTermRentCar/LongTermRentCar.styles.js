import styled from "styled-components";

export const RentBodyDiv = styled.div`
  width: 90%;
  height: 900px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  margin-top: 30px;
`;

export const RentContainerDiv = styled.div`
  display: flex;
  height: 100%;
`;

export const LongTermListDiv = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid red;
`;

export const LongTermBtnDiv = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  border: 1px solid red;
`;

export const FilterBar = styled.div`
  position: sticky;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  padding: 16px 0;
`;

export const Dropdown = styled.select`
  min-width: 140px;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
  font-size: 0.9rem;
  appearance: none;
`;

export const TextInput = styled.input`
  flex: 1;
  min-width: 300px;
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
`;

export const Button = styled.button`
  padding: 6px 14px;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  background: #888;
  color: #fff;
  &:hover {
    background: #666;
  }
`;

export const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  font-size: 0.875rem;
  border: none;
  border-radius: 9999px;
  background-color: ${(props) => (props.active ? "#4e8cff" : "#f0f0f0")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    background-color: ${(props) => (props.active ? "#3a75e0" : "#e0e0e0")};
  }
`;
