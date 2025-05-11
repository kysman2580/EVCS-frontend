import styled from "styled-components";

export const MyPageDiv = styled.div`
    border-top: 1px solid #a0a0a0;
    display: flex;
`

export const Form = styled.form`
    
    width: 80%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 30px;
`
export const TitleDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TitleH1 = styled.h1`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 30px;
`

export const InputGroup = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    margin-left: 40px;
    margin-top: 30px;
    align-items: center;

`



export const InputWrap = styled.div`
    display: flex;
    width: auto;
    height: 87.5px;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin-top: 40px;
`

export const InputWrapByPassword = styled.div`
    display: flex;
    width: auto;
    height: 87.5px;
    justify-content: center;
    align-items: center;

    margin-top: 40px;
`


export const InputLabel = styled.label`
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 25px;
    width: 460px;
    height: auto;
    gap: 327px;
`

export const StyledInput = styled.input`
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    width: 100%;
    height: 50px;

    font-size: 20px;
    font-family: Arial, Helvetica, sans-serif;
`

export const SubmitWrapDiv = styled.div`
    display: flex;
    width: auto;
    height: auto;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin-top: 40px;
`

export const SubmitButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 460px;
height: 60px;
border-radius: 5px;
border: solid 1px white;
background-color: rgb(79, 120, 223);

font-size: 20px;
color: white;

font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;



&:hover {
    background-color:rgb(51, 99, 220);
    transform: scale(1.05);
}
`




export const DeleteButtonWrap = styled.div`
    width: 1500px;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const DeleteButton = styled.button`
display: flex;
justify-content: center;
align-items: center;
width: 460px;
height: 60px;
border-radius: 5px;
border: solid 1px white;
background-color: rgb(223, 79, 79);

font-size: 20px;
color: white;
margin-top: 40px;

font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;


&:hover {
    background-color:rgb(220, 51, 51);
    transform: scale(1.05);
}
`

export const ChangeButton = styled.button`
    display: flex;
    width: 50px;
    height: 30px;
    align-items: center;
    justify-content: center;
    border: solid 1px #ffffff;
    font-size: 15px;
    border-radius: 5px;
    color: #747783;
    font-family: emoji;
    font-weight: bold;
    background-color: white;
`;


export const RatingDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 150px;
    position: absolute;
    right: 235px;
`


// ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ


export const Container = styled.div`
  width: 460px;
  height: 500px;
  padding: 40px;
  margin-left: 400px;
  margin-top: 150px;
  border: 1px solid #ccc;
  background-color: white;
`;

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
  font-family: Arial, Helvetica, sans-serif;

`;

export const Description = styled.p`
  font-size: 14px;
  color: black;
  margin-bottom: 24px;
  font-family: Arial, Helvetica, sans-serif;

  span {
    color: red;
    display: block;
  }
`;

export const PwInput = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
  padding: 8px;
  margin-bottom: 16px;
  font-family: Arial, Helvetica, sans-serif;

`;

export const CaptionText = styled.p`
  font-size: 14px;
  margin: 16px 0 8px 0;
`;

export const CaptchaImage = styled.img`
  width: 100%;
  height: 80px;
  object-fit: cover;
  background-color: #eee;
`;

export const CaptchaControl = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-size: 14px;
  }
`;


export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
`;

export const PwButton = styled.button`
  width: 48%;
  height: 45px;
  background-color: #00c73c;
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;

`;

export const PwCancelButton = styled.button`
  width: 48%;
  height: 45px;
  background-color: white;
  color: black;
  border: 1px solid #ccc;
  font-family: Arial, Helvetica, sans-serif;

`;



