import React from 'react'
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import pocastIcon_square from '../images/podcastIcon_square.png'

const useStyles = makeStyles((theme) => ({
    container : {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        alignItems: "center"
    }

}));

function Home() {

    const classes = useStyles();

    return (
        <div>
             <Link
                to='/curated'
                style={{ textDecoration: "none", color: "black" }}
                >
                <div className={classes.container}>
                    <img src={pocastIcon_square} alt="" />
                    <h3>...Go to our curated lists</h3>
                </div>
            </Link>
        </div>
    )
        
}
    


export default Home