import {useForm} from 'react-hook-form'
import axios from 'axios'    
// import AddIcon from '@mui/icons-material/Add'
import './Navbar.css'

const Navbar = props => {
  const {register, handleSubmit} = useForm()

  const onSubmit = (data) => {
    console.log(data)
    const formData = new FormData()

    formData.append('files', data.files[0])
    formData.append('extension', data.files[0].name.split('.').pop())

    axios.post("http://127.0.0.1:8000/api/files/upload", {formData})
      .then((response) => response.json())
      .then((result) => {
        console.log('Success:', result)
      })
      .catch((error) => {
        console.error('Error:', error)
      })

    handleClose()
  }

  const handleClick = (e) => {
    const openModalButtons = document.querySelectorAll('[data-modal-target]')
    const overlay = document.getElementById('overlay')

    openModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)

        if (modal == null) return

        modal.classList.add('active')
        overlay.classList.add('active')
      })
    })
  }

  const handleCloseOverlay = () => {
    const overlay = document.getElementById('overlay')
    const modals = document.querySelectorAll('.modal.active')

    modals.forEach(modal => {
      if (modal == null) return

      modal.classList.remove('active')
      overlay.classList.remove('active')
    })
  }

  const handleClose = (e) => {
    const closeModalButtons = document.querySelectorAll('[data-close-button]')
    const overlay = document.getElementById('overlay')

    closeModalButtons.forEach(button => {
      button.addEventListener('click', () => {
        const modal = button.closest('.modal')

        if (modal == null) return

        modal.classList.remove('active')
        overlay.classList.remove('active')
      })
    })
  }

  return (
    <div className='nav-bar'>
      <button data-modal-target='#modal' onClick={handleClick}>Upload</button>
      <div className='modal' id='modal'>
        <div className='modal-header'>
          <button data-close-button className='close-button' onClick={handleClose}>&times;</button>
        </div>
        <div className='modal-body'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register('files')} type='file' />
            <button className='submit'>Upload</button>
          </form>
        </div>
      </div>
      <div id='overlay' onClick={handleCloseOverlay}></div>
    </div>
  )
}

export default Navbar
