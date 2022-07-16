import './FileCard.css'

const FileCard = props => {
  console.log(props)
  return (
    <div className='file-card'>
      <div>{props.file.name}</div>
      <button>Download</button>
    </div>
  )
}

export default FileCard
