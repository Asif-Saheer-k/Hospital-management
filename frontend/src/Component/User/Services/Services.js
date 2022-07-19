import React from 'react'
import '../Style/css/style.css'
import '../Style/plugins/slick-carousel/slick/slick-theme.css'
import '../Style/plugins/slick-carousel/slick/slick.css'
import '../Style/plugins/icofont/icofont.min.css'
import '../Style/plugins/bootstrap/css/bootstrap.min.css'
function Services() {
  return (
    <div>
        <section class="page-title bg-1">
  <div class="overlay"></div>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="block text-center">
          <span class="text-white">Our services</span>
          <h1 class="text-capitalize mb-5 text-lg">What We Do</h1>

           {/* <ul class="list-inline breadcumb-nav">
            <li class="list-inline-item"><a href="index.html" class="text-white">Home</a></li>
            <li class="list-inline-item"><span class="text-white">/</span></li>
            <li class="list-inline-item"><a href="#" class="text-white-50">Our services</a></li>
          </ul>  */}
        </div>
      </div>
    </div>
  </div>
</section>


<section class="section service-2">
	<div class="container">
		<div class="row">
			<div class="col-lg-4 col-md-6 col-sm-6">
				<div class="service-block mb-5">
					<img src="http://res.cloudinary.com/www-menscarts-shop/image/upload/v1657956862/hjj8viuefkpp81piwgaz.jpg" alt="" class="img-fluid"/>
					<div class="content">
						<h4 class="mt-4 mb-2 title-color">Child care</h4>
						<p class="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
					</div>
				</div>
			</div>

			<div class="col-lg-4 col-md-6 col-sm-6">
				<div class="service-block mb-5">
					<img src="http://res.cloudinary.com/www-menscarts-shop/image/upload/v1657956905/uzp8kkuuh1yrmpmxmxsd.jpg" alt="" class="img-fluid"/>
					<div class="content">
						<h4 class="mt-4 mb-2  title-color">Personal Care</h4>
						<p class="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
					</div>
				</div>
			</div>
			
			<div class="col-lg-4 col-md-6 col-sm-6">
				<div class="service-block mb-5">
					<img src="http://res.cloudinary.com/www-menscarts-shop/image/upload/v1657956947/ua1ovwdwaj1i04g0jucz.jpg" alt="" class="img-fluid"/>
					<div class="content">
						<h4 class="mt-4 mb-2 title-color">CT scan</h4>
						<p class="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
					</div>
				</div>
			</div>


			<div class="col-lg-4 col-md-6 col-sm-6">
				<div class="service-block mb-5 mb-lg-0">
					<img src="http://res.cloudinary.com/www-menscarts-shop/image/upload/v1657956976/z86lmytab2vqe8xn8e2v.jpg" alt="" class="img-fluid"/>
					<div class="content">
						<h4 class="mt-4 mb-2 title-color">Joint replacement</h4>
						<p class="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
					</div>
				</div>
			</div>

			<div class="col-lg-4 col-md-6 col-sm-6">
				<div class="service-block mb-5 mb-lg-0">
					<img src="http://res.cloudinary.com/www-menscarts-shop/image/upload/v1657957003/vmdrdgbvajspimts6drb.jpg" alt="" class="img-fluid"/>
					<div class="content">
						<h4 class="mt-4 mb-2 title-color">Examination & Diagnosis</h4>
						<p class="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
					</div>
				</div>
			</div>
			
			<div class="col-lg-4 col-md-6 col-sm-6">
				<div class="service-block mb-5 mb-lg-0">
					<img src="http://res.cloudinary.com/www-menscarts-shop/image/upload/v1657957073/q8yqevrjil4lkp00h3et.jpg" alt="" class="img-fluid"/>
					<div class="content">
						<h4 class="mt-4 mb-2 title-color">Alzheimer's disease</h4>
						<p class="mb-4">Saepe nulla praesentium eaque omnis perferendis a doloremque.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
<section class="section cta-page">
	<div class="container">
		<div class="row">
			<div class="col-lg-7">
				<div class="cta-content">
					<div class="divider mb-4"></div>
					<h2 class="mb-5 text-lg">We are pleased to offer you the <span class="title-color">chance to have the healthy</span></h2>
					<a href="appoinment.html" class="btn btn-main-2 btn-round-full">Get appoinment<i class="icofont-simple-right  ml-2"></i></a>
				</div>
			</div>
		</div>
	</div>
</section>
    </div>
  )
}

export default Services