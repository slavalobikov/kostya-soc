import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import User from "./pages/user/user"
import { BrowserRouter, Route} from 'react-router-dom';
import React from 'react'
import base from './base'
import { Posts } from "./dummyData";
import StoreContext from "./StoreContext";

class App extends React.Component{

    state = {
        allUsers: {},
    };

    componentDidMount(){
        this.ref = base.syncState(`MySoc/allUsers`, {
            context: this,
            state: 'allUsers'
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
                online: false,
                followers: [],
                }
            const allUsers = {...this.state.allUsers};
            allUsers[userId] = newPerson;
            allUsers[userId].online = true;
            this.setState({allUsers});
            const currentPerson = {...newPerson};
            localStorage.setItem('currentPerson', JSON.stringify(currentPerson));
        }

        // double click to enter!!!
        const clickLoginButton = (thisUserEmail, thisUserPassword) => {
            const users = this.state.allUsers;
            let loginFlag = true;
            for (var id in users) {
                if(users[id]['userEmail'] == thisUserEmail && users[id]['userPassword'] == thisUserPassword){
                    loginFlag = false;
                    const currentPerson = {...users[id]};
                    console.log('currentPerson - ', currentPerson);
                    localStorage.setItem('currentPerson', JSON.stringify(currentPerson));
                    const allUsers = {...this.state.allUsers};
                    allUsers[id].online = true;
                    allUsers[id].flag = !allUsers[id].flag;
                    this.setState({allUsers});
                    break;
                }
            }
            if(loginFlag){
                alert('Email или Password введен неправильно...')
            }
        }

        const onClickTopbarImg = () => {
            const localCurrentPerson = JSON.parse(localStorage.getItem('currentPerson'));
            const userId = localCurrentPerson.userId;
            const currentPerson = {};
            localStorage.setItem('currentPerson', JSON.stringify(currentPerson));
            const allUsers = {...this.state.allUsers};
            allUsers[userId].online = false;
            this.setState({allUsers});
        }

        const onClickShare = (desc, img, location) => {
            const localCurrentPerson = JSON.parse(localStorage.getItem('currentPerson'));
            const userId = localCurrentPerson.userId;
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
            localStorage.setItem('currentPerson', JSON.stringify(currentPerson));
        }

        const onClickDelBut = (e) => {
            const localCurrentPerson = JSON.parse(localStorage.getItem('currentPerson'));
            const userId = localCurrentPerson.userId;
            let newPosts = localCurrentPerson.posts;
            newPosts.splice(e.currentTarget.getAttribute("index"), 1);
            const currentPerson = {...localCurrentPerson, posts: newPosts};
            localStorage.setItem('currentPerson', JSON.stringify(currentPerson));
            const newPerson = {...this.state.allUsers[userId], posts: newPosts};
            const allUsers = { ...this.state.allUsers, [userId]: newPerson }
            this.setState({allUsers});
        }

        const onClickLike = (e, like) => {
            const localCurrentPerson = JSON.parse(localStorage.getItem('currentPerson'));
            const userId = localCurrentPerson.userId;
            let newPosts = localCurrentPerson.posts;
            newPosts[e.currentTarget.getAttribute("index")].like = like;
            const currentPerson = {...localCurrentPerson, posts: newPosts}
            localStorage.setItem('currentPerson', JSON.stringify(currentPerson));
            const newPerson = {...this.state.allUsers[userId], posts: newPosts};
            const allUsers = { ...this.state.allUsers, [userId]: newPerson }
            this.setState({allUsers});
        }

        const onClickInputButton = (newText, word) => {
            if (newText){
                const localCurrentPerson = JSON.parse(localStorage.getItem('currentPerson'));
                const userId = localCurrentPerson.userId;
                const currentPerson = {...localCurrentPerson, [word]: newText};
                localStorage.setItem('currentPerson', JSON.stringify(currentPerson));
                const newPerson = {...this.state.allUsers[userId], [word]: newText};
                const allUsers = { ...this.state.allUsers, [userId]: newPerson };
                this.setState({allUsers});
            }
        }

        const onClickUser = (id) => {
            const currentUser = {...this.state.allUsers[id]};
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            const localCurrentPerson = JSON.parse(localStorage.getItem('currentPerson'));
            const userId = localCurrentPerson.userId;
            const flag = this.state.allUsers[userId].flag;
            const newPerson = {...this.state.allUsers[userId], flag: !flag};
            const allUsers = { ...this.state.allUsers, [userId]: newPerson }
            this.setState({allUsers});
        }

        const followOnUser = () => {
            const localCurrentUser = JSON.parse(localStorage.getItem('currentUser'));
            const userId = localCurrentUser.userId;
            const localCurrentPerson = JSON.parse(localStorage.getItem('currentPerson'));
            const personId = localCurrentPerson.userId;
            let personFollowers = this.state.allUsers[personId].followers;
            personFollowers = personFollowers ? personFollowers : [];
            personFollowers.includes(userId) ? personFollowers.splice(personFollowers.indexOf(userId),1) : personFollowers.unshift(userId);
            const newPerson = {...this.state.allUsers[personId], followers: personFollowers }
            const allUsers = { ...this.state.allUsers, [personId]: newPerson }
            localStorage.setItem('currentPerson', JSON.stringify(newPerson));
            this.setState({allUsers});
        }

        const stateAndFunc = {
            ...this.state,
            currentPerson: JSON.parse(localStorage.getItem('currentPerson')),
            currentUser: JSON.parse(localStorage.getItem('currentUser')),
            clickRegisterButton,
            clickLoginButton,
            onClickTopbarImg,
            onClickShare,
            onClickDelBut,
            onClickLike,
            onClickInputButton,
            onClickUser,
            followOnUser,
        }

        return (
            <StoreContext.Provider value={stateAndFunc}> 
                <BrowserRouter>
                    <Route exact path="/"><Home /></Route>
                    <Route path="/login">
                        <Login 
                            clickLoginButton={clickLoginButton} 
                            currentPerson={localStorage.getItem('currentPerson') ? JSON.parse(localStorage.getItem('currentPerson'))['userEmail'] : {}} 
                        />
                    </Route>
                    <Route path="/register"><Register clickRegisterButton={clickRegisterButton} /></Route>
                    <Route path="/messenger"><Messenger onClickTopbarImg={onClickTopbarImg} /></Route>
                    <Route path="/profile"><Profile /></Route>
                    <Route path="/user"><User allUsers={this.state.allUsers}/></Route>
                </BrowserRouter>
            </StoreContext.Provider>
          )
    }
}

export default App;