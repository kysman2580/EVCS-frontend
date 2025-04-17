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

export const RentCarListDiv = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  flex-wrap: wrap;
  magin: 20px 20px 20px 20px;
`;

export const RentCarBtnDiv = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

export const RentMoreButton = styled.button`
  background: #03c75a;
  border: none;
  border-radius: 5%;
  width: 100px;
  height: 36px;
  cursor: pointer;
  right: 5px;
  font-size: 18px;
  color: white;

  &:hover {
    background-color: rgb(86, 250, 160);
  }
`;
