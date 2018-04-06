"use strict";
const myDOM=(function () {
    let user='Albert Einstein';
    let currentPosts=null;
    let currentFilter;
    let postsPageLoaded=false;

    function isUserIn() {
        return user!==null;
    }

    function createAdd() {
        let addBlock=document.createElement('div');
        addBlock.className="new-button";
        addBlock.id="menu-add-photo";
        let add=document.createElement('a');
        add.href="";
        add.innerHTML="Add new photo";
        addBlock.appendChild(add);
        return addBlock;
    }

    function createLogInOrOut(isIn) {
        let logOutBlock=document.createElement('div');
        logOutBlock.className="new-button";
        let logOut=document.createElement('a');
        logOut.href="";
        if (isIn) {
            logOut.innerHTML = "log out";
            logOutBlock.id='menu-log-out';
        } else {
            logOut.innerHTML = "log in";
            logOutBlock.id='menu-log-in';
        }
        logOutBlock.appendChild(logOut);
        return logOutBlock;
    }

    function createUserNickName(username) {
        let userNicknameBlock=document.createElement('div');
        userNicknameBlock.className="new-button";
        let userNickname=document.createElement('a');
        userNickname.href="";
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
        let result=document.createElement('figure');
        result.id='post'+post.id;
        //result.className='post';
        result.appendChild(createImage(post));
        result.appendChild(createUserHashtags(post));
        result.appendChild(createUserPanel(post, isIn));
        result.appendChild(createTimeArea(post));
        return result;
    }

    function parsePostId(string) {
        let result=string.substring(4);
        return Number.parseInt(result);
    }

    function createAuthorsPanel() {
        let result=document.createElement('div');
        result.className='input-panel';
        let byName=document.createElement('p');
        byName.innerHTML='by name:';
        result.appendChild(byName);
        let select=document.createElement('select');
        select.title='name-input';
        select.id='authors';
        let defaultOption=document.createElement('option');
        defaultOption.innerHTML='--- not chosen ---';
        select.appendChild(defaultOption);
        MyPortal.getAuthorsSet().forEach(function (author) {
            let option=document.createElement('option');
            option.innerHTML=author;
            select.appendChild(option);
        });
        result.appendChild(select);
        return result;
    }

    function createDatePanel() {
        let result=document.createElement('div');
        result.className='input-panel';
        let byDate=document.createElement('p');
        byDate.innerHTML='by date:';
        result.appendChild(byDate);
        let date=document.createElement('input');
        date.type='date';
        date.title='date-input';
        result.appendChild(date);
        return result;
    }

    function createHashtagsPanel() {
        let result=document.createElement('div');
        result.className='input-panel';
        let byHashtags=document.createElement('p');
        byHashtags.innerHTML='by hashtags:';
        result.appendChild(byHashtags);
        let input=document.createElement('input');
        input.title='hashtag-input';
        result.appendChild(input);
        return result;
    }

    function createPostsStructure() {
        let posts=document.querySelector('article');
        while (posts.firstChild) {
            posts.removeChild(posts.firstChild);
        }
        posts.innerHTML='<div id="posts-array"></div>\n' +
            '        <div class="open-more"><a href="">Open more...</a></div>';
        return true;
    }

    return {
        setUserConfiguration: function () {
            if (isUserIn()) {
                createUserHeader();
                listeners.addOpenAdd();
                listeners.addCloseAdd();
                return true;
            } else {
                createNonUserHeader();
                listeners.addOpenLogIn();
                /*listeners.addCloseLogIn();*/
                return false;
            }
        },

        loadPosts: function (skip, top, filter) {
            if (!postsPageLoaded) {
                createPostsStructure();
            }
            let postsArray=document.getElementById('posts-array');
            let isIn=isUserIn();
            currentPosts=MyPortal.getPhotoPosts(skip, top, filter);
            currentPosts.forEach(function (post) {
                postsArray.appendChild(createPhotoPost(post, isIn));
            });
            postsPageLoaded=true;
            return true;
        },

        createPost: function(post) {
            if (isUserIn() && MyPortal.isValidToCreate(post)) {
                post.id=MyPortal.incrementLastID();
                post.createdAt=new Date();
                post.author=user;
                post.likes=[];
                MyPortal.addPhotoPost(post);
                this.clearPosts();
                this.loadPosts(0,10);
                return true;
            } else {
                return false;
            }
        },

        clearPosts: function () {
            let postsArray=document.getElementById("posts-array");
            while (postsArray.firstChild) {
                postsArray.removeChild(postsArray.firstChild);
            }
            currentPosts=[];
            return true;
        },

        removePost: function (id) {
            MyPortal.removePhotoPost(id);
            this.clearPosts();
            this.loadPosts(0,10,currentFilter);
            return true;
        },

        loadAuthors: function () {
            let select=document.getElementById('authors');
            while (select.firstChild) {
                select.removeChild(select.firstChild);
            }
            MyPortal.getAuthorsSet().forEach(function (author) {
                let option=document.createElement('option');
                option.innerHTML=author;
                select.appendChild(option);
            });
            return true;
        },

        editPhotoPost: function (id, post) {
            if (MyPortal.isPartiallyValid(post)) {
                MyPortal.editPhotoPost(id,post);
                this.clearPosts();
                this.loadPosts(0,10,currentFilter);
                return true;
            } else {
                return false;
            }
        },

        createFilter: function () {
            let filter=document.createElement('div');
            filter.id='filter';
            let filterHeader=document.createElement('div');
            filterHeader.className='filter-header';
            filterHeader.innerHTML='Filter';
            filter.appendChild(filterHeader);
            let filterContent=document.createElement('div');
            filterContent.className='filter-content';
            let first=createAuthorsPanel();
            let second=createDatePanel();
            let third=createHashtagsPanel();
            filterContent.appendChild(first);
            filterContent.appendChild(second);
            filterContent.appendChild(third);
            filter.appendChild(filterContent);
            let posts=document.querySelector('article');
            let main=document.querySelector('main');
            main.insertBefore(filter,posts);
            return true;
        },

        createAddField: function () {
            let posts=document.getElementById('add-photo-block');
            posts.style.display='flex';
            return true;
        },

        hideAddField: function () {
            let add=document.getElementById('add-photo-block');
            let main=document.querySelector('main');
            main.removeChild(add);
            add.style.display='none';
            return true;
        },

        createLogInField: function () {
            let login=document.querySelector("#log-in-block");
            login.style.display='flex';
            return true;
        },

        hideLogInField: function () {
            let add=document.getElementById('log-in-block');
            let main=document.querySelector('main');
            main.removeChild(add);
            add.style.display='none';
            return true;
        },

        firstPostsLoad: function () {
            this.loadPosts('0', '10');
            postsPageLoaded=true;
            return true;
        },

        isUserIn: isUserIn(),

        setUser: function (username) {
            if (!username || typeof username !== 'string') {
                user=null;
                return false;
            } else {
                user=username;
                return true;
            }
        }
    }
})();