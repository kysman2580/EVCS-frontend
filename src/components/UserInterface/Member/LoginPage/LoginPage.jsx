import "./LoginPage.css";
import logo from "../../../public/images/Logo.png"
function LoginPage() {






    return (
        <body>
            <form action="">
                <div className="loginForm">
                    <div className="logoContainer">
                        <img className="logo" src={logo} alt="전기충만 로고" />
                    </div>

                    <div className="inputContainer">
                        <input className="email" type="text" placeholder="이메일"/>
                        <input className="password" type="password" placeholder="비밀번호" />
                    </div>

                </div>
            </form>
        </body>

    )
};

export default LoginPage;