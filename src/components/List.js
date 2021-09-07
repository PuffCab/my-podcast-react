import React, { useState, useEffect } from "react";
import { Paper, Button } from "@material-ui/core";
import ListItem from "./ListItem";
import { RestorePageRounded } from "@material-ui/icons";
import listenNotesIcon_1 from "../images/listenNotesIcon_1.png";

const List = () => {
  const [data, setData] = useState();

  //INICIO commented for local Fetch
  var myHeaders = new Headers();
  myHeaders.append("X-ListenAPI-Key", process.env.REACT_APP_LISTENNOTES_API_KEY);

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
  //FIN commented for local Fetch

  //SECTION block code for Local fetch
  // useEffect(() => {
  //   fetch("http://localhost:8000/obj")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((obj) => {
  //       console.log(`obj`, obj);
  //       setData(obj.curated_lists);
  //     });

  //   console.log(data);
  // }, []);
  //SECTION END block code for Local fetch

  return (
    <div>
      {data &&
        data.map((item, id) => (
          <Paper
            style={{
              margin: "10px",
              borderRadius: "5px",
              color: "white",
              backgroundColor: "rgb(43, 41, 41)",
            }}
          >
            <ListItem
              key={item.id}
              curatedList={item}
              style={{ color: "white" }}
            />
          </Paper>
        ))}
      <Paper>
        <img
          src={listenNotesIcon_1}
          alt="ListenNotes icon"
          width="200"
          height="25"
        />
      </Paper>
    </div>
  );
};

export default List;
