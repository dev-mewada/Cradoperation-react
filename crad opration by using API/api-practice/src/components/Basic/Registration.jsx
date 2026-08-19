import { useEffect, useState } from "react";

function Registration({ addUser, editUserData, updateUser }) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {

        if (editUserData) {

            setFirstName(editUserData.firstName || "");
            setLastName(editUserData.lastName || "");
            setEmail(editUserData.email || "");
            setPassword(editUserData.password || "");

        }

    }, [editUserData]);


    function handleSubmit(e) {

        e.preventDefault();

        if (editUserData) {

            const updatedUser = {
                id: editUserData.id,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };

            updateUser(updatedUser);

        } else {

            const newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };

            addUser(newUser);

        }

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");

    }


    return (
        <form
            className="registration-form"
            onSubmit={handleSubmit}
        >

            <h2>Registration Form</h2>

            <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) =>
                    setFirstName(e.target.value)
                }
            />

            <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) =>
                    setLastName(e.target.value)
                }
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(e.target.value)
                }
            />

            <button type="submit">
                {editUserData ? "Update" : "Register"}
            </button>

        </form>
    );
}

export default Registration;