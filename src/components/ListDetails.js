import React, { useState, useContext, useEffect} from 'react';
import {
  useParams 
} from 'react-router-dom';
import PodcastList from './PodcastList';

// import {PodcastsContext} from "../context/PodcastsContext"




const ListDetails = () => {

  // const context = useContext(PodcastsContext)
  // const {curListDetails, getData} = useContext(PodcastsContext)
  // console.log(`context`, context)

  const [curListDetails, setCurListDetails] = useState()

      let { id } = useParams()
    let obj = useParams()
    console.log(id)
    // console.log(`object`, obj )

    var myHeaders = new Headers();
    myHeaders.append("X-ListenAPI-Key", process.env.REACT_APP_LISTENNOTES_API_KEY);

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
    //   console.log(obj)
      setCurListDetails(obj)
    //   console.log(`response`, response)
      
    };
    getCuratedList();
    // getData();
  }, []);

  // useEffect(() => {
  //   getData()
    
  // }, [])






 
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