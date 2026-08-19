function UsersTable({ users, editUser, deleteUser }) {

    return (
        <div className="table-container">

            <h2>Users List</h2>

            <table className="users-table">

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    {users.map((user) => (

                        <tr key={user.id}>

                            <td>
                                {user.id}
                            </td>

                            <td>
                                {user.firstName} {user.lastName}
                            </td>

                            <td>
                                {user.email}
                            </td>

                            <td>
                                {user.password || "******"}
                            </td>

                            <td>

                                <button
                                    className="edit-button"
                                    onClick={() => editUser(user)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="delete-button"
                                    onClick={() => deleteUser(user.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default UsersTable;