// import AddIcon from '@mui/icons-material/Add'
import './Navbar.css';

const Navbar = props => {
  const handleFileInput = () => {
    let buttons = document.getElementsByTagName("button")
    const section = document.querySelector("section"),
      overlay = document.querySelector(".overlay");

    section.classList.add("active")

    // for (let i = 0; i < buttons.length; i++) {
    //   if (buttons[i].className === "submit" || buttons[i].className === "close") {
    //     buttons[i].disabled = true
    //   }
    // }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav justify-content-end flex-grow-1 me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a className="nav-link me-3" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <ion-icon name="add-sharp" size="large"></ion-icon>
              </a>
              <ul className="dropdown-menu dropdown-menu-lg-end">
                <li>
                  <a className="dropdown-item" href="#" onClick={handleFileInput}><ion-icon name="document"></ion-icon>   New File</a>
                </li>
                <li><a className="dropdown-item" href="#"><ion-icon name="folder"></ion-icon>   New Folder</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

  // <form className = 'dropdown-item' onSubmit = { handleSubmit(onSubmit) } >
  //   <input {...register('files')} type='file' />
  //   <button className='submit'>Upload</button>
  // </form >
