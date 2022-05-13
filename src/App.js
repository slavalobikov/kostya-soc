import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger";
import User from "./pages/user/user"
import { BrowserRouter, Route} from 'react-router-dom';
import React from 'react'
import base from './base'
import StoreContext from "./StoreContext";

class App extends React.Component{

    state = {          
        //инициализация state
        allUsers: {},
    };

    componentDidMount(){    
        //синхронизация state и БД
        this.ref = base.syncState(`MySoc/allUsers`, {
            context: this,
            state: 'allUsers'
        })
    }

    componentWillUnmount(){
        // удаление ссылки на БД
        base.removeBinding(this.ref);
    }

    componentDidUpdate(){
        console.log(this.state)
    }

    render(){

        const clickRegisterButton = (userName, userEmail, userPassword) => {
            const userId = new Date().valueOf(); // создание уникального Id
            const newPerson = {                  // присваивание начального значения нового пользователя
                userName: userName, userEmail: userEmail, userPassword: userPassword, userId: userId,
                posts: [], userName: '', status: '', city: '', country: '', relationship: '',
                coverUrl: '', icon: '', online: true, followers: [], messages: [],
                }
            const allUsers = {...this.state.allUsers};  // создание копии state allUsers
            allUsers[userId] = newPerson;               // добавление нового пользователя в копию
            this.setState({allUsers});                  // изменение state компоненты App
            // добавление текущего пользователя в локальное хранилище
            localStorage.setItem('currentPerson', JSON.stringify({...newPerson}));
        }

        const clickLoginButton = (thisUserEmail, thisUserPassword) => {
            const users = this.state.allUsers; // создание объекта со всеми текущими пользователями
            let loginFlag = true;              // создание переменной (флага) для проверки совпадения
            for (var id in users) {            // начало цикла проверки совпадения
                // если находится совпадение выполнится код условия
                if(users[id]['userEmail'] == thisUserEmail && users[id]['userPassword'] == thisUserPassword){
                    loginFlag = false;  // изменение флага совпадения
                    const currentPerson = {...users[id]};  // создание копии совпадающего пользователя 
                    // установка копии в локальное хранилище
                    localStorage.setItem('currentPerson', JSON.stringify(currentPerson)); 
                    const allUsers = {...this.state.allUsers}; // создание копии state allUsers
                    allUsers[id].online = true;                // изменение параметра online
                    allUsers[id].flag = !allUsers[id].flag;    // изменение параметра flag
                    this.setState({allUsers});                 // изменение state компоненты App
                    break;                                     // выход из цикла
                }
            }
            // если совпадений не нашлось, то выводим текст оповещения
            if(loginFlag){
                alert('Email или Password введен неверно...') // оповещение
            }
        }

        const onClickTopbarImg = () => {
            // получение информации о текущем пользователе
            const localCurrentPerson = JSON.parse(localStorage.getItem('currentPerson'));
            const userId = localCurrentPerson.userId;  // получение Id текущего пользователя
            const currentPerson = {};   // создание объекта пустого пользователя
            // изменение действующего пользователя на пустого в локальном хранилище
            localStorage.setItem('currentPerson', JSON.stringify(currentPerson));
            const allUsers = {...this.state.allUsers};  // создание копии state allUsers
            allUsers[userId].online = false;  // изменение параметра online 
            this.setState({allUsers});  // изменение state компоненты App
        }

        const onClickShare = (desc, img, location) => {
            // получение информации о текущем пользователе
            const localCurrentPerson = JSON.parse(localStorage.getItem('currentPerson'));
            const userId = localCurrentPerson.userId;  // получение Id текущего пользователя
            let date = new Date();  // создание переменной текущей даты и времени
            // создание строки даты и времени опубликования поста
            const newDate = (date.getMonth()+1)+"."+date.getDate()+"."+date.getFullYear()+" "+date.getHours()+":"+date.getMinutes(); 
            const newPost = {  // создание объекта нового поста
                comment: 0, date: newDate, desc: desc, id: userId, like: 0,
                photo: img, userId: userId, location: location, posts: [],
            }
            let copyPosts = this.state.allUsers[userId].posts;  // создание копии всех постов пользователя
            copyPosts ? copyPosts.unshift(newPost) : copyPosts = [newPost];  // добавление поста
            let allUsers = {...this.state.allUsers};  // создание копии state allUsers
            allUsers[userId].posts = copyPosts;  // изменение параметра posts в копии allUsers
            this.setState({allUsers});  // изменение state компоненты App
            const currentPerson = this.state.allUsers[userId];  // создание копии текущего пользователя
            localStorage.setItem('currentPerson', JSON.stringify(currentPerson)); // изменение localStorage
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

        const onSendClick = (userId, message) => {
            const localCurrentPerson = JSON.parse(localStorage.getItem('currentPerson'));
            const personId = localCurrentPerson.userId;
            const newMesMy = {true: message};
            const newMesYour = {false: message};
            const allUsers = { ...this.state.allUsers}
            let mesArrMy = allUsers[personId].messages ? 
                            allUsers[personId].messages[userId] ? 
                            allUsers[personId].messages[userId]
                            : [] 
                        : [];
            let mesArrYour = allUsers[userId].messages ? 
                                allUsers[userId].messages[personId] ? 
                                allUsers[userId].messages[personId]
                                : [] 
                            : [];
            mesArrMy.push(newMesMy);
            mesArrYour.push(newMesYour);
            const objMesMy = {[userId]: mesArrMy};
            const objMesYour = {[personId]: mesArrYour};
            const newPersonMy = {...allUsers[personId], messages: objMesMy};
            const newPersonYour = {...allUsers[userId], messages: objMesYour};
            const allUsersNew = {...allUsers, [personId]: newPersonMy, [userId]: newPersonYour};
            localStorage.setItem('currentPerson', JSON.stringify(newPersonMy));
            localStorage.setItem('currentUser', JSON.stringify(newPersonYour));
            this.setState({allUsers: allUsersNew});
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
            onSendClick,
        }

        return (
            <Login 
                            clickLoginButton={clickLoginButton} 
                            currentPerson={localStorage.getItem('currentPerson') ? JSON.parse(localStorage.getItem('currentPerson'))['userEmail'] : {}} 
                        />
            // <StoreContext.Provider value={stateAndFunc}> 
            //     <BrowserRouter>
            //         <Route path="/timeline"><Home /></Route>
            //         <Route exact path="/">
            //             <Login 
            //                 clickLoginButton={clickLoginButton} 
            //                 currentPerson={localStorage.getItem('currentPerson') ? JSON.parse(localStorage.getItem('currentPerson'))['userEmail'] : {}} 
            //             />
            //         </Route> 
            //         <Route path="/register"><Register clickRegisterButton={clickRegisterButton} /></Route>
            //         <Route path="/messenger"><Messenger onClickTopbarImg={onClickTopbarImg} /></Route>
            //         <Route path="/profile"><Profile /></Route>
            //         <Route path="/user"><User allUsers={this.state.allUsers}/></Route>
            //     </BrowserRouter>
            // </StoreContext.Provider>
          )
    }
}

export default App;