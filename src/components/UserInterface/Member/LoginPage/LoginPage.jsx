import "./LoginPage.css";


function LoginPage() {






    return (
        <body>
            <form action="">
                <div className="loginForm">
                    <div className="logoContainer">
                        <img className="logo" src="/images/Logo.png" alt="전기충만 로고" />
                    </div>
                    하이 아임 영수
                    <div className="inputContainer">
                        <input className="email" type="text" placeholder="이메일" />
                        <input className="password" type="password" placeholder="비밀번호" />
                    </div>

                </div>
            </form>
        </body>

    )
};

export default LoginPage;