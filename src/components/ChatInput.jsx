// import { useState } from 'react'
// import { chatbot } from 'supersimpledev';
// import dayjs from 'dayjs';
// import './ChatInput.css'

// export function ChatInput({chatMessage, setChatMessages}){
//       const [inputText, setInputText]=useState('');
//       const [isLoading, setIsLoading]=useState(false);
//       function saveInputText(event) {
//         setInputText(event.target.value)
//       }
//       async function sendMessage(){
//         if(isLoading || inputText=== ''){
//           return;
//         }
        
//         setIsLoading(true)

//         setInputText('');
//         const newChatMessages = [
//           ...chatMessage,
//           {
//             message: inputText,
//             sender: 'user',
//             id: crypto.randomUUID(),
//             time: dayjs().valueOf()
//           }
//          ]
//          //setInputText(''); // at both places can be used to make the text box empty..
         
//          setChatMessages(newChatMessages);
//          setChatMessages([
//           ...newChatMessages,
//           //This creates a temporary Loading.. message;
//           // because we don't save this message in newChatMessages,
//           // it will be remove later, when we add the response.
//           {
//             message: 'Loading...',
//             sender:'robot',
//             id: crypto.randomUUID(),
//             time: dayjs().valueOf()
//           }
//          ])
//          const response = await chatbot.getResponseAsync(inputText)
           
//            setChatMessages([
//           ...newChatMessages,
//           {
//             message: response,
//             sender: 'robot',
//             id: crypto.randomUUID(),
//              time: dayjs().valueOf()
//           }
//          ])
        
        
//          setIsLoading(false)
//          //setInputText(''); //(01)

//       }
//       function pressKey(event){
//         if(event.key === "Enter"){
//           sendMessage()
//         }
//         if(event.key === "Escape"){
//           setInputText('')
//         }
//       }
//       function clear(){
//        setChatMessages([])
//       }
//       return (
//         <div className="chat-input-container">
//           <input 
//             placeholder="Send a message to the Chatbot" 
//             size="30"
//             onChange={saveInputText}
//             onKeyDown={pressKey}
//             value= {inputText} // used to make the text box empty.(01)
//             className="text-button"
//           />
//           <button
//           className="send-button"
//           onClick={sendMessage}
//           >Send</button>
//           <button 
//            className="clear-button"
//            onClick = {clear}
//            >Clear</button>
//         </div>
//       );
//     }


import { useState } from 'react'
// import { chatbot } from 'supersimpledev';
import dayjs from 'dayjs';
import './ChatInput.css'

export function ChatInput({ chatMessage, setChatMessages }) {
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  function saveInputText(event) {
    setInputText(event.target.value)
  }
  async function sendMessage() {
    const messageText = inputText.trim();

    if (isLoading || messageText === '') {
      return;
    }

    setIsLoading(true)

    setInputText('');
    const newChatMessages = [
      ...chatMessage,
      {
        message: messageText,
        sender: 'user',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ]
    //setInputText(''); // at both places can be used to make the text box empty..

    setChatMessages(newChatMessages);
    setChatMessages([
      ...newChatMessages,
      //This creates a temporary Loading.. message;
      // because we don't save this message in newChatMessages,
      // it will be remove later, when we add the response.
      {
        message: 'Loading...',
        sender: 'robot',
        id: crypto.randomUUID(),
        time: dayjs().valueOf()
      }
    ])
    //  const response = await chatbot.getResponseAsync(inputText)

    //    setChatMessages([
    //   ...newChatMessages,
    //   {
    //     message: response,
    //     sender: 'robot',
    //     id: crypto.randomUUID(),
    //      time: dayjs().valueOf()
    //   }
    //  ])

    try {
      const response = await fetch("https://chat-app-backend-mu-sooty.vercel.app/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText })
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Backend request failed.');
      }

      setChatMessages([
        ...newChatMessages,
        {
          message: data.reply,
          sender: 'robot',
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ]);
    } catch (err) {
      setChatMessages([
        ...newChatMessages,
        {
          message: err.message || 'Backend is not responding.',
          sender: 'robot',
          id: crypto.randomUUID(),
          time: dayjs().valueOf()
        }
      ]);
    } finally {
      setIsLoading(false)
    }
    //setInputText(''); //(01)

  }
  function pressKey(event) {
    if (event.key === "Enter") {
      sendMessage()
    }
    if (event.key === "Escape") {
      setInputText('')
    }
  }
  function clear() {
    setChatMessages([])
  }
  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to the Chatbot"
        size="30"
        onChange={saveInputText}
        onKeyDown={pressKey}
        value={inputText} // used to make the text box empty.(01)
        className="text-button"
      />
      <button
        className="send-button"
        onClick={sendMessage}
      >Send</button>
      <button
        className="clear-button"
        onClick={clear}
      >Clear</button>
    </div>
  );
}
