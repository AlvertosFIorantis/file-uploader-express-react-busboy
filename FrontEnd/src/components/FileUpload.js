import React,{useState} from 'react'
import axios from 'axios';
import Progressbar from "./Progressbar"

function FileUpload() {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('No file chosen');
  const [ResponseFromServer, setResponseFromServer] = useState(false);
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

  const uploadFileHelperFunction = e => {
     e.preventDefault();
    try{
    setFile(e.target.files[0]);
     
    setFilename(e.target.files[0].name);
     console.log(filename)
    }catch(err){
      return
    }
    
  };

  const uploadFileHelperFunctionDragNDrop = e => {
     e.preventDefault();
    try{
    setFile(e.dataTransfer.files[0]);
     
    setFilename(e.dataTransfer.files[0].name);
     console.log(filename)
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
      setFile('')
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
    {/* vazo to onDragOver kai to ON drop gia na boro na kano drap and drip ta files mesa sto div an den thelo na xrisimopio to input box */}
    {/* boro na xrisimopio ta ala on Drag Enter kai ta lipa kai an alzo to backgorund tou dropzone na to kano prasino gia paradigma  sto mona dio apo ola ta dra evnets pou prepei na exo to e.preventDefault() einai to onDragOver kai onDrop KAI!!! na thimame oti gia na akno drag and drop files prepei na ta files na einia mesa sto idio folder me to APP !!!! */}
  <div className="input_wrapper" onDragOver={(e) => {
          e.preventDefault();
          
        }} onDrop={uploadFileHelperFunctionDragNDrop}
         
        >
    <div className="file_display_button_wrapper">
<div id="file-chosen">{filename}</div>


<label htmlFor="actual-btn">Choose File</label>

<input onChange={uploadFileHelperFunction} type="file" id="actual-btn" hidden/>
</div>
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
