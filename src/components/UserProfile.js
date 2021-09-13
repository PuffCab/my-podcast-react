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

/////nuevoSTYLE de FAvEpisodes//////////////////
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import './styles/favEpisodesStyle.css'
/////FINnuevoSTYLE de FAvEpisodes///////////////

import TimeAgo from "react-timeago"
import { LinearProgress } from '@material-ui/core';
/////////////////////////////////////

const useStyles = makeStyles((theme) => ({
    
    upload: {
      display: "flex",
      alignItems: "end",
      marginLeft: "2%",
    },
    
    favoriteContainer: {
      display: "flex",
      width: "100%",
  
      alignItems: "center",
      justifyContent: "center",
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
        margin : 8

    },

    root: {
        display: 'flex',
        margin: 4
      },
    details: {
        display: 'flex',
        flexDirection: 'column',
      },
    content: {
        flex: '1 0 auto',
      },
    podcastImage: {
        width: 77,
        height: 77
      },

    cardTitle: {
          fontSize: "12px",
        },
    cardSubTitle: {
        fontSize: "10px",
        },
    audioBar: {
            width: 200,
            height: 30
        },
    episodeThumbnail : {
            objectFit: "contain",
            width: "100%",
            height: "100%"
          },
    userText : {
              marginTop: 0,
              marginBottom: 0

          },
    
    selectFileText: {
        fontSize: 'x-small'
    }

  }));

  const db = firebase.firestore();
  const auth = firebase.auth();  
////////////////////////////////////



function UserProfile() {
    

    ////////////////////////
    const classes = useStyles();
    let history = useHistory();  //TODO implementar push.History para que lleve a la pagina de la que venimos al hacer login.
    const [user] = useAuthState(auth);
    const profilePic = user.photoURL 
    
    ///////////////////////////



    // const { user } = useContext(AuthContext) //REVIEW  why??con el user del AuthContext, al hacer console de user.photoURL sale undefined.
    // console.log(`USERPROFILE`, profilePic)

    const { favorites, addFavorite,addFavAudio, getFavorites, deleteFavorite, deleteFavAudio, deleteFavPodcast,addProfilePic} = useContext(UserProfileContext)
    const [imgUpload, setImgUpload] = useState(0)
    const [userDescription, setUserDescription] = useState("")

    //useEffect para conseguir los favoritos cuando cargue el componente
    useEffect(() => {
        
        getFavorites()
        // console.log(`favorites`, favorites)
        // setUserDescription(favorites)
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
        // console.log(`userDescrip`, userDescription)
    }
    //FIN eliminar estas funciones //////////////////////
    
    const handleDelete = (deleteUserText, timestamp) => { 
        deleteFavorite(deleteUserText, timestamp)          
        
        
    }
    
    const handleDeleteAudioFav = (deleteAudioFav,deleteEpisodeThumbnail, deleteFavTitle,  timestamp) => { 
        deleteFavAudio(deleteAudioFav, deleteEpisodeThumbnail, deleteFavTitle,  timestamp)
        // console.log('favtime', timestamp)
    }

    const handleDeleteFavPodcast = (podcast, timestamp) => { 
        deleteFavPodcast(podcast, timestamp)
        
    }
    // REVIEW wich logic implement to avoid "cannot map of undefined" when the user has no Fav yet?

    const firebaseStorageUpload = (file) => {
        const storageService = firebase.storage(); //call Storage from firebase. Imported in config.js
        const storageRef = storageService.ref();

        setImgUpload(0)
        const uploadTask = storageRef.child(`photoURL/${file.name}`).put(file);

            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                setImgUpload(progress)
            }, 
            (error) => {
                console.log(error);
            }, 
            () => {
                console.log('sucess');
                 
                setImgUpload(100)
                firebase
                .storage()
                .ref(`photoURL/`)
                .child(`${file.name}`)
                .getDownloadURL()
                .then(url => {updateUserWithPic(url); addProfilePic(url)});
            }
            );

    }
    

    const updateUserWithPic = (file) => {  
        const user = firebase.auth().currentUser;
        console.log(`USER en update function`, user)
        console.log(`uploadedPIC`, file)
            user.updateProfile({
            
            photoURL: file
            }).then(() => {
            console.log ('User updated with Picture')
            console.log("USER after IMG upload", user.photoURL)
            }).catch((error) => {
                console.log ('Fail to update user', error.message)
            });

    }
    
    const handleImgUpload = (files) => {
        const file = files[0]
        console.log(`file`, file)
        firebaseStorageUpload(file)
        
    }
    
    const handleDeletePic = () => {
        addProfilePic('')
    }
    return (
            

            
        <Container component="main" maxWidth="xs" className={classes.favoriteContainer}>
            <Grid container style={{marginTop: 40}}>
             <Grid item xs={12}>
                <Box className={classes.userNameBox} border={2} boxShadow={2} borderRadius={10} borderColor="rgba(112, 109, 109, 0.712)" >
                    <h3 style={{margin: "5px"}}>{user? `${user?.displayName ?? user.email }'S profile` : "Not logged in"}</h3>
                    {favorites ? favorites.map((favorite, index) => {
                        {/* console.log('FAVorite', favorite.data()) */}
                        const favoriteData = favorite.data()
                        if (favorite.id === user.uid) {
                            return (
                                <div>
                                    {imgUpload > 0 && !favoriteData?.photoURL && <LinearProgress variant="buffer" value={imgUpload} valueBuffer={imgUpload} color="secondary" />}
                                    {favoriteData?.photoURL ? <Avatar src={favoriteData.photoURL} alt="profile"  /> : 
                                    <Input className={classes.selectFileText} hidden multiple required accept="image/*" type="file" id="imageUpload"
                                                    onChange={(e) => { 
                                                        if (e.target.files) {
                                                            handleImgUpload(e.target.files)
                                                        }
                                                    }} 
                                                />} 
                                    <label htmlFor="imageUpload">
                                        {""}
                                        <AddAPhotoIcon fontSize="small" style={{ cursor: "pointer" }}/>
                                    </label>
                                        <IconButton aria-label="delete" onClick={handleDeletePic} >
                                            <DeleteIcon />
                                        </IconButton>      

                                </div>
                            )
                        }

                        }): <h2>....No picture...</h2>
                    }
                    
                    {/* <div>
                        <Avatar src={profilePic} alt="profile"  className={classes.Avatar}/>
                        {console.log('FOTO', user)}
                        <div>
                            {imgUpload > 0 && !favorites?.avatar && <LinearProgress variant="buffer" value={imgUpload} valueBuffer={imgUpload} color="secondary" />}
                            {favorites?.photoURL ? <img src={favorites.photoURL} alt="avatar" width={100} height="auto" /> :
                                <input multiple required accept="image/*" type="file"
                                    onChange={(e) => { 
                                        if (e.target.files) {
                                            handleImgUpload(e.target.files)
                                        }
                                    }}
                                />} 
                        </div>
                    </div> */}
                </Box>
                <div  >
                    
                    {favorites ? favorites.map((favorite, index) => {
                        {/* {console.log("this is favorites", favorites)} */}
                        if (favorite.id === user.uid) {
                            {/* {console.log('FAVORITE', favorite.data())} */}
                            
                        return (
                                <div className='container'>
                                    <div className='row'>
                                        <div className='col'>
                                            <Box className={classes.favBox} border={2} boxShadow={2} borderRadius={60} borderColor="rgba(112, 109, 109, 0.712)">
                                                <h5>My notes</h5>
                                                <Box>
                                                    <input type="text" placeholder='message' value={userDescription} onChange={handleOnchange} />
                                                    <Button onClick={handleAddFavorite} variant="outlined" color="red" size="small">write note</Button>
                                                </Box>
                                                {/* <h6>{favorite.toData().timestamp.toDate().toLocaleString()}</h6> */}
                                                {favorite.data() ? favorite.data().userDescription.map((fav, index) => {
                                                    {/* {console.log('FAVORITE', favorite.data())} */}
                                                    

                                                    return (
                                                        <div >
                                                        
                                                            <div className='col order-last'>
                                                                <p className={classes.userText}> {fav.userText}</p>
                                                                <IconButton aria-label="delete" onClick={() => handleDelete(fav.userText, fav.timestamp)}>
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
                                                    
                                                    let favEpisodeTime = fav.timestamp.toDate() //NOTE observar como tratar timestamp (tengo que eliminar el .toLocaleString(), porque daba problemas con Timeago)
                                                    {/* {console.log('EPISODE TIME',favEpisodeTime)} */}

                                                    return (
                                                        <div className='col order-last'>
                                                            
                                                            <div className="containerEpisodes">
                                                                <Card className={classes.root}>
                                                                    <div className={classes.details}>
                                                                        <CardContent className={classes.content}>
                                                                        <Typography 
                                                                            className={classes.cardTitle} 
                                                                            component="h7" variant="h7">
                                                                            {fav.episodeTitle}
                                                                            
                                                                        </Typography>
                                                                        <Typography 
                                                                            className={classes.cardSubTitle} 
                                                                            variant="subtitle1" 
                                                                            color="textSecondary">
                                                                            Added to Fav's <TimeAgo date={favEpisodeTime}/>
                                                                        </Typography>
                                                                        </CardContent>
                                                                        <div className={classes.controls}>
                                                                        <audio className={classes.audioBar} controls preload='none'>
                                                                                        
                                                                            <source src={fav.audioFile} type="audio/mpeg"  />
                                                                        </audio> 
                                                                        </div>
                                                                    </div>
                                                                    <div>
                                                                    <CardMedia
                                                                        className={classes.podcastImage}
                                                                        
                                                                    >
                                                                    <img className={classes.episodeThumbnail} src={fav.episodeThumbnail} alt="Podcast thumbnail"/>
                                                                    </CardMedia>
                                                                    <IconButton className="btnEpisodes" aria-label="delete" onClick={() => handleDeleteAudioFav(fav.audioFile, fav.episodeThumbnail, fav.episodeTitle,  fav.timestamp) }>
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                    </div>
                                                                </Card>
                                                            </div> 
                                                        </div>
                                                    )
                                                }) : <p>no userTexts yet</p>}
                                            </Box>   
                                         </div>

                                         <div className='col'>
                                            <Box className={classes.favBox} border={2} boxShadow={2} borderRadius={60} borderColor="rgba(112, 109, 109, 0.712)">
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
                                                                            <IconButton aria-label="delete" onClick={() => handleDeleteFavPodcast(fav.podcast, fav.timestamp)}>
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