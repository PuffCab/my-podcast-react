import {
    Link
  } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { ThemeContext} from '../context/ThemeContext'
  
 function Navbar() {

    const { user } = useContext(AuthContext)
    const {activeTheme, toggleTheme } = useContext(ThemeContext)

    console.log(`user`, user)

    const handleClick = () => {
      // activeTheme === 'light' ? toggleTheme('dark') : toogleTheme('light')
    }

    return (
        <nav>
        <button onClick={handleClick}>Enable Dark mode</button>
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