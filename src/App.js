import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import { BrowserRouter, Route} from 'react-router-dom';
import React from 'react'
import base from './base'
import { Posts } from "./dummyData";

class App extends React.Component{

    state = {
        allUsers: {},
        currentPerson: {},
    };

    componentDidMount(){
        this.ref = base.syncState(`MySoc/allUsers`, {
            context: this,
            state: 'allUsers'
        })
        this.ref = base.syncState(`MySoc/currentPerson`, {
            context: this,
            state: 'currentPerson'
        })
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    componentWillUnmount(){
        base.removeBinding(this.ref);
    }

    render(){

        const clickRegisterButton = (userName, userEmail, userPassword) => {
            const userId = new Date().valueOf();
            const newPerson = {
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword,
                userId: userId,
                posts: Posts
                }
            const allUsers = {...this.state.allUsers};
            allUsers[userId] = newPerson;
            this.setState({allUsers});
            const currentPerson = {...newPerson};
            this.setState({currentPerson});
        }

        // double click to enter!!!
        const clickLoginButton = (thisUserEmail, thisUserPassword) => {
            const users = this.state.allUsers;
            let loginFlag = true;
            for (var id in users) {
                if(users[id]['userEmail'] == thisUserEmail && users[id]['userPassword'] == thisUserPassword){
                    loginFlag = false;
                    const currentPerson = {...users[id]};
                    this.setState({currentPerson});
                    break;
                }
            }
            if(loginFlag){
                alert('Email или Password введен неправильно...')
            }
        }

        const onClickTopbarImg = () => {
            const currentPerson = null;
            this.setState({currentPerson});
        }

        const onClickShare = (desc, img, location) => {
            const userId = this.state.currentPerson.userId;
            let date = new Date();
            const newDate = date.getDate()+"."+(date.getMonth()+1)+"."+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes();
            const newPost = {
                comment: 0,
                date: newDate,
                desc: desc,
                id: userId,
                like: 0,
                photo: img,
                userId: userId,
                location: location
            }
            let copyPosts = this.state.allUsers[userId].posts;
            copyPosts.unshift(newPost);
            let allUsers = {...this.state.allUsers}
            allUsers[userId].posts = copyPosts;
            this.setState({allUsers});
            const currentPerson = this.state.allUsers[userId];
            this.setState({currentPerson});
        }

        return (
            <BrowserRouter>
                <Route exact path="/">
                    <Home 
                        onClickTopbarImg={onClickTopbarImg}
                        posts={this.state.currentPerson.posts}
                    />
                </Route>
                <Route path="/login">
                    <Login 
                        clickLoginButton={clickLoginButton} 
                        currentPerson={this.state.currentPerson['userEmail']} 
                    />
                </Route>
                <Route path="/register"><Register clickRegisterButton={clickRegisterButton} /></Route>
                <Route path="/messenger"><Messenger onClickTopbarImg={onClickTopbarImg} /></Route>
                <Route path="/profile">
                    <Profile 
                        posts={this.state.currentPerson.posts}
                        onClickTopbarImg={onClickTopbarImg}
                        onClickShare={onClickShare}
                    />
                </Route>
            </BrowserRouter>
          )
    }
}

export default App;