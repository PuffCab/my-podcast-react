import React from 'react';
import { useContext } from 'react'; 
import {
  useParams
} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import {PodcastsContext} from "../context/PodcastsContext"
import { UserProfileContext } from '../context/UserProfileContext'
import { AuthContext } from '../context/authContext';


// INICIO imports commented for material UI card player
// import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import IconButton from '@material-ui/core/IconButton';
// import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
// import SkipNextIcon from '@material-ui/icons/SkipNext';
// FIN imports commented for material UI card player

// INICIO Styles commented for material UI card player
// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//   },
//   details: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   content: {
//     flex: '1 0 auto',
//   },
//   cover: {
//     width: 151,
//   },
//   controls: {
//     display: 'flex',
//     alignItems: 'center',
//     paddingLeft: theme.spacing(1),
//     paddingBottom: theme.spacing(1),
//   },
//   playIcon: {
//     height: 38,
//     width: 38,
//   },
// }));
// FIN Styles commented for material UI card player




const Episodes = ({item}) => {  

    // const {id} = useParams()
    // const item = props.item
    
    
    const { addFavAudio } = useContext(UserProfileContext)
    const { user } = useContext(AuthContext)
    

    let episodeTime = new Date(item.pub_date_ms).toLocaleDateString()

    const handleAddFavorite = (audio) => {
        addFavAudio(audio)
        
    
    }
    // console.log(item)
    return (
        <div>
            <Typography paragraph style={{fontSize: "12px"} }>
                {item.title}&emsp;
                 Published: {episodeTime}
                <div>
                    <audio controls preload='none'>
                        
                        <source src={item.audio} type="audio/mpeg"  />
                        {/* <button onClick={() => handleDelete(fav.userText)}>delete</button> */}
                        
                    </audio> 
                    <button onClick={() => handleAddFavorite(item.audio)} style={ user ? {display: ''} : {display: 'none'}}>
                        Add to Fav
                    </button>
                </div>
            </Typography>
        </div>
    );

// INICIO consts and return commented for material UI card player
//     const classes = useStyles();
//   const theme = useTheme();

//     return (
//     <Card className={classes.root}>
//       <div className={classes.details}>
//         <CardContent className={classes.content}>
//           <Typography component="h5" variant="h5">
//             {item.title}
//           </Typography>
//           <Typography variant="subtitle1" color="textSecondary">
//             Mac Miller
//           </Typography>
//         </CardContent>
//         <div className={classes.controls}>
//           <IconButton aria-label="previous">
//             {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
//           </IconButton>
//           <IconButton aria-label="play/pause">
//             <PlayArrowIcon className={classes.playIcon} />
//           </IconButton>
//           <IconButton aria-label="next">
//             {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
//           </IconButton>
//         </div>
//       </div>
//       <CardMedia
//         className={classes.cover}
//         image={item.thumbnail}
//         title="Live from space album cover"
        
//       />
//     </Card>
//   );
// FIN consts and return commented for material UI card player
};

export default Episodes;