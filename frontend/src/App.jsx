
import { useEffect, useState}from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
    const [file, setFile] = useState()
    const [image, setImage] = useState([]);

  const handleUpload = (e) => {
    const formdata = new FormData()
    formdata.append('file', file)
    axios.post('http://localhost:3001/upload', formdata)
        .then(res=> console.log(res))
        .catch(err => console.log(err))
    getImage();
  }

  const getImage = async () => {
  await axios 
  .get("http://localhost:3001/getimage")
  .then(  (res) =>  setImage(res.data))
  .catch((err) => console.log(err));
  }
  useEffect(() => {
    getImage()
  },[file])

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>upload</button>
      <br />
      {image.map((x)=>{
        return(
          <img
            src={`http://localhost:3001/images/${x.image}`}
            alt=""
            style={{ width: "100px" }}
          />
        )
        })}
      
    </div>
  );
}

export default App


