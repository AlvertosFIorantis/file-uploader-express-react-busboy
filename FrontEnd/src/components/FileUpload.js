import React,{useState} from 'react'
import axios from 'axios';
import Progressbar from "./Progressbar"

function FileUpload() {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('No file chosen');
  const [ResponseFromServer, setResponseFromServer] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const onChange = e => {
    try{
setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    }catch(err){
      return
    }
    
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          // setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      console.log(res.data.message)
      setMessage(res.data.message)
      // resete the input
      setFilename('No file chosen')
      setUploadPercentage(0)
      setResponseFromServer(true)
      // oste na eksafaniszete meta apo 2 sec to repsonse apo to server oti egine epitixos to update
      setTimeout(() => setResponseFromServer(false), 2000)
    
    } catch (err) {
        setMessage('There was a problem with the server');
    }
  };
  return (
    <form className="container_form" onSubmit={onSubmit}> 
  <div className="input_wrapper">
<span id="file-chosen">{filename}</span>


<label htmlFor="actual-btn">Choose File</label>

<input onChange={onChange} type="file" id="actual-btn" hidden/>
</div> 

<div className="container_button">
    <div className="center">
      <button className="btn">
        <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
          <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
          <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
        </svg>
        <span>Upload file</span>
      </button>
      
    </div>
    
  </div>
   {filename !=='No file chosen' && <Progressbar percentage={uploadPercentage} />}
   {/* afto to exo gia na do an egine epitixos to upload prepei na malon na valo pio omorfo tropo */}
   {ResponseFromServer===true && message}
 
    </form>
  )
}

export default FileUpload
