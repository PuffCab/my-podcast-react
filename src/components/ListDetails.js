import React, { useContext, useEffect} from 'react';
import {
  useParams 
} from 'react-router-dom';
import PodcastList from './PodcastList';

import {PodcastsContext} from "./context/PodcastsContext"




const ListDetails = () => {

  const {curListDetails, getData} = useContext(PodcastsContext)
  // console.log(`context`, context)

  useEffect(() => {
    getData()
    
  }, [])






 
//   console.log(`curListDetails`, curListDetails)

    return (
        
        <div>
             {
                 curListDetails && <PodcastList curListDetails={curListDetails}/>
             }
             

            
        </div>
    );
};

export default ListDetails;