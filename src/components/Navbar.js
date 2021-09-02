import {
    Link
  } from 'react-router-dom';
import { useHistory } from 'react-router';
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { ThemeContext} from '../context/ThemeContext'
  
 function Navbar() {

    const { user } = useContext(AuthContext)
    const {activeTheme, toggleTheme } = useContext(ThemeContext)
    const history = useHistory()
    const [modeBtn, setModeBtn] = React.useState('Enable')

    console.log(`user`, user)

    const handleClick = () => {
      
      activeTheme === 'light' ? toggleTheme('dark') : toggleTheme('light');
      activeTheme === 'light' ? setModeBtn('Disable') : setModeBtn('Enable');//WHY no funciona anhadiendo esa logica en linea anterior con &&?
      //REVIEW WHY no funciona.....
    }

    const handleGoBack = () => {
        history.goBack()
        // console.log(`history`, history)
    }

    return (
        <nav>
        <button onClick={handleClick}>{modeBtn} Dark mode</button>
        <button onClick={handleGoBack}>Go Back</button>
        <p>{user? `User ${user?.displayName ?? ""} ${user.email} is logged in` : "Not logged in"}</p>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/curated'>Curated Lists</Link>
          </li>
          <li>
            <Link to='/register'>New User Registration</Link>
          </li>
          <li>
            <Link to='/login'>LogIn</Link>
          </li>
          <li>
            <Link to='/chat'>Chat</Link>
          </li>
          <li>
            <Link to='/googlechat'>GoogleChat</Link>
          </li>
          <li>
            <Link to='/userProfile'>User Profile</Link>
          </li>
        </ul>
      </nav>
    )
}

export default Navbar