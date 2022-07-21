import download from 'downloadjs'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import './FileCard.css'

const FileCard = (props) => {
  const handleDownload = async () => {
    const data = new Uint8Array(props.file.data)
    const file = new Blob([data])

    download(file, props.file.name)
  }

  const handleDelete = () => {
    fetch('https://127.0.0.1:8000/api/files/' + props.file._id['$oid'], {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })
      .then((result) => {
        console.log('Success:', result)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <div className='file-card'>
      <div>{props.file.name}</div>
      <div className='buttons'>
        <FileDownloadOutlinedIcon className='arrow'><button className='download' onClick={handleDownload}></button></FileDownloadOutlinedIcon>
        <button className='delete' onClick={handleDelete}><DeleteOutlinedIcon className='bin'></DeleteOutlinedIcon></button>
      </div>
    </div>
  )
}

export default FileCard
