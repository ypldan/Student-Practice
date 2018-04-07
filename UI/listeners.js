"use strict";
const listeners=(function () {

    function clickOnAreaAdd(event) {
        if (event.srcElement.id==='add-photo-block') {
            myDOM.hideAddField();
        }
    }

    function clickOnAreaLogIn(event) {
        if (event.srcElement.id==='log-in-block') {
            myDOM.hideLogInField();
        }
    }

    function clickOnLogOut() {
        myDOM.setUser();
        myDOM.setUserConfiguration();
        myDOM.clearPosts();
        myDOM.firstPostsLoad();
    }

    function clickOnOpenMore() {
        myDOM.loadPosts(myDOM.getNumberPostsLoaded(),10,myDOM.getFilter());
    }

    function clickOnDeletePost(event) {
        let target=event.srcElement;
        let parent=target.parentElement.parentElement.parentElement;
        myDOM.removePost(parent.id);
    }

    function clickOnLike(event) {
        let target=event.srcElement;
        let parent=target.parentElement.parentElement;
        let post=MyPortal.getPhotoPost(myDOM.parsePostId(parent.id));
        if (post.likes.has(myDOM.getUser())) {
            post.likes.delete(myDOM.getUser());
            target.className="fa fa-heart-o";
        } else {
            post.likes.add(myDOM.getUser());
            target.className="fa fa-heart";
        }
    }

    return {

        addOpenAdd: function () {
            let close=document.querySelector('#menu-add-photo');
            close.addEventListener('click', myDOM.createAddField);
        },

        addCloseAdd: function () {
            let close=document.querySelector('#close-add');
            close.addEventListener('click', myDOM.hideAddField);
            let area=document.querySelector("#add-photo-block");
            area.addEventListener('click', clickOnAreaAdd);
        },

        addOpenLogIn : function () {
            let close=document.querySelector('#menu-log-in');
            close.addEventListener('click', myDOM.createLogInField);
        },

        addCloseLogIn: function () {
            let close=document.querySelector('#close-log-in');
            close.addEventListener('click', myDOM.hideLogInField);
            let area=document.querySelector("#log-in-block");
            area.addEventListener('click', clickOnAreaLogIn);
        },

        addLogOut: function () {
            let logout=document.querySelector("#menu-log-out");
            logout.addEventListener("click", clickOnLogOut);
        },

        addOpenMore: function () {
            let open=document.querySelector("#open-more");
            open.addEventListener("click", clickOnOpenMore);
        },

        addDeletePost: function (node) {
            node.addEventListener("click", clickOnDeletePost);
        },

        addLikeClick: function (node) {
            node.addEventListener("click", clickOnLike);
        }
    }
})();