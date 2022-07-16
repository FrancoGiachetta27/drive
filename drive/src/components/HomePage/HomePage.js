import { useEffect, useState } from 'react'
import './HomePage.css'
import FileCard from '../FileCard/FileCard.js'

const HomePage = props => {
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
  },[])

  return (
    <div className="home-page">
      {files && files.map((file) => (
        <FileCard file={file}/>
      ))}
    </div>
  )
}

export default HomePage
