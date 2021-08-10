import React, {useEffect} from 'react'

const List = () => {
   

     useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://fakestoreapi.com/products/1"
      );
      const obj = await response.json();
      console.log(obj)
      
    };
    getData();
  }, []);
   
    return (
        <div>
            
        </div>
    )
}

export default List
