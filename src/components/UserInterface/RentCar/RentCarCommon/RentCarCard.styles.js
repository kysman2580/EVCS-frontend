import styled from "styled-components";

export const RentCarCardContainer = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  display: flex;
  flex-direction: column;
  border-radius: 5%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  border: 1px solid #ddd;
  background-color: white;
  font-size: 15px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
`;

export const RentCarCardImgDiv = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RentCarCardContentDiv = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const RentCarCardImg = styled.img`
  margin-top: 7px;
  width: 60%;
  height: 100%;
  border-radius: 5%;
  object-fit: cover;
  background-color: #f0f0f0;
`;

export const RentCarNameDiv = styled.div`
  margin-top: 7px;
  width: 100%;
  height: 33%;
  text-align: center;

  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const RentCarMiddleDiv = styled.div`
  width: 100%;
  height: 33%;
  text-align: center;
`;

export const RentCarPriceDiv = styled.div`
  width: 100%;
  height: 33%;
  text-align: center;
`;

export const RentCarYearSpan = styled.span`
  width: 50%;
  height: 100%;
`;
export const RentCarPlaceSpan = styled.span`
  width: 50%;
  height: 100%;
  margin-left: 7px;
`;

export const InlineBadge = styled.span`
  background: #ff5722;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-left: 8px;
`;
