import React from 'react';
import { Paper, Button, List } from '@material-ui/core' 
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
// import CarouselItem from './CarouselItem'

import Podcast from './Podcast';

const PodcastList = ({curListDetails}) => {
    
    
    const podcasts = curListDetails.podcasts
    console.log(`podcasts`, podcasts)

    return (
        <div >
           <h2>{curListDetails.title}</h2> 
             <p>Number of Podcasts: {curListDetails.total}</p>
             <hr/>
             <p>{curListDetails.description}</p>
             <hr/>
             <List
                next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
                prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}
             >
             {
                podcasts && podcasts.map((item) =>{
                    return (
                            <Podcast key={item.id} elements={item}/>                    )
                })}
             </List>
              
        </div>
    );
};

export default PodcastList;