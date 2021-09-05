import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Episodes from './Episodes';

import podcastIcon_angle from '../images/podcastIcon_angle.png'


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    margin: "auto"
  },
  media: {
    // height: 0,
    paddingTop: '56.25%', // 16:9
    height: "auto",
    width: "auto",
    maxWidth: "200px", 
    maxHeight: "200px",
    margin: "auto"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    // backgroundColor: red[500],
    
  },
  imageAvatar : {
    
      width: "60px",
      height: "60px"
  },
}));



const PodcastInfo = ({podcastDetail}) => {

    console.log(`podcastDetail`, podcastDetail.episodes)
   
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    let lastEpisodeTime = new Date(podcastDetail.latest_pub_date_ms).toDateString()
    return (
        // <div>
        //     <h3>{podcastDetail.title}</h3>
        //     <img src={podcastDetail.thumbnail} alt="" />
        //     {/* <audio controls>
  
        //     <source src="https://www.listennotes.com/e/p/122c0f467212494d87aff84653372f2a/" type="audio/mpeg"/>
        //         </audio> */}
        //     <hr />
        //     <p>{podcastDetail.description}</p>
        // </div>
        <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img className={classes.imageAvatar} src={podcastIcon_angle} alt='podcast' />
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={podcastDetail.title}
        subheader={lastEpisodeTime}
      />
      <CardMedia
        className={classes.media}
        image={podcastDetail.thumbnail}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {podcastDetail.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{fontSize: "15px"}}
        > last episodes
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        {
            podcastDetail && podcastDetail.episodes.map((item, id) => {
                        
                    return (
                        
                        <Episodes item={item} key={item.id}/>
                    )
                         
                })}
          
        </CardContent>
      </Collapse>
    </Card>



    );
};

export default PodcastInfo;