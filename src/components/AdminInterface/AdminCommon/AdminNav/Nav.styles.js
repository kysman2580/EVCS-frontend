import styled from "styled-components";

export const NavDiv = styled.div`
  width: 180px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const NavRentContentDiv = styled.div`
  width: 100%;
  height: 250px;
  background-color: rgb(190, 190, 190);
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

export const NavBoardContentDiv = styled.div`
  width: 100%;
  height: 200px;
  background-color: rgb(190, 190, 190);
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

export const StyledHeaderBtn = styled.button`
  color: black;
  border: none;
  display: flex;
  align-items: center;
  background-color: transparent;
  font-size: 20px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
    color: white;
  }
`;
