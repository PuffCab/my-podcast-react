
// import InputField from './components/InputField'
// import AuthorSearch from './components/AuthorSearch'
// import ButtonRouter from './components/ButtonRouter'
// import { Link as RouterLink } from 'react-router-dom'
// import AuthorPage from './components/AuthorPage'
import React from 'react'
import List from './components/List'
import ListDetails from './components/ListDetails';
import Podcast from './components/Podcast'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import PodcastDetail from './components/PodcastDetail'

import {PodcastsContextProvider} from './context/PodcastsContext'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {AuthContextProvider} from "./context/authContext"
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';


function App() {
  return (
 

    <div className="App">
    {/* <h1>AMOS A VER</h1> */}
    <ThemeProvider>
      <AuthContextProvider>
        <Router>
        
          <Navbar/>
          <PodcastsContextProvider>
          <Switch>
            <Route exact path='/'>
              <h1>Go to Curated Lists</h1>
            </Route>
            <Route exact path='/curated'>
                <List/>
            </Route>
            <Route exact path='/curated/:id'>
                <ListDetails/>
            </Route>
            <Route exact path={`/curated/:id/:id`}>
                <Podcast/>
            </Route>
            <Route  exact path={`/podcaslist/:id`}>
                <PodcastDetail/>
            </Route> 
            <Route  exact path={`/register`}>
                <Register/>
            </Route>
            <Route  exact path={`/login`}>
                <Login/>
            </Route>
          </Switch>
          </PodcastsContextProvider>
        </Router>
        </AuthContextProvider>
      </ThemeProvider>

    </div>

  );
}

export default App;
