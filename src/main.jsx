import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import MyPage from './Member/Mypage/Mypage.jsx'
import LoginPage from './Member/LoginPage/LoginPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginPage />
    <MyPage />

  </StrictMode>,
)
