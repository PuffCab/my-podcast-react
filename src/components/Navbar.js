import {
    Link
  } from 'react-router-dom';
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
<<<<<<< HEAD
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
=======

  function Navbar() {

    const { user } = useContext(AuthContext)

    console.log(`user`, user)

    return (
        <nav>
>>>>>>> b454a886e15e1340849dd9b62e8e5dfd41841009
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
