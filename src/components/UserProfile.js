import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react';


import { AuthContext } from "../context/authContext";
import { UserProfileContext } from '../context/UserProfileContext';


const flexContainer = { display: 'flex', flexDirection: 'column' }




function UserProfile() {
    
    const { user } = useContext(AuthContext)

    const { favorites, addFavorite, getFavorites, deleteFavorite } = useContext(UserProfileContext)
    
    const [userDescription, setUserDescription] = useState("")

    //useEffect para conseguir los favoritos cuando cargue el componente
    useEffect(() => {
        
        getFavorites()
        console.log(`favorites`, favorites)
        setUserDescription(favorites)
    }, [])
    
    
    //get/Create Favorites clicked in component (uso el texto de los mensajs por el momento)
    // const { messages } = useContext(ChatContext)



    //TODO eliminar estas funcions cuando se cree boton favoritos en otro componente
    const handleOnchange = (e) => {
        setUserDescription(e.target.value)
        // console.log(`e`, e.target.value)
    }

    const handleAddFavorite = () => {
        addFavorite(userDescription)
        console.log(`userDescrip`, userDescription)
        setUserDescription('')
    }
    //FIN eliminar estas funciones //////////////////////
    
    const handleDelete = (deleteUserDescrip) => { 
        deleteFavorite(deleteUserDescrip)           //REVIEW porque aunque pase este argumnto a la funcionn, n userProfileContext no puedo llamar el argumento igual
        console.log(`userDescription`, deleteUserDescrip)
    }
    
    
     
    
    
    return (
        <div style={flexContainer}>
            <h1>User Profile</h1>
            <p>{user? `Profile from ${user?.displayName ?? ""} ${user.email}` : "Not logged in"}</p>
            <br />
            <br />

            <div  >
             <h3>User description</h3>
             {/* write messages */}
             <input type="text" placeholder='message' value={userDescription} onChange={handleOnchange} />
             <button onClick={handleAddFavorite}>write description</button>
             {/* read messages */}  
             
             {favorites ? favorites.map((favorite, index) => {
                if (favorite.uid === user.uid) {
                    {console.log('FAVORITE', favorite)}
                 return (
                     <div>
                         
                         <h5>Favorites Area</h5>
                         <h6>{favorite.timestamp.toDate().toLocaleString()}</h6>
                         {favorite ? favorite.userText.map((algo, index) => {
                            {console.log("segundoLoop", algo.index)}
                            return (
                            <div>
                                <p> {algo.userDescription}</p>
                                <p>{index}</p>
                                    <button onClick={() => handleDelete(algo.userDescription)}>delete</button>
                            </div>
                            )
                         }) : "no userTexts yet"}
                        
                         
                     </div>
                 )
                }           
             }) : <h2>....Loading...</h2>}
         </div>

        </div>
    )
}

export default UserProfile
