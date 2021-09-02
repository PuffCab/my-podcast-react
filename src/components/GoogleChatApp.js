import React from 'react'
import '../googleChatStyle.css'

// import firebase from "../config"
//import firebase SDKs
import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';


//firebase hooks para trabajar mas facil con Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useState, useRef } from 'react';


//Initialize firebase
const db = firebase.firestore();
const auth = firebase.auth();


//reference to the Auth and firebase SDKs as global variables


function GoogleChatApp() {
    
    const [user] = useAuthState(auth);

    // console.log(`USER`, user)

    return (
        <div className='googleChatBody'>
            <header className='GoogleChatApp'>
                <h1 className='GoogleChatApp'>GoogleChat</h1>
                <GoogleSignOut/>
            </header>

            <section className='GoogleChatApp'>
                {user ? <GoogleChatRoom /> : <GoogleLogin/>}
            </section>
            
        </div>
    )
}

function GoogleLogin() {

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }


     return (
         <button className="sign-btn" onClick={signInWithGoogle}>Sing in with Google</button>
     )
 }

 function GoogleSignOut() {
    //En el return decimos que si hay un User , nos cree un boton de signout 
    return auth.currentUser && (
        <button className="sign-btn" onClick={() => auth.signOut()}>Sign Out</button>
     )
 }


 function GoogleChatRoom() {
    //hacemos referencia a la colecion de mensajes creada en firestore
    const messagesRef = db.collection('googleChatMesssages')
    //hacemos una query, pedimos, los mensajes, los ordenamos y limitamos el numro a mostrar  (por practico para testar)
    const query = messagesRef.orderBy('createdAt').limit(50)
    
    

    //escuchamos cada cambio en la database en tiempo real con el useCollectionData hook, que retorna un array de objects en el que cada object es el chatmessage en la database
    //y cada vez que la database cambia, reacciona en realtime haciendo un rerendering.
    const [googleChatMesssages] = useCollectionData(query, {idField: 'id'})

    //anhadimos un State para almacenar lo que tecleemos y unimos el onchange al state.
    const [formValue, setFormValue] = useState(' ');

    //para enviar el mensaje a Firebase al hacerl el Submit, con el event (e) como argumento
    const sendMessage = async(e) => {
        //preventDefault para evitar que refresh page al click submit 
        e.preventDefault();

        //tomams el uid y foto del usuario actualmente logeado.
        const { uid, photoURL} = auth.currentUser

        //para crear un nuevo msg en firestore llamamos a la coleccion, y pasamos un object con los campos que queremos que tenga
        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid,
            photoURL
        });
        setFormValue('');

        //usamos la Ref creada del div vacio para usar este metodo y que el scroll vaya abajo
        dummy.current.scrollIntoView({ behavior: 'smooth'})

    }

    //para forzar el scroll hacia abajo en los mensajes, en un div vacio, usamos el hoof useRef, para tener una referencia 
    const dummy = useRef()

    //Hacemos map sobre el array of messages, y para cada mensaje usamos un ChatMessage componen que tine un Key con ID
    //y pasamos los datos de cada documento (oneMsg) as props en "message"
    return (
        <>
            <main className='GoogleChatApp'>

                <div>
                    {googleChatMesssages && googleChatMesssages.map(oneMsg => 
                        <GchatMessage key={oneMsg.id} message={oneMsg}/>
                    )}
                </div>

                <div ref={dummy}></div>
            </main>


            <form className='GoogleChatApp' onSubmit={sendMessage}>
                <input className='GoogleChatApp' value={formValue} onChange={(e) => setFormValue(e.target.value)}/>
                <button className='GoogleChatApp' type='submit'>send</button>
            </form>

                 

            <div>
                
            </div>
        </>
    )
 }

 function GchatMessage({ message }) {
    //accedemos al mensaje a traves de las props enviadas desde su componente padre.
    const {text, uid, photoURL} = message

    //diferenciamos entre mensj reciv y enviados comparando el uid y usando nombre css clases
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'
    
    return (
        <div className={`message ${messageClass}`}>
            <img className='imgGchat' src={photoURL}/>
            <p className='imgGchat'>{text}</p>

        </div>
      )
 }

export default GoogleChatApp
