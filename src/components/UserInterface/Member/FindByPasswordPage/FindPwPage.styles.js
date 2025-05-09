import styled from "styled-components";

export const FindContainer = styled.div`
  min-height: 79vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  font-family: Arial, Helvetica, sans-serif
`;

export const FindTitle = styled.h1`
  font-size: 36px;
  font-weight: bold;
  color: #03c75a;
  text-align: center;
`;

export const FindSubtitle = styled.p`
  margin-top: 12px;
  font-size: 16px;
  text-align: center;
  color: #333;
`;

export const FindForm = styled.form`
  margin-top: 20px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FindInput = styled.input`
  height: 45px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
`;

export const FindButton = styled.button`
  height: 45px;
  background-color: #03c75a;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #02b154;
  }
`;

export const VerifyButton = styled.button`
  height: 45px;
  background-color: #03c75a;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #02b154;
  }
`;


export const FindLogoImg = styled.img`
  width: 170px;
  height: 100px;

  &:hover {
    cursor: pointer;
  }
`;

export const VerifyField = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

`;

export const AuthenticationBtn = styled.button`
  width: 70px;
  height: 45px;
  background-color: #03c75a;
  color: white;
  font-weight: bold;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  margin-left: 10px;
  cursor: pointer;

`