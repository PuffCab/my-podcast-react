import React from 'react';
import { useContext } from 'react';
import { Paper, Button, List } from '@material-ui/core' 
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
// import CarouselItem from './CarouselItem'
import CheckBoxes from './CheckBoxes';

import Podcast from './Podcast';
import { UserProfileContext } from '../context/UserProfileContext';
import { AuthContext } from "../context/authContext";

// import { makeStyles } from '@material-ui/core/styles';
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
            <Paper>
                <CheckBoxes/>
            </Paper>
           <h2>{curListDetails.title}</h2> 
             <p>Number of Podcasts: {curListDetails.total}</p>
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
             </Carousel> */}
             <div className='pocast-list'>
                <List >
                {
                    podcasts && podcasts.map((item) =>{
                        return (
                                    <div>
                                        <Podcast key={item.id} elements={item}/>
                                        <button onClick={() => {handleAddFavPodcast(item)}} style={ user ? {display: ''} : {display: 'none'}}>
                                            addToFav
                                        </button>
                                        
                                        {/* <button onClick={
                                            user ? () => {handleAddFavPodcast(item)}
                                                : () => alert ('Life ain´t easy ... Login first ')
                                            }>addToFav</button> */}
                                            {/* REVIEW preguntar lucas si es good practice llamar la funcion asi , o sino como evitar que se llame a la funcion en cada render */}
                                    </div>               
                                )
                    })}
                </List>
            </div>
        </div>
    );
};

export default PodcastList;