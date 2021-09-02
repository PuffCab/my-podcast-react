
import React, { useState, createContext, useEffect } from "react";
import firebase from "../config"
import firebaseapp from "firebase/app";



const db = firebase.firestore();
export const AuthContext = createContext()



export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState(null)

    //create the first Database document for the User profile
    const addDocFavorite = (user) => {
        // console.log(`user`, user.uid)

        // console.log(`userDescrip`, userDescription)
        //userDisplayName   
        //UID
        //timeStamp
        //UserDescription
        //item.audio
        //item.title
        //podcastDetail.thumbnail
        //PodcastDetail.title
        db.collection("userProfile").doc(user.uid).set({
            // name : user.name,
            uid:user.uid,
            userDescription : [],
            timestamp: firebaseapp.firestore.FieldValue.serverTimestamp(),
            favEpisodes: [],
            favPodcasts : []
                
            
                
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    }

    
    //INICIO Get the currently signed-in user. 
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              var uid = user.uid;
              console.log(`user`, uid)
              console.log(`usercredential`, uid)
                setUser(user) //esto nos mantiene logeados cuando refrescamos pagina

            } else {
              // User is signed out
              setUser(null)
              console.log('No valid user DB Token')
            }
          });
    }, [])
    //FIN Get the currently signed-in user. 

    const register = ({ email, password, name}) => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                setUser(user)

                //UPDATE a user's profile/////
                user.updateProfile({
                    displayName: name,
                    // photoURL: "https://example.com/jane-q-user/profile.jpg"
                  }).then(() => {
                    const user = firebase.auth().currentUser; //con esto recuperamos el User de la database, antes de hacer el setUser
                    console.log(`user`, user.displayName)
                    // Update successful
                    setUser(user) //set my updated user to the new valu e
                    addDocFavorite(user) // 
                  }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log(`error`, error)
                  });  
                  
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`errorMessage`, errorMessage)
            });


    }

    const login = ({ email, password }) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(`user`, user)
                setUser(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`errorMessage`, errorMessage)
            });

    }


    return (

        <AuthContext.Provider value={{user,  register, login }}>
            {children}
        </AuthContext.Provider>


    )

}