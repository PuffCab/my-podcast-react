import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react';


import { AuthContext } from "../context/authContext";
import { UserProfileContext } from '../context/UserProfileContext';


const flexContainer = { display: 'flex', flexDirection: 'column' }




function UserProfile() {
    
    const { user } = useContext(AuthContext)

    const { favorites, addFavorite,addFavAudio, getFavorites, deleteFavorite, deleteFavAudio  } = useContext(UserProfileContext)
    
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
        
        setUserDescription('')
        console.log(`userDescrip`, userDescription)
    }
    //FIN eliminar estas funciones //////////////////////
    
    const handleDelete = (deleteUserText) => { 
        deleteFavorite(deleteUserText)           //REVIEW porque aunque pase este argumnto a la funcionn, n userProfileContext no puedo llamar el argumento igual
        console.log(`deleteUserText`, deleteUserText)
        
    }
    
    const handleDeleteAudioFav = (deleteAudioFav) => { 
        deleteFavAudio(deleteAudioFav)
    }
     
    
    
    return (
        <div style={flexContainer}>
            <h1>User Profile</h1>
            <p>{user? `Profile from ${user?.displayName ?? ""} ${user.email} and uid ${user.uid}` : "Not logged in"}</p>
            <br />
            <br />

            <div  >
             <h3>User description</h3>
             {/* write messages */}
             <input type="text" placeholder='message' value={userDescription} onChange={handleOnchange} />
             <button onClick={handleAddFavorite}>write description</button>
             {/* read messages */}  
             
             {favorites ? favorites.map((favorite, index) => {
                 {/* {console.log("this is favorites", favorites)} */}
                if (favorite.id === user.uid) {
                    {/* {console.log('FAVORITE', favorite.data())} */}
                    
                 return (
                     <div className='container'>
                         <div className='row'>
                         <div className='col'>
                            <h5>Favorites Area</h5>
                         {/* <h6>{favorite.toData().timestamp.toDate().toLocaleString()}</h6> */}
                         {favorite.data() ? favorite.data().userDescription.map((fav, index) => {
                            

                            return (
                            <div >
                                
                                    <div className='col order-last'>
                                        <p> {fav.userText}</p>
                                        <p>{index}</p>
                                            <button onClick={() => handleDelete(fav.userText)}>delete</button>
                                    </div>
                    
                                </div>
                            
                            )
                         }) : <p>no userTexts yet</p>}  
                         </div>
                        
                         
                         <div className='col'>
                            <h3>Fav Episodes</h3>
                         {favorite.data() ? favorite.data().favEpisodes.map((fav, index) => {

                            return (
                            <div className='col order-last'>
                                <div >
                                    <div >
                                        <p> {fav.audioFile}</p>
                                        <p>{index}</p>
                                            <button onClick={() => handleDeleteAudioFav(fav.audioFile)}>delete</button>
                                    </div>
                                </div>
                            </div>
                            )
                         }) : <p>no userTexts yet</p>}  
                         </div>
                        
                         
                        </div>
                         
                     </div>
                 )
                }           
             }) : <h2>....Loading...</h2>}
         </div>

        </div>
    )
}

export default UserProfile
