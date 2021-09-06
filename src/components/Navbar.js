import {
    Link
  } from 'react-router-dom';
  import {
    Box,
    Container,
    Grid
  } from "@material-ui/core";
import { useHistory } from 'react-router';
import React, { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import { ThemeContext} from '../context/ThemeContext'
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { GoogleSignOut } from './GoogleChatApp'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    color: 'rgb(61, 58, 58)'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logoutButton : {
    '& > *': {
      margin: theme.spacing(0),
    }
  },
  navBar : {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: "4px"
  },
  backIcon: {
    marginTop: "9px"
  }
}));

  
 function Navbar() {

    const classes = useStyles();

    const { user } = useContext(AuthContext)
    const {activeTheme, toggleTheme } = useContext(ThemeContext)
    const history = useHistory()
    const [modeBtn, setModeBtn] = React.useState('Enable')

    // console.log(`user`, user)

    // const handleClick = () => {
      
    //   activeTheme === 'light' ? toggleTheme('dark') : toggleTheme('light');
    //   activeTheme === 'light' ? setModeBtn('Disable') : setModeBtn('Enable');//WHY no funciona anhadiendo esa logica en linea anterior con &&?
    //   //REVIEW WHY no funciona.....
    // }

    const handleGoBack = () => {
        history.goBack()
        // console.log(`history`, history)
    }


    const [anchorEl, setAnchorEl] = React.useState(null);
    
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    // return (
    //     <nav>
    //     <button onClick={handleClick}>{modeBtn} Dark mode</button>
    //     <button onClick={handleGoBack}>Go Back</button>
    //     <p>{user? `User ${user?.displayName ?? ""} ${user.email} is logged in` : "Not logged in"}</p>
    //     <ul>
    //       <li>
    //         <Link to='/'>Home</Link>
    //       </li>
    //       <li>
    //         <Link to='/curated'>Curated Lists</Link>
    //       </li>
    //       <li>
    //         <Link to='/register'>New User Registration</Link>
    //       </li>
    //       <li>
    //         <Link to='/login'>LogIn</Link>
    //       </li>
    //       <li>
    //         <Link to='/chat'>Chat</Link>
    //       </li>
    //       <li>
    //         <Link to='/googlechat'>GoogleChat</Link>
    //       </li>
    //       <li>
    //         <Link to='/userProfile'>User Profile</Link>
    //       </li>
    //     </ul>
    //   </nav>
    // )

    
      
    
      return (
        <div>
          <Box className={classes.navBar}>
              <p style={{display: 'flex'}}>
                {user? `${user.displayName ? user.displayName : user.email}` : "Not logged in"}
                {/* REVIEW right after registration, it shows email.After refresh, shows Displayname as supposed */}
              </p>
              <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Open Menu
              </Button>
              <ArrowBackIcon className={classes.backIcon} onClick={handleGoBack}>Go Back</ArrowBackIcon>
              <Button className={classes.logoutButton} variant="contained">
                <GoogleSignOut/>
              </Button>
          </Box>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
                <MenuItem onClick={handleClose}>
                    <Link to='/' className={classes.link}>Home</Link>
                </MenuItem>
                
                <MenuItem onClick={handleClose}>
                    <Link to='/curated' className={classes.link}>Curated Lists</Link>
                </MenuItem>
                
                <MenuItem onClick={handleClose}>
                    <Link to='/register' className={classes.link}>New User</Link>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <Link to='/login' className={classes.link}>LogIn</Link>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <Link to='/chat' className={classes.link}>Chat</Link>
                </MenuItem>
                
                <MenuItem onClick={handleClose}>
                   <Link to='/googlechat' className={classes.link}>GoogleChat</Link>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <Link to='/userProfile' className={classes.link}>User Profile</Link>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <Link to='/fooProfile'>FOO profile</Link>
                </MenuItem>
                {/* TODO delete Foo profile after testing...and component */}

          </Menu>
        </div>
      );
    









  }

export default Navbar