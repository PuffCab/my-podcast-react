import React from 'react';
import { Paper, Button } from '@material-ui/core' 
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
// import CarouselItem from './CarouselItem'
import Episodes from './Episodes'

const PodcastList = ({curListDetails}) => {
    console.log(`curListDetails`, curListDetails)
    
    return (
        <div >
           <h2>Titulo : {curListDetails.title}</h2> 
             <p>numero Podcasts: {curListDetails.total}</p>
             <hr/>
             <p>{curListDetails.description}</p>
             <hr/>
             <Carousel
                next={(next, active) => console.log(`we left ${active}, and are now at ${next}`)}
                prev={(prev, active) => console.log(`we left ${active}, and are now at ${prev}`)}
             >
             {
                curListDetails && curListDetails.podcasts.map((item, id) => (
                    <Link to={`/curated/${curListDetails.id}/${item.id}`}>
                         <Paper>
                            {/* <ListItem key={item.id} curatedList={item} /> */}
                            <img src={item.thumbnail} alt="logo" />
                         </Paper>
                    <Episodes episodes={item.thumbnail}/>
                    {console.log(item)}
                    </Link>
                ))}
             </Carousel>
             
        </div>
    );
};

export default PodcastList;