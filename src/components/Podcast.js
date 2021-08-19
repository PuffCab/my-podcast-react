import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core' 
import PodcastDetail from './PodcastDetail';

const Podcast = ( {elements} ) => {

    // console.log(`ELEMENTS`, elements)
    
return (
        <div>
            {/* <Link to={`/curated/${curListDetails.id}/${item.id}`}> */}
            <Link to={`/podcaslist/${elements.id}`}>
                  {/* <Link>   */}
                    <Paper>
                       {/* <ListItem key={item.id} curatedList={item} /> */}
                       <img src={elements.thumbnail} alt="logo" />
                    </Paper>
               </Link>

            
        </div>
    );
};

export default Podcast;