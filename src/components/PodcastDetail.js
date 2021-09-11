import React, { useEffect } from 'react';
import {
  useParams
} from 'react-router-dom';
import PodcastInfo from './PodcastInfo';

const PodcastDetail = ({elements}) => {

    console.log(`elements`, elements)
    const [podcastDetail, setPodcastDetail] = React.useState()
    
    

 
//INICIO Block code for API FETCH
  let { id } = useParams()
    console.log(id)
    var myHeaders = new Headers();
    myHeaders.append("X-ListenAPI-Key", process.env.REACT_APP_LISTENNOTES_API_KEY);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow' 
    };

     useEffect(() => {
    const getPodcastDetail = async () => {
      const response = await fetch(
        `https://listen-api.listennotes.com/api/v2/podcasts/${id}`, requestOptions
      );

      const obj = await response.json()
      // console.log(obj)
        setPodcastDetail(obj)
    //   console.log(`response`, response)
    console.log('i am fetchin to the server', id)
    };
    getPodcastDetail();
  }, []);
 //FIN Block code for API FETCH

  //SECTION code block for Local Fetch
  // useEffect(() => {
  //   fetch("http://localhost:8002/obj")
  //     .then(response => {
  //       return response.json()
  //     })
  //     .then(obj => {
  //       console.log(`obj`, obj)
  //       setPodcastDetail(obj)
  //     }); 
  //   console.log(podcastDetail)
  // }, [])
  //SECTION END code block for Local Fetch


    return (
        <div style={{marginTop: 40}}>
        {
            podcastDetail && <PodcastInfo podcastDetail={podcastDetail} key={podcastDetail.id} />
        }
            {/* <img src={podcastDetail.thumbnail} alt="logo" /> */}
            {/* <h3>PODCASTDETAIL name={obj.title}</h3> */}
        </div>
    );
};

export default PodcastDetail;