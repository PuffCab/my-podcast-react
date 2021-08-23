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

    console.log(`user`, user)

    const handleClick = () => {
      // activeTheme === 'light' ? toggleTheme('dark') : toogleTheme('light')
    }

    const handleGoBack = () => {
        history.goBack()
        console.log(`history`, history)
    }

    return (
        <nav>
        <button onClick={handleClick}>Enable Dark mode</button>
        <button onClick={handleGoBack}>Go Back</button>
        <p>{user? `User ${user.email} is logged in` : "Not logged in"}</p>
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
        </ul>
      </nav>
    )
}

export default Navbar