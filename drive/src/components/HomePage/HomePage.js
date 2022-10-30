import axios from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import FileCard from '../FileCard/FileCard.js';
import './HomePage.css';

const HomePage = props => {
  const [files, setFiles] = useState(null)
  const { register, handleSubmit } = useForm()

  useEffect(() => {
    const fetchFiles = async () => {
      axios.get('http://localhost:8000/api/files/')
        .then(res => {
          setFiles(res.data)
        })
        .catch(error => {
          console.error('Error:', error)
        })
    }

    fetchFiles()
  }, [])

  const onSubmit = (data) => {
    handleClose()

    const formData = new FormData()

    for (let i = 0; i < data.files.length; i++) {
      formData.append('files', data.files[i])
      formData.append('extension', data.files[i].name.split('.').pop())
    }

    axios.post("http://localhost:8000/api/files/upload", data = formData)
      .then(res => {
        console.log('Success:', res)
      })
      .catch(error => {
        console.error('Error:', error)
      })
  }

  const handleClose = () => {
    const section = document.querySelector("section"),
      overlay = document.querySelector(".overlay");
    const submit = document.querySelector(".submit")

    section.classList.remove("active")
  }

  const handleSubmintButton = () => {
    const submit = document.getElementsByClassName("submit")

    submit.disabled = false
  }

  return (
    <div className="home-page">
      <section>
        <span className="overlay"></span>
        <div className="modal-box">
          <form className='dropdown-item' onSubmit={handleSubmit(onSubmit)} >
            <ion-icon name="document-outline"></ion-icon>

            <div className="parent-div">
              <button className="btn-upload">Choose file</button>
              <input onInput={handleSubmintButton} {...register('files')} type='file' />
            </div>

            <div>
              <button disabled={true} className="submit" type="submit">Submit</button>

              <button onClick={handleClose} className="close">Close</button>
            </div>
          </form >
        </div>
      </section>

      {files && files.map((file) => (
        <FileCard file={file} />
      ))}
    </div>
  )
}

export default HomePage
