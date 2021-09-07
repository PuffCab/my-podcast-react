import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { Paper, Button, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'; 


import { AuthContext } from "../context/authContext";
import { UserProfileContext } from '../context/UserProfileContext';

//////////////////////////////
import {
    Box,
    Card,
    Input,
    Container,
    Typography,
    Grid,
    Avatar,
  } from "@material-ui/core";
  import { useHistory } from "react-router-dom";
  import { makeStyles } from "@material-ui/core/styles";
  import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
  import podcastIcon_angle from '../images/podcastIcon_angle.png'
  import { useAuthState } from 'react-firebase-hooks/auth'; 
  import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth';
////////////////////////////////


/////////////////////////////////////

const useStyles = makeStyles((theme) => ({
    heading: {
      display: "flex",
      marginTop: "5%",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    profileCard: {
      backgroundColor: theme.palette.secondary.light,
      borderRadius: 25,
    },
    profileInformation: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "right",
      marginRight: "8%",
      marginTop: "5%",
      marginBottom: "5%",
    },
    profileName: {
      display: "flex",
      marginRight: "0%",
      paddingBottom: "15%",
      alignItems: "center",
    },
    pictureDiv: {
      display: "flex",
    },
    profilePicture: {
      width: theme.spacing(8),
      height: theme.spacing(8),
      border: 2,
      borderColor: theme.palette.primary.main,
    },
    upload: {
      display: "flex",
      alignItems: "end",
      marginLeft: "2%",
    },
    logoPosition: {
      display: "flex",
      justifyContent: "center",
    },
    logo: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
    favoriteContainer: {
      display: "flex",
      width: "100%",
  
      alignItems: "center",
      justifyContent: "center",
    },
    favoriteRecipes: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "20%",
    },
    signOutButton: {
      display: "flex",
      justifyContent: "center",
      marginTop: "5%",
      marginBottom: "5%",
    },
    userNameBox: {
        display: "flex",
        justifyContent: "space-around"
    },
    favBox : {
        display: "grid",
        justifyItems: "center",

    }
  }));

  const db = firebase.firestore();
  const auth = firebase.auth();  
////////////////////////////////////


const flexContainer = { display: 'flex', flexDirection: 'column' }

function UserProfile() {
    

    ////////////////////////
    const classes = useStyles();
    let history = useHistory();
    const [user] = useAuthState(auth);
    const profilePic = user.photoURL 
    
    ///////////////////////////


    // const { user } = useContext(AuthContext) //REVIEW  why??con el user del AuthContext, al hacer console de user.photoURL sale undefined.
    console.log(`USERPROFILE`, profilePic)

    const { favorites, addFavorite,addFavAudio, getFavorites, deleteFavorite, deleteFavAudio, deleteFavPodcast  } = useContext(UserProfileContext)
    
    const [userDescription, setUserDescription] = useState("")

    //useEffect para conseguir los favoritos cuando cargue el componente
    useEffect(() => {
        
        getFavorites()
        console.log(`favorites`, favorites)
        setUserDescription(favorites)
    }, [])
    
    
    //get/Create Favorites clicked in component (uso el texto de los mensajs por el momento)
    // const { messages } = useContext(ChatContext)



    //TODO eliminar estas funcions cuando se cree boton favoritos en otro componente
    const handleOnchange = (e) => {
        setUserDescription(e.target.value)
        
        // console.log(`e`, e.target.value)
    }

    const handleAddFavorite = () => {
        addFavorite(userDescription)
        
        setUserDescription('')
        console.log(`userDescrip`, userDescription)
    }
    //FIN eliminar estas funciones //////////////////////
    
    const handleDelete = (deleteUserText) => { 
        deleteFavorite(deleteUserText)           //REVIEW porque aunque pase este argumnto a la funcionn, n userProfileContext no puedo llamar el argumento igual
        console.log(`deleteUserText`, deleteUserText)
        
    }
    
    const handleDeleteAudioFav = (deleteAudioFav) => { 
        deleteFavAudio(deleteAudioFav)
    }

    const handleDeleteFavPost = (podcast) => { 
        deleteFavPodcast(podcast)
    }
     
    // REVIEW wich logic implement to avoid "cannot map of undefined" when the user has no Fav yet?
    
    return (
            

            
        <Container component="main" maxWidth="xs" className={classes.favoriteContainer}>
            <Grid container>
             <Grid item xs={12}>
                <Box className={classes.userNameBox} border={2} boxShadow={2} borderRadius={10} borderColor="rgba(112, 109, 109, 0.712)" >
                    <h3 style={{margin: "5px"}}>{user? `${user?.displayName ?? user.email }'S profile` : "Not logged in"}</h3>
                    <Avatar src={profilePic} alt="profile"  className={classes.Avatar}/>
                </Box>
                <div  >
                    {/* write messages */}
                    <input type="text" placeholder='message' value={userDescription} onChange={handleOnchange} />
                    {/* REVIEW que aparezca en in value del input:[object Object],[object,Object] al volver atras */}
                    <Button onClick={handleAddFavorite} variant="outlined" color="red">write note</Button>
                    {/* read messages */}  
                    
                    {favorites ? favorites.map((favorite, index) => {
                        {/* {console.log("this is favorites", favorites)} */}
                        if (favorite.id === user.uid) {
                            {/* {console.log('FAVORITE', favorite.data())} */}
                            
                        return (
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col'>
                                            <Box className={classes.favBox} border={2} boxShadow={2} borderRadius={10} borderColor="rgba(112, 109, 109, 0.712)">
                                                <h5>My own notes</h5>
                                                {/* <h6>{favorite.toData().timestamp.toDate().toLocaleString()}</h6> */}
                                                {favorite.data() ? favorite.data().userDescription.map((fav, index) => {
                                                    {console.log('FAVORITE', favorite.data())}
                                                    

                                                    return (
                                                        <div >
                                                        
                                                            <div className='col order-last'>
                                                                <p> {fav.userText}</p>
                                                                <p>{index}</p>
                                                                <IconButton aria-label="delete" onClick={() => handleDelete(fav.userText)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                                
                                                            </div>
                                            
                                                        </div>
                                                    
                                                    )
                                                }) : <p>no userTexts yet</p>}
                                            </Box>     
                                        </div>
                                        
                                        
                                        <div className='col'>
                                            <Box className={classes.favBox} border={2} boxShadow={2} borderRadius={10} borderColor="rgba(112, 109, 109, 0.712)">   
                                                <h5>Fav Episodes</h5>
                                                {favorite.data() ? favorite.data().favEpisodes.map((fav, index) => {

                                                    return (
                                                        <div className='col order-last'>
                                                            <div >
                                                                <div >
                                                                    <p>{index}</p>
                                                                    <audio controls preload='none'>                    
                                                                        <source src={fav.audioFile} type="audio/mpeg" preload='none' />
                                                                        Audio file is not supported                      
                                                                    </audio>
                                                                    <IconButton aria-label="delete" onClick={() => handleDeleteAudioFav(fav.audioFile)}>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                        
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }) : <p>no userTexts yet</p>}
                                            </Box>   
                                         </div>

                                         <div className='col'>
                                            <Box className={classes.favBox} border={2} boxShadow={2} borderRadius={10} borderColor="rgba(112, 109, 109, 0.712)">
                                                <h5>Fav Podcast</h5>
                                                {favorite.data() ? favorite.data().favPodcast.map((fav, index) => {

                                                    return (
                                                        <div className='col order-last'>
                                                            <div >
                                                                <div >
                                                                    
                                                                        <Paper style={{width:'170px', margin: "5px"}}>
                                                                            <Link to={`/podcaslist/${fav.id}`}>
                                                                                {/* <p>{fav.podcast.title}</p> */}
                                                                                <img src={fav.podcast.thumbnail} alt="logo" style={{width: "120px",height: "120px", margin: "0px"}} />
                                                                            </Link>
                                                                            <IconButton aria-label="delete" onClick={() => handleDeleteFavPost(fav.podcast)}>
                                                                                <DeleteIcon />
                                                                            </IconButton>
                                                                        </Paper>                                                              
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }) : <p>no Favorite Podcasts yet</p>}
                                            </Box>      
                                         </div>
                                    
                                    
                                </div>
                                
                            </div>
                            
                            )
                        }           
                    }) : <h2>....Loading...</h2>}
                </div>
        
            </Grid>
        </Grid>
    </Container>    

        )
    }

export default UserProfile