
// import InputField from './components/InputField'
// import AuthorSearch from './components/AuthorSearch'
// import ButtonRouter from './components/ButtonRouter'
// import { Link as RouterLink } from 'react-router-dom'
// import AuthorPage from './components/AuthorPage'
import React, { useContext } from 'react'
import List from './components/List'
import ListDetails from './components/ListDetails';
import Podcast from './components/Podcast'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import PodcastDetail from './components/PodcastDetail'


 
import {PodcastsContextProvider} from './context/PodcastsContext'
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import {AuthContextProvider, AuthContext} from "./context/authContext"
import { ThemeProvider } from './context/ThemeContext';
import { ChatContextProvider } from './context/chatContext';
import { UserProfileContextProvider } from './context/UserProfileContext';
import Navbar from './components/Navbar';
// import ChatRoom from './components/ChatRoom'; //TODO eliminar import chatroom si funciona todo

import GoogleChatApp from './components/GoogleChatApp';

import UserProfile from './components/UserProfile';
import Home from './components/Home';





const PrivateRoute = ({ component: Component, ...rest}) => {
  const { user } = useContext(AuthContext) 
  return (
    <Route {...rest} render={ props => (
      user ?
        <Component {...props} />
        : <Redirect to ="/login" />
      )}         
    /> 
  );
};




function App() {
  return (
 

    <div className="App">
    
    <ThemeProvider>
      <AuthContextProvider>
      <UserProfileContextProvider>
            <Router>
              <Navbar/>
              <PodcastsContextProvider>
                <ChatContextProvider>
                    <Switch>
                      <Route exact path='/'>
                        <Home/>
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
                      {/* <PrivateRoute component={ChatRoom} exact path ='/chat' />  TODO  eliminar ruta si todo funciona y crear otra para chat*/}
                      <Route  exact path={`/googlechat`}>
                          <GoogleChatApp/>
                      </Route>
                      <Route>  
                      <PrivateRoute component={UserProfile} exact path ='/userProfile' />
                      </Route>
                  </Switch>
                </ChatContextProvider>
              </PodcastsContextProvider>
            </Router>
            </UserProfileContextProvider>
          </AuthContextProvider>
      </ThemeProvider>

    </div>

  );
}

export default App;
