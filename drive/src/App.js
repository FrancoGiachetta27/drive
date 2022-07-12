import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [files, setFiles] = useState(null)

  // useEffect(() => {
    fetch("http://localhost:8000/api/files").then(res => {
      return res.json()
    })
    .then(data => {
      console.log("hola")

      setFiles(data)
    })
  // },[])

  return (
    <div className="App">
      { files.map((file) => (
          <div>{file.name}</div>
      )) }
    </div>
  )
}

export default App;
