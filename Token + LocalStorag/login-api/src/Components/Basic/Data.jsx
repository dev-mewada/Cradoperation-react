import { useEffect } from "react";

function Data({ loginData }) {

    useEffect(() => {

        async function loginUser() {

            if (!loginData) {
                return;
            }

          try {

    const response = await fetch(
        "https://dummyjson.com/auth/login",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                username: loginData.username,
                password: loginData.password
            })
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Login failed");
    }

    console.log("Server Response:", data);

    localStorage.setItem("token", data.accessToken);

    console.log("Token Saved:", data.accessToken);

} catch (error) {

    console.log("Login Error:", error);

}

        }


        loginUser();

    }, [loginData]);


    return null;
}

export default Data;