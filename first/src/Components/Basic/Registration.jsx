// import { useState, useEffect } from "react";
// import "./Registration.css";

// function Registration() {

//     const [users, setUsers] = useState([]);
//     const [editUser, setEditUser] = useState(null);

//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const [selectedLanguages, setSelectedLanguages] = useState([]);

//     const languages = [   
//         "JavaScript",
//         "React",
//         "Python",
//         "Java",
//         "C++",
//         "C#",
//         "PHP",
//         "TypeScript"
//     ];

//     useEffect(() => {

//         if (editUser) {

//             setEmail(editUser.email || "");
//             setPassword(editUser.password || "");
//             setSelectedLanguages(editUser.codingLanguage || []);

//         } else {

//             setEmail("");
//             setPassword("");
//             setSelectedLanguages([]);

//         }

//     }, [editUser]);


//     function handleLanguageChange(language) {

//         setSelectedLanguages((previousLanguages) => {

//             if (previousLanguages.includes(language)) {

//                 return previousLanguages.filter(
//                     (item) => item !== language
//                 );

//             } else {

//                 return [
//                     ...previousLanguages,
//                     language
//                 ];

//             }

//         });

//     }


//     function handleSubmit(event) {

//         event.preventDefault();

//         const imageFile =
//             event.target.profileImage.files[0];

//         const user = {

//             id: editUser
//                 ? editUser.id
//                 : Date.now(),

//             fullName:
//                 event.target.fullName.value,

//             email:
//                 email,

//             password:
//                 password,

//             phone:
//                 event.target.phone.value,

//             dob:
//                 event.target.dob.value,

//             address:
//                 event.target.address.value,

//             gender:
//                 event.target.gender.value,

//             codingLanguage:
//                 selectedLanguages,

//             profileImage:
//                 editUser
//                     ? editUser.profileImage
//                     : ""

//         };


//         if (imageFile) {

//             const reader = new FileReader();

//             reader.onload = () => {

//                 user.profileImage =
//                     reader.result;

//                 if (editUser) {

//                     setUsers((previousUsers) =>

//                         previousUsers.map((item) =>
//                             item.id === editUser.id
//                                 ? user
//                                 : item
//                         )

//                     );

//                     setEditUser(null);

//                 } else {

//                     setUsers((previousUsers) => [

//                         ...previousUsers,
//                         user

//                     ]);

//                 }

//                 event.target.reset();

//                 setEmail("");
//                 setPassword("");
//                 setSelectedLanguages([]);

//             };

//             reader.readAsDataURL(imageFile);

//             return;
//         }


//         if (editUser) {

//             setUsers((previousUsers) =>

//                 previousUsers.map((item) =>
//                     item.id === editUser.id
//                         ? user
//                         : item
//                 )

//             );

//             setEditUser(null);

//             event.target.reset();

//             setEmail("");
//             setPassword("");
//             setSelectedLanguages([]);

//             return;
//         }


//         setUsers((previousUsers) => [

//             ...previousUsers,
//             user

//         ]);

//         event.target.reset();

//         setEmail("");
//         setPassword("");
//         setSelectedLanguages([]);

//     }


//     function handleEdit(id) {

//         const selectedUser =
//             users.find(
//                 (user) => user.id === id
//             );

//         setEditUser(selectedUser);

//     }


//     function handleDelete(id) {

//         setUsers((previousUsers) =>

//             previousUsers.filter(
//                 (user) => user.id !== id
//             )

//         );

//     }


//     return (

//         <div className="restaurant-container">

//             <h2 className="table-title">
//                 Users Data
//             </h2>


//             <div className="table-wrapper">

//                 <table className="user-table">

//                     <thead>

//                         <tr>

//                             <th>Image</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Password</th>
//                             <th>Phone</th>
//                             <th>DOB</th>
//                             <th>Address</th>
//                             <th>Gender</th>
//                             <th>Favorite Coding</th>
//                             <th>Action</th>

//                         </tr>

//                     </thead>


//                     <tbody>

//                         {users.map((user) => (

//                             <tr key={user.id}>

//                                 <td>

//                                     {user.profileImage === "" ? (

//                                         <p className="no-image">
//                                             😊
//                                         </p>

//                                     ) : (

//                                         <img
//                                             src={user.profileImage}
//                                             alt={user.fullName}
//                                             className="profile-image"
//                                         />

//                                     )}

//                                 </td>


//                                 <td
//                                     onClick={() =>
//                                         handleEdit(user.id)
//                                     }

//                                     className="user-name"
//                                 >

//                                     {user.fullName}

//                                 </td>


//                                 <td>
//                                     {user.email}
//                                 </td>


//                                 <td>

//                                     {user.password

//                                         ? "*".repeat(
//                                             Math.max(
//                                                 0,
//                                                 user.password.length - 2
//                                             )
//                                         ) +
//                                         user.password.slice(-2)

//                                         : "No Password"

//                                     }

//                                 </td>


//                                 <td>
//                                     {user.phone}
//                                 </td>


//                                 <td>
//                                     {user.dob}
//                                 </td>


//                                 <td>
//                                     {user.address}
//                                 </td>


//                                 <td>
//                                     {user.gender}
//                                 </td>


//                                 <td>
//                                     {user.codingLanguage.join(", ")}
//                                 </td>


//                                 <td>

//                                     <button
//                                         onClick={() =>
//                                             handleDelete(user.id)
//                                         }
//                                     >
//                                         Delete
//                                     </button>

//                                 </td>

//                             </tr>

//                         ))}

//                     </tbody>

//                 </table>

//             </div>


//             <div
//                 className={
//                     editUser
//                         ? "modal-overlay"
//                         : "form-container"
//                 }
//             >

//                 <div
//                     className={
//                         editUser
//                             ? "modal-content"
//                             : ""
//                     }
//                 >

//                     {editUser && (

//                         <>

//                             {editUser.profileImage ? (

//                                 <img
//                                     src={editUser.profileImage}
//                                     alt={editUser.fullName}
//                                     className="edit-profile-image"
//                                 />

//                             ) : (

//                                 <div className="no-profile-image">
//                                     😊
//                                 </div>

//                             )}

//                         </>

//                     )}


//                     <h2 className="form-title">

//                         {editUser
//                             ? "Update User"
//                             : "Registration Form"
//                         }

//                     </h2>


//                     <form
//                         className="registration-form"
//                         onSubmit={handleSubmit}
//                     >

//                         <label
//                             className="form-label"
//                             htmlFor="fullName"
//                         >
//                             Full Name
//                         </label>


//                         <input
//                             className="form-input"
//                             type="text"
//                             id="fullName"
//                             name="fullName"
//                             placeholder="Enter your full name"

//                             defaultValue={
//                                 editUser
//                                     ? editUser.fullName
//                                     : ""
//                             }

//                             required
//                         />


//                         <p
//                             id="fullNameError"
//                             className="error"
//                         ></p>


//                         <label
//                             className="form-label"
//                             htmlFor="email"
//                         >
//                             Email
//                         </label>


//                         <input
//                             className="form-input"
//                             type="email"
//                             id="email"
//                             name="email"
//                             placeholder="Enter your email"

//                             value={email}

//                             onChange={(event) =>
//                                 setEmail(
//                                     event.target.value
//                                 )
//                             }

//                             required
//                         />


//                         <p
//                             id="emailError"
//                             className="error"
//                         ></p>


//                         <label
//                             className="form-label"
//                             htmlFor="password"
//                         >
//                             Password
//                         </label>


//                         <input
//                             className="form-input"
//                             type="password"
//                             id="password"
//                             name="password"
//                             placeholder="Enter your password"

//                             value={password}

//                             onChange={(event) =>
//                                 setPassword(
//                                     event.target.value
//                                 )
//                             }

//                             required
//                         />


//                         <p
//                             id="passwordError"
//                             className="error"
//                         ></p>


//                         <label
//                             className="form-label"
//                             htmlFor="phone"
//                         >
//                             Phone Number
//                         </label>


//                         <input
//                             className="form-input"
//                             type="tel"
//                             id="phone"
//                             name="phone"
//                             placeholder="Enter phone number"
//                             maxLength="10"

//                             defaultValue={
//                                 editUser
//                                     ? editUser.phone
//                                     : ""
//                             }

//                             required
//                         />


//                         <p
//                             id="phoneError"
//                             className="error"
//                         ></p>


//                         <label
//                             className="form-label"
//                             htmlFor="dob"
//                         >
//                             Date of Birth
//                         </label>


//                         <input
//                             className="form-input"
//                             type="date"
//                             id="dob"
//                             name="dob"

//                             defaultValue={
//                                 editUser
//                                     ? editUser.dob
//                                     : ""
//                             }

//                             required
//                         />


//                         <p
//                             id="dobError"
//                             className="error"
//                         ></p>


//                         <label
//                             className="form-label"
//                             htmlFor="address"
//                         >
//                             Address
//                         </label>


//                         <textarea
//                             className="form-input address-input"
//                             id="address"
//                             name="address"
//                             placeholder="Enter your address"
//                             rows="4"

//                             defaultValue={
//                                 editUser
//                                     ? editUser.address
//                                     : ""
//                             }

//                             required

//                         ></textarea>


//                         <p
//                             id="addressError"
//                             className="error"
//                         ></p>


//                         <label className="form-label">
//                             Gender
//                         </label>


//                         <div className="gender-box">

//                             <label className="gender-option">

//                                 <input
//                                     type="radio"
//                                     name="gender"
//                                     value="Male"

//                                     defaultChecked={
//                                         editUser?.gender === "Male"
//                                     }

//                                     required
//                                 />

//                                 Male

//                             </label>


//                             <label className="gender-option">

//                                 <input
//                                     type="radio"
//                                     name="gender"
//                                     value="Female"

//                                     defaultChecked={
//                                         editUser?.gender === "Female"
//                                     }

//                                 />

//                                 Female

//                             </label>


//                             <label className="gender-option">

//                                 <input
//                                     type="radio"
//                                     name="gender"
//                                     value="Other"

//                                     defaultChecked={
//                                         editUser?.gender === "Other"
//                                     }

//                                 />

//                                 Other

//                             </label>

//                         </div>


//                         <p
//                             id="genderError"
//                             className="error"
//                         ></p>


//                         <label className="form-label">
//                             Favorite Coding Language
//                         </label>


//                         <div className="language-box">

//                             {languages.map((language) => (

//                                 <label
//                                     key={language}
//                                     className="language-option"
//                                 >

//                                     <input
//                                         type="checkbox"
//                                         value={language}

//                                         checked={
//                                             selectedLanguages.includes(
//                                                 language
//                                             )
//                                         }

//                                         onChange={() =>
//                                             handleLanguageChange(
//                                                 language
//                                             )
//                                         }
//                                     />

//                                     {language}

//                                 </label>

//                             ))}

//                         </div>


//                         <p
//                             id="codingError"
//                             className="error"
//                         ></p>


//                         <label
//                             className="form-label"
//                             htmlFor="profileImage"
//                         >
//                             Profile Image
//                         </label>


//                         <input
//                             className="form-input image-input"
//                             type="file"
//                             id="profileImage"
//                             name="profileImage"
//                             accept="image/*"
//                         />


//                         <p
//                             id="imageError"
//                             className="error"
//                         ></p>


//                         <div className="edit-buttons">

//                             <button
//                                 disabled={
//                                     email.trim() === "" ||
//                                     password.trim() === ""
//                                 }

//                                 type="submit"

//                                 id="submitBtn"

//                                 className="submit-btn"
//                             >

//                                 {editUser
//                                     ? "Update"
//                                     : "Submit"
//                                 }

//                             </button>


//                             {editUser && (

//                                 <button
//                                     type="button"
//                                     className="back-btn"

//                                     onClick={() =>
//                                         setEditUser(null)
//                                     }
//                                 >

//                                     Back

//                                 </button>

//                             )}

//                         </div>

//                     </form>

//                 </div>

//             </div>

//         </div>

//     );

// }

// export default Registration;
// React se useState hook import kar rahe hain.
// useState component ke andar data ko store aur update karne ke liye use hota hai.
import { useState } from "react";

// Is component ki CSS file import kar rahe hain.
import "./Registration.css";


function Registration() {


    // =========================================================
    // USERS ARRAY
    // =========================================================

    // users ke andar saare registered users store honge.
    //
    // users:
    // current users ki array
    //
    // setUsers:
    // users array ko update karne ka function
    const [users, setUsers] = useState([]);


    // =========================================================
    // EDIT USER
    // =========================================================

    // Jab kisi user ke name par click karenge,
    // us user ka complete data editUser mein store hoga.
    //
    // Initially koi user edit nahi ho raha,
    // isliye null rakha hai.
    const [editUser, setEditUser] = useState(null);


    // =========================================================
    // FORM STATES
    // =========================================================

    // Full Name ko state mein store kar rahe hain.
    const [fullName, setFullName] = useState("");


    // Email ko state mein store kar rahe hain.
    const [email, setEmail] = useState("");


    // Password ko state mein store kar rahe hain.
    const [password, setPassword] = useState("");


    // Phone number ko state mein store kar rahe hain.
    const [phone, setPhone] = useState("");


    // Date of Birth ko state mein store kar rahe hain.
    const [dob, setDob] = useState("");


    // Address ko state mein store kar rahe hain.
    const [address, setAddress] = useState("");


    // Gender ko state mein store kar rahe hain.
    const [gender, setGender] = useState("");


    // Multiple coding languages ko array ke andar store karenge.
    //
    // Example:
    //
    // [
    //     "JavaScript",
    //     "React",
    //     "Python"
    // ]
    const [selectedLanguages, setSelectedLanguages] = useState([]);


    // Profile image ka data yahan store hoga.
    //
    // Initially image nahi hai,
    // isliye empty string.
    const [profileImage, setProfileImage] = useState("");


    // =========================================================
    // ERROR STATES
    // =========================================================

    // Full Name ka error store karega.
    const [fullNameError, setFullNameError] = useState("");


    // Email ka error store karega.
    const [emailError, setEmailError] = useState("");


    // Password ka error store karega.
    const [passwordError, setPasswordError] = useState("");


    // Phone ka error store karega.
    const [phoneError, setPhoneError] = useState("");


    // DOB ka error store karega.
    const [dobError, setDobError] = useState("");


    // Address ka error store karega.
    const [addressError, setAddressError] = useState("");


    // Gender ka error store karega.
    const [genderError, setGenderError] = useState("");


    // Coding language ka error store karega.
    const [languageError, setLanguageError] = useState("");


    // =========================================================
    // AVAILABLE LANGUAGES
    // =========================================================

    // Ye languages checkbox mein show hongi.
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


    // =========================================================
    // LANGUAGE CHANGE
    // =========================================================

    // Jab kisi language ke checkbox par click hoga,
    // ye function chalega.
    function handleLanguageChange(language) {


        // includes() check karta hai ki language
        // selectedLanguages array mein already hai ya nahi.
        if (selectedLanguages.includes(language)) {


            // Agar language already selected hai,
            // filter() us language ko remove karega.
            setSelectedLanguages(
                selectedLanguages.filter(
                    (item) => item !== language
                )
            );


        } else {


            // Agar language selected nahi hai,
            // to purani languages ke saath new language add karenge.
            //
            // ...selectedLanguages
            // purani array ki values copy karta hai.
            setSelectedLanguages([
                ...selectedLanguages,
                language
            ]);
        }
    }


    // =========================================================
    // IMAGE CHANGE
    // =========================================================

    // Jab user image select karega,
    // ye function chalega.
    //
    // Hum yahan event.target use nahi kar rahe.
    // File directly function mein receive kar rahe hain.
    function handleImageChange(file) {


        // Agar user ne image select nahi ki,
        // to function stop ho jayega.
        if (!file) {
            return;
        }


        // FileReader browser ka built-in object hai.
        // Iska use image file ko read karne ke liye hota hai.
        const reader = new FileReader();


        // Jab FileReader image ko read kar lega,
        // tab ye function chalega.
        reader.onload = () => {


            // reader.result mein image ka Base64 data hota hai.
            //
            // Is data ko profileImage state mein save kar rahe hain.
            setProfileImage(reader.result);
        };


        // Image ko Base64 format mein read kar rahe hain.
        reader.readAsDataURL(file);
    }


    // =========================================================
    // FULL NAME VALIDATION
    // =========================================================

    function validateFullName() {


        // trim() starting aur ending ke extra spaces remove karta hai.
        const value = fullName.trim();


        // Agar Full Name empty hai.
        if (value === "") {

            setFullNameError(
                "Full Name is required"
            );

            // false ka matlab validation fail.
            return false;
        }


        // Name minimum 3 characters ka hona chahiye.
        if (value.length < 3) {

            setFullNameError(
                "Full Name must be at least 3 characters"
            );

            return false;
        }


        // Ye pattern sirf letters aur spaces allow karta hai.
        const namePattern = /^[A-Za-z ]+$/;


        // Agar name pattern ke according nahi hai.
        if (!namePattern.test(value)) {

            setFullNameError(
                "Full Name can contain only letters and spaces"
            );

            return false;
        }


        // Agar sab correct hai,
        // error ko empty kar dete hain.
        setFullNameError("");


        // Validation successful.
        return true;
    }


    // =========================================================
    // EMAIL VALIDATION
    // =========================================================

    function validateEmail() {


        // Email ke extra spaces remove kar rahe hain.
        const value = email.trim();


        // Email empty hai ya nahi.
        if (value === "") {

            setEmailError(
                "Email is required"
            );

            return false;
        }


        // Basic email format check karne ke liye pattern.
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        // Agar email format galat hai.
        if (!emailPattern.test(value)) {

            setEmailError(
                "Please enter a valid email"
            );

            return false;
        }


        // Email ko lowercase mein convert kar rahe hain.
        //
        // Example:
        //
        // DEV@GMAIL.COM
        //
        // aur
        //
        // dev@gmail.com
        //
        // ko same email maana jayega.
        const lowerCaseEmail =
            value.toLowerCase();


        // some() array ke andar check karta hai
        // ki koi element condition satisfy karta hai ya nahi.
        const emailExists = users.some(
            (user) => {


                // =================================================
                // EDIT MODE
                // =================================================

                // Agar hum user ko edit kar rahe hain
                // aur ye wahi current user hai,
                // to uska existing email duplicate nahi maana jayega.
                if (
                    editUser &&
                    user.id === editUser.id
                ) {

                    return false;
                }


                // Existing users ka email compare kar rahe hain.
                return (
                    user.email.toLowerCase() ===
                    lowerCaseEmail
                );
            }
        );


        // Agar email pehle se exist karta hai.
        if (emailExists) {

            setEmailError(
                "Email already exists"
            );

            return false;
        }


        // Email valid hai.
        setEmailError("");

        return true;
    }


    // =========================================================
    // PASSWORD VALIDATION
    // =========================================================

    function validatePassword() {


        // Password ki current value.
        const value = password;


        // Password empty hai.
        if (value === "") {

            setPasswordError(
                "Password is required"
            );

            return false;
        }


        // Password minimum 8 characters.
        if (value.length < 8) {

            setPasswordError(
                "Password must be at least 8 characters"
            );

            return false;
        }


        // Uppercase letter check.
        if (!/[A-Z]/.test(value)) {

            setPasswordError(
                "Password must contain an uppercase letter"
            );

            return false;
        }


        // Lowercase letter check.
        if (!/[a-z]/.test(value)) {

            setPasswordError(
                "Password must contain a lowercase letter"
            );

            return false;
        }


        // Number check.
        if (!/[0-9]/.test(value)) {

            setPasswordError(
                "Password must contain a number"
            );

            return false;
        }


        // Password valid hai.
        setPasswordError("");

        return true;
    }


    // =========================================================
    // PHONE VALIDATION
    // =========================================================

    function validatePhone() {


        // Phone ke extra spaces remove kar rahe hain.
        const value = phone.trim();


        // Phone empty hai.
        if (value === "") {

            setPhoneError(
                "Phone number is required"
            );

            return false;
        }


        // Sirf numbers allowed.
        if (!/^[0-9]+$/.test(value)) {

            setPhoneError(
                "Phone number can contain only numbers"
            );

            return false;
        }


        // Phone exactly 10 digits ka hona chahiye.
        if (value.length !== 10) {

            setPhoneError(
                "Phone number must be 10 digits"
            );

            return false;
        }


        // Check kar rahe hain ki phone pehle se registered hai ya nahi.
        const phoneExists = users.some(
            (user) => {


                // Edit mode mein current user ka apna phone allowed hai.
                if (
                    editUser &&
                    user.id === editUser.id
                ) {

                    return false;
                }


                // Existing phone compare.
                return user.phone === value;
            }
        );


        // Agar phone already exist karta hai.
        if (phoneExists) {

            setPhoneError(
                "Phone number already exists"
            );

            return false;
        }


        setPhoneError("");

        return true;
    }


    // =========================================================
    // DOB VALIDATION
    // =========================================================

    function validateDOB() {


        // Agar DOB empty hai.
        if (dob === "") {

            setDobError(
                "Date of Birth is required"
            );

            return false;
        }


        // Current date nikal rahe hain.
        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        // Future date ko allow nahi karenge.
        if (dob > today) {

            setDobError(
                "Date of Birth cannot be in the future"
            );

            return false;
        }


        setDobError("");

        return true;
    }


    // =========================================================
    // ADDRESS VALIDATION
    // =========================================================

    function validateAddress() {


        // Extra spaces remove.
        const value = address.trim();


        // Address empty hai.
        if (value === "") {

            setAddressError(
                "Address is required"
            );

            return false;
        }


        // Minimum 10 characters.
        if (value.length < 10) {

            setAddressError(
                "Address must be at least 10 characters"
            );

            return false;
        }


        setAddressError("");

        return true;
    }


    // =========================================================
    // GENDER VALIDATION
    // =========================================================

    function validateGender() {


        // Gender select nahi hua.
        if (gender === "") {

            setGenderError(
                "Please select your gender"
            );

            return false;
        }


        setGenderError("");

        return true;
    }


    // =========================================================
    // LANGUAGE VALIDATION
    // =========================================================

    function validateLanguages() {


        // selectedLanguages ki length check.
        //
        // 0 ka matlab koi language select nahi hai.
        if (selectedLanguages.length === 0) {

            setLanguageError(
                "Please select at least one coding language"
            );

            return false;
        }


        setLanguageError("");

        return true;
    }


    // =========================================================
    // COMPLETE FORM VALIDATION
    // =========================================================

    function validateForm() {


        // Har field ki validation separately call kar rahe hain.
        const fullNameValid =
            validateFullName();


        const emailValid =
            validateEmail();


        const passwordValid =
            validatePassword();


        const phoneValid =
            validatePhone();


        const dobValid =
            validateDOB();


        const addressValid =
            validateAddress();


        const genderValid =
            validateGender();


        const languageValid =
            validateLanguages();


        // Agar koi bhi validation false hai,
        // to complete form invalid maana jayega.
        if (
            !fullNameValid ||
            !emailValid ||
            !passwordValid ||
            !phoneValid ||
            !dobValid ||
            !addressValid ||
            !genderValid ||
            !languageValid
        ) {

            return false;
        }


        // Sab fields valid hain.
        return true;
    }


    // =========================================================
    // RESET FORM
    // =========================================================

    function resetForm() {


        // Saari input states ko empty kar rahe hain.
        setFullName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setDob("");
        setAddress("");
        setGender("");


        // Multiple selected languages remove.
        setSelectedLanguages([]);


        // Image remove.
        setProfileImage("");


        // Edit mode close.
        setEditUser(null);


        // Saare errors clear.
        setFullNameError("");
        setEmailError("");
        setPasswordError("");
        setPhoneError("");
        setDobError("");
        setAddressError("");
        setGenderError("");
        setLanguageError("");
    }


    // =========================================================
    // SUBMIT FUNCTION
    // =========================================================

    // Ye function sirf NEW USER ke liye hai.
    function handleSubmit() {


        // Submit se pehle complete validation.
        const isValid = validateForm();


        // Agar validation fail hui,
        // to user create nahi hoga.
        if (!isValid) {

            return;
        }


        // =====================================================
        // ID
        // =====================================================

        // Date.now() current time ko milliseconds mein number deta hai.
        //
        // Example:
        //
        // 1755498234567
        //
        // Hum is number ko practice project mein
        // user ki unique ID ke liye use kar rahe hain.
        //
        // Database project mein normally ID database se milegi.
        const userId = Date.now();


        // =====================================================
        // USER OBJECT
        // =====================================================

        // New user ka complete object bana rahe hain.
        const user = {

            // Yahan ? : ternary operator use nahi kiya.
            //
            // Kyunki ye Submit function hai,
            // isliye humein hamesha new ID chahiye.
            id: userId,

            // Full Name state se.
            fullName: fullName,

            // Email state se.
            email: email,

            // Password state se.
            password: password,

            // Phone state se.
            phone: phone,

            // DOB state se.
            dob: dob,

            // Address state se.
            address: address,

            // Gender state se.
            gender: gender,

            // Multiple languages array se.
            codingLanguage: selectedLanguages,

            // Image state se.
            profileImage: profileImage
        };


        // Purane users ke saath new user add kar rahe hain.
        //
        // ...previousUsers
        // purane users ko copy karta hai.
        //
        // user
        // new user add karta hai.
        setUsers(
            (previousUsers) => [
                ...previousUsers,
                user
            ]
        );


        // User add hone ke baad form clear.
        resetForm();
    }


    // =========================================================
    // EDIT FUNCTION
    // =========================================================

    // Ye function selected user ka data form mein laayega.
    function handleEdit(id) {


        // find() ID ke basis par user search karta hai.
        const selectedUser = users.find(
            (user) => user.id === id
        );


        // Agar user nahi mila,
        // to function stop.
        if (!selectedUser) {

            return;
        }


        // Selected user ko editUser mein save.
        setEditUser(selectedUser);


        // Selected user ka data form states mein daal rahe hain.
        setFullName(
            selectedUser.fullName || ""
        );


        setEmail(
            selectedUser.email || ""
        );


        setPassword(
            selectedUser.password || ""
        );


        setPhone(
            selectedUser.phone || ""
        );


        setDob(
            selectedUser.dob || ""
        );


        setAddress(
            selectedUser.address || ""
        );


        setGender(
            selectedUser.gender || ""
        );


        // Purani selected languages ko checkbox state mein daal rahe hain.
        setSelectedLanguages(
            selectedUser.codingLanguage || []
        );


        // Purani image ko form mein la rahe hain.
        setProfileImage(
            selectedUser.profileImage || ""
        );


        // Purane errors clear.
        setFullNameError("");
        setEmailError("");
        setPasswordError("");
        setPhoneError("");
        setDobError("");
        setAddressError("");
        setGenderError("");
        setLanguageError("");
    }


    // =========================================================
    // UPDATE FUNCTION
    // =========================================================

    // Ye function sirf existing user ko update karega.
    function handleUpdate() {


        // Update se pehle validation.
        const isValid = validateForm();


        // Validation fail hui to update stop.
        if (!isValid) {

            return;
        }


        // Updated user ki ID ke liye separate variable.
        //
        // Yahan ? : ki zarurat nahi hai,
        // kyunki handleUpdate tabhi chalega
        // jab editUser available hoga.
        const userId = editUser.id;


        // Updated user object.
        const updatedUser = {

            // Current user ki ID same rakhenge.
            id: userId,

            // Current form values.
            fullName: fullName,
            email: email,
            password: password,
            phone: phone,
            dob: dob,
            address: address,
            gender: gender,

            // Current selected languages.
            codingLanguage: selectedLanguages,

            // Current image.
            profileImage: profileImage
        };


        // map() existing users ki array par chalega.
        setUsers(
            (previousUsers) =>
                previousUsers.map(
                    (user) => {


                        // Agar user ki ID editUser ki ID ke equal hai,
                        // to updatedUser return karo.
                        if (
                            user.id === editUser.id
                        ) {

                            return updatedUser;
                        }


                        // Baaki users same rahenge.
                        return user;
                    }
                )
        );


        // Update ke baad form clear
        // aur popup close.
        resetForm();
    }


    // =========================================================
    // DELETE FUNCTION
    // =========================================================

    // Ye function selected user ko delete karega.
    function handleDelete(id) {


        // filter() selected ID wale user ko hata deta hai.
        setUsers(
            (previousUsers) =>
                previousUsers.filter(
                    (user) => user.id !== id
                )
        );
    }


    // =========================================================
    // JSX RETURN
    // =========================================================

    return (

        <div className="restaurant-container">


            {/* Page ka heading */}

            <h2 className="table-title">
                Users Data
            </h2>


            {/* Table ko wrapper ke andar rakha
                taaki CSS se responsive bana saken */}

            <div className="table-wrapper">

                <table className="user-table">


                    {/* Table heading */}

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


                    {/* Table body */}

                    <tbody>


                        {/* users array ko map karke
                            har user ki row create kar rahe hain */}

                        {users.map(
                            (user) => (

                                <tr key={user.id}>


                                    {/* IMAGE */}

                                    <td>

                                        {user.profileImage === "" ? (

                                            // Agar image nahi hai
                                            // to emoji show hoga.
                                            <p>😊</p>

                                        ) : (

                                            // Agar image hai
                                            // to image show hogi.
                                            <img
                                                src={user.profileImage}
                                                alt={user.fullName}
                                                className="profile-image"
                                            />

                                        )}

                                    </td>


                                    {/* NAME */}

                                    <td
                                        className="user-name"

                                        // Name par click karne par
                                        // handleEdit call hoga.
                                        onClick={() =>
                                            handleEdit(
                                                user.id
                                            )
                                        }
                                    >

                                        {user.fullName}

                                    </td>


                                    {/* EMAIL */}

                                    <td>
                                        {user.email}
                                    </td>


                                    {/* PASSWORD */}

                                    <td>

                                        {user.password ? (

                                            // Password ke last 2 characters
                                            // visible rakhenge.
                                            //
                                            // Example:
                                            //
                                            // Devendra123
                                            //
                                            // *********23
                                            "*".repeat(
                                                Math.max(
                                                    0,
                                                    user.password.length - 2
                                                )
                                            ) +
                                            user.password.slice(-2)

                                        ) : (

                                            // Agar password nahi hai.
                                            "No Password"

                                        )}

                                    </td>


                                    {/* PHONE */}

                                    <td>
                                        {user.phone}
                                    </td>


                                    {/* DOB */}

                                    <td>
                                        {user.dob}
                                    </td>


                                    {/* ADDRESS */}

                                    <td>
                                        {user.address}
                                    </td>


                                    {/* GENDER */}

                                    <td>
                                        {user.gender}
                                    </td>


                                    {/* CODING LANGUAGES */}

                                    <td>

                                        {/* join() array ki multiple
                                            languages ko ek string mein convert karta hai */}

                                        {user.codingLanguage.join(", ")}

                                    </td>


                                    {/* DELETE BUTTON */}

                                    <td>

                                        <button
                                            type="button"

                                            // Button click par
                                            // selected user delete hoga.
                                            onClick={() =>
                                                handleDelete(
                                                    user.id
                                                )
                                            }
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            )
                        )}

                    </tbody>

                </table>

            </div>


            {/* =====================================================
                FORM / POPUP
            ===================================================== */}

            <div
                className={
                    // Yahan tumne ? : ke baare mein poocha tha.
                    //
                    // Ye ternary operator hai.
                    //
                    // Agar editUser true hai:
                    // "modal-overlay"
                    //
                    // Agar editUser false/null hai:
                    // "form-container"
                    //
                    // Hum ise if/else se direct JSX ke andar
                    // replace nahi kar sakte.
                    //
                    // Isliye yahan ternary simple aur useful hai.
                    editUser
                        ? "modal-overlay"
                        : "form-container"
                }
            >


                <div
                    className={
                        // Agar edit mode hai,
                        // modal-content class lagegi.
                        //
                        // Agar normal form hai,
                        // empty class name rahega.
                        editUser
                            ? "modal-content"
                            : ""
                    }
                >


                    {/* =================================================
                        EDIT MODE IMAGE
                    ================================================= */}

                    {editUser && (

                        // Agar edit mode mein image available hai.
                        profileImage ? (

                            <img
                                src={profileImage}
                                alt={fullName}
                                className="edit-profile-image"
                            />

                        ) : (

                            // Agar image available nahi hai.
                            <div className="no-profile-image">
                                😊
                            </div>

                        )

                    )}


                    {/* FORM TITLE */}

                    <h2 className="form-title">

                        {editUser
                            ? "Update User"
                            : "Registration Form"
                        }

                    </h2>


                    {/* FORM */}

                    <form
                        className="registration-form"

                        // Browser ka default form submit stop kar rahe hain.
                        onSubmit={(event) =>
                            event.preventDefault()
                        }
                    >


                        {/* =================================================
                            FULL NAME
                        ================================================= */}

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

                            // Input ki current value state se aa rahi hai.
                            value={fullName}

                            // Input change hone par
                            // state update ho rahi hai.
                            onChange={(event) =>
                                setFullName(
                                    event.currentTarget.value
                                )
                            }
                        />


                        {/* Full Name ka error input ke neeche */}

                        <p className="error">
                            {fullNameError}
                        </p>


                        {/* =================================================
                            EMAIL
                        ================================================= */}

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
                                    event.currentTarget.value
                                )
                            }
                        />


                        {/* Email error */}

                        <p className="error">
                            {emailError}
                        </p>


                        {/* =================================================
                            PASSWORD
                        ================================================= */}

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
                                    event.currentTarget.value
                                )
                            }
                        />


                        {/* Password error */}

                        <p className="error">
                            {passwordError}
                        </p>


                        {/* =================================================
                            PHONE
                        ================================================= */}

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

                            // Maximum 10 characters allow.
                            maxLength="10"

                            value={phone}

                            onChange={(event) =>
                                setPhone(
                                    event.currentTarget.value
                                )
                            }
                        />


                        {/* Phone error */}

                        <p className="error">
                            {phoneError}
                        </p>


                        {/* =================================================
                            DOB
                        ================================================= */}

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

                            value={dob}

                            onChange={(event) =>
                                setDob(
                                    event.currentTarget.value
                                )
                            }
                        />


                        {/* DOB error */}

                        <p className="error">
                            {dobError}
                        </p>


                        {/* =================================================
                            ADDRESS
                        ================================================= */}

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

                            value={address}

                            onChange={(event) =>
                                setAddress(
                                    event.currentTarget.value
                                )
                            }
                        ></textarea>


                        {/* Address error */}

                        <p className="error">
                            {addressError}
                        </p>


                        {/* =================================================
                            GENDER
                        ================================================= */}

                        <label className="form-label">
                            Gender
                        </label>


                        <div className="gender-box">


                            {/* MALE */}

                            <label className="gender-option">

                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"

                                    // Agar gender Male hai
                                    // to radio checked rahega.
                                    checked={
                                        gender === "Male"
                                    }

                                    onChange={(event) =>
                                        setGender(
                                            event.currentTarget.value
                                        )
                                    }
                                />

                                Male

                            </label>


                            {/* FEMALE */}

                            <label className="gender-option">

                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"

                                    checked={
                                        gender === "Female"
                                    }

                                    onChange={(event) =>
                                        setGender(
                                            event.currentTarget.value
                                        )
                                    }
                                />

                                Female

                            </label>


                            {/* OTHER */}

                            <label className="gender-option">

                                <input
                                    type="radio"
                                    name="gender"
                                    value="Other"

                                    checked={
                                        gender === "Other"
                                    }

                                    onChange={(event) =>
                                        setGender(
                                            event.currentTarget.value
                                        )
                                    }
                                />

                                Other

                            </label>

                        </div>


                        {/* Gender error */}

                        <p className="error">
                            {genderError}
                        </p>


                        {/* =================================================
                            FAVORITE CODING LANGUAGE
                        ================================================= */}

                        <label className="form-label">
                            Favorite Coding Language
                        </label>


                        <div className="language-box">


                            {/* languages array ki har language
                                ka checkbox create kar rahe hain */}

                            {languages.map(
                                (language) => (

                                    <label
                                        key={language}
                                        className="language-option"
                                    >

                                        <input
                                            type="checkbox"

                                            // Agar language selected hai
                                            // to checkbox checked.
                                            checked={
                                                selectedLanguages.includes(
                                                    language
                                                )
                                            }

                                            // Checkbox click hone par
                                            // language function mein jayegi.
                                            onChange={() =>
                                                handleLanguageChange(
                                                    language
                                                )
                                            }
                                        />

                                        {language}

                                    </label>

                                )
                            )}

                        </div>


                        {/* Language error */}

                        <p className="error">
                            {languageError}
                        </p>


                        {/* =================================================
                            PROFILE IMAGE
                        ================================================= */}

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

                            // Sirf image files select karne ke liye.
                            accept="image/*"

                            // event.currentTarget.files[0]
                            // selected first file deta hai.
                            //
                            // Hum is file ko directly
                            // handleImageChange() mein bhej rahe hain.
                            onChange={(event) =>
                                handleImageChange(
                                    event.currentTarget.files[0]
                                )
                            }
                        />


                        {/* =================================================
                            SUBMIT BUTTON
                        ================================================= */}

                        {!editUser && (

                            // Ye button sirf new user ke liye show hoga.
                            <button
                                type="button"
                                className="submit-btn"

                                // disabled property button ko disable karti hai.
                                //
                                // Agar email empty hai
                                // OR
                                // password empty hai
                                //
                                // button disabled rahega.
                                disabled={
                                    email.trim() === "" ||
                                    password.trim() === ""
                                }

                                // Button click par new user create.
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>

                        )}


                        {/* =================================================
                            UPDATE BUTTON
                        ================================================= */}

                        {editUser && (

                            // Ye button sirf edit mode mein show hoga.
                            <button
                                type="button"
                                className="update-btn"

                                // Email/password empty hone par
                                // Update disabled.
                                disabled={
                                    email.trim() === "" ||
                                    password.trim() === ""
                                }

                                // Existing user update.
                                onClick={handleUpdate}
                            >
                                Update
                            </button>

                        )}


                        {/* =================================================
                            BACK BUTTON
                        ================================================= */}

                        {editUser && (

                            // Back button sirf edit mode mein show hoga.
                            <button
                                type="button"
                                className="back-btn"

                                // Form reset + popup close.
                                onClick={resetForm}
                            >
                                Back
                            </button>

                        )}

                    </form>

                </div>

            </div>

        </div>
    );
}


// Component ko doosri file mein import karne ke liye export.
export default Registration;