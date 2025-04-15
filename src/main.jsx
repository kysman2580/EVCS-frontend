import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import LoginPage from './components/LoginPage/LoginPage.jsx'
import MyPage from './components/Mypage/Mypage.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoginPage />

  </StrictMode>,
)
