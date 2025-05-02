// RatingGauge.jsx
import React from 'react';
import styled from 'styled-components';

const GaugeWrapper = styled.div`
  width: 500px;
  max-width: 600px;
`;


const TextWrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 250px;
`

const StarLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 26px;
  margin-bottom: 4px;
  
`;

const ProgressBar = styled.div`
  background-color: #e9ecef;
  border-radius: 6px;
  height: 12px;
  width: 420px;
  overflow: hidden;
`;

const Progress = styled.div`
  background-color: #59e893; /* Bootstrap warning 색 */
  width: ${({ percent }) => `${percent}%`};
  height: 100%;
  transition: width 0.3s ease-in-out;
`;

const RatingGauge = ({ rating }) => {
    const percent = (rating / 5) * 100;

    return (
        <GaugeWrapper>
            <TextWrap>
                <StarLabel>🔋 충전량 </StarLabel>
                <StarLabel>{percent.toFixed(0)}%</StarLabel>
            </TextWrap>
            <ProgressBar>
                <Progress percent={percent} />
            </ProgressBar>
        </GaugeWrapper>
    );
};

export default RatingGauge;
