import React, {useState, useEffect} from 'react'
import { Paper, Button } from '@material-ui/core' 
import ListItem from './ListItem'

const List = () => {
    
    const [data, setData] = useState()
    
    var myHeaders = new Headers();
myHeaders.append("X-ListenAPI-Key", "3f0625c2f3eb4f8eae96a0293645a931");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow' 
};

     useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://listen-api.listennotes.com/api/v2/curated_podcasts/?page=*&", requestOptions
      );

      const obj = await response.json()
      console.log(obj.curated_lists)
      setData(obj.curated_lists)
      
    };
    getData();
  }, []);


   
    return (
        
        <div>
            {
                data && data.map((item, id) => (
                         <Paper>
                            <ListItem key={item.id} curatedList={item} />
                         </Paper>
                         
                ))}
        </div>

    )
}

export default List
