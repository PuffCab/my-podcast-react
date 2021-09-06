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
        console.log(`body`, body)
        setBody('')
    }

    

     return (
         <div style={flexContainer} >
             <h2>Chat Room</h2>
             {/* write messages */}
             <input type="text" placeholder='message' value={body} onChange={handleOnchange} />
             <button type='reset' onClick={handleWriteMessages}>write message</button>
             {/* read messages */}  
             {messages ? messages.map((message, index) => {
                 return (
                     <div>
                         <h5>{message.name}</h5>
                         <h6>{message.timestamp.toDate().toLocaleString()}</h6>
                         <p>{message.body}</p>
                     </div>
                 )
             }) : <h2>....Loading...</h2>}
         </div>
     )
 }
 
 export default ChatRoom
 