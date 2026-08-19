import { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import Registration from "./Registration";

function UserFunction() {

    const [users, setUsers] = useState([]);

    const [editUserData, setEditUserData] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [deleteUserId, setDeleteUserId] = useState(null);

    const [successModal, setSuccessModal] = useState("");

    useEffect(() => {

        async function getUsers() {

            const response = await fetch(
                "https://dummyjson.com/users"
            );

            const data = await response.json();

            const userArray = data.users;

            setUsers(userArray);

            console.log(userArray);
        }

        getUsers();

    }, []);


    function addUser(newUser) {

        const newUserWithId = {
            ...newUser,
            id: users.length + 1
        };

        setUsers((previousUsers) => [
            ...previousUsers,
            newUserWithId
        ]);

        setSuccessModal("User successfully added");

    }


    function editUser(user) {

        console.log(user);

        setEditUserData(user);

    }


    function updateUser(updatedUser) {

        setUsers((previousUsers) =>
            previousUsers.map((user) =>
                user.id === updatedUser.id
                    ? updatedUser
                    : user
            )
        );

        setEditUserData(null);

        setSuccessModal("User successfully updated");

    }


    function deleteUser(id) {

        setDeleteUserId(id);

        setShowModal(true);

    }


    function handleCancelDelete() {

        setShowModal(false);

        setDeleteUserId(null);

    }


    function handleConfirmDelete() {

        setUsers((previousUsers) =>
            previousUsers.filter(
                (user) => user.id !== deleteUserId
            )
        );

        setShowModal(false);

        setDeleteUserId(null);

    }


    function closeSuccessModal() {

        setSuccessModal("");

    }


    return (
        <>

            <Registration
                addUser={addUser}
                editUserData={editUserData}
                updateUser={updateUser}
            />

            <UsersTable
                users={users}
                editUser={editUser}
                deleteUser={deleteUser}
            />


            {showModal && (
                <div className="modal-overlay">

                    <div className="delete-modal">

                        <h2>Delete User</h2>

                        <p>
                            Are you sure you want to delete this user?
                        </p>

                        <div className="modal-button">

                            <button
                                className="no-button"
                                onClick={handleCancelDelete}
                            >
                                NO
                            </button>

                            <button
                                className="yes-button"
                                onClick={handleConfirmDelete}
                            >
                                YES
                            </button>

                        </div>

                    </div>

                </div>
            )}


            {successModal && (
                <div className="modal-overlay">

                    <div className="success-modal">

                        <h2>Success</h2>

                        <p>
                            {successModal}
                        </p>

                        <button
                            className="success-button"
                            onClick={closeSuccessModal}
                        >
                            OK
                        </button>

                    </div>

                </div>
            )}

        </>
    );
}

export default UserFunction;