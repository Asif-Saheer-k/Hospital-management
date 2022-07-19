const cloudinary=require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'www-menscarts-shop', 
    api_key: '676229427578848', 
    api_secret: 'ULoSoHC7MkWczD997K9L18RgwJ8' 
  });
  module.exports={cloudinary}