import React, { useState } from "react";

const App = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  console.log(selectedFile);
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("upload_preset", "easyshop");
    formData.append("cloud_name", "prakharcloudspace");
    fetch(
      "https://api.cloudinary.com/v1_1/prakharcloudspace/image/upload/easyshop",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default App;
