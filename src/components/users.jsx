import React, { useState } from 'react';
import api from '../api'
import User from './user';
import renderPhrase from './searchStatus';

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }
    return (
        <>
            <h4>{renderPhrase(users.length)}</h4>
            {users.length > 0 ?
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качество</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился,раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <User user={user} onDelete={handleDelete} />
                        ))
                        }
                    </tbody>
                </table> : ''}
        </>
    )
}

export default Users