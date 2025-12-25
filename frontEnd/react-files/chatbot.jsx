import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React, { useState, useEffect , useRef } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";

import '../stylesheet_files/chatbotstyle.css';

const translations = {

  en: {
    chatbotlanguage:"English",
    chat: "chat",
    header: "Animal Health Advisor",
    gretting: "Hello! How can I assist you with your animal health today?",
    messageplaceholder: "Type your message here...",
    send: "send",
    FAQS: "FAQS:",
    loadingmes: "plase wait..",
    FAQ1: "1 , How do I know if my dog is healthy?",
    FAQ2: "2. What foods should I avoid giving my cat?"
  },

  am: {
    chatbotlanguage:"Amharic",
    chat: "ይጠይቁ",
    header: "የእንስሳት ጤና አማካሪ",
    gretting: "ሰላም! እባኮትን ከእንስሳት ጤና ጋር እንዴት ልረዳዎት?",
    messageplaceholder: "መልእክትዎን እዚህ ያስገቡ...",
    send: "ላክ",
    FAQS: "እየተጠየቁ የነበሩ ጥያቄዎች:",
    loadingmes: "እባኮትን..",
    FAQ1: "1. ለሜ ጤነኛ መሆኗን እንዴት ማወቅ እችላለሁ?",
    FAQ2: "2. ለከብቶቼ መመገቡ የሌለብኝ ምግቦች ምን ናቸው?"
    
  },

  or: {
    chatbotlanguage: "afaan oromoo",
    chat: "gaafaadh'a",
    header: "Gargaaraa Fayyaa Bineensotaa",
    gretting: "Akkam! Nagaan koo, fayyaa bineensota keetiin maal akka si gargaaru nan gaafadha?",
    messageplaceholder: "Ergaa kee asitti galchi...",
    send: "ergaa",
    FAQS: "Gaaffilee yeroo baayyee gaafataman:",
    loadingmes: "xiqqo obssaa..", 
    FAQ1 : "1. Hundeen koo fayyaa qabaachuu isaa akkamitti beeka?",
    FAQ2 : "2. Bineensa kootii nyaata maalii irraa eegu qaba?"
  }

};


function Chatbot() {

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading , setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const userInputRef = useRef(null);
  const language = document.documentElement.lang || "en";
   
    const {chatbotlanguage , chat , header , gretting,  messageplaceholder , send , FAQS , loadingmes , FAQ1 , FAQ2} = translations[language];

    const chatcustomization = `
    This question is part of the Animal Health Advisory System. Please respond 
    as if you are a veterinary expert specializing in animal health. 
    Follow these rules strictly:
    
    1. **Domain-Specific Answers Only**: Answer only questions related to animal health or related topics.
        If the question is outside the animal health domain, respond with:
       '<p><strong>Your question is out of my knowledge.</strong></p>' in ${chatbotlanguage}
  
  
    2. **Use of HTML for Formatting**: Format responses with appropriate HTML tags for improved readability. Use:
       - <strong>bold</strong> for emphasis,
       - <em>italics</em> for highlighting important points,
       - <ul> and <li> for lists, and
       - <p> for paragraphs.
       - and underline if it is necessary
  
    3. **Accurate Contextual Responses**: Ensure all responses are accurate and directly address the user's question in the context of animal health.
  
    4. **Error Handling for Out-of-Domain Questions**: If the question is outside the animal health domain, 
    provide the following message in the following way:
       - if the question is in english language then answer:  '<p><strong>Your question is out of my knowledge.</strong></p>'
       - if the question is in Amharic Language then answer: '<p><strong>ጥያቄዎት ከእኔ እውቀት ውጭ ነው።</strong></p>'
       - if the question is in afaan Oromoo language then answer: '<p><strong>Gaaffiin kee beekumsa koo alaadha.</strong></p>'
       
    
    5. **about languages**: your answers must be in ${chatbotlanguage}

    6 . your answer must be neat and clear and i want to tell you again do not forget to use appropriate html tags

    7 . and at the end of the answer do not forget to give related advice and recommendations in Ethiopian context
  
    The question is as follows:
  `;
  

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = async () => {
    const userInput = userInputRef.current.value.trim();
    if (userInput === "") return;

    const chatContainer = chatContainerRef.current;

    const userMessageDiv = document.createElement("div");
    userMessageDiv.className = "message user-message";
    userMessageDiv.textContent = userInput;
    chatContainer.appendChild(userMessageDiv);

    setLoading(true);

    try {
      
      const response = await axios.post("http://localhost:5700/api/chatbot", { message: chatcustomization + userInput });
      const botResponse = response.data.message;

     

      const botMessageDiv = document.createElement("div");
      botMessageDiv.className = "message bot-message";
      
      botMessageDiv.innerHTML = botResponse;
      chatContainer.appendChild(botMessageDiv);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessageDiv = document.createElement("div");
      errorMessageDiv.className = "message bot-message";
      errorMessageDiv.textContent = "Sorry, something went wrong!";
      chatContainer.appendChild(errorMessageDiv);
    }

    setLoading(false);

    chatContainer.scrollTop = chatContainer.scrollHeight;
    userInputRef.current.value = "";
  };

  return (
    <>
      <button  className="chat-btn" onClick={toggleChat}>
        💬 {chat}
      </button>

      {isChatOpen && (
        <div className="chat-sidebar" id="chat-sidebar">
          <header>
            <h1>{header}</h1>
            <button className="close-btn" onClick={toggleChat}>
              &times;
            </button>
          </header>

          <div className="chat-container" id="chat-container" ref={chatContainerRef}>
            <div className="message bot-message">
               {gretting} 
            </div>
          </div>

          <footer>
            <input
              type="text"
              id="user-input"
              ref={userInputRef}
              placeholder={messageplaceholder}
            />
            <button onClick={sendMessage}>{send}</button>

            {
              loading && ( 

              <div className="spinner">
                 <ClipLoader color={"#123abc"} loading={loading} size={90} ></ClipLoader>
                 <span>{loadingmes}</span>
                 
              </div>
             )
            }
          </footer>

          <div className="faq">
            <h3>{FAQS}</h3>
            <p>{FAQ1}</p>
            <p>{FAQ2}</p>
          </div>

          
        </div>
      )}
    </>
  );
}

createRoot(document.getElementById("chatbotContainer")).render(
  <StrictMode>
    <Chatbot />
  </StrictMode>
);
