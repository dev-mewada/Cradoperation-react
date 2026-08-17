import { useState, useEffect } from "react";
import "./Registration.css";

function Registration() {

    const [users, setUsers] = useState([]);
    const [editUser, setEditUser] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const languages = [
        "JavaScript",
        "React",
        "Python",
        "Java",
        "C++",
        "C#",
        "PHP",
        "TypeScript"
    ];

    useEffect(() => {

        if (editUser) {

            setEmail(editUser.email || "");
            setPassword(editUser.password || "");
            setSelectedLanguages(editUser.codingLanguage || []);

        } else {

            setEmail("");
            setPassword("");
            setSelectedLanguages([]);

        }

    }, [editUser]);


    function handleLanguageChange(language) {

        setSelectedLanguages((previousLanguages) => {

            if (previousLanguages.includes(language)) {

                return previousLanguages.filter(
                    (item) => item !== language
                );

            } else {

                return [
                    ...previousLanguages,
                    language
                ];

            }

        });

    }


    function handleSubmit(event) {

        event.preventDefault();

        const imageFile =
            event.target.profileImage.files[0];

        const user = {

            id: editUser
                ? editUser.id
                : Date.now(),

            fullName:
                event.target.fullName.value,

            email:
                email,

            password:
                password,

            phone:
                event.target.phone.value,

            dob:
                event.target.dob.value,

            address:
                event.target.address.value,

            gender:
                event.target.gender.value,

            codingLanguage:
                selectedLanguages,

            profileImage:
                editUser
                    ? editUser.profileImage
                    : ""

        };


        if (imageFile) {

            const reader = new FileReader();

            reader.onload = () => {

                user.profileImage =
                    reader.result;

                if (editUser) {

                    setUsers((previousUsers) =>

                        previousUsers.map((item) =>
                            item.id === editUser.id
                                ? user
                                : item
                        )

                    );

                    setEditUser(null);

                } else {

                    setUsers((previousUsers) => [

                        ...previousUsers,
                        user

                    ]);

                }

                event.target.reset();

                setEmail("");
                setPassword("");
                setSelectedLanguages([]);

            };

            reader.readAsDataURL(imageFile);

            return;
        }


        if (editUser) {

            setUsers((previousUsers) =>

                previousUsers.map((item) =>
                    item.id === editUser.id
                        ? user
                        : item
                )

            );

            setEditUser(null);

            event.target.reset();

            setEmail("");
            setPassword("");
            setSelectedLanguages([]);

            return;
        }


        setUsers((previousUsers) => [

            ...previousUsers,
            user

        ]);

        event.target.reset();

        setEmail("");
        setPassword("");
        setSelectedLanguages([]);

    }


    function handleEdit(id) {

        const selectedUser =
            users.find(
                (user) => user.id === id
            );

        setEditUser(selectedUser);

    }


    function handleDelete(id) {

        setUsers((previousUsers) =>

            previousUsers.filter(
                (user) => user.id !== id
            )

        );

    }


    return (

        <div className="restaurant-container">

            <h2 className="table-title">
                Users Data
            </h2>


            <div className="table-wrapper">

                <table className="user-table">

                    <thead>

                        <tr>

                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Phone</th>
                            <th>DOB</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Favorite Coding</th>
                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {users.map((user) => (

                            <tr key={user.id}>

                                <td>

                                    {user.profileImage === "" ? (

                                        <p className="no-image">
                                            😊
                                        </p>

                                    ) : (

                                        <img
                                            src={user.profileImage}
                                            alt={user.fullName}
                                            className="profile-image"
                                        />

                                    )}

                                </td>


                                <td
                                    onClick={() =>
                                        handleEdit(user.id)
                                    }

                                    className="user-name"
                                >

                                    {user.fullName}

                                </td>


                                <td>
                                    {user.email}
                                </td>


                                <td>

                                    {user.password

                                        ? "*".repeat(
                                            Math.max(
                                                0,
                                                user.password.length - 2
                                            )
                                        ) +
                                        user.password.slice(-2)

                                        : "No Password"

                                    }

                                </td>


                                <td>
                                    {user.phone}
                                </td>


                                <td>
                                    {user.dob}
                                </td>


                                <td>
                                    {user.address}
                                </td>


                                <td>
                                    {user.gender}
                                </td>


                                <td>
                                    {user.codingLanguage.join(", ")}
                                </td>


                                <td>

                                    <button
                                        onClick={() =>
                                            handleDelete(user.id)
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>


            <div
                className={
                    editUser
                        ? "modal-overlay"
                        : "form-container"
                }
            >

                <div
                    className={
                        editUser
                            ? "modal-content"
                            : ""
                    }
                >

                    {editUser && (

                        <>

                            {editUser.profileImage ? (

                                <img
                                    src={editUser.profileImage}
                                    alt={editUser.fullName}
                                    className="edit-profile-image"
                                />

                            ) : (

                                <div className="no-profile-image">
                                    😊
                                </div>

                            )}

                        </>

                    )}


                    <h2 className="form-title">

                        {editUser
                            ? "Update User"
                            : "Registration Form"
                        }

                    </h2>


                    <form
                        className="registration-form"
                        onSubmit={handleSubmit}
                    >

                        <label
                            className="form-label"
                            htmlFor="fullName"
                        >
                            Full Name
                        </label>


                        <input
                            className="form-input"
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter your full name"

                            defaultValue={
                                editUser
                                    ? editUser.fullName
                                    : ""
                            }

                            required
                        />


                        <p
                            id="fullNameError"
                            className="error"
                        ></p>


                        <label
                            className="form-label"
                            htmlFor="email"
                        >
                            Email
                        </label>


                        <input
                            className="form-input"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"

                            value={email}

                            onChange={(event) =>
                                setEmail(
                                    event.target.value
                                )
                            }

                            required
                        />


                        <p
                            id="emailError"
                            className="error"
                        ></p>


                        <label
                            className="form-label"
                            htmlFor="password"
                        >
                            Password
                        </label>


                        <input
                            className="form-input"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"

                            value={password}

                            onChange={(event) =>
                                setPassword(
                                    event.target.value
                                )
                            }

                            required
                        />


                        <p
                            id="passwordError"
                            className="error"
                        ></p>


                        <label
                            className="form-label"
                            htmlFor="phone"
                        >
                            Phone Number
                        </label>


                        <input
                            className="form-input"
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            maxLength="10"

                            defaultValue={
                                editUser
                                    ? editUser.phone
                                    : ""
                            }

                            required
                        />


                        <p
                            id="phoneError"
                            className="error"
                        ></p>


                        <label
                            className="form-label"
                            htmlFor="dob"
                        >
                            Date of Birth
                        </label>


                        <input
                            className="form-input"
                            type="date"
                            id="dob"
                            name="dob"

                            defaultValue={
                                editUser
                                    ? editUser.dob
                                    : ""
                            }

                            required
                        />


                        <p
                            id="dobError"
                            className="error"
                        ></p>


                        <label
                            className="form-label"
                            htmlFor="address"
                        >
                            Address
                        </label>


                        <textarea
                            className="form-input address-input"
                            id="address"
                            name="address"
                            placeholder="Enter your address"
                            rows="4"

                            defaultValue={
                                editUser
                                    ? editUser.address
                                    : ""
                            }

                            required

                        ></textarea>


                        <p
                            id="addressError"
                            className="error"
                        ></p>


                        <label className="form-label">
                            Gender
                        </label>


                        <div className="gender-box">

                            <label className="gender-option">

                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"

                                    defaultChecked={
                                        editUser?.gender === "Male"
                                    }

                                    required
                                />

                                Male

                            </label>


                            <label className="gender-option">

                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"

                                    defaultChecked={
                                        editUser?.gender === "Female"
                                    }

                                />

                                Female

                            </label>


                            <label className="gender-option">

                                <input
                                    type="radio"
                                    name="gender"
                                    value="Other"

                                    defaultChecked={
                                        editUser?.gender === "Other"
                                    }

                                />

                                Other

                            </label>

                        </div>


                        <p
                            id="genderError"
                            className="error"
                        ></p>


                        <label className="form-label">
                            Favorite Coding Language
                        </label>


                        <div className="language-box">

                            {languages.map((language) => (

                                <label
                                    key={language}
                                    className="language-option"
                                >

                                    <input
                                        type="checkbox"
                                        value={language}

                                        checked={
                                            selectedLanguages.includes(
                                                language
                                            )
                                        }

                                        onChange={() =>
                                            handleLanguageChange(
                                                language
                                            )
                                        }
                                    />

                                    {language}

                                </label>

                            ))}

                        </div>


                        <p
                            id="codingError"
                            className="error"
                        ></p>


                        <label
                            className="form-label"
                            htmlFor="profileImage"
                        >
                            Profile Image
                        </label>


                        <input
                            className="form-input image-input"
                            type="file"
                            id="profileImage"
                            name="profileImage"
                            accept="image/*"
                        />


                        <p
                            id="imageError"
                            className="error"
                        ></p>


                        <div className="edit-buttons">

                            <button
                                disabled={
                                    email.trim() === "" ||
                                    password.trim() === ""
                                }

                                type="submit"

                                id="submitBtn"

                                className="submit-btn"
                            >

                                {editUser
                                    ? "Update"
                                    : "Submit"
                                }

                            </button>


                            {editUser && (

                                <button
                                    type="button"
                                    className="back-btn"

                                    onClick={() =>
                                        setEditUser(null)
                                    }
                                >

                                    Back

                                </button>

                            )}

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default Registration;