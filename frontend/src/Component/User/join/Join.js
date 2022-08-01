// import React, { useState } from 'react';
// import {Link} from 'react-router-dom'

// function Join() {
//   const [name,setName]=useState(" ");  
//   const [room, setRoom]=useState(' ')
//   return (
//     <div className='joinOuterContainer'>
//       <div className='joinInnerContainer'>
//         <h1 className='heading'>Join</h1>
//         <div><input placeholder='' className='joinInput' type='text' onChange={(e)=> setName(e.target.value)} ></input></div>
//         <div><input placeholder='' className='joinInput' type='text' onChange={(e)=>{setRoom(e.target.value)}} ></input></div> 
//         <Link to={`/chart?name=${name}&room=${room}`}> 
//         <button className='button mt-20' type='submit'>Sim</button>
//         </Link>
//       </div>
//     </div>
                 
//   )       
// }                   

// export default Join;