import React from 'react'
import Qualities from './qualitie'
import Bookmark from './bookmark'

const User = ({ user, onDelete }) => {

    return (
        <tr key={user._id}>
            <td>{user.name}</td>
            <td>{user.qualities.map(quality => Qualities(quality))}</td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}/5</td>
            <td >
                {Bookmark(user.bookmark)}
            </td>
            <td
                className='btn btn-danger p-1 m-1'
                onClick={() => onDelete(user._id)}>
                Delete
            </td>
        </tr>
    )
}

export default User