import React from 'react';
import { createContext, useContext, useState } from 'react';
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
    const [favorites, setFavorites] = useState([])


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

    const addFavorite = (userText) => {
        // console.log(`user`, user.uid)
        // console.log(`userDescrip`, userDescription)

        const userRef = db.collection("userProfile").doc(user.uid);
        //userDisplayName   
        //UID
        //timeStamp
        //UserDescription
        //item.audio
        //item.title
        //podcastDetail.thumbnail
        //PodcastDetail.title
        userRef.update({
            userDescription : firebaseapp.firestore.FieldValue.arrayUnion({
                userText
                
            }),
            
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });;
    }


    const addFavAudio = (audioFile) => {
        // console.log(`user`, user.uid)
        // console.log(`userDescrip`, userDescription)

        const userRef = db.collection("userProfile").doc(user.uid);
        //userDisplayName   
        //UID
        //timeStamp
        //UserDescription
        //item.audio
        //item.title
        //podcastDetail.thumbnail
        //PodcastDetail.title
        userRef.update({
            favEpisodes : firebaseapp.firestore.FieldValue.arrayUnion({
                audioFile
                
            }),
            
        })
        .then(() => {
            console.log("Audio successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });;
    }


    //get Favorites from Firebase
    const getFavorites = () => {

        db.collection("userProfile").get().then((querySnapshot) => {
            
            const favoritesArray = []
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                favoritesArray.push(doc)
                console.log(`favoritesArray`, doc)
            });
            
            setFavorites(favoritesArray)
            console.log(`favoritesArray`, favoritesArray)
        });
        
    }



    //Delete from favorites
    // const deleteFavorite = (id) => {
    //     db.collection("userProfile").doc(id).delete().then(() => {
    //         console.log("Document successfully deleted!");
    //     }).catch((error) => {
    //         console.error("Error removing document: ", error);
    //     });

    // }

    const deleteFavorite = (userDescription) => {  //REVIEW userDescription lo recibo del handleDelete del UserProfil...pero porque si no lllamo igual el argumen que el field mas abajo, no funciona?
        const userRef = db.collection("userProfile").doc(user.uid);
        
        userRef.update({
            userText : firebaseapp.firestore.FieldValue.arrayRemove({
                userDescription
            })
        })
        .then(() => {
            console.log("Document successfully Deleted!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });;

    }




    return (
        <UserProfileContext.Provider value={{favorites, addFavorite,addFavAudio, getFavorites, deleteFavorite}}>
            {children}
        </UserProfileContext.Provider>
    )
}
