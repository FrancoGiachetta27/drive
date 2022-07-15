import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [files, setFiles] = useState(null)

  useEffect(() => {
    const fetchFiles = async () => {
      fetch("http://127.0.0.1:8000/api/files")
      .then(res => {
        return res.json()
      })
      .then(data => {
        setFiles(data)
      })
    }

    fetchFiles()
  },[files])

  return (
    <div className="App">
      {files && files.map((file) => (
        <div>{file.name}</div>
      ))}
    </div>
  )
}

export default App;
