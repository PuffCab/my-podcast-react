import React, { useEffect } from 'react';
import {
  useParams
} from 'react-router-dom';
import PodcastInfo from './PodcastInfo';

const PodcastDetail = ({elements}) => {

    console.log(`elements`, elements)
    const [podcastDetail, setPodcastDetail] = React.useState()
    
    

  //INICIO comentado para local Fetch

  // let { id } = useParams()
    // console.log(id)
  //   var myHeaders = new Headers();
  //   myHeaders.append("X-ListenAPI-Key", "3f0625c2f3eb4f8eae96a0293645a931");

  //   var requestOptions = {
  //       method: 'GET',
  //       headers: myHeaders,
  //       redirect: 'follow' 
  //   };

  //    useEffect(() => {
  //   const getPodcastDetail = async () => {
  //     const response = await fetch(
  //       `https://listen-api.listennotes.com/api/v2/podcasts/${id}`, requestOptions
  //     );

  //     const obj = await response.json()
  //     // console.log(obj)
  //       setPodcastDetail(obj)
  //   //   console.log(`response`, response)
  //   console.log('i am fetchin to the server', id)
    
      
  //   };
  //   getPodcastDetail();
  // }, []);
  //FIN comentado para local Fetch

  useEffect(() => {
    fetch("http://localhost:8002/obj")
      .then(response => {
        return response.json()
      })
      .then(obj => {
        console.log(`obj`, obj)
        setPodcastDetail(obj)
      }); 

    console.log(podcastDetail)
     
    
  }, [])


    return (
        <div>
        {
            podcastDetail && <PodcastInfo podcastDetail={podcastDetail} key={podcastDetail.id} />
        }
            {/* <img src={podcastDetail.thumbnail} alt="logo" /> */}
            {/* <h3>PODCASTDETAIL name={obj.title}</h3> */}
        </div>
    );
};

export default PodcastDetail;