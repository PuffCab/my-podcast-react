import React from 'react';
import {
    Link
  } from 'react-router-dom';

const ListItem = ({curatedList}) => {
    return (
       <Link to={`/curated/${curatedList.id}`} style={{textDecoration: 'none', color: 'black'}}>
            <div  >
                <h3>{ curatedList.title }</h3> 
                <p>Number of Podcasts: { curatedList.total }</p>  
            </div>
        </Link>
    );
}; 

export default ListItem; 