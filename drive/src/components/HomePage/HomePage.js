import {useEffect, useState} from 'react'
import axios from 'axios'
import './HomePage.css'
import FileCard from '../FileCard/FileCard.js'

const HomePage = props => {
  const [files, setFiles] = useState(null)

  useEffect(() => {
    const fetchFiles = async () => {
      axios.get("http://127.0.0.1:8000/api/files")
        .then(res => {
          setFiles(res.data)
        })
        .catch(err => {
          console.log("Error:", err)
        })
    }

    fetchFiles()
  }, [])

  return (
    <div className="home-page">
      {files && files.map((file) => (
        <FileCard file={file} />
      ))}
    </div>
  )
}

export default HomePage
