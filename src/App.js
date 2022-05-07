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
                posts: Posts,
                userName: '',
                status: '',
                city: '',
                country: '',
                relationship: '',
                coverUrl: '',
                icon: '',
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
                location: location,
                posts: [],
            }
            let copyPosts = this.state.allUsers[userId].posts;
            copyPosts ? copyPosts.unshift(newPost) : copyPosts = [newPost];
            let allUsers = {...this.state.allUsers}
            allUsers[userId].posts = copyPosts;
            this.setState({allUsers});
            const currentPerson = this.state.allUsers[userId];
            this.setState({currentPerson});
        }

        const onClickDelBut = (e) => {
            const userId = this.state.currentPerson.userId;
            let newPosts = this.state.currentPerson.posts;
            newPosts.splice(e.currentTarget.getAttribute("index"), 1);
            const currentPerson = {...this.state.currentPerson, posts: newPosts};
            this.setState({currentPerson});
            const newPerson = {...this.state.allUsers[userId], posts: newPosts};
            const allUsers = { ...this.state.allUsers, [userId]: newPerson }
            this.setState({allUsers});
        }

        const onClickLike = (e, like) => {
            const userId = this.state.currentPerson.userId;
            let newPosts = this.state.currentPerson.posts;
            newPosts[e.currentTarget.getAttribute("index")].like = like;
            const currentPerson = {...this.state.currentPerson, posts: newPosts}
            this.setState({currentPerson});
            const newPerson = {...this.state.allUsers[userId], posts: newPosts};
            const allUsers = { ...this.state.allUsers, [userId]: newPerson }
            this.setState({allUsers});
        }

        const onClickInputButton = (newText, word) => {
            if (newText){
                const userId = this.state.currentPerson.userId;
                const currentPerson = {...this.state.currentPerson, [word]: newText};
                this.setState({currentPerson});
                const newPerson = {...this.state.allUsers[userId], [word]: newText};
                const allUsers = { ...this.state.allUsers, [userId]: newPerson };
                this.setState({allUsers});
            }
        }

        return (
            <BrowserRouter>
                <Route exact path="/">
                    <Home 
                        onClickTopbarImg={onClickTopbarImg}
                        currentPerson={this.state.currentPerson}
                        onClickDelBut={onClickDelBut}
                        onClickLike={onClickLike}
                        onClickShare={onClickShare}
                        onClickInputButton={onClickInputButton}
                        allUsers={this.state.allUsers}
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
                        allUsers={this.state.allUsers}
                        currentPerson={this.state.currentPerson}
                        onClickTopbarImg={onClickTopbarImg}
                        onClickShare={onClickShare}
                        onClickDelBut={onClickDelBut}
                        onClickLike={onClickLike}
                        onClickInputButton={onClickInputButton}
                    />
                </Route>
            </BrowserRouter>
          )
    }
}

export default App;