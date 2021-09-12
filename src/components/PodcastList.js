import React from 'react';
import { useContext } from 'react';
import { Paper, Button, List } from '@material-ui/core' 
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
// import CarouselItem from './CarouselItem'
// import CheckBoxes from './CheckBoxes';

import Podcast from './Podcast';
import { UserProfileContext } from '../context/UserProfileContext';
import { AuthContext } from "../context/authContext";

import './styles/podcastListStyle.css'
import FavoriteIcon from '@material-ui/icons/FavoriteBorder';
import IconButton from '@material-ui/core/IconButton';
// import Alert from '@material-ui/lab/Alert'; // REVIEW why not working?




const PodcastList = ({curListDetails}) => {

    const {addFavPodcast} = useContext(UserProfileContext)
    const {user} = useContext(AuthContext)
    
    
    const podcasts = curListDetails.podcasts
    console.log(`podcasts`, podcasts)


    const handleAddFavPodcast = (podcastObj) => {
        addFavPodcast(podcastObj)
    }

    return (
        <div >
            {/* <Paper>
                <CheckBoxes/>
            </Paper> */}
            <hr />
           <h2 style={{margin: 10}}>{curListDetails.title}</h2>   
             <p>We've selected {curListDetails.total} Podcasts for you</p>
             <hr/>
             <p>{curListDetails.description}</p>
             <hr/>
             {/* <Carousel
                next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
                prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}
             >
             {
                podcasts && podcasts.map((item) =>{
                    return (
                            <Podcast key={item.id} elements={item}/>                    )
                })}
             </Carousel> REVIEW carrousel edited. List view prefered */}
             <div className='pocast-list'>
                <List >
                {
                    podcasts && podcasts.map((item) =>{
                        return (
                                    <div>
                                        <div className="containerPodcastList">
                                            <Podcast key={item.id} elements={item}/>
                                            {/* <IconButton className="btnPodcastList" onClick={() => {handleAddFavPodcast(item)}} style={ user ? {display: ''} : {display: 'none'}}>
                                                <FavoriteIcon/>
                                            </IconButton>  dispaly FavBtn only if logged in*/} 
                                        
                                            <IconButton className="btnPodcastList" onClick={
                                                user ? () => {handleAddFavPodcast(item)}
                                                    : () => alert ('Life ain´t easy ... Please Login first ')
                                                }>  
                                                <FavoriteIcon/>
                                            </IconButton>
                                        </div>
                                    </div>               
                                )
                    })}
                </List>
            </div>
        </div>
    );
};

export default PodcastList;