import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage'
import './ChatMessages.css'

 function ChatMessages({chatMessage}){
      //  const /*array*/ [chatMessage, setChatMessages] = React.useState ([{
      //   message: 'hello chatbot',
      //   sender: 'user',
      //   id: 'id1'
      // },  {
      //   message: 'Hello! How can I help you?',
      //   sender: 'robot',
      //   id: 'id2'
      // }, {
      //   message: 'can you get me todays date?',
      //   sender: 'user',
      //   id: 'id3'
      // }, {
      //   message: 'Today is May 25',
      //   sender: 'robot',
      //   id: 'id4'
      // }])
      //const [chatMessage, setChatMessages] = array;
      //const chatMessage = array[0]; // gives us current value of chatMessages( the current data)
       //const setChatMessages = array[1];
      //  function sendMessage(){
      //    setChatMessages([
      //     ...chatMessage,
      //     {
      //       message: 'test',
      //       sender: 'user',
      //       id: crypto.randomUUID()
      //     }
      //    ])
      //  }
      const chatMessagesRef = useRef(null);  // null = intial value inside this container
      useEffect(() => {
         const containerElem = chatMessagesRef.current
         if(containerElem){
          containerElem.scrollTop = containerElem.scrollHeight;
         }
      }, [chatMessage]);
      return ( 
         <div className="chat-messages-container" 
         ref={chatMessagesRef}>
           {/*<button onClick={sendMessage}>Send message</button>*/}
          {chatMessage.map((chatMessage) =>{
                    return (
                      <ChatMessage
                      message={chatMessage.message}
                      sender={chatMessage.sender}
                      key= {chatMessage.id}
                      time={chatMessage.time}
                      />
                      );}
              )}
              </div>
          );
        }
    
    export default ChatMessages