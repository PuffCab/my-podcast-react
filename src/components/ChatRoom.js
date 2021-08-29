import userEvent from '@testing-library/user-event'
import React, { useState, useContext, useEffect} from 'react'
import { ChatContext } from '../context/chatContext'
 
const flexContainer = { display: 'flex', flexDirection: 'column' }


 const ChatRoom = () => {
    const { messages, writeMessage, getMessages} = useContext(ChatContext)
    const [body, setBody] = useState('')

    //Add ˘˘ useEffect para que los mensajes se cargen al cargar la pagina.y anadimos la funcion getMessages al useContext del chat para tenerlos aqui
    useEffect(() => { 
        
        getMessages()
    }, [])

    const handleOnchange = (e) => {
        setBody(e.target.value)
        // console.log(`e`, body)
    }

    const handleWriteMessages = () => {
        writeMessage(body)
        // console.log(`body`, body)
    }

    

     return (
         <div style={flexContainer} >
             <h2>Chat Room</h2>
             {/* write messages */}
             <input type="text" placeholder='message' value={body} onChange={handleOnchange} />
             <button onClick={handleWriteMessages}>write message</button>
             {/* read messages */}  
             {/* REVIEW formato fecha. aparece 1.1.1970 */}
             {messages ? messages.map((message, index) => {
                 return (
                     <div>
                         <h5>{message.name}</h5>
                         <h6>{new Date(message.timestamp.seconds).toLocaleString()}</h6>
                         <p>{message.body}</p>
                     </div>
                 )
             }) : <h2>....Loading...</h2>}
         </div>
     )
 }
 
 export default ChatRoom
 