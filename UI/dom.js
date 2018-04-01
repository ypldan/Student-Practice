"use strict";
const myDOM=(function () {
    let user='Albert Einstein';

    function isUserIn() {
        return user!==null;
    }

    function createAdd() {
        let addBlock=document.createElement('div');
        addBlock.className="new-button";
        let add=document.createElement('a');
        add.innerHTML="Add new photo";
        addBlock.appendChild(add);
        return addBlock;
    }

    function createLogInOrOut(isIn) {
        let logOutBlock=document.createElement('div');
        logOutBlock.className="new-button";
        let logOut=document.createElement('a');
        if (isIn) {
            logOut.innerHTML = "log out";
        } else {
            logOut.innerHTML = "log in";
        }
        logOutBlock.appendChild(logOut);
        return logOutBlock;
    }

    function createUserNickName(username) {
        let userNicknameBlock=document.createElement('div');
        userNicknameBlock.className="new-button";
        let userNickname=document.createElement('a');
        userNickname.innerHTML=username;
        userNicknameBlock.appendChild(userNickname);
        return userNicknameBlock;
    }

    function createUserHeader() {
        let addBlock=createAdd();
        let logOutBlock=createLogInOrOut(true);
        let userNicknameBlock=createUserNickName(user);
        let rightHeader=document.getElementById("right-header");
        rightHeader.appendChild(addBlock);
        rightHeader.appendChild(logOutBlock);
        rightHeader.appendChild(userNicknameBlock);
    }
    
    function createNonUserHeader() {
        let logInBlock=createLogInOrOut(false);
        let rightHeader=document.getElementById("right-header");
        rightHeader.appendChild(logInBlock);
    }

    function createImage(post) {
        let image=document.createElement('img');
        image.className='post-element';
        image.setAttribute('src', post.photoLink);
        return image;
    }

    function createUserArea(post) {
        let userArea=document.createElement('div');
        userArea.className="user-area";
        let userCircle=document.createElement('div');
        userCircle.className="fa fa-user-circle";
        userCircle.setAttribute('style', 'font-size:32px;');
        let userName=document.createElement('p');
        userName.innerHTML=post.author;
        userArea.appendChild(userCircle);
        userArea.appendChild(userName);
        return userArea;
    }

    function createHashtagsArea(post) {
        let hashtagsArea=document.createElement('div');
        hashtagsArea.className='hashtags-area';
        post.hashtags.forEach(function(hashtag) {
            let tag=document.createElement('p');
            tag.className='hashtag';
            tag.innerHTML=hashtag;
            hashtagsArea.appendChild(tag);
        });
        return hashtagsArea;
    }

    function createUserHashtags(post) {
        let userHashtags=document.createElement('div');
        userHashtags.className="user-hashtags post-element";
        userHashtags.appendChild(createUserArea(post));
        userHashtags.appendChild(createHashtagsArea(post));
        return userHashtags;
    }

    function createLike() {
        let like=document.createElement('div');
        like.className='fa fa-heart-o';
        like.style='font-size:32px;';
        return like;
    }

    function createDescriptionArea(post) {
        let descriptionArea=document.createElement('div');
        descriptionArea.className='description-area';
        let description=document.createElement('p');
        description.className='description';
        description.innerHTML=post.description;
        descriptionArea.appendChild(description);
        return descriptionArea;
    }

    function createUserInstruments(post) {
        let userInstruments=document.createElement('div');
        userInstruments.className='user-instruments';
        let edit=document.createElement('div');
        edit.className="fa fa-edit";
        edit.style="font-size:32px;";
        userInstruments.appendChild(edit);
        let close=document.createElement('div');
        close.className="fa fa-close";
        close.style="font-size:32px;";
        userInstruments.appendChild(close);
        return userInstruments;
    }

    function createUserPanel(post, isIn) {
        let userPanel=document.createElement('div');
        userPanel.className='user-panel post-element';
        if (isIn) {
            userPanel.appendChild(createLike());
        }
        userPanel.appendChild(createDescriptionArea(post));
        if (isIn && user===post.author) {
            userPanel.appendChild(createUserInstruments(post));
        }
        return userPanel;
    }

    function dateToString(date) {
        let result='';
        let hours=date.getHours();
        if (hours<10) {
            hours='0'+hours;
        }
        result+=hours;
        result+=':';
        let minutes=date.getMinutes();
        if (minutes<10) {
            minutes='0'+minutes;
        }
        result+=minutes;
        result+='<br>';
        let day=date.getDate();
        if (day<10) {
            day='0'+day;
        }
        result+=day;
        result+='.';
        let month=date.getMonth()+1;
        if (month<10) {
            month='0'+month;
        }
        result+=month;
        result+='.';
        result+=date.getFullYear();
        return result;
    }

    function createTimeArea(post) {
        let timeArea=document.createElement('div');
        timeArea.className='time-area post-element';
        timeArea.innerHTML=dateToString(post.createdAt);
        return timeArea;
    }

    function createPhotoPost(post, isIn) {
        let result=document.createElement('div');
        result.className='post';
        result.appendChild(createImage(post));
        result.appendChild(createUserHashtags(post));
        result.appendChild(createUserPanel(post, isIn));
        result.appendChild(createTimeArea(post));
        return result;
    }

    return {
        setUserConfiguration: function () {
            if (isUserIn()) {
                createUserHeader();
                return true;
            } else {
                createNonUserHeader();
                return false;
            }
        },

        loadPosts: function () {
            let postsArray=document.getElementById('posts-array');
            let isIn=isUserIn();
            MyPortal.getPhotoPosts(0,10).forEach(function (post) {
                postsArray.appendChild(createPhotoPost(post, isIn));
            })
        }
    }
})();