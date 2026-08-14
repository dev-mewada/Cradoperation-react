import { useState } from "react";
import "./Registration.css";

function Registration() {

    const [users, setUsers] = useState([]);

    const [editUser, setEditUser] = useState(null);

           const [email, setEmail] = useState("");
           const [password, setPassword] = useState("");
    

    function handleSubmit(event) {

        event.preventDefault();


        const imageFile =
            event.target.profileImage.files[0];

          const selectedLanguages = Array.from(
        event.target.codingLanguage.selectedOptions,
        option => option.value
            );
       

        const user = { id: editUser
                ? editUser.id: Date.now(),

            fullName:
                event.target.fullName.value,

            email:
                event.target.email.value,

            password:
                event.target.password.value,

            phone:
                event.target.phone.value,

            dob:
                event.target.dob.value,

            address:
                event.target.address.value,

            gender:
                event.target.gender.value,

            codingLanguage:selectedLanguages,
                

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

                    setUsers(
                        users.map((item) =>
                            item.id === editUser.id
                                ? user
                                : item
                        )
                    );


                    setEditUser(null);

                }


                else {

                    setUsers([
                        ...users,
                        user
                    ]);

                }


                event.target.reset();

            };


            reader.readAsDataURL(imageFile);

            return;
        }


        

        if (editUser) {

            setUsers(
                users.map((item) =>
                    item.id === editUser.id
                        ? user
                        : item
                )
            );


            setEditUser(null);

            event.target.reset();

            return;
        }


      

        setUsers([
            ...users,
            user
        ]);


        event.target.reset();

    }


    

    function handleEdit(id) {

        const selectedUser =
            users.find(
                (user) => user.id === id
            );


        setEditUser(selectedUser);

        console.log(selectedUser);
    }


  

    function handleDelete(id) {

        setUsers(
            users.filter(
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


                                {/* PASSWORD */}

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

                                    {user.codingLanguage}

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
                              onChange={(event) => setEmail(event.target.value)}

                            defaultValue={
                                editUser
                                    ? editUser.email
                                    : ""
                            }
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
                            onChange={(event) => setPassword(event.target.value)}

                            defaultValue={
                                editUser
                                    ? editUser.password
                                    : ""
                            }
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


                      

                        <label
                            className="form-label"
                            htmlFor="codingLanguage"
                        >
                            Favorite Coding Language
                        </label>


                        <select
                            className="form-input"
                            id="codingLanguage"
                            name="codingLanguage"
                             multiple
                            defaultValue={
                                editUser
                                    ? editUser.codingLanguage
                                    : ""
                            }
                        >

                            <option value="">
                                Select your favorite language
                            </option>

                            <option value="JavaScript">
                                JavaScript
                            </option>

                            <option value="React">
                                React
                            </option>

                            <option value="Python">
                                Python
                            </option>

                            <option value="Java">
                                Java
                            </option>

                            <option value="C++">
                                C++
                            </option>

                            <option value="C#">
                                C#
                            </option>

                            <option value="PHP">
                                PHP
                            </option>

                            <option value="TypeScript">
                                TypeScript
                            </option>

                        </select>


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
                                 email === "" ||
                                 password === ""
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