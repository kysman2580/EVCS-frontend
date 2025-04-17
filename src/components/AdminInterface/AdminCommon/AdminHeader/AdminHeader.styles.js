import styled from "styled-components";

export const StyledHeaderDiv = styled.header`
  background-color: rgb(190, 190, 190);
  width: 100%;
  height: 80px;
  display: flex;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 살짝 그림자 */
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
    color: rgb(255, 255, 255);
  }
`;

export const StyledLogoDiv = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 15px;
`;
export const StyledHomeDiv = styled.div`
  width: 10%;
  height: 100%;
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledHomeCenterDiv = styled.div`
  width: 70%;
  height: 100%;
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const StyledMemberDiv = styled.div`
  width: 20%;
  height: 100%;
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const LogoImg = styled.img`
  width: 150px;
  height: 100px;

  &:hover {
    cursor: pointer;
  }
`;

export const NavLink = styled.a`
  text-decoration: none;
  width: 100px;
  &:hover {
    cursor: pointer;
  }
`;
