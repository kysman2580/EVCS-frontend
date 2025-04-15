import styled from "styled-components";

export const NavDiv = styled.div`
  width: 10%;
  hight: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const NavContentDiv = styled.div`
  width: 100%;
  height: 250px;
  background-color: #d5ffdc;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-top: 30px;

  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const NavEmptyDiv = styled.div`
  width: 100%;
  height: 84%;
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
