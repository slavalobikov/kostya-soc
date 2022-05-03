import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import { BrowserRouter, Route} from 'react-router-dom';
import sampleBurgers from './sample-burgers'
import React from 'react'
import base from './base'


class App extends React.Component{

    state = {
        burgers: {},
        order: {}
    };

    componentDidMount(){

        const newState = {
            ...this.state,
            burgers: sampleBurgers
        }

        this.ref = base.syncState(`MySoc/burgers`, {
            context: this,
            state: 'burgers'
        })

        this.setState(newState);
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    render(){
        return (
            <BrowserRouter>
                <Route exact path="/"><Home /></Route>
                <Route path="/login"><Login/></Route>
                <Route path="/register"><Register /></Route>
                <Route path="/messenger"><Messenger /></Route>
                <Route path="/profile"><Profile /></Route>
            </BrowserRouter>
          )
    }
}

export default App;