"use strict";

const onRequest = (function () {

    const fs = require('fs');
    const data = JSON.parse(fs.readFileSync('server/data/data.json'));
    data.posts.forEach(function (post) {
        post.createdAt = new Date(post.createdAt);
        post.hashtags = new Set(post.hashtags);
        post.likes = new Set(post.likes);
    });
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

    function addingPostFromJSON(post) {
        //let post = JSON.parse(stringPost);
        post.createdAt = new Date(post.createdAt);
        post.hashtags = new Set(post.hashtags);
        return post;
    }

    function postsToJSON() {
        let object = {};
        object.posts = [];
        data.posts.forEach(function (post) {
            object.posts.push(postToJSON(post));
        });
        object.lastID = data.lastID;
        return object;
    }

    function writeData() {
        /*fs.truncate('server/data/data.json', 0, (err) => {
            if (err) throw err;
        });*/
        fs.writeFile('server/data/data.json', JSON.stringify(postsToJSON()), (err) => {
            if (err) throw err;
        });
        /*fs.close(0, (err) => {
            if (err) throw err;
        });*/
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
        return getJSONPostByID(id);
    }

    function getJSONPostByID(id) {
        let result = null;
        for (let i = 0; i < data.posts.length; i++) {
            if (data.posts[i].id === id) {
                result = postToJSON(data.posts[i]);
                break;
            }
        }
        return result;
    }

    function getPostByID(id) {
        let result = null;
        for (let i = 0; i < data.posts.length; i++) {
            if (data.posts[i].id === id) {
                result = data.posts[i];
                break;
            }
        }
        return result;
    }

    function addPost(stringPost) {
        let post = addingPostFromJSON(stringPost);
        if (validateAddingPost(post)) {
            post.id = data.lastID;
            data.lastID++;
            post.likes = new Set();
            data.posts.push(post);
            writeData();
            return postToJSON(post);
        } else {
            return null;
        }
    }

    function validateLike(object) {
        let counter = 0;
        for (let key in object) {
            counter++;
        }
        return counter === 2
            && typeof object.id === "number"
            && typeof object.author === "string";
    }

    function addLike(id, author) {
        let post = getPostByID(parseInt(id));
        if (post !== null) {
            if (post.likes.has(author.author)) {
                post.likes.delete(author.author);
                writeData();
                return false;
            } else {
                post.likes.add(author.author);
                writeData();
                return true;
            }
        } else {
            return null;
        }
    }

    function removePostByID(id) {
        let toDelete = null;
        for (let i = 0; i < data.posts.length; i++) {
            if (data.posts[i].id === id) {
                toDelete = i;
                break;
            }
        }
        if (toDelete !== null) {
            data.posts.splice(toDelete, 1);
            writeData();
            return true;
        } else {
            return false;
        }
    }

    function removePost(stringID) {
        let id = parseInt(stringID);
        return removePostByID(id);
    }

    function validateEditPost(post) {
        let counter = 0;
        for (let key in post) {
            counter++;
        }
        return counter <= 3; /*&& (typeof post.description === "string"
            || post.hashtags instanceof Set
            || typeof post.photoLink === 'string');*/
    }

    function editPost(id, toEdit) {
        if (toEdit.hashtags instanceof Array) {
            toEdit.hashtags = new Set(toEdit.hashtags);
        }
        if (validateEditPost(toEdit)) {
            let post = getPostByID(parseInt(id));
            if (post!=null) {
                if (toEdit.description != null) {
                    post.description = toEdit.description;
                }
                if (toEdit.hashtags != null) {
                    post.hashtags = toEdit.hashtags;
                }
                if (toEdit.photoLink != null) {
                    post.photoLink = toEdit.photoLink;
                }
                writeData();
                return post;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    return {
        getPost: getPost,
        addLike: addLike,
        addPost: addPost,
        removePost: removePost,
        editPost: editPost
    }
})();

module.exports = onRequest;

/*console.log("getPost, valid input: "+onRequest.getPost(JSON.stringify(5)));
console.log("getPost, invalid input: "+onRequest.getPost(JSON.stringify(50)));
console.log("addLike, valid input: "+onRequest.addLike(JSON.stringify({id: 6, author: "ypldan"})));
console.log("addLike, valid input: "+onRequest.addLike(JSON.stringify({})));
console.log("addPost, valid input: "+onRequest.addPost(JSON.stringify({
    author: "ypldan",
    description: "it's added in conole post",
    photoLink: "https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/6c/31/82/6c3182cd-f718-d550-181f-051f4148a2e4/mzl.qmwzcqcf.png/1200x630bb.jpg",
    hashtags: ["hey", "new_image"],
    createdAt: "2018-04-15T10:05:02"
})));
console.log("addPost, invalid input: "+onRequest.addPost(JSON.stringify({
    author: "ypldan",
    description: "it's added in conole post",
})));
console.log("removePost, valid input: "+onRequest.removePost(JSON.stringify(20)));
console.log("removePost, invalid input: "+onRequest.removePost(JSON.stringify(50)));*/
