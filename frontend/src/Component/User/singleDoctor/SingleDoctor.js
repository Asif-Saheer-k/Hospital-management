import axios from 'axios'
import React, { useEffect,useState} from 'react'
import {Link,useParams} from 'react-router-dom'

function SingleDoctor() {
    const [doctor,setDoctor]= useState({});
    const [time,setTime]=useState([])
    const doctorId=useParams()
    console.log(doctorId.id);
   

useEffect(()=>{
    (async function (){
        try{
        const config={
            headers:{
                "Content-type":"application/json"
            }
        }
    const {data} =await axios.get(`/user/view-single-doctor/${doctorId.id}`,config)
    console.log(data,"ddddddddddddddddd");
        setDoctor(data)
        setTime(data.time)  

}catch(error){
    console.log(error);
}
})()
},[])
var monday = null;
  var tusday = null;
  var wednesday = null;
  var thursday = null;
  var friday = null;
  var saturday = null;
  var sunday = null;

  {
    time.map((obj) => {
      const mons = obj.Mon;
      const tus = obj.Tus;
      const wen = obj.wen;
      const thu = obj.thur;
      const frid = obj.fri;
      const stat = obj.sta;
      const sun = obj.sund;
      if (mons) {
        monday = mons;
        console.log("fdjkjf", mons);
      }
      if (tus) {
        tusday = tus;
      }
      if (wen) {
        wednesday = wen;
      }
      if (thu) {
        thursday = thu;
      }
      if (frid) {
        friday = frid;
      }
      if (stat) {
        saturday = stat;
      }
      if (sun) {
        sunday = sun;
      }
    })
  }

console.log("fffffff",doctor);
  return (
    <section class="section doctor-single">
	<div class="container">
		<div class="row">
			<div class="col-lg-4 col-md-6">
				<div class="doctor-img-block">
					<img src={doctor.url} alt="" class="img"/>

					<div class="info-block mt-4">
						<h4 class="mb-0">{doctor.Name}</h4>
						<p>{doctor.specailist}</p>
                        <p>{doctor.Qualification}</p>

						<ul class="list-inline mt-4 doctor-social-links">
							<li class="list-inline-item"><a href="#"><i class="icofont-facebook"></i></a></li>
							<li class="list-inline-item"><a href="#"><i class="icofont-twitter"></i></a></li>
							<li class="list-inline-item"><a href="#"><i class="icofont-skype"></i></a></li>
							<li class="list-inline-item"><a href="#"><i class="icofont-linkedin"></i></a></li>
							<li class="list-inline-item"><a href="#"><i class="icofont-pinterest"></i></a></li>
						</ul>
					</div>
				</div>
			</div>

			<div class="col-lg-8 col-md-6" >
				<div class="doctor-details mt-lg-0" style={{marginLeft:"0%"}}>
					<h2 class="text-md">About</h2>
					<div class="divider"></div>
					<p>{doctor.About}</p>
                    <div className="col-12 d-flex">
                        <div className='col-md-6 '  style={{marginTop:"20%"}} >
                           
                  
        
                        <Link to='' class="btn btn-main-2 btn-round-full" style={{backgroundColor:"#223A66"}}>Make Ofline Appoinment<i class="icofont-simple-right ml-2  "></i></Link>
                       
                        <Link to='' class="btn btn-main-2 btn-round-full " style={{backgroundColor:"#123A66",marginTop:"5%"}}>Make Online Appoinment<i class="icofont-simple-right ml-2  "></i></Link>
                     
                        
                       
                            
                        </div>
        
        <div className="col-md-6" style={{marginLeft:"0%"}}>
          <div class="sidebar-widget schedule-widget mb-3">
            <h5 class="mb-4">Time Schedule</h5>

            <ul class="list-unstyled">
              {monday &&<li class="d-flex justify-content-between align-items-center">
                <a href="#">Monday</a>
                <span>{monday}</span>
              </li>}
              {thursday &&
              <li class="d-flex justify-content-between align-items-center">
                <a href="#">Tuesday</a>
                <span>{thursday}</span>
              </li>}
              {wednesday &&
              <li class="d-flex justify-content-between align-items-center">
                <a href="#">Wednesday</a>
                <span>{wednesday}</span>
              </li>
              }
               {tusday &&
              <li class="d-flex justify-content-between align-items-center">
                <a href="#">Thursday</a>
                <span>{tusday}</span>
              </li>
              }
                   {friday &&
              <li class="d-flex justify-content-between align-items-center">
                <a href="#">Friday</a>
                <span>{friday}</span>
              </li>}
                     {saturday &&
                        <li class="d-flex justify-content-between align-items-center">
                          <a href="#">Saturday</a>
                          <span>{saturday}</span>
                        </li>}
                          {sunday &&
                            <li class="d-flex justify-content-between align-items-center">
                              <a href="#">Sunday</a>
                              <span>{sunday}</span>
                            </li>
                          }
            </ul>
             
            <div class="sidebar-contatct-info mt-4">
              <p class="mb-0">Need Urgent Help?</p>
              <h5>{doctor.phone}</h5>
            </div>
          </div>
        </div>
      </div>
					</div>
                
			</div>
		</div>
	</div>
</section>
  
  )
}

export default SingleDoctor