import styled from "styled-components";

export const MainBodyDiv = styled.div`
  width: 100%;
  height: 900px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 50px;
  border: 1px solid red;
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

// 혹시 span으로 조절 할 수도 있음.
export const MainSpan = styled.span``;

export const MainLeftDiv = styled.div`
  border: 1px solid red;
  width: 50%;
  height: 100%;
`;

export const MainRightDiv = styled.div`
  border: 1px solid red;
  width: 50%;
  height: 100%;
`;

export const MainNewsDiv = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 70%;
`;

export const MainNoitceDiv = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 30%;
`;

export const MainRankingDiv = styled.div`
  border: 1px solid red;
  width: 100%;
  height: 100%;
`;
