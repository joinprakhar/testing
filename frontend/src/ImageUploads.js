// ImageUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    // const [imagePath, setImagePath] = useState('');
    // const [uploadedImages, setUploadedImages] = useState([]);
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log(selectedFile)
    };

    const handleUpload = () => {
        const formData = new FormData();
        formData.append('image', selectedFile);
        formData.append("upload_preset", "easyshop");
    formData.append("cloud_name", "prakharcloudspace")
    fetch("https://api.cloudinary.com/v1_1/prakharcloudspace/image/upload/easyshop",{
      method: "POST",
      body: formData,
    }).then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))   
    };



    return (
        <div>
            <h1>Image Upload</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            
        </div>
    );
};

export default ImageUpload;

/* <div>
            <h1>Image Upload</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            {
                uploadedImages && uploadedImages.map((imagePath) => <img src={`http://localhost:5000${imagePath}`} alt='img' />)
            }
        </div> */

            // const fetchUploadedImages = () => {
    //     axios.get('http://localhost:5000/images')
    //         .then((response) => {
    //             setUploadedImages(response.data.imagePaths);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching uploaded images:', error);
    //         });
    // };
    // console.log(uploadedImages)
    // useEffect(() => {
    //     fetchUploadedImages();
    // }, []);

     // axios.post('http://localhost:5000/', formData)
        //     .then((response) => {
        //         setImagePath(response.data.imagePath);
        //     })
        //     .catch((error) => {
        //         console.error('Error uploading image:', error);
        //     });