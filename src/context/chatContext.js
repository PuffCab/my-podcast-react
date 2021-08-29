import React from "react";
import { createContext, useState, useContext } from "react";
import { AuthContext } from "./authContext";
import firebase from "../config"

// Initialize Firestore
const db = firebase.firestore();


// 1 ->  create context

export const ChatContext = createContext()

// 2 -> create provider

export const ChatContextProvider = ({children}) => {
   // 3 -> move state and function
    const {user} = useContext(AuthContext)
    const [messages, setMessages] = useState([])


    const writeMessage = (body) => {

        // Add a new document in collection "chatroom"
        //db.collection("chatroom").doc("LA").set({ -->de Firebase viene con .doc('la'), pero si eliminaos el documento, firebase autogenera la ID.Leer Add a Document en Add Data firestore docs.
        db.collection("chatroom").add({
            name: user.displayName,
            body,
            timestamp: new Date()
        })
        .then((docRef) => {
            console.log("Document successfully written!");
            getMessages() // asi actualiza la lista de mensajes y no hay que hacer refresh
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });     

    }


    const getMessages = () => {

        db.collection("chatroom").get().then((querySnapshot) => {
            // INICIO comento lo que venia originalmente de documentacion de Firebase Get All Docu in a collection
            // querySnapshot.forEach((doc) => {
            //     // doc.data() is never undefined for query doc snapshots
            //     console.log(doc.id, " => ", doc.data());
            // });
            //FIN Comento
            //////como necesitamos el doc para cada mensaje ,y no se puede hacer .map() porque Firebase ya ha definido .forEach.Creamos nuestro array de mensajes z hacemos .push de los documentos doc
            const messagesArray = []; 
            querySnapshot.forEach((doc) => {
                messagesArray.push(doc.data());
            });
            console.log(`messagesArray`, messagesArray)
            setMessages(messagesArray)
        });

    }
   
   
   
   // 4 -> return the provider with its value & inject children component
    return (
        <ChatContext.Provider value={{ messages, writeMessage, getMessages }}>
            {children}
        </ChatContext.Provider>
    )
}



  





 