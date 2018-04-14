"use strict";
const fs = require('fs');
const posts = JSON.parse(fs.readFileSync('data/data.json'));
posts.forEach(function (post) {
    post.createdAt = new Date(post.createdAt);
    post.hashtags = new Set(post.hashtags);
    post.likes = new Set(post.likes);
});

const onRequest = (function () {

    const numberAddingPostFields = 5;

    function dateToString(date) {
        let result = '';
        result += date.getFullYear() + "-";
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = '0' + month;
        }
        result += month + "-";
        let day = date.getDate();
        if (day < 10) {
            day = '0' + day;
        }
        result += day + "T";
        let hours = date.getHours();
        if (hours < 10) {
            hours = '0' + hours;
        }
        result += hours + ":";
        let minutes = date.getMinutes();
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        result += minutes + ":";
        let seconds = date.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        result += seconds;
        return result;
    }

    function postToJSON(post) {
        let result = {};
        result.id = post.id;
        result.author = post.author;
        result.description = post.description;
        result.photoLink = post.photoLink;
        result.createdAt = dateToString(post.createdAt);
        result.likes = Array.from(post.likes);
        result.hashtags = Array.from(post.hashtags);
        return result;
    }

    function addingPostFromJSON(stringPost) {
        let post = JSON.parse(stringPost);
        post.createdAt = new Date(post.createdAt);
        post.hashtags = new Set(post.hashtags);
        return post;
    }

    function postsToJSON() {
        let array = [];
        posts.forEach(function (post) {
            array.push(postToJSON(post));
        });
        return array;
    }

    function writeData() {
        fs.writeFile('data/data.json', JSON.stringify(postsToJSON()), (err) => {
            if (err) throw err;
        });
    }

    function validateAuthor(post) {
        return typeof post.author === "string";
    }

    function validateDescription(post) {
        return typeof post.description === "string";
    }

    function validateHashTags(post) {
        return post.hashtags instanceof Set;
    }

    function validateCreatedAt(post) {
        return post.createdAt instanceof Date;
    }

    function validatePhotoLink(post) {
        return typeof post.photoLink === "string";
    }

    function validateAddingPost(post) {
        let counter = 0;
        for (let key in post) {
            counter++;
        }
        return counter === numberAddingPostFields
            && validateDescription(post)
            && validateAuthor(post)
            && validateCreatedAt(post)
            && validateHashTags(post)
            && validatePhotoLink(post);

    }

    function getPost(stringID) {
        let id = parseInt(stringID);
        return getPostByID(id);
    }

    function getPostByID(id) {
        let result = null;
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id === id) {
                result = posts[i];
                break;
            }
        }
        return result;
    }

    function addPost(stringPost) {
        let post = addingPostFromJSON(stringPost);
        if (validateAddingPost(post)) {
            post.id = posts.length;
            post.likes = new Set();
            posts.push(post);
            writeData();
        } else {
            return false;
        }
    }

    function validateLikeMessage(object) {
        let counter = 0;
        for (let key in object) {
            counter++;
        }
        return counter === 2
            && typeof object.id === "number"
            && typeof object.author === "string";
    }

    function addLike(stringIDAndAuthor) {
        let object = JSON.parse(stringIDAndAuthor);
        if (validateLikeMessage(object)) {
            let post = getPostByID(object.id);
            if (post !== null) {
                if (post.likes.has(object.author)) {
                    post.likes.delete(object.author);
                    writeData();
                    return false;
                } else {
                    post.likes.add(object.author);
                    writeData();
                    return true;
                }
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    function removePostByID(id) {
        let toDelete=null;
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id===id) {
                toDelete=i;
                break;
            }
        }
        if (toDelete!==null) {
            posts.splice(toDelete,1);
            writeData();
            return true;
        } else {
            return false;
        }
    }

    function removePost(stringID) {
        let id=parseInt(stringID);
        return removePostByID(id);
    }

    return {
        writeData: writeData,
        getPost: getPost,
        addLike: addLike,
        addPost: addPost,
        removePost: removePost
    }
})();

onRequest.writeData();