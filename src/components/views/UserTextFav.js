import React from 'react';





const UserTextFav = ({userDescription}) => {

    console.log(`userText`, userDescription)

    return (
        <div>
            <p> {userDescription.userText}</p>
            {/* <p>{index}</p>
                <button onClick={() => handleDelete(fav.userText)}>delete</button> */}
        </div>
    );
};

export default UserTextFav;