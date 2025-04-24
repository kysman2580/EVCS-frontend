import styled from 'styled-components';

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

export const Form = styled.form`
  /* 추가 스타일을 넣을 수 있습니다. */
`;

export const Fieldset = styled.fieldset`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Legend = styled.legend`
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0 5px;
`;

export const InfoRow = styled.div`
  margin-bottom: 10px;
`;

export const LabelText = styled.span`
  font-weight: bold;
  margin-right: 5px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: Arial, sans-serif;
`;

export const FileInput = styled.input`
  width: 100%;
  padding: 8px 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

export const CancelButton = styled(Button)`
  background-color: #dc3545;
`;