import React, { useEffect, useState } from "react";
import {useNavigate,useParams} from 'react-router-dom'
import "../Style/css/style.css";
import "../Style/plugins/slick-carousel/slick/slick-theme.css";
import "../Style/plugins/slick-carousel/slick/slick.css";
import "../Style/plugins/icofont/icofont.min.css";
import "../Style/plugins/bootstrap/css/bootstrap.min.css";
import axios from "axios";
function ViewallDoctor() {
	const id=useParams()
	console.log("idddd",id);
	const departmentId=id.departId
	if(departmentId){
  console.log("success");
	}else{
		console.log("faile");

	}
	const navigate=useNavigate()

  const [doctors, setDoctor] = useState([]);
  
  const [department,setDepartment]=useState([])

  useEffect(() => {
	if(departmentId===undefined){
		console.log("dfsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    (async function () {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.get("/user/view-All-doctors", config);
        console.log(data);
        setDoctor(data);
		
      } catch (error) {
        console.log(error);
      }
    })();
}else{
	console.log("llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll");
	(async function () {
		try {
		  const config = {
			headers: {
			  "Content-type": "application/json",
			},
		  };
		  const { data } = await axios.get(`/user/view-Department-doctors/${departmentId}`, config);
		  setDoctor(data);
		  
		} catch (error) {
		  console.log(error);
		}
})();

}
  },[]);
  


  useEffect(() => {
    (async function () {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.get("/user/view-department", config);
        console.log(data);
        setDepartment(data);
      } catch (error) {
        console.log(error);
      }
    })();
  },[]);
  const viewSingleDoctor=async(id)=>{
	navigate(`/view-single-doctor/${id}`)

  }     

  
  return (
    <>
      <section class="page-title bg-1">
        <div class="overlay"></div>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="block text-center">
                <span class="text-white">All Doctors</span>
                <h1 class="text-capitalize mb-5 text-lg">Specalized doctors</h1>

                {/* <ul class="list-inline breadcumb-nav">
            <li class="list-inline-item"><a href="index.html" class="text-white">Home</a></li>
            <li class="list-inline-item"><span class="text-white">/</span></li>
            <li class="list-inline-item"><a href="#" class="text-white-50">All Doctors</a></li>
          </ul>  */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section doctors">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-6 text-center">
              <div class="section-title">
                <h2>Doctors</h2>
                <div class="divider mx-auto my-4"></div>
                <p>
                  We provide a wide range of creative services adipisicing elit.
                  Autem maxime rem modi eaque, voluptate. Beatae officiis neque{" "}
                </p>
              </div>
            </div>
          </div>

          <div class="col-12 text-center  mb-5">
            <div class="btn-group btn-group-toggle " data-toggle="buttons">
              <label class="btn active ">
                <input
                  type="radio"
                  name="shuffle-filter"
                  value="all"
                  checked="checked"
                />
                All Department
              </label>
			  {department.map((obj)=>{
				return(

					<label class="btn ">
						
					<input type="radio" name="shuffle-filter" value="cat1" key={obj._id}/>
					{obj.Departments}
				  </label>

				)
			  })}
            </div>
          </div>

          <div class="row shuffle-wrapper portfolio-gallery">
			{doctors.map((obj)=>{
				return(
					<div
              class="col-lg-3 col-sm-6 col-md-6 mb-4 shuffle-item"
              data-groups='["cat1","cat2"]'
             key={obj._id}>
              <div class="position-relative doctor-inner-box">
                <div class="doctor-profile">    
                  <div class="doctor-img">
                    <img
                      src={obj.url}
                      alt="doctor-image"
                      class="img-fluid w-100"
                    />
				
                  </div>
                </div>
                <div class="content mt-3">
                  <h4 class="mb-0">
                    <a onClick={()=>{viewSingleDoctor(obj._id)}}>{obj.Name}</a>
                  </h4>
                  <p>{obj.specailist}</p>
                </div>
              </div>
            </div>


				)
			})}
            
          </div>
        </div>
      </section>

      <section class="section cta-page">
        <div class="container">
          <div class="row">
            <div class="col-lg-7">
              <div class="cta-content">
                <div class="divider mb-4"></div>
                <h2 class="mb-5 text-lg">
                  We are pleased to offer you the{" "}
                  <span class="title-color">chance to have the healthy</span>
                </h2>
                <a href="appoinment.html" class="btn btn-main-2 btn-round-full">
                  Get appoinment<i class="icofont-simple-right  ml-2"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container">
      
      </div>
    </>
  );
}

export default ViewallDoctor;
