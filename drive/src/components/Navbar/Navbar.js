import { useState } from 'react'
import './Navbar.css'

const Navbar = props => {
  const [selectedFile, setSelectedFile] = useState()
	const [isSelected, setIsSelected] = useState(false)

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0])
		setIsSelected(true)
	};

  const handleSubmission = () => {
		const formData = new FormData()

		formData.append('files', selectedFile)

		fetch("http://127.0.0.1:8000/api/files/upload", {
			method: 'POST',
			body: formData,
		})
		.then((response) => response.json())
		.then((result) => {
			console.log('Success:', result)
		})
		.catch((error) => {
			console.error('Error:', error)
		})
  }

  return (
    <div className='nav-bar'>
      <input type="file" name="file" onChange={changeHandler} />
      <div>
				<button onClick={handleSubmission}>Submit</button>
		  </div>
    </div>
  )
}

export default Navbar
