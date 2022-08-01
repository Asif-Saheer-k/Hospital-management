
// import React,{useEffect, useState} from 'react'
// import { useParams, useSearchParams} from 'react-router-dom'
// import io from 'socket.io-client'
// import {useLocation} from "react-router-dom";
// import './Chart.css';
// import InfoBar from '../info/InfoBAr'
// import Input from '../input/Input';
// import Messages from '../messages/Messages';
   
 
// const ENDPOINT='localhost:3000'

// let socket;
// function Chatt() {     
//   const [name,setName]=useState('')
//   const [room,setId]=useState('')
//   const [message,setMessage]=useState([])
//   const [messages,setMessages]=useState([])
//   const search = useLocation().search;  




//   useEffect(()=>{
//     const names = new URLSearchParams(search).get('name');
//     const rooms = new URLSearchParams(search).get('room');
   
//     setName(names)
//     setId(rooms)
//     console.log(name);
//     console.log(room);
   
//     socket = io(ENDPOINT)
 

//     socket.emit('join',{name,room},( )=>{
  
//     })
   
//   return()=>{
//     socket.emit("disconect")
//     socket.off();
//   }

//   },[ENDPOINT])


//   useEffect(()=>{
//     socket.on('message',(message)=>{
//       setMessages([...messages,message])

//     })
//   },[messages])


// //fuction to sending message
// const sendMessage=(event)=>{
//   event.preventDefault();
//   if(message){
//     socket.emit('sendMessage',message,()=>setMessage(''))
//   }
// }
// console.log(message,messages);
    
//     return (
//    <div className='outerContainer'>
//     <div className='Container'>
//       <InfoBar/>
//       <Messages message={messages}/>
//       <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      
//     </div>  

//    </div>      


//   )
// }

// export default Chatt