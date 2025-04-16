import styled from "styled-components";

export const MainBodyDiv = styled.div`
  width: 90%;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 30px;
`;

export const MainContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SwiperDiv = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MainBtnDiv = styled.div`
  margin-top: 100px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const MainBtnImg = styled.img`
  width: 150px;
  height: 100px;

  &:hover {
    cursor: pointer;
  }
`;

export const MainATag = styled.a`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
  justify-content: space-evenly;
  color: black;
  font-size: 20px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
    cursor: pointer;
    color: #7cbd1e;
  }
`;

export const MainSpan = styled.span``;
