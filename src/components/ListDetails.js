import React, { useEffect} from 'react';
import {
  useParams
} from 'react-router-dom';
import PodcastList from './PodcastList';


const ListDetails = () => {

    const [curListDetails, setCurListDetails] = React.useState()
    
    let { id } = useParams()
    let obj = useParams()
    console.log(id)
    console.log(`object`, obj )

    var myHeaders = new Headers();
    myHeaders.append("X-ListenAPI-Key", "3f0625c2f3eb4f8eae96a0293645a931");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow' 
    };

     useEffect(() => {
    const getCuratedList = async () => {
      const response = await fetch(
        `https://listen-api.listennotes.com/api/v2/curated_podcasts/${id}`, requestOptions
      );

      const obj = await response.json()
      console.log(obj)
      setCurListDetails(obj)
      console.log(`response`, response)
      
    };
    getCuratedList();
  }, []);
 
  console.log(`curListDetails`, curListDetails)

    return (
        
        <div>
             {
                 curListDetails && <PodcastList curListDetails={curListDetails}/>
             }
             

            
        </div>
    );
};

export default ListDetails;