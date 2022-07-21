import {useEffect, useState} from 'react'
import axios from 'axios'
import './HomePage.css'
import FileCard from '../FileCard/FileCard.js'

const HomePage = props => {
  const [files, setFiles] = useState(null)

  useEffect(() => {
    const fetchFiles = async () => {
      fetch('https://127.0.0.1:8000/api/files/')
        .then(res => {return res.json()})
        .then((data) => {
          setFiles(data)
        })
        .catch((error) => {
          console.error('Error:', error)
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
