import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { AuthContext } from "./authContext";
import firebase from "../config"
import firebaseapp from "firebase/app";

// Initialize Firestore
const db = firebase.firestore();

// 1 ->  create context
export const UserProfileContext = createContext()



// 2 -> create provider
export const UserProfileContextProvider = ({children}) => {

    const {user} = useContext(AuthContext)
    const [userData, setUserData] = useState("")

    const [userProfilePic, setUserProfilePic] = useState('')

    console.log(user)



    //INICIO comentado para cambiar el metodo por arrayUnion
    // const addFavorite = (userDescription) => {
    //     // console.log(`user`, user.uid)
    //     // console.log(`userDescrip`, userDescription)
    //     //userDisplayName  //UID //timeStamp  //UserDescription  //item.audio  //item.title //podcastDetail.thumbnail //PodcastDetail.title
    //     db.collection("userProfile").doc(user.uid).set({
    //         // name : user.name,
    //         userDescription : userDescription,
    //     },{ merge: true }) // according to Doc, add {merge:true} to add that field to the object and not overwrite the whole thing
    //     .then(() => {
    //         console.log("Document successfully written!");
    //     })
    //     .catch((error) => {
    //         console.error("Error writing document: ", error);
    //     });
    // }
    //FIN comentado para cambiar el metodo por arrayUnion

    
    const addUserText = (userText) => {
        // console.log(`user`, user.uid)
        // console.log(`userDescrip`, userDescription)

        const userRef = db.collection("userProfile").doc(user.uid);
        
        userRef.update({
            userDescription : firebaseapp.firestore.FieldValue.arrayUnion({
                userText,
                timestamp: firebaseapp.firestore.Timestamp.now()
                
            }),
            
        })
        .then(() => {
            console.log("Document successfully written!");
            getUserData()
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });;
    }


    const addFavAudio = (audioFile, episodeTitle, episodeThumbnail) => {
        // console.log(`user`, user.uid)
        // console.log(`userDescrip`, userDescription)

        const userRef = db.collection("userProfile").doc(user?.uid);

        userRef.update({
            favEpisodes : firebaseapp.firestore.FieldValue.arrayUnion({
                audioFile,
                episodeTitle,
                episodeThumbnail,
                timestamp: firebaseapp.firestore.Timestamp.now() //NOTE timestamp:firebase.firestore.Timestamp.now() no funciona con .arrayUnion
            }),
            
        })
        .then(() => {
            console.log("Audio successfully written!");
            getUserData() //to update the list instantly
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });;
    }


    //get Favorites from Firebase
    const getUserData = () => {
        const userRef = db.collection("userProfile").doc(user.uid);
        userRef.get().then((userDocument) => { 
        
            
            setUserData(userDocument.data())
            // console.log(`favoritesInContext`, userDocument.data()) 
        });
        
    }


    const addFavPodcast = (podcast) => {

        const userRef = db.collection("userProfile").doc(user.uid);
       
        userRef.update({
            favPodcast : firebaseapp.firestore.FieldValue.arrayUnion({
                podcast,
                timestamp: firebaseapp.firestore.Timestamp.now()
                
            }),
            
        })
        .then(() => {
            console.log("Podcast added to Favorites!"); //DELETE esta parte para probar
            getUserData() //to update the list instantly
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });;
    }

    const addProfilePic = (photoURL) => {
        // console.log(`user`, user.uid)
        // console.log(`userDescrip`, userDescription)
        

        const userRef = db.collection("userProfile").doc(user.uid);
        
        userRef.update({
            photoURL
            
        })
        .then(() => {
            console.log("PhotoURL successfully written!");
            getUserData()
        })
        .catch((error) => {
            console.error("Error loading picture: ", error);
        });;

        setUserProfilePic(photoURL)
        

        
    } //TODO modificar esta funcion, y el resto de anhadir favoritos, por la funcion mas universal del video que pongo a continuacion 

    ///////////////////////TODO Funcion de update de favoritos universal. uno para todos. y para eliminar tambien.  44:26 video
    // const updateUserData = (updateData) => {
    //     db.collection("users").doc(user.uid).set({
    //         ...updateData

    //     }).then(() => {

    //         console.log("Document successfully written!");
    //         setUserData({ ...updateData })

    //     }).catch((error) => {
    //         console.error("Error writing document: ", error);
    //     });
    // }
    ///////////////////FIN funcion universal
    


    //Delete from favorites
    // const deleteFavorite = (id) => {
    //     db.collection("userProfile").doc(id).delete().then(() => {
    //         console.log("Document successfully deleted!");
    //     }).catch((error) => {
    //         console.error("Error removing document: ", error);
    //     });

    // }

    const deleteFavorite = (userText, timestamp) => {  //REVIEW userText lo recibo del handleDelete del UserProfil...pero porque si no lllamo igual el argumen que el field mas abajo, no funciona?
        const userRef = db.collection("userProfile").doc(user.uid);
        
        userRef.update({
            userDescription : firebaseapp.firestore.FieldValue.arrayRemove({
                userText,
                timestamp
            })
        })
        .then(() => {
            console.log("Document successfully Deleted!");
            getUserData() //to update the list instantly
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });;

    }


    const deleteFavAudio = (audioFile,episodeThumbnail, episodeTitle, timestamp) => {  
        const userRef = db.collection("userProfile").doc(user.uid);
        
        userRef.update({
            favEpisodes : firebaseapp.firestore.FieldValue.arrayRemove({
                audioFile,
                episodeThumbnail,
                episodeTitle,
                timestamp
            })
        })
        .then(() => {
            console.log("Document successfully Deleted!");
            getUserData() //to update the list instantly
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });;

    }

    const deleteFavPodcast = (podcast, timestamp) => {  
        const userRef = db.collection("userProfile").doc(user.uid);
        
        userRef.update({
            favPodcast : firebaseapp.firestore.FieldValue.arrayRemove({
                podcast,
                timestamp
            })
        })
        .then(() => {
            console.log("Document successfully Deleted!");
            getUserData() //to update the list instantly
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });;

    }


    console.log('Pic en userprofileContext', userProfilePic)


    return (
        <UserProfileContext.Provider value={{userData, addUserText,addFavAudio,addFavPodcast, getUserData, deleteFavorite, deleteFavAudio, deleteFavPodcast, addProfilePic, userProfilePic}}>
            {children}
        </UserProfileContext.Provider>
    )
}

