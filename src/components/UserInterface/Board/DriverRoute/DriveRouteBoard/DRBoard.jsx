import Button from "react-bootstrap/Button";
import Slider from "react-slick";
import DriveRouteBoardNav from "../../../Common/Nav/DriveRouteBoardNav";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DriveEtaTwoToneIcon from "@mui/icons-material/DriveEtaTwoTone";
import InsertPhotoRoundedIcon from "@mui/icons-material/InsertPhotoRounded";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AutoAwesomeMotionOutlinedIcon from "@mui/icons-material/AutoAwesomeMotionOutlined";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import DriveRouteMap from "../DriveRouteMap/DriveRouteMap";
import {
  H1,
  H3,
  Wrapper,
  ContentBox,
  NickName,
  Images,
  Img,
  Content,
  RentBodyDiv,
  RentContainerDiv,
  PostIcon,
  InsertButton,
  ModalWrapper,
  ModalLabel,
  ModalHeader,
  ModalContent,
  LeftContent,
  RightContent,
  ModalSubmit,
  ModalBack,
  CloseBtn,
  DriveRoute,
  MapImg,
  DriveContent,
  Textarea,
  SeeDriveRoute,
  Comments,
  CommentSubmit,
  InsertComment,
  Commentarea,
  LeftComment,
  CommentModalWrapper,
  CommentModalLabel,
} from "./DRBoard.styles";
import { CustomPrev, CustomNext } from "../CustomSlides/CustomSlides";

const DRBoard = () => {
  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [openPhotoModal, setopenPhotoModal] = useState(false);
  const [openRouteModal, setOpenRouteModal] = useState(false);
  const [openMapModal, setOpenMapModal] = useState(false);
  const [mapUrl, setMapUrl] = useState("");

  const [heart, setHeart] = useState(false);
  const ref = useRef(null);
  const [imagesUrl, setImagesUrl] = useState([]);
  const navi = useNavigate();

  useEffect(() => {
    if (mapUrl !== "") {
      setOpenMapModal(false);
    } else {
    }
  }, [mapUrl]);

  const fileHandler = () => {
    if (ref.current) {
      ref.current.value = null;
      ref.current.click();
    }
  };

  const handleImageChange = (e) => {
    const images = e.target.files;
    let imagesUrlList = [...imagesUrl]; // imagesUrl배열을 펼쳐서 [] 안에 집어넣음
    let imageLengh = images.length > 10 ? 10 : images.length;

    for (let i = 0; i < imageLengh; i++) {
      const currentImageUrl = URL.createObjectURL(images[i]);
      imagesUrlList.push(currentImageUrl);
    }
    setImagesUrl(imagesUrlList);
    console.log(imagesUrlList);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    nextArrow: <CustomNext />,
    prevArrow: <CustomPrev />,
  };

  return (
    <>
      <RentContainerDiv>
        {!openPhotoModal && !openCommentModal && !openRouteModal && (
          <DriveRouteBoardNav />
        )}
        <RentBodyDiv>
          <H1>일상 공유 게시판</H1>

          <br />
          <br />

          <H3>당신의 일상과 드라이브 루트를 공유해보세요~</H3>

          <br />
          <InsertButton onClick={() => setopenPhotoModal(true)}>
            <AddBoxOutlinedIcon /> 게시물 만들기
          </InsertButton>
          <br />

          <Wrapper>
            <ContentBox>
              <NickName>ksy1029 18시간 전</NickName>
              <Images>
                <Img src="images/calendar.png" alt="dk" />
              </Images>
              <PostIcon>
                {heart ? (
                  <FavoriteRoundedIcon
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => setHeart(false)}
                  />
                ) : (
                  <FavoriteBorderIcon
                    style={{ marginRight: "10px", cursor: "pointer" }}
                    onClick={() => setHeart(true)}
                  />
                )}
                <ChatIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => setOpenCommentModal(true)}
                />
              </PostIcon>
              <Content>
                <div>
                  <div>여의나루 한강공원</div>
                  <div>한강라면 맛나게 먹음~~</div>
                </div>
                <div>
                  <div style={{ cursor: "pointer" }}>
                    <DriveEtaTwoToneIcon />
                    드라이브 코스 보기
                  </div>
                </div>
              </Content>
            </ContentBox>
            <ContentBox>
              <NickName>ksy1029 18시간 전</NickName>
              <Images>
                <Img src="images/calendar.png" alt="dk" />
              </Images>
              <PostIcon>
                <FavoriteBorderIcon
                  style={{ marginRight: "10px", cursor: "pointer" }}
                />
                <ChatIcon
                  onClick={() => setOpenCommentModal(true)}
                  style={{ cursor: "pointer" }}
                />
              </PostIcon>
              <Content>
                <div>
                  <div>여의나루 한강공원</div>
                  <div>한강라면 맛나게 먹음~~</div>
                </div>
                <div>
                  <div style={{ cursor: "pointer" }}>
                    <DriveEtaTwoToneIcon />
                    드라이브 코스 보기
                  </div>
                </div>
              </Content>
            </ContentBox>
          </Wrapper>

          {/* 게시물 만들기기(사진설정) 모달 */}
          {openPhotoModal && (
            <ModalWrapper>
              <CloseBtn
                onClick={() => {
                  setopenPhotoModal(false);
                  setImagesUrl([]);
                  setMapUrl("");
                }}
              >
                <CloseRoundedIcon style={{ fontSize: "40px" }} />
              </CloseBtn>
              <ModalLabel>
                <ModalHeader>
                  새 게시물 만들기
                  <ModalSubmit
                    onClick={() => {
                      setOpenRouteModal(true);
                      setopenPhotoModal(false);
                    }}
                  >
                    다음
                  </ModalSubmit>
                </ModalHeader>
                <ModalContent>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    ref={ref}
                    onChange={handleImageChange}
                    accept="image/*"
                    multiple
                  />
                  {imagesUrl == "" ? (
                    <>
                      <div
                        style={{
                          width: "200px",
                          height: "50px",
                          position: "fixed",
                          right: "400px",
                          top: "300px",
                          cursor: "pointer",
                        }}
                      >
                        <InsertPhotoRoundedIcon />
                        <Button variant="primary" onClick={fileHandler}>
                          사진을 선택해주세요
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className="slider-container"
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <Slider {...settings}>
                          {imagesUrl.map((url, index) => (
                            <div style={{}} key={index}>
                              <img
                                src={url}
                                style={{
                                  width: "100%",
                                  maxHeight: "630px",
                                  objectFit: "cover",
                                  backgroundRepeat: "none",
                                }}
                                alt={`preview-${index}`}
                              />
                            </div>
                          ))}
                        </Slider>
                      </div>
                      <AutoAwesomeMotionOutlinedIcon
                        style={{
                          position: "absolute",
                          bottom: "3px",
                          right: "20px",
                          fontSize: "30px",
                          color: "#fff",
                          backgroundColor: "rgba(0,0,0,0.4)",
                          borderRadius: "50%",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                        onClick={fileHandler}
                      />
                    </>
                  )}
                </ModalContent>
              </ModalLabel>
            </ModalWrapper>
          )}

          {/* 경로설정 및 내용작성 모달 */}
          {openRouteModal && (
            <ModalWrapper>
              <CloseBtn
                onClick={() => {
                  setOpenRouteModal(false);
                  setImagesUrl([]);
                  setMapUrl("");
                }}
              >
                <CloseRoundedIcon style={{ fontSize: "40px" }} />
              </CloseBtn>
              <ModalLabel>
                <ModalHeader>
                  새 게시물 만들기
                  <ModalSubmit>공유하기</ModalSubmit>
                  <ModalBack
                    onClick={() => {
                      setOpenRouteModal(false);
                      setopenPhotoModal(true);
                      setMapUrl("");
                    }}
                  >
                    이전
                  </ModalBack>
                </ModalHeader>
                <ModalContent>
                  <LeftContent>
                    {mapUrl == "" ? (
                      <>
                        <Button
                          variant="primary"
                          onClick={() => setOpenMapModal(true)}
                        >
                          드라이브 루트 선택하기
                        </Button>
                      </>
                    ) : (
                      <>
                        <DriveRoute
                          onClick={() => setOpenMapModal(true)}
                          style={{ cursor: "pointer" }}
                        >
                          <MapImg src={mapUrl} alt="지도지도" />
                        </DriveRoute>
                      </>
                    )}
                  </LeftContent>
                  <RightContent>
                    <DriveContent>
                      <Textarea type="text" placeholder="내용을 작성해주세요" />
                    </DriveContent>
                  </RightContent>
                </ModalContent>
              </ModalLabel>
            </ModalWrapper>
          )}

          {/* 드라이브 경로 모달 */}
          {openMapModal && (
            <ModalWrapper>
              <CloseBtn onClick={() => setOpenMapModal(false)}>
                <CloseRoundedIcon style={{ fontSize: "40px" }} />
              </CloseBtn>
              <ModalLabel>
                <ModalHeader>드라이브 경로 선택</ModalHeader>

                <DriveRouteMap mapUrl={(url) => setMapUrl(url)} />
              </ModalLabel>
            </ModalWrapper>
          )}

          {/* 댓글 모달 */}
          {openCommentModal && (
            <CommentModalWrapper>
              <CloseBtn onClick={() => setOpenCommentModal(false)}>
                <CloseRoundedIcon style={{ fontSize: "40px" }} />
              </CloseBtn>
              <CommentModalLabel>
                <ModalHeader>상세보기</ModalHeader>
                <ModalContent>
                  <LeftComment>
                    <InsertPhotoRoundedIcon /> 사진
                  </LeftComment>
                  <RightContent>
                    <SeeDriveRoute>드라이브 루트 보기</SeeDriveRoute>
                    <Comments>댓글댓글</Comments>
                    <InsertComment>
                      <Commentarea
                        type="text"
                        placeholder="댓글 달기.."
                        maxLength={85}
                        style={{ resize: "none" }}
                      />
                      <CommentSubmit>게시</CommentSubmit>
                    </InsertComment>
                  </RightContent>
                </ModalContent>
              </CommentModalLabel>
            </CommentModalWrapper>
          )}
        </RentBodyDiv>
      </RentContainerDiv>
    </>
  );
};
export default DRBoard;
