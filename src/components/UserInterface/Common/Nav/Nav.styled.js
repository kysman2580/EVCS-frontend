import styled from "styled-components";

export const NavDiv = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #d5ffdc;
`;

export const NavTopEmptyDiv = styled.div`
  width: 100%;
  height: 5%;
  background-color: #d5ffdc;
`;

export const NavContentDiv = styled.div`
  width: 100%;
  height: 35%;
  background-color: #d5ffdc;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const NavEmptyDiv = styled.div`
  width: 100%;
  height: 60%;
  background-color: #d5ffdc;
`;

export const StyledHeaderBtn = styled.button`
  color: black;
  border: none;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 20px;

  &:hover {
    cursor: pointer;
    color: #7cbd1e;
  }
`;
