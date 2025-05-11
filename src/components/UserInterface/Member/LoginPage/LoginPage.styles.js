import styled from "styled-components";


export const StyledForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin-top: 50px;
    margin-bottom: 80px;
    gap: 20px;
`;



export const StyledInput = styled.input`
    width: 350px;
    height: 40px;
    padding-left: 20px;
    font-family: auto;
`;

export const SendCodeButton = styled.button`
    position: absolute;
    top: 0;
    right: 50;
    height: 40px;
    width: 65px;
    border: none;
    background-color: #4caf50;
    color: white;
    font-weight: bold;
    cursor: pointer;
    margin-left: 10px;
    border-radius: 5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 13px;


        &:hover{
            color:rgb(255, 255, 255);
            background-color:rgb(73, 168, 76);
            transform: scale(1.05);
        }

`;


export const DisableSendCodeButton = styled.button`
position: absolute;
    top: 0;
    right: -77px;
    height: 40px;
    width: 65px;
    border: none;
    background-color: ${props => (props.disabled ? '#d3d3d3' : '#4caf50')}; // 비활성화 시 회색
    color: ${props => (props.disabled ? '#808080' : 'white')}; // 비활성화 시 회색 텍스트
    font-weight: bold;
    cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')}; // 비활성화 시 'not-allowed'
    margin-left: 10px;
    border-radius: 5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 13px;

    &:hover {
        background-color: ${props => (props.disabled ? '#d3d3d3' : 'rgb(73, 168, 76)')}; // 비활성화 시 hover 없음
        color: ${props => (props.disabled ? '#808080' : 'rgb(255, 255, 255)')}; // 비활성화 시 텍스트 회색
        transform: ${props => (props.disabled ? 'none' : 'scale(1.05)')}; // 비활성화 시 크기 변하지 않음
    }
`;


export const ReSendCodeButton = styled.button`
    height: 40px;
    width: 65px;
    border: none;
    background-color: #4caf50;
    color: white;
    font-weight: bold;
    margin-left: 10px;
    border-radius: 5px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 13px;
    position: absolute;
    right: -150px;


    &:hover{
        color:rgb(255, 255, 255);
        background-color:rgb(73, 168, 76);
        transform: scale(1.05);
    }

`;

export const EmailInputWrapper = styled.div`
position: relative;
width: 350px;
`;



export const StyledFindDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 4px 8px;
`;


export const Styled_a = styled.a`
    text-decoration: none;
    color: gray;
    cursor: pointer;
    margin: 12px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    

    &:hover{
    text-decoration: none;
    transform: scale(1.05);

    }
`;


export const StyledLoginForm = styled.div`
    display: block;
    justify-content: center;
    align-items: center;

    background-color: white;

    border: solid 1px;
    border-radius: 20px;

    width: 800px;
    height: 600px;
`;


export const StyledInputContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin-top: 10px;
    gap: 20px;
`;



export const StyledLogoDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 50px;
`;


export const StyledImg = styled.img`
    width: 170px;
    height: 100px;
    cursor: pointer;
`;


export const StyledButtonDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledLoginButton = styled.button`
    width: 380px;
    height: 45px;
    border-radius: 10px;
    border: solid 1px;
    background-color: #4caf50;
    color: white;
    margin-top: 10px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover{
        color:rgb(255, 255, 255);
        background-color:rgb(73, 168, 76);
        transform: scale(1.05);
    }
`;


export const StyledSignUpButton = styled.button`
    width: 350px;
    height: 45px;
    border-radius: 10px;
    border: solid 1px gray;
    margin-top: 30px;
    background-color: #4caf50;
    color: white;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    border: solid 1px;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover{
        color:rgb(255, 255, 255);
        background-color:rgb(73, 168, 76);
        transform: scale(1.05);
    }
`;



export const StyledSocialDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;


export const StyledSocialImg = styled.img`
    width: 183px;
    height: 45px;
    cursor: pointer;
    margin-top: 30px;

    &:hover {
    transform: scale(1.05);
  }
`;


export const StyledNaverButton = styled.button`
    width: 183px;
    height: 45px;
    cursor: pointer;
    margin-top: 30px;
    color: white;
    border: 1px solid rgba(0, 0, 0, .06);
    border-radius: 4px;
    background-color: #03c75a;
    font-weight: bold;
    display :flex;
    justify-content: center;
    align-items: center;

    &:hover {
    transform: scale(1.05);
  }
    
`;

export const Styled_N = styled.label`
    font-size: 20px;
    margin-right:4px;
    margin-top:2px;
    cursor: pointer;
`;




/* 인증코드 입력 스타일 */
export const VerificationWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 65px;
`;

export const VerifyButton = styled.button`
  position: relative;
  height: 40px;
  width: 55px;
  border: none;
  background-color:rgb(19, 42, 60);
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
  font-size: 13px;

  &:hover {
    background-color: #0b7dda;
    transform: scale(1.05);
  }
`;
