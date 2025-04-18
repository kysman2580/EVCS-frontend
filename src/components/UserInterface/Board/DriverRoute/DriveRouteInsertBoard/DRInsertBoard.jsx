import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import { Wrapper } from "./DRInsetBoard.styles";
import { useState } from "react";
const DRInsertBoard = () => {
  return (
    <>
      <Wrapper>
        <div>새 게시물 만들기</div>
        <div>
          <div>
            <InsertPhotoRoundedIcon /> 사진을 선택해주세요
          </div>
          <div></div>
        </div>
      </Wrapper>
    </>
  );
};
export default DRInsertBoard;
