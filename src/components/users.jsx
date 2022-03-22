import React, { useState } from 'react';
import api from '../api'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const handleDelete = (userId) => {
        setUsers(prevState => prevState.filter(user => user._id !== userId))
    }
    const renderPhrase = (number) => {
        return number !== 0 ? <span className='badge bg-primary'>{number} тусанет с тобой сегодня</span>
            : <span className='badge bg-danger'>Никто с тобой не тусанет</span>
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.qualities.map(quality => (
                                    <span
                                        className={`badge bg-${quality.color} m-1`}
                                        key={quality._id}>
                                        {quality.name}
                                    </span>
                                ))}</td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate}/5</td>
                                <td
                                    className='btn btn-danger p-1 m-1'
                                    onClick={() => handleDelete(user._id)}>
                                    Delete
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table> : ''}
        </>
    )
}

export default Users