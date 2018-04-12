"use strict";
const myDOM=(function () {
    let user='Albert Einstein';
    let currentPosts=[];
    let currentFilter={};
    let users=new Set(['Albert Einstein',
        'Alexey Navalny',
        'Mickie Mouse',
        'ypldan',
        'Hleb Salaujou',
        'Donald Trump',
        'unknown author']);

    function isUserIn() {
        return user!==null && user!=="" && user;
    }

    function createAdd() {
        let addBlock=document.createElement('div');
        addBlock.className="new-button";
        addBlock.id="menu-add-photo";
        addBlock.innerHTML="Add new photo";
        return addBlock;
    }

    function createLogInOrOut(isIn) {
        let logOutBlock=document.createElement('div');
        logOutBlock.className="new-button";
        if (isIn) {
            logOutBlock.innerHTML = "log out";
            logOutBlock.id='menu-log-out';
        } else {
            logOutBlock.innerHTML = "log in";
            logOutBlock.id='menu-log-in';
        }
        return logOutBlock;
    }

    function createUserNickName(username) {
        let userNicknameBlock=document.createElement('div');
        userNicknameBlock.className="new-button";
        userNicknameBlock.innerHTML=username;
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
        hashtagsArea.id="post"+post.id+"hashtags";
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

    function createLike(post) {
        let like=document.createElement('div');
        if (post.likes.has(user)) {
            like.className = 'fa fa-heart';
        } else {
            like.className = 'fa fa-heart-o';
        }
        like.style='font-size:32px;';
        listeners.addLikeClick(like);
        return like;
    }

    function createDescriptionArea(post) {
        let descriptionArea=document.createElement('div');
        descriptionArea.className='description-area';
        descriptionArea.id="post"+post.id+"description";
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
        listeners.addOpenEdit(edit);
        userInstruments.appendChild(edit);
        let close=document.createElement('div');
        close.className="fa fa-trash delete-post";
        close.style="font-size:32px;";
        listeners.addDeletePost(close);
        userInstruments.appendChild(close);
        return userInstruments;
    }

    function createUserPanel(post, isIn) {
        let userPanel=document.createElement('div');
        userPanel.className='user-panel post-element';
        let like=createLike(post);
        let instruments=createUserInstruments(post);
        if (!isIn) {
            like.style.display='none';
        }
        if (user!==post.author || !isIn) {
            instruments.style.display='none';
        }
        userPanel.appendChild(like);
        userPanel.appendChild(createDescriptionArea(post));
        userPanel.appendChild(instruments);
        return userPanel;
    }

    function dateTimeToString(date) {
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

    function dateToString(date) {
        let result="";
        result+=date.getFullYear();
        result+="-";
        let month=date.getMonth()+1;
        if (month<10) {
            month='0'+month;
        }
        result+=month;
        result+="-";
        let day=date.getDate();
        if (day<10) {
            day='0'+day;
        }
        result+=day;
        return result;
    }

    function createTimeArea(post) {
        let timeArea=document.createElement('div');
        timeArea.className='time-area post-element';
        timeArea.innerHTML=dateTimeToString(post.createdAt);
        return timeArea;
    }

    function createPhotoPost(post, isIn) {
        let result=document.createElement('figure');
        result.id='post'+post.id;
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

    function loadAuthorsList() {
        let authors=document.getElementById("filter-author");
        while (authors.firstChild) {
            authors.removeChild(authors.firstChild);
        }
        let defaultOption=new Option("---not chosen---", "-1", true, true);
        authors.appendChild(defaultOption);
        users.forEach(function (author) {
            let option=new Option(author, author);
            authors.appendChild(option);
        });
    }

    function clearHeader() {
        let header=document.getElementById("right-header");
        while (header.firstChild) {
            header.removeChild(header.firstChild);
        }
    }

    function addHeaderListeners() {
        if (isUserIn()) {
            listeners.addOpenAdd();
            listeners.addCloseAdd();
            listeners.addLogOut();
        } else {
            listeners.addOpenLogIn();
            listeners.addCloseLogIn();
        }
    }

    function showLikes() {
        let likes=document.querySelectorAll(".fa-heart-o");
        likes.forEach(function (like) {
            let parentID=like.parentElement.parentElement.id;
            let post=MyPortal.getPhotoPost(myDOM.parsePostId(parentID));
            if (post.likes.has(user)) {
                like.className="fa fa-heart";
            }
            like.style.display='block';
        });
        likes=document.querySelectorAll(".fa-heart");
        likes.forEach(function (like) {
            let parentID=like.parentElement.parentElement.id;
            let post=MyPortal.getPhotoPost(myDOM.parsePostId(parentID));
            if (!post.likes.has(user)) {
                like.className="fa fa-heart-o";
            }
            like.style.display='block';
        });
    }

    function hideLikes() {
        let likes=document.querySelectorAll(".fa-heart-o");
        likes.forEach(function (like) {
            like.style.display='none';
        });
        likes=document.querySelectorAll(".fa-heart");
        likes.forEach(function (like) {
            like.style.display='none';
        });
    }

    function showInstruments() {
        let instruments=document.querySelectorAll(".user-instruments");
        instruments.forEach(function (node) {
            let parentID=node.parentElement.parentElement.id;
            let post=MyPortal.getPhotoPost(myDOM.parsePostId(parentID));
            if (user===post.author) {
                node.style.display = 'flex';
            }
        });
    }

    function hideInstruments() {
        let instruments=document.querySelectorAll(".user-instruments");
        instruments.forEach(function (node) {
            node.style.display='none';
        });
    }

    return {

        setUserConfiguration: function () {
            clearHeader();
            myLocalStorage.writeUser();
            if (isUserIn()) {
                createUserHeader();
                showLikes();
                showInstruments();
            } else {
                createNonUserHeader();
                hideLikes();
                hideInstruments();
            }
            addHeaderListeners();
        },

        loadPosts: function (skip, top, filter) {
            let postsArray=document.getElementById('posts-array');
            let isIn=isUserIn();
            let processingPosts=MyPortal.getPhotoPosts(skip, top, filter);
            processingPosts.forEach(function (post) {
                postsArray.appendChild(createPhotoPost(post, isIn));
                currentPosts.push(post);
            });
            myLocalStorage.writeCurrentPosts();

            return true;
        },

        createPost: function(post) {
            if (isUserIn() && MyPortal.isValidToCreate(post)) {
                post.id=MyPortal.incrementLastID();
                post.createdAt=new Date();
                post.author=user;
                post.likes=new Set();
                MyPortal.addPhotoPost(post);
                this.clearPosts();
                this.loadPosts(0,10);
                myLocalStorage.writeAllPosts();
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

        removePost: function (string) {
            MyPortal.removePhotoPost(parsePostId(string));
            let figure=document.getElementById(string);
            let parent=document.getElementById("posts-array");
            parent.removeChild(figure);
            myLocalStorage.writeAllPosts();
            //this.clearPosts();
            //this.loadPosts(0,10,currentFilter);
            return true;
        },

        loadAuthors: loadAuthorsList,

        editPhotoPost: function (id, post) {
            if (MyPortal.isPartiallyValid(post)) {
                MyPortal.editPhotoPost(id,post);
                this.clearPosts();
                this.loadPosts(0,10,currentFilter);
                myLocalStorage.writeAllPosts();
                return true;
            } else {
                return false;
            }
        },

        createAddField: function () {
            let posts=document.getElementById('add-photo-block');
            posts.style.display='flex';
        },

        hideAddField: function () {
            let add=document.getElementById('add-photo-block');
            add.style.display='none';
        },

        createLogInField: function () {
            let login=document.querySelector("#log-in-block");
            login.style.display='flex';
        },

        hideLogInField: function () {
            let login=document.getElementById('log-in-block');
            login.style.display='none';
        },

        createEditField: function () {
            let edit=document.querySelector("#edit-block");
            edit.style.display='flex';
        },

        hideEditField: function () {
            let edit=document.querySelector('#edit-block');
            edit.style.display='none';
        },

        firstPostsLoad: function () {
            this.loadPosts('0', '10');
            return true;
        },

        isUserIn: isUserIn(),

        getUser: function() {
            return user;
        },

        setUser: function (username) {
            if (!username || typeof username !== 'string') {
                user=null;
                return false;
            } else {
                user=username;
                return true;
            }
        },

        setFilterAuthor: function(author) {
            currentFilter.author=author;
            myLocalStorage.writeFilter();
        },

        setFilterDate: function(date) {
            currentFilter.date=date;
            myLocalStorage.writeFilter();
        },

        setFilterHashtags: function(hashtags) {
            currentFilter.hashtags=hashtags;
            myLocalStorage.writeFilter();
        },

        setFilterFromLocalStorage: function(newFilter) {
            currentFilter=newFilter;
            if (currentFilter.author) {
                let authors=document.getElementById("filter-author");
                authors.value=currentFilter.author;
            }
            if (currentFilter.date) {
                let date=document.getElementById("filter-date");
                date.value=currentFilter.date;
            }
            if (currentFilter.hashtags) {
                let hashtags=document.getElementById("filter-hashtags");
                let string="";
                currentFilter.hashtags.forEach(function (tag) {
                    string+=tag+" ";
                });
                hashtags.value=string;
            }
        },

        getFilter: function() {
            return currentFilter;
        },

        clearFilter: function() {
            currentFilter.author=null;
            currentFilter.hashtags=null;
            currentFilter.date=null;
            myLocalStorage.writeFilter();
        },

        getNumberPostsLoaded: function () {
            return currentPosts.length;
        },

        parsePostId: function (string) {
            return parsePostId(string);
        },

        addFormsAndFilterListeners: function () {
            listeners.addCloseEdit();
            listeners.addFormsListeners();
            listeners.addFilterListeners();
        },

        getUsers: function () {
            return users;
        },

        dateToString: dateToString,

        getCurrentPosts: function () {
            return currentPosts;
        },

        setAndShowCurrentPosts: function (posts) {
            currentPosts=posts;
            let postsArray=document.getElementById('posts-array');
            let isIn=isUserIn();
            for (let i = 0; i < currentPosts.length; i++) {
                let post=currentPosts[i];
                let div=createPhotoPost(post, isIn);
                postsArray.appendChild(div);
            }
            /*currentPosts.forEach(function (post) {
                postsArray.appendChild(createPhotoPost(post, isIn));
            });*/
        }
    }
})();