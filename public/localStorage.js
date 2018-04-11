"use strict";
const myLocalStorage=(function () {

    function writeUser() {
        localStorage.setItem("user", JSON.stringify(myDOM.getUser()));
    }

    function getUser() {
        return JSON.parse(localStorage.getItem("user"));
    }

    function writeCurrentPosts() {
        let posts=[];
        myDOM.getCurrentPosts().forEach(function (post) {
            let object={};
            object.id=post.id;
            object.description=post.description;
            object.createdAt=JSON.stringify(post.createdAt);
            object.author=post.author;
            object.photoLink=post.photoLink;
            object.hashtags=JSON.stringify(Array.from(post.hashtags));
            object.likes=JSON.stringify(Array.from(post.likes));
            posts.push(object);
        });
        localStorage.setItem("currentPosts", JSON.stringify(posts));
    }

    function getCurrentPosts() {
        let array=JSON.parse(localStorage.getItem("currentPosts"));
        let currentArray=[];
        array.forEach(function (post) {
            post.createdAt=new Date(JSON.parse(post.createdAt));
            post.hashtags=new Set(JSON.parse(post.hashtags));
            post.likes=new Set(JSON.parse(post.likes));
            currentArray.push(post);
        });
        return currentArray;
    }

    function writeAllPosts() {
        let posts=[];
        MyPortal.getAllPosts().forEach(function (post) {
            let object={};
            object.id=post.id;
            object.description=post.description;
            object.createdAt=JSON.stringify(post.createdAt);
            object.author=post.author;
            object.photoLink=post.photoLink;
            object.hashtags=JSON.stringify(Array.from(post.hashtags));
            object.likes=JSON.stringify(Array.from(post.likes));
            posts.push(object);
        });
        localStorage.setItem("allPosts", JSON.stringify(posts));
    }

    function getAllPosts() {
        let array=JSON.parse(localStorage.getItem("allPosts"));
        let currentArray=[];
        array.forEach(function (post) {
            post.createdAt=new Date(JSON.parse(post.createdAt));
            post.hashtags=new Set(JSON.parse(post.hashtags));
            post.likes=new Set(JSON.parse(post.likes));
            currentArray.push(post);
        });
        return currentArray;
    }

    function writeFilter() {
        let filter=myDOM.getFilter();
        let toWrite={};
        if (filter.author && filter.author!==null) {
            toWrite.author = filter.author;
        }
        if (filter.date && filter.date!==null) {
            toWrite.date = filter.date;
        }
        if (filter.hashtags && filter.hashtags!==null) {
            toWrite.hashtags=JSON.stringify(Array.from(filter.hashtags));
        }
        localStorage.setItem("filter", JSON.stringify(toWrite));
    }

    function getFilter() {
        let read=JSON.parse(localStorage.getItem("filter"));
        if (read.hashtags) {
            read.hashtags=new Set(JSON.parse(read.hashtags));
        }
        return read;

    }

    return {
        writeUser: writeUser,
        getUser: getUser,
        writeCurrentPosts: writeCurrentPosts,
        getCurrentPosts: getCurrentPosts,
        writeAllPosts: writeAllPosts,
        getAllPosts: getAllPosts,
        writeFilter: writeFilter,
        getFilter: getFilter
    }
})();