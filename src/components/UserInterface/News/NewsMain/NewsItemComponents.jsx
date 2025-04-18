// NewsItemComponents.js - 재사용 가능한 컴포넌트 파일
import React from "react";
import * as S from "./NewsMain.styles";

// 뉴스 아이템을 위한 공통 유틸리티 함수
export const getLink = (item) => item?.originallink || item?.link || "#";

export const removeHtmlTags = (text) =>
  text ? text.replace(/<[^>]+>/g, "") : "";

export const formatDate = (dateString) => {
  if (!dateString) return "날짜 정보 없음";
  const date = new Date(dateString);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}.`;
};

// 채팅 아이콘 컴포넌트
export const ChatIcon = ({ item, getImageUrl, position, onChatClick }) => {
  if (!item || getImageUrl(item) === "/lodaing.png") return null;

  return (
    <S.ChatIconWrapper
      top={position.top || "10px"}
      left={position.left || "10px"}
      right={position.right || "auto"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChatClick(item);
      }}
    >
      <S.ChatIcon src="/images/chat_icon_Anggara.png" alt="Chat" />
    </S.ChatIconWrapper>
  );
};

// 기본 뉴스 항목 컴포넌트
export const NewsItemBase = ({
  item,
  children,
  getImageUrl,
  ThumbnailComponent,
  position = {},
  onChatClick,
}) => {
  if (!item) return null;

  return (
    <div style={{ position: "relative" }}>
      <S.ThumbnailLink
        href={getLink(item)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {ThumbnailComponent}
        <S.ContentInfo>{children}</S.ContentInfo>
      </S.ThumbnailLink>

      <ChatIcon
        item={item}
        getImageUrl={getImageUrl}
        position={position}
        onChatClick={onChatClick}
      />
    </div>
  );
};

// 주요 뉴스 아이템
export const TopNewsItem = ({ item, getImageUrl, onChatClick }) => (
  <S.TopNewsItem style={{ position: "relative" }}>
    <NewsItemBase
      item={item}
      getImageUrl={getImageUrl}
      ThumbnailComponent={<S.ThumbnailMedium imageUrl={getImageUrl(item)} />}
      position={{ top: "10px", left: "10px" }}
      onChatClick={onChatClick}
    >
      <S.Title>{item ? removeHtmlTags(item.title) : "로딩 중..."}</S.Title>
      <S.Metadata>{item ? formatDate(item.pubDate) : "⏳"}</S.Metadata>
    </NewsItemBase>
  </S.TopNewsItem>
);

// 메인 뉴스 아이템
export const MainNewsItem = ({ item, getImageUrl, onChatClick }) => (
  <NewsItemBase
    item={item}
    getImageUrl={getImageUrl}
    ThumbnailComponent={<S.ThumbnailLarge imageUrl={getImageUrl(item)} />}
    position={{ top: "20px", left: "20px" }}
    onChatClick={onChatClick}
  >
    <S.Title>{removeHtmlTags(item.title)}</S.Title>
    <S.Description>{removeHtmlTags(item.description)}</S.Description>
    <S.Metadata>{formatDate(item.pubDate)}</S.Metadata>
  </NewsItemBase>
);

// 사이드 뉴스 아이템
export const SideNewsItem = ({ item, getImageUrl, onChatClick }) => (
  <S.SideItem style={{ position: "relative" }}>
    <NewsItemBase
      item={item}
      getImageUrl={getImageUrl}
      ThumbnailComponent={<S.ThumbnailSmall imageUrl={getImageUrl(item)} />}
      position={{ top: "5px", left: "5px" }}
      onChatClick={onChatClick}
    >
      <S.SmallTitle>{removeHtmlTags(item.title)}</S.SmallTitle>
      <S.SmallMetadata>{formatDate(item.pubDate)}</S.SmallMetadata>
    </NewsItemBase>
  </S.SideItem>
);

// 리스트 뉴스 아이템
export const ListNewsItem = ({ item, delayedVisible, onChatClick }) => (
  <S.NewsItem key={item.title} style={{ position: "relative" }}>
    <S.NewsLink href={getLink(item)} target="_blank" rel="noopener noreferrer">
      <S.NewsTitle>
        {removeHtmlTags(item.title)}
        <S.NewsDate>{formatDate(item.pubDate)}</S.NewsDate>
      </S.NewsTitle>
    </S.NewsLink>
    {delayedVisible && (
      <S.ChatIconWrapper
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onChatClick(item);
        }}
      >
        <S.ChatIcon src="/images/chat_icon_Anggara.png" alt="Chat" />
      </S.ChatIconWrapper>
    )}
  </S.NewsItem>
);

// 검색 바 컴포넌트
export const SearchBar = ({ query, setQuery, handleSearch, keywords }) => (
  <S.SearchContainer>
    <S.SearchBarWrapper>
      <S.SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
        placeholder="검색어를 입력하세요"
      />
      <S.SearchButton onClick={() => handleSearch()}>🔍</S.SearchButton>
    </S.SearchBarWrapper>

    <S.KeywordButtonContainer>
      {keywords.map((keyword) => (
        <S.KeywordButton
          key={keyword}
          onClick={() => {
            setQuery(keyword);
            handleSearch(keyword);
          }}
          active={query === keyword}
        >
          {keyword}
        </S.KeywordButton>
      ))}
    </S.KeywordButtonContainer>
  </S.SearchContainer>
);
