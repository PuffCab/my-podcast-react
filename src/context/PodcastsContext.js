import React from "react";
import { createContext } from "react";


// 1 ->  create context
export const PodcastsContext = createContext()


// 2 -> create provider

// export const PodcastsContextProvider = (props) => {
export const PodcastsContextProvider = ({children}) => {
    // console.log(`props`, props)

    // 3 -> move state and function
    const [curListDetails, setCurListDetails] = React.useState()
    
    
    
    
  //INICIO commented for local Fetch
  //   let { id } = useParams()
  //   let obj = useParams()
  //   console.log(id)
  //   console.log(`object`, obj )

  //   var myHeaders = new Headers();
  //   myHeaders.append("X-ListenAPI-Key", "3f0625c2f3eb4f8eae96a0293645a931");

  //   var requestOptions = {
  //       method: 'GET',
  //       headers: myHeaders,
  //       redirect: 'follow' 
  //   };

  //    useEffect(() => {
  //   const getCuratedList = async () => {
  //     const response = await fetch(
  //       `https://listen-api.listennotes.com/api/v2/curated_podcasts/${id}`, requestOptions
  //     );

  //     const obj = await response.json()
  //   //   console.log(obj)
  //     setCurListDetails(obj)
  //   //   console.log(`response`, response)
      
  //   };
  //   getCuratedList();
  // }, []);
  //FIN commented for local Fetch


  
    const getData = () => {
        fetch("http://localhost:8001/obj")
      .then(response => {
          return response.json()
      })
      .then(obj => {
        console.log(`OBJ`, obj)
        setCurListDetails(obj)
      })
    }
        
    
  


    // 4 -> return the provider with its value & inject children component
    
    return (

        <PodcastsContext.Provider value={{curListDetails, getData}}>
            {/* {props.children} */}
            {children}
        </PodcastsContext.Provider>

    )


} 