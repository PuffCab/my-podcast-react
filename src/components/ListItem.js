import React from "react";
import { Link } from "react-router-dom";

//INICIO imports for SHOW Description button
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
//FIN imports for SHOW Description button

//INICIO styles for Show Description button
const useStyles = makeStyles((theme) => ({
 
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(-30deg)',
    },
  }));
  //FIN styles for Show Description button

const ListItem = ({ curatedList }) => {
    // console.log(`curatedList`, curatedList)


    //INICIO constants for Show description Button
    const [expanded, setExpanded] = React.useState(false);
    const classes = useStyles();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    ////FIN constants for Show description Button

    return (
            <div>
            <Link
                to={`/curated/${curatedList.id}`}
                style={{ textDecoration: "none", color: "black" }}
                >
                
                    <h3>{curatedList.title}</h3>
                    <p>Number of Podcasts: {curatedList.total}</p>
                
            </Link>        
                <IconButton
                    className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                    style={{ fontSize: "15px" }}
                >
                    {" "}
                     Description
                    <ExpandMoreIcon />
                </IconButton>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>{curatedList.description}</Typography>
                    </CardContent>
                </Collapse>
            </div>
        
    );
};
export default ListItem;
