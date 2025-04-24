import * as React from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  H1,
  H3,
  Wrapper,
  Container,
  RatingWrapper,
  Question,
  RatingBox,
  InsertBtn,
} from "./MemberRating.styles";

const MemberRating = () => {
  const navi = useNavigate();
  const [value, setValue] = useState({
    value1: null,
    value2: null,
    value3: null,
    value4: null,
    value5: null,
    value6: null,
    value7: null,
    value8: null,
    value9: null,
  });

  const handleRating = () => {
    let avgRating = 0;
    let totalCount = 0;
    Object.values(value).map((e) => {
      if (e == null) {
        alert("평점을 부여해주세요");
        return;
      } else {
        avgRating += e;
        totalCount += 1;
      }
    });
    console.log(avgRating / totalCount);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <H1>반납하기</H1>

          <br />
          <br />

          <H3>전 이용자에 대한 평점을 부여해주세요</H3>

          <RatingWrapper>
            <RatingBox>
              <Question>차량 내부에 쓰레기가 남아 있었나요?</Question>
              <Rating
                name="rating1"
                value={value.value1}
                onChange={(event, newValue) => {
                  setValue((prev) => ({ ...prev, value1: newValue }));
                }}
              />
            </RatingBox>

            <RatingBox>
              <Question>차량 내부에 오염 흔적이 있었나요?</Question>
              <Rating
                name="rating2"
                value={value.value2}
                onChange={(event, newValue) => {
                  setValue((prev) => ({ ...prev, value2: newValue }));
                }}
              />
            </RatingBox>
            <RatingBox>
              <Question>차량 내부에 먼지나 지저분한 흔적이 많았나요?</Question>
              <Rating
                name="simple-uncontrolled"
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setValue((prev) => ({ ...prev, value3: newValue }));
                }}
              />
            </RatingBox>
            <RatingBox>
              <Question>
                차량 외부가 깨끗하지 않았거나 세차가 필요한 상태였나요?
              </Question>
              <Rating
                name="simple-uncontrolled"
                onChange={(event, newValue) => {
                  setValue((prev) => ({ ...prev, value4: newValue }));
                }}
              />
            </RatingBox>
            <RatingBox>
              <Question>차량 내에서 담배 냄새가 났나요?</Question>
              <Rating
                name="simple-uncontrolled"
                onChange={(event, newValue) => {
                  setValue((prev) => ({ ...prev, value5: newValue }));
                }}
              />
            </RatingBox>
            <RatingBox>
              <Question>
                차량 내부에 이상한 냄새(예: 음식물, 애완동물, 방향제 과다 등)가
                났나요?
              </Question>
              <Rating
                name="simple-uncontrolled"
                onChange={(event, newValue) => {
                  setValue((prev) => ({ ...prev, value6: newValue }));
                }}
              />
            </RatingBox>
            <RatingBox>
              <Question>차량 안에 개인 물품이 남아 있었나요?</Question>
              <Rating
                name="simple-uncontrolled"
                onChange={(event, newValue) => {
                  setValue((prev) => ({ ...prev, value7: newValue }));
                }}
              />
            </RatingBox>
            <RatingBox>
              <Question>차량 좌석이나 트렁크에 손상이 있었나요?</Question>
              <Rating
                name="simple-uncontrolled"
                onChange={(event, newValue) => {
                  setValue((prev) => ({ ...prev, value8: newValue }));
                }}
              />
            </RatingBox>
            <RatingBox>
              <Question>
                차량 사용 중 차량이 무리하게 운행된 흔적이 있었나요? (예:
                브레이크 상태, 급정지 흔적 등)
              </Question>
              <Rating
                name="simple-uncontrolled"
                onChange={(event, newValue) => {
                  setValue((prev) => ({ ...prev, value9: newValue }));
                  console.log(value);
                }}
              />
            </RatingBox>
          </RatingWrapper>
          <InsertBtn onClick={handleRating}>반납하기</InsertBtn>
        </Wrapper>
      </Container>
    </>
  );
};
export default MemberRating;
