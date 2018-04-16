"use strict";

const onRequest = (function () {

    const fs = require('fs');
    const data = JSON.parse(fs.readFileSync('server/data/data.json'));
    data.posts.forEach((post) => {
        post.createdAt = new Date(post.createdAt);
        post.hashtags = new Set(post.hashtags);
        post.likes = new Set(post.likes);
    });
    const numberAddingPostFields = 5;

    function dateTimeToString(date) {
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
        result.createdAt = dateTimeToString(post.createdAt);
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

    function dataToJSON() {
        let object = {};
        object.posts = postsToJSON(data.posts);
        object.lastID = data.lastID;
        return object;
    }

    function postsToJSON(posts) {
        let result=[];
        posts.forEach(post => {
            result.push(postToJSON(post));
        });
        return result;
    }

    function writeData() {
        /*fs.truncate('server/data/data.json', 0, (err) => {
            if (err) throw err;
        });*/
        fs.writeFile('server/data/data.json', JSON.stringify(dataToJSON()), (err) => {
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
        return counter === 1
            && typeof object.author === "string";
    }

    function addLike(id, author) {
        if (validateLike(author)) {
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
                return postToJSON(post);
            } else {
                return null;
            }
        } else {
            return null;
        }
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

    function getPosts(skip, top, filter) {
        if (skip) {
            skip=parseInt(skip);
        } else {
            skip=0;
        }
        if (top) {
            top=parseInt(top);
        } else {
            top=10;
        }
        let resultArray=[];
        data.posts.forEach(x => resultArray.push(x));
        resultArray.sort((x,y) => {
            return y.createdAt.getTime() - x.createdAt.getTime();
        });
        if (filter) {
            if (filter.date) {
                let newArray=[];
                for (let i = 0; i < resultArray.length; i++) {
                    if (filter.date===dateToString(resultArray[i].createdAt)) {
                        newArray.push(resultArray[i]);
                    }
                }
                resultArray=newArray;
            }
            if (filter.author) {
                let newArray=[];
                for (let i = 0; i < resultArray.length; i++) {
                    if (filter.author===resultArray[i].author) {
                        newArray.push(resultArray[i]);
                    }
                }
                resultArray=newArray;
            }
            if (filter.hashtags) {
                let newArray=[];
                for (let i = 0; i < resultArray.length; i++) {
                    let hasAll=true;
                    filter.hashtags.forEach(x => {
                        if (!resultArray[i].hashtags.has(x)) {
                            hasAll=false;
                        }
                    });
                    if (hasAll) {
                        newArray.push(resultArray[i]);
                    }
                }
                resultArray=newArray;
            }
        }
        return postsToJSON(resultArray.slice(skip, skip+top));
    }

    return {
        getPost: getPost,
        addLike: addLike,
        addPost: addPost,
        removePost: removePost,
        editPost: editPost,
        getPosts: getPosts
    }
})();

module.exports = onRequest;