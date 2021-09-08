import React from 'react';
import { useContext } from 'react'; 
import {
  useParams
} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {PodcastsContext} from "../context/PodcastsContext"
import { UserProfileContext } from '../context/UserProfileContext'
import { AuthContext } from '../context/authContext';

import { Box } from "@material-ui/core";


// INICIO imports commented for material UI card player
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import './styles/episodesStyle.css'
// FIN imports commented for material UI card player

// INICIO Styles commented for material UI card player
const useStyles = makeStyles((theme) => ({
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
  playIcon: {
    height: 38,
    width: 38,
  },
  cardTitle: {
      fontSize: "12px",
  },
  cardSubTitle: {
    fontSize: "10px",
},
    audioBar: {
        width: 253,
        height: 30
    }
}));
// FIN Styles commented for material UI card player




const Episodes = ({item}) => {  

    // const {id} = useParams()
    // const item = props.item
    
    
    const { addFavAudio } = useContext(UserProfileContext)
    const { user } = useContext(AuthContext)
    

    let episodeTime = new Date(item.pub_date_ms).toLocaleDateString()

    const handleAddFavorite = (audio, title) => {
        addFavAudio(audio, title)
        
    
    }
    // console.log(item)
    // return (
    //     <div>
    //         <Box paragraph style={{fontSize: "12px"} }>
    //             {item.title}&emsp;
    //              Published: {episodeTime}
    //             <div>
    //                 <audio controls preload='none'>
                        
    //                     <source src={item.audio} type="audio/mpeg"  />
    //                     {/* <button onClick={() => handleDelete(fav.userText)}>delete</button> */}
                        
    //                 </audio> 
    //                 <button onClick={() => handleAddFavorite(item.audio)} style={ user ? {display: ''} : {display: 'none'}}>
    //                     Add to Fav
    //                 </button>
    //             </div>
    //         </Box>
    //     </div>
    // );

// INICIO consts and return commented for material UI card player
    const classes = useStyles();
  const theme = useTheme();

    return (
        <div className="containerEpisodes">
        <Card className={classes.root}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                <Typography 
                    className={classes.cardTitle} 
                    component="h7" variant="h7">
                    {item.title}
                </Typography>
                <Typography 
                    className={classes.cardSubTitle} 
                    variant="subtitle1" 
                    color="textSecondary">
                    Published on {episodeTime}
                </Typography>
                </CardContent>
                <div className={classes.controls}>
                <audio className={classes.audioBar} controls preload='none'>
                                
                    <source src={item.audio} type="audio/mpeg"  />
                </audio> 
                </div>
            </div>
        
            <CardMedia
                className={classes.podcastImage}
                image={item.thumbnail}
                title="Podcast picture" 
            />
            <IconButton className="btnEpisodes" onClick={() => handleAddFavorite(item.audio, item.title)} style={ user ? {display: ''} : {display: 'none'}}>
                <FavoriteIcon/>
            </IconButton>
            
        </Card>
    </div> 
  );
// FIN consts and return commented for material UI card player
};

export default Episodes;