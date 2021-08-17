
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

function App() {
  return (


    <div className="App">
    {/* <h1>AMOS A VER</h1> */}
      <Router>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/curated'>Curated Lists</Link>
            </li>
          </ul>
        </nav>
        
        
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
         </Switch>

      </Router>


    </div>

  );
}

export default App;
