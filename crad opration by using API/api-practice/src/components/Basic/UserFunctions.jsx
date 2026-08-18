import { useEffect, useState } from "react";
import UsersTable from "./UsersTable";
import Registration from "./Registration";

function UserFunction() {

    const [users, setUsers] = useState([]);

    const [editUserData, setEditUserData] = useState(null);


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
}
function deleteUser(id) {

    setUsers((previousUsers) =>
        previousUsers.filter((user) => user.id !== id)
    );

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
        </>
    );
}

export default UserFunction;