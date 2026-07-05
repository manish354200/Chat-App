import { useState, useEffect } from 'react'
import{Chatbot} from 'supersimpledev'
import  { ChatInput } from './components/ChatInput' //named export
import ChatMessages from './components/ChatMessages' //default export
import './App.css'


    function App(){
            
            useEffect(()=>{
              Chatbot.addResponses({
               'goodbye': 'Goodbye, Have a nice day!',
               'give me a unique id': function(){
                return `Sure! Here's a unique ID: ${crypto.randomUUID()}`
               }
              })
              // [] tells useEffect to only run once. We only want to run
             // this setup code once because we only want to add these
             // extra responses once.
            },[])
          const /*array*/ [chatMessages, setChatMessages] =useState (
            /*[{
            message: 'hello chatbot',
            sender: 'user',
            id: 'id1'
          },  {
            message: 'Hello! How can I help you?',
            sender: 'robot',
            id: 'id2'
          }, {
            message: 'can you get me todays date?',
            sender: 'user',
            id: 'id3'
          }, {
            message: 'Today is May 25',
            sender: 'robot',
            id: 'id4'
          }]*/ JSON.parse(localStorage.getItem('messages')) || [])

          useEffect(()=>{
              localStorage.setItem('messages', JSON.stringify(chatMessages))
            },[chatMessages])  

            return (
              <div className="app-container">
                {chatMessages.length === 0 && (
                  <p className = "welcome-message">
                    welcome to the chatbot project! Send a message using the textbox below.
                    </p>
                )}
                <ChatMessages 
                chatMessage = {chatMessages}
                />
                <ChatInput
                  chatMessage= {chatMessages} 
                  setChatMessages={setChatMessages}
                />
              </div>
          ) 
      }
export default App
