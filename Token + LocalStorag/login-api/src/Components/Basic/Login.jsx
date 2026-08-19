import { useState } from "react";
import Data from "./Data";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginData, setLoginData] = useState(null);


    function handleSubmit(e) {

        e.preventDefault();

        const data = {
            username: username,
            password: password
        };

        console.log("Login Data:", data);

        setLoginData(data);
    }


    return (
        <div className="login-container">

            <form
                className="login-form"
                onSubmit={handleSubmit}
            >

                <h1 className="login-title">
                    Login
                </h1>


                <div className="input-group">

                    <label>Username</label>

                    <input
                        className="login-input"
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                </div>


                <div className="input-group">

                    <label>Password</label>

                    <input
                        className="login-input"
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>


                <button
                    className="login-button"
                    type="submit"
                >
                    Login
                </button>

            </form>


            <Data loginData={loginData} />

        </div>
    );
}

export default Login;