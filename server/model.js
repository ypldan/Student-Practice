/* eslint-disable guard-for-in */

const fs = require("fs");

const onRequest = (function () {
  const data = JSON.parse(fs.readFileSync("server/data/data.json"));
  const removedPosts = JSON.parse(fs.readFileSync("server/data/removed.json"));
  data.posts.forEach((post) => {
    post.createdAt = new Date(post.createdAt);
    post.hashtags = new Set(post.hashtags);
    post.likes = new Set(post.likes);
  });
  const numberAddingPostFields = 5;

  function dateTimeToString(date) {
    let result = "";
    result += `${date.getFullYear()}-`;
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    result += `${month}-`;
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    result += `${day}T`;
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    result += `${hours}:`;
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    result += `${minutes}:`;
    let seconds = date.getSeconds();
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    result += seconds;
    return result;
  }

  function postToJSON(post) {
    const result = {};
    result.id = post.id;
    result.author = post.author;
    result.description = post.description;
    result.photoLink = post.photoLink;
    result.createdAt = dateTimeToString(post.createdAt);
    result.likes = Array.from(post.likes);
    result.hashtags = Array.from(post.hashtags);
    return result;
  }

  function postsToJSON(posts) {
    const result = [];
    posts.forEach((post) => {
      result.push(postToJSON(post));
    });
    return result;
  }

  function addingPostFromJSON(post) {
    // let post = JSON.parse(stringPost);
    post.createdAt = new Date(post.createdAt);
    post.hashtags = new Set(post.hashtags);
    return post;
  }

  function dataToJSON() {
    const object = {};
    object.posts = postsToJSON(data.posts);
    object.lastID = data.lastID;
    return object;
  }

  function writeData() {
    fs.writeFile("server/data/data.json", JSON.stringify(dataToJSON()), (err) => {
      if (err) throw err;
    });
  }

  function writeRemoved() {
    fs.writeFile("server/data/removed.json", JSON.stringify(removedPosts), (err) => {
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
    // eslint-disable-next-line no-unused-vars,no-restricted-syntax
    for (const key in post) {
      counter += 1;
    }
    return counter === numberAddingPostFields
            && validateDescription(post)
            && validateAuthor(post)
            && validateCreatedAt(post)
            && validateHashTags(post)
            && validatePhotoLink(post);
  }

  function getJSONPostByID(id) {
    let result = null;
    for (let i = 0; i < data.posts.length; i += 1) {
      if (data.posts[i].id === id) {
        result = postToJSON(data.posts[i]);
        break;
      }
    }
    return result;
  }

  function getPost(stringID) {
    const id = parseInt(stringID, 10);
    return getJSONPostByID(id);
  }


  function getPostByID(id) {
    let result = null;
    for (let i = 0; i < data.posts.length; i += 1) {
      if (data.posts[i].id === id) {
        result = data.posts[i];
        break;
      }
    }
    return result;
  }

  function addPost(stringPost) {
    const post = addingPostFromJSON(stringPost);
    if (validateAddingPost(post)) {
      post.id = data.lastID;
      data.lastID += 1;
      post.likes = new Set();
      data.posts.push(post);
      writeData();
      return postToJSON(post);
    }
    return null;
  }

  function validateLike(object) {
    let counter = 0;
    // eslint-disable-next-line no-restricted-syntax,no-unused-vars
    for (const key in object) {
      counter += 1;
    }
    return counter === 1
            && typeof object.author === "string";
  }

  function addLike(id, author) {
    if (validateLike(author)) {
      const post = getPostByID(parseInt(id, 10));
      if (post !== null) {
        if (post.likes.has(author.author)) {
          post.likes.delete(author.author);
          writeData();
          return false;
        }
        post.likes.add(author.author);
        writeData();
        return true;
      }
      return null;
    }
    return null;
  }

  function removePostByID(id) {
    let toDelete = null;
    for (let i = 0; i < data.posts.length; i += 1) {
      if (data.posts[i].id === id) {
        toDelete = i;
        removedPosts.push(postToJSON(data.posts[i]));
        writeRemoved();
        break;
      }
    }
    if (toDelete !== null) {
      data.posts.splice(toDelete, 1);
      writeData();
      return true;
    }
    return false;
  }

  function removePost(stringID) {
    const id = parseInt(stringID, 10);
    return removePostByID(id);
  }

  function validateEditPost(post) {
    let counter = 0;
    // eslint-disable-next-line no-restricted-syntax,no-unused-vars
    for (const key in post) {
      counter += 1;
    }
    return counter <= 3; /* && (typeof post.description === "string"
            || post.hashtags instanceof Set
            || typeof post.photoLink === 'string'); */
  }

  function editPost(id, toEdit) {
    if (toEdit.hashtags instanceof Array) {
      toEdit.hashtags = new Set(toEdit.hashtags);
    }
    if (validateEditPost(toEdit)) {
      const post = getPostByID(parseInt(id, 10));
      if (post != null) {
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
      }
      return null;
    }
    return null;
  }

  function dateToString(date) {
    let result = "";
    result += date.getFullYear();
    result += "-";
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    result += month;
    result += "-";
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    result += day;
    return result;
  }

  function getPosts(skip, top, filter) {
    if (skip) {
      skip = parseInt(skip, 10);
    } else {
      skip = 0;
    }
    if (top) {
      top = parseInt(top, 10);
    } else {
      top = 10;
    }
    let resultArray = [];
    data.posts.forEach(x => resultArray.push(x));
    resultArray.sort((x, y) => y.createdAt.getTime() - x.createdAt.getTime());
    if (filter) {
      if (filter.date) {
        const newArray = [];
        for (let i = 0; i < resultArray.length; i += 1) {
          if (filter.date === dateToString(resultArray[i].createdAt)) {
            newArray.push(resultArray[i]);
          }
        }
        resultArray = newArray;
      }
      if (filter.author) {
        const newArray = [];
        for (let i = 0; i < resultArray.length; i += 1) {
          if (filter.author === resultArray[i].author) {
            newArray.push(resultArray[i]);
          }
        }
        resultArray = newArray;
      }
      if (filter.hashtags) {
        const newArray = [];
        for (let i = 0; i < resultArray.length; i += 1) {
          let hasAll = true;
          // eslint-disable-next-line no-loop-func
          filter.hashtags.forEach((x) => {
            if (!resultArray[i].hashtags.has(x)) {
              hasAll = false;
            }
          });
          if (hasAll) {
            newArray.push(resultArray[i]);
          }
        }
        resultArray = newArray;
      }
    }
    return postsToJSON(resultArray.slice(skip, skip + top));
  }

  return {
    getPost,
    addLike,
    addPost,
    removePost,
    editPost,
    getPosts,
  };
}());

module.exports = onRequest;
