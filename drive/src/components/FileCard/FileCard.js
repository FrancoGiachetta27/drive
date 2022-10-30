import axios from 'axios';
//import download from 'downloadjs';
import { useNavigate } from 'react-router-dom';
import './FileCard.css';

const FileCard = (props) => {
  const navigate = useNavigate()

  const handleDownload = async () => {
    const data = new Uint8Array(props.file.data)

    // const file = new Blob([data], { type: })

    //download(file)
  }

  const handleDelete = () => {
    axios.delete('http://localhost:8000/api/files/' + props.file._id['$oid'], {
      mode: 'cors'
    })
      .then((result) => {
        console.log('Success:', result)
        navigate('/')
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <div className='file-card'>
      <div>{props.file.name.concat(".", props.file.extension)}</div>
      <div className='buttons'>
        <button className='download' onClick={handleDownload}>
          <ion-icon name="arrow-down-outline"></ion-icon>
        </button>

        <button className='delete' onClick={handleDelete}>
          <ion-icon name="trash-bin-outline"></ion-icon>
        </button>
      </div>
    </div>
  )
}

export default FileCard
