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
        allUsers: {},
        burgers: {},
        order: {},
    };

    componentDidMount(){
        this.ref = base.syncState(`MySoc/burgers`, {
            context: this,
            state: 'burgers'
        })
        const newState = {
            ...this.state,
            burgers: sampleBurgers
        }
        this.setState(newState);
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    render(){

        const clickRegisterButton = (userName, userEmail, userPassword) => {
            
            this.ref = base.syncState(`MySoc/allUsers`, {
                context: this,
                state: 'allUsers'
            })
            const newPerson = {
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword
              }
            const allUsers = {...this.state.allUsers};
            allUsers[new Date().valueOf()] = newPerson;
            this.setState({allUsers});
          }

        return (
            <BrowserRouter>
                <Route exact path="/"><Home /></Route>
                <Route path="/login"><Login/></Route>
                <Route path="/register"><Register clickRegisterButton={clickRegisterButton} /></Route>
                <Route path="/messenger"><Messenger /></Route>
                <Route path="/profile"><Profile /></Route>
            </BrowserRouter>
          )
    }
}

export default App;