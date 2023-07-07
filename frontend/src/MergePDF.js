import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
//import { response } from 'express';

const MergePDF = () => {
  //const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [message, setMessage] = useState('');

  const [backendData, setBackendData] = useState([{}])
  const [sampleData, setSampleData] = useState('some sample data')

  useEffect(() => {
    console.log('useEffect triggered')
    fetch("http://localhost:5000/myapi").then(
      response => {
        //console.log(response);
        return response.json();
      }
      // console.log(response);
      // return response => response.json()
    ).then(
      data => {
        //console.log('here')
        //console.log(data)
        setBackendData(data)
        //console.log(data)
      }
    ).catch(error => {
      console.error('Error', error)
    })
  }, [])
  

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedFileList = files.map((file) => ({
      id: Math.random().toString(36).substring(2, 9), //randomly generate ID for each file
      name: file.name,
    }));
    setFileList((prevFileList) => [...prevFileList, ...updatedFileList]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (fileList.length > 1) {
      const formData = new FormData();
      for (let file of fileList) {
        formData.append('files', file);
      }
      //console.log([...formData]);

      try {
        console.log('calling post api...')
        const response = await axios.post('http://localhost:5000/api/merge', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setMessage(response.data.message);
        
      } catch (error) {
        setMessage('Error happens when merge PDF.');
        console.log(error)
      }
    } else {
      setMessage('Please choose at least 2 PDF files');
    }
  };

  return (
    <div>
      <h1>PDF merge Application</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          multiple
          accept=".pdf"
          onChange={handleFileChange}
        />
        <button type="submit">merge PDF</button>
      </form>

      <ul>
        {fileList.map((file, index) => (
          <li key={file.id}>{file.name}</li>
        ))}
      </ul>

      {message && <p>{message}</p>}

      {(typeof backendData.users === 'undefined') ? (
        <p>{typeof backendData.users}</p>
      ): (
        backendData.users.map((user, i) => (
          <p key= {i} >{user}</p>
        ))
      )}

      <p>{sampleData}</p>

    </div>
  );
};

export default MergePDF;
