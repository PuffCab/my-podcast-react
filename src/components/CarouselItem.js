import React from 'react'
import { Paper, Button } from '@material-ui/core'  



const CarouselItem = ({ item }) => {
    
     // console.log('item.title1:', item.title)

    return (
        <div>
            <Paper>
            {/* <img src={`http://covers.openlibrary.org/b/isbn/${item?.isbn[0]}-M.jpg`} alt={'cover'} /> */}
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p>Number of podcasts : {item.total}</p>

            <Button className='CheckButton'>
                visit Podcast selection
            </Button>
        </Paper>
        </div>
    );
};

export default CarouselItem;
