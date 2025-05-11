import styled from "styled-components";


export const MemberBanButton = styled.button`
    width: 43px;
    height: 30px;
    border: solid gray;
    border-radius: 5px;
    background-color: #ffffffb3;

    &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`



export const RoleCellContainer = styled.td`
  cursor: pointer;
  position: relative;
`;

export const LoadingIndicator = styled.span`
  margin-left: 5px;
  font-style: italic;
`;

export const OptionsContainer = styled.div`
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px;
  z-index: 100;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  min-width: 100px;
`;

export const RoleButton = styled.button`
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px;
  background-color: ${(props) => (props.isActive ? '#e6e6e6' : 'transparent')};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f0f0f0;
  }
`;

