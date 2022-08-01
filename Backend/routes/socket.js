const users=[]
const addUser =({id,name,room})=>{
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();

    const exisitingUser=users.find((user)=>user.room===room && user.name===name)

 if(exisitingUser){
    return{error:"username is taken"};
 }
 const user={id,name,room};
 users.push(user);
 return {user}

}
const removeUSer=(id)=>{
const index=users.findIndex((user)=>user.id=id);
if(index !== -1){
    return  users.splice(index,1)[0];
}


}
const getUser=(id)=>users.find((user)=>user.id===id)  ;


const getUserInRoom=()=>users.filter((user)=>user.room===room)

module.exports={addUser,removeUSer,getUser,getUserInRoom};