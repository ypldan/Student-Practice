"use strict";
const fs=require('fs');
const posts=JSON.parse(fs.readFileSync('data/data.json'));
posts.forEach(function (post) {
    post.createdAt=new Date(post.createdAt);
    post.hashtags=new Set(post.hashtags);
    post.likes=new Set(post.likes);
});

const onRequest=(function () {

    function postsToJSON() {
        let array=[];
        posts.forEach(function (post) {
            let object={};
            object.id=post.id;
            object.author=post.author;
            object.description=post.description;
            object.photoLink=post.photoLink;
            object.createdAt=JSON.stringify(post.createdAt);
            object.likes=Array.from(post.likes);
            object.hashtags=Array.from(post.hashtags);
            array.push(object);
        });
        return array;
    }

    function writeData() {
        fs.writeFile('data/data.json', JSON.stringify(postsToJSON()), (err) => {
            if (err) throw err;
        });
    }

    function getPost(id) {
        let result=null;
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].id===id) {
                result=posts[i];
                break;
            }
        }
        return result;
    }

    function addPost(post) {

    }

    return {
        writeData: writeData
    }
})();

onRequest.writeData();