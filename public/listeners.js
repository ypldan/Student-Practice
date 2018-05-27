/* eslint-disable no-undef,prefer-promise-reject-errors,prefer-destructuring */
// eslint-disable-next-line no-unused-vars
const listeners = (function () {
  const defaultDescription = "Describe your photo!";
  const defaultHashtags = "Add some hashtags!";
  const defaultAddImage = "images/dragzone.png";

  const constStrings = {
    likeAdded: "added",
    likeTaken: "taken",
  };

  let currentID = null;

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
    result.author = post.author;
    result.description = post.description;
    result.photoLink = post.photoLink;
    result.createdAt = dateTimeToString(post.createdAt);
    result.hashtags = Array.from(post.hashtags);
    return result;
  }

  function editPostToJSON(post) {
    const result = {};
    result.description = post.description;
    result.photoLink = post.photoLink;
    result.hashtags = Array.from(post.hashtags);
    return result;
  }

  function validateHashtagsString(string) {
    const template = /^(#\w+ )*(#\w+)?$/;
    return template.test(string);
  }

  function getHashtagsSet(hashtags) {
    const hashtagsSet = new Set();
    const pattern = /#\w+/g;
    let temp;
    do {
      temp = pattern.exec(hashtags);
      if (temp) {
        hashtagsSet.add(temp[0]);
      }
    } while (temp);
    return hashtagsSet;
  }

  function validateAddInput(img, description, hashtags) {
    return (hashtags === "" || validateHashtagsString(hashtags))
      && img.src !== defaultAddImage
      && description !== "";
  }

  function validateEditInput(description, hashtags) {
    return (hashtags === "" || validateHashtagsString(hashtags))
      && description !== "";
  }

  function clickOnAreaAdd(event) {
    if (event.srcElement.id === "add-photo-block") {
      const img = document.getElementById("drag-image");
      if (img.src !== defaultAddImage) {
        img.src = defaultAddImage;
        const input = document.getElementById("drag-image");
        input.value = "";
      }
      const wrong = document.getElementById("add-wrong");
      wrong.style.display = "none";
      myDOM.hideAddField();
    }
  }

  function clickOnAreaLogIn(event) {
    if (event.srcElement.id === "log-in-block") {
      myDOM.hideLogInField();
      const wrong = document.getElementById("log-in-wrong");
      wrong.style.display = "none";
    }
  }

  function filterToJSON(filter) {
    const result = {};
    if (filter.author != null) {
      result.author = filter.author;
    }
    if (filter.hashtags != null) {
      result.hashtags = Array.from(filter.hashtags);
    }
    if (filter.date != null) {
      result.date = filter.date;
    }
    return result;
  }

  function postFromJSON(post) {
    post.createdAt = new Date(post.createdAt);
    post.likes = new Set(post.likes);
    post.hashtags = new Set(post.hashtags);
    return post;
  }

  function postsArrayFromJSON(posts) {
    for (let i = 0; i < posts.length; i++) {
      posts[i] = postFromJSON(posts[i]);
    }
    return posts;
  }

  function firstLoad() {
    return new Promise((resolve, reject) => {
      const openMore = new XMLHttpRequest();
      openMore.open("POST", "/getPosts?skip=0&top=10", true);
      openMore.setRequestHeader("Content-type", "application/json");
      openMore.addEventListener("readystatechange", () => {
        if (openMore.readyState !== 4) return;
        if (openMore.status !== 200) {
          reject(`${openMore.status}: ${openMore.statusText}`);
        } else {
          try {
            const array = postsArrayFromJSON(JSON.parse(openMore.response));
            myDOM.loadPosts(array);
            resolve(openMore.responseText);
          } catch (exc) {
            alert(exc);
          }
        }
      });
      openMore.send();
    });
  }

  function clickOnOpenMore() {
    return new Promise((resolve, reject) => {
      const openMore = new XMLHttpRequest();
      openMore.open("POST", `/getPosts?skip=${myDOM.getNumberPostsLoaded()}&top=10`, true);
      openMore.setRequestHeader("Content-type", "application/json");
      const filter = JSON.stringify(filterToJSON(myDOM.getFilter()));
      openMore.addEventListener("readystatechange", () => {
        if (openMore.readyState !== 4) return;
        if (openMore.status !== 200) {
          reject(`${openMore.status}: ${openMore.statusText}`);
        } else {
          try {
            const array = postsArrayFromJSON(JSON.parse(openMore.response));
            myDOM.loadPosts(array);
            resolve(openMore.responseText);
          } catch (exc) {
            alert(exc);
          }
        }
      });
      openMore.send(filter);
    });
  }

  function clickOnDeletePost(event) {
    return new Promise((resolve, reject) => {
      const target = event.srcElement;
      const id = target.parentElement.parentElement.parentElement.id;
      const removePost = new XMLHttpRequest();
      removePost.open("DELETE", `/removePost?id=${myDOM.parsePostId(id)}`, true);
      removePost.addEventListener("readystatechange", () => {
        if (removePost.readyState !== 4) return;
        if (removePost.status !== 200) {
          reject(`${removePost.status}: ${removePost.statusText}`);
        } else {
          myDOM.removePost(id);
          resolve(removePost.responseText);
        }
      });
      removePost.send();
    });
  }

  function clickOnLike(event) {
    return new Promise((resolve, reject) => {
      const target = event.srcElement;
      const parent = target.parentElement.parentElement;
      const addLike = new XMLHttpRequest();
      addLike.open("PUT", `/addLike?id=${myDOM.parsePostId(parent.id)}`, true);
      addLike.setRequestHeader("Content-type", "application/json");
      const toSend = {};
      toSend.author = myDOM.getUser();
      addLike.addEventListener("readystatechange", () => {
        if (addLike.readyState !== 4) return;
        if (addLike.status !== 200) {
          reject(`${addLike.status}: ${addLike.statusText}`);
        } else {
          if (addLike.response === constStrings.likeAdded) {
            target.className = "fa fa-heart";
          } else {
            target.className = "fa fa-heart-o";
          }
          resolve(addLike.responseText);
        }
      });
      addLike.send(JSON.stringify(toSend));
    });
  }

  function clickOnAreaEdit(event) {
    if (event.srcElement.id === "edit-block") {
      myDOM.hideEditField();
      const wrong = document.getElementById("edit-wrong");
      wrong.style.display = "none";
      currentID = null;
    }
  }

  function clickOnOpenAdd() {
    const description = document.querySelector("#add-description");
    description.value = defaultDescription;
    const hashtags = document.querySelector("#add-hashtags");
    hashtags.value = defaultHashtags;
    myDOM.createAddField();
  }

  function clickOnOpenEdit(event) {
    const target = event.srcElement;
    const parentID = target.parentElement.parentElement.parentElement.id;
    currentID = parentID;
    const post = myDOM.getPost(myDOM.parsePostId(parentID));
    const description = document.getElementById("description-edit");
    const hashtags = document.getElementById("hashtags-edit");
    description.value = post.description;
    let string = "";
    post.hashtags.forEach((hashtag) => {
      string += `${hashtag} `;
    });
    hashtags.value = string;
    const img = document.getElementById("image-edit");
    img.src = post.photoLink;
    myDOM.createEditField();
  }

  function focusOnAddDescription(event) {
    const target = event.srcElement;
    if (target.value === defaultDescription) {
      target.value = "";
    }
    const wrong = document.getElementById("add-wrong");
    if (wrong.style.display === "block") {
      wrong.style.display = "none";
    }
  }

  function blurOnAddDescription(event) {
    const target = event.srcElement;
    if (target.value === "") {
      target.value = defaultDescription;
    }
  }

  function focusOnAddHashtags(event) {
    const target = event.srcElement;
    if (target.value === defaultHashtags) {
      target.value = "";
    }
    const wrong = document.getElementById("add-wrong");
    if (wrong.style.display === "block") {
      wrong.style.display = "none";
    }
  }

  function blurOnAddHashtags(event) {
    const target = event.srcElement;
    if (target.value === "") {
      target.value = defaultHashtags;
    }
  }

  function clickOnCloseAdd() {
    const img = document.getElementById("drag-image");
    if (img.src !== defaultAddImage) {
      img.src = defaultAddImage;
      const input = document.getElementById("choose-file");
      input.value = "";
    }
    const wrong = document.getElementById("add-wrong");
    wrong.style.display = "none";
    myDOM.hideAddField();
  }

  function clickOnCloseEdit() {
    myDOM.hideEditField();
    const wrong = document.getElementById("edit-wrong");
    wrong.style.display = "none";
    const input = document.getElementById("choose-file-edit");
    input.value = "";
    currentID = null;
  }

  function clickOnCloseLogIn() {
    myDOM.hideLogInField();
    const wrong = document.getElementById("log-in-wrong");
    wrong.style.display = "none";
  }

  function clickOnConfirmAdd() {
    const img = document.getElementById("drag-image");
    const description = document.getElementById("add-description").value;
    const hashtags = document.getElementById("add-hashtags").value;
    if (validateAddInput(img, description, hashtags)) {
      return new Promise((resolve, reject) => {
        const hashtagsSet = getHashtagsSet(hashtags);
        const post = {};
        post.author = myDOM.getUser();
        post.hashtags = hashtagsSet;
        post.description = description;
        post.photoLink = img.src;
        post.createdAt = new Date(Date.now());
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/addPost");
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.addEventListener("readystatechange", () => {
          if (xhr.readyState !== 4) return;
          if (xhr.status !== 200) {
            reject(`${xhr.status}: ${xhr.statusText}`);
          } else {
            const authors = document.getElementById("filter-author");
            authors.value = "-1";
            clickOnCloseAdd();
            myDOM.clearPosts();
            clickOnOpenMore();
            resolve(xhr.responseText);
          }
        });
        xhr.send(JSON.stringify(postToJSON(post)));
      });
    }
    const wrong = document.getElementById("add-wrong");
    wrong.style.display = "block";
    return null;
  }

  function uploadImage() {
    return new Promise((resolve, reject) => {
      const file = document.getElementById("choose-file").files[0];
      const formData = new FormData();
      formData.append("file", file);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/uploadImage");
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
          reject(`${xhr.status}: ${xhr.statusText}`);
        } else {
          const img = document.getElementById("drag-image");
          img.src = xhr.responseText;
          resolve(xhr.responseText);
        }
      });
      xhr.send(formData);
    });
  }

  function uploadImageEdit() {
    return new Promise((resolve, reject) => {
      const file = document.getElementById("choose-file-edit").files[0];
      const formData = new FormData();
      formData.append("file", file);
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/uploadImage");
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
          reject(`${xhr.status}: ${xhr.statusText}`);
        } else {
          const img = document.getElementById("image-edit");
          img.src = xhr.responseText;
          resolve(xhr.responseText);
        }
      });
      xhr.send(formData);
    });
  }

  function changeOnInputImage() {
    uploadImage();
  }

  function changeOnEditImage() {
    uploadImageEdit();
  }

  function clickOnConfirmEdit() {
    const description = document.getElementById("description-edit").value;
    const hashtags = document.getElementById("hashtags-edit").value;
    if (validateEditInput(description, hashtags) && currentID !== null) {
      return new Promise((resolve, reject) => {
        const hashtagsSet = new Set();
        const pattern = /#\w+/g;
        let temp;
        do {
          temp = pattern.exec(hashtags);
          if (temp) {
            hashtagsSet.add(temp[0]);
          }
        } while (temp);
        let post = {};
        post.photoLink = document.getElementById("image-edit").src;
        post.hashtags = hashtagsSet;
        post.description = description;
        const xhr = new XMLHttpRequest();
        const id = myDOM.parsePostId(currentID);
        xhr.open("PUT", `/editPost?id=${id}`);
        xhr.setRequestHeader("Content-type", "application/json");
        xhr.addEventListener("readystatechange", () => {
          if (xhr.readyState !== 4) return;
          if (xhr.status !== 200) {
            reject(`${xhr.status}: ${xhr.statusText}`);
          } else {
            post = JSON.parse(xhr.response);
            myDOM.editPost(postFromJSON(post));
            clickOnCloseEdit();
            resolve(xhr.responseText);
          }
        });
        xhr.send(JSON.stringify(editPostToJSON(post)));
      });
    }
    const wrong = document.getElementById("edit-wrong");
    wrong.style.display = "block";
    return null;
  }

  function clickOnConfirmLogIn() {
    const username = document.getElementById("log-in-input").value;
    const password = document.getElementById("password-input").value;
    const user = {
      username,
      password,
    };
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/login");
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
          const wrong = document.getElementById("log-in-wrong");
          wrong.style.display = "block";
          reject(`${xhr.status}: ${xhr.statusText}`);
        } else {
          myDOM.setUser(xhr.responseText);
          myDOM.setUserConfiguration();
          clickOnCloseLogIn();
          resolve(xhr.responseText);
        }
      });
      xhr.send(JSON.stringify(user));
    });
    return null;
  }

  function changedFilterAuthors(event) {
    const target = event.srcElement;
    if (target.value !== "-1") {
      myDOM.setFilterAuthor(target.value);
      myDOM.clearPosts();
    } else {
      myDOM.setFilterAuthor(null);
      myDOM.clearPosts();
    }
    return clickOnOpenMore();
  }

  function changedFilterDate(event) {
    const target = event.srcElement;
    if (target.value != null && target.value !== "") {
      myDOM.setFilterDate(target.value);
      myDOM.clearPosts();
    } else {
      myDOM.setFilterDate(null);
      myDOM.clearPosts();
    }
    return clickOnOpenMore();
  }

  function changedFilterHashtags(event) {
    const target = event.srcElement;
    if (target.value != null && target.value !== "" && validateHashtagsString(target.value)) {
      const hashtagsSet = getHashtagsSet(target.value);
      myDOM.setFilterHashtags(hashtagsSet);
      myDOM.clearPosts();
    } else {
      myDOM.setFilterHashtags(null);
      myDOM.clearPosts();
    }
    return clickOnOpenMore();
  }

  function setDefaultDateFilter() {
    const target = document.getElementById("filter-date");
    target.value = "";
  }

  function setDefaultHashtagsFilter() {
    const target = document.getElementById("filter-hashtags");
    target.value = "";
  }

  function setDefaultAuthorFilter() {
    const target = document.getElementById("filter-author");
    target.value = "-1";
  }

  function setDefaultFilter() {
    setDefaultAuthorFilter();
    setDefaultDateFilter();
    setDefaultHashtagsFilter();
  }

  function clickOnLogOut() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "/logout");
      xhr.addEventListener("readystatechange", () => {
        if (xhr.readyState !== 4) return;
        if (xhr.status !== 200) {
          reject(`${xhr.status}: ${xhr.statusText}`);
        } else {
          setDefaultFilter();
          myDOM.clearFilter();
          myDOM.setUser();
          myDOM.setUserConfiguration();
          myDOM.clearPosts();
          clickOnOpenMore();
          resolve(xhr.responseText);
        }
      });
      xhr.send();
    });
  }

  return {

    addOpenAdd() {
      const close = document.querySelector("#menu-add-photo");
      close.addEventListener("click", clickOnOpenAdd);
    },

    addCloseAdd() {
      const close = document.querySelector("#close-add");
      close.addEventListener("click", clickOnCloseAdd);
      const area = document.querySelector("#add-photo-block");
      area.addEventListener("click", clickOnAreaAdd);
    },

    addOpenLogIn() {
      const close = document.querySelector("#menu-log-in");
      close.addEventListener("click", myDOM.createLogInField);
    },

    addCloseLogIn() {
      const close = document.querySelector("#close-log-in");
      close.addEventListener("click", clickOnCloseEdit);
      const area = document.querySelector("#log-in-block");
      area.addEventListener("click", clickOnAreaLogIn);
    },

    addOpenEdit(node) {
      node.addEventListener("click", clickOnOpenEdit);
    },

    addCloseEdit() {
      const close = document.querySelector("#close-edit");
      close.addEventListener("click", clickOnCloseEdit);
      const area = document.querySelector("#edit-block");
      area.addEventListener("click", clickOnAreaEdit);
    },

    addLogOut() {
      const logout = document.querySelector("#menu-log-out");
      logout.addEventListener("click", clickOnLogOut);
    },

    addDeletePost(node) {
      node.addEventListener("click", clickOnDeletePost);
    },

    addLikeClick(node) {
      node.addEventListener("click", clickOnLike);
    },

    addFormsListeners() {
      const addDescription = document.querySelector("#add-description");
      addDescription.addEventListener("focus", focusOnAddDescription);
      addDescription.addEventListener("blur", blurOnAddDescription);
      const addHashtags = document.querySelector("#add-hashtags");
      addHashtags.addEventListener("focus", focusOnAddHashtags);
      addHashtags.addEventListener("blur", blurOnAddHashtags);
      const imageInput = document.getElementById("choose-file");
      imageInput.addEventListener("change", changeOnInputImage);
      const imageEdit = document.getElementById("choose-file-edit");
      imageEdit.addEventListener("change", changeOnEditImage);
      const confirmAdd = document.getElementById("send-button");
      confirmAdd.addEventListener("click", clickOnConfirmAdd);
      const confirmEdit = document.getElementById("send-button-edit");
      confirmEdit.addEventListener("click", clickOnConfirmEdit);
      const confirm = document.getElementById("log-in-button");
      confirm.addEventListener("click", clickOnConfirmLogIn);
      const addMore = document.getElementById("open-more");
      addMore.addEventListener("click", clickOnOpenMore);
      const closeLogIn = document.getElementById("close-log-in");
      closeLogIn.addEventListener("click", clickOnCloseLogIn);
    },

    addFilterListeners() {
      const author = document.getElementById("filter-author");
      author.addEventListener("change", changedFilterAuthors);
      const date = document.getElementById("filter-date");
      date.addEventListener("change", changedFilterDate);
      const hashtags = document.getElementById("filter-hashtags");
      hashtags.addEventListener("change", changedFilterHashtags);
    },

    firstLoad,

    loadPosts: clickOnOpenMore,

    getAndSetAuthorsSet() {
      return new Promise((resolve, reject) => {
        xhr = new XMLHttpRequest();
        xhr.open("GET", "/getAuthors");
        xhr.addEventListener("readystatechange", () => {
          if (xhr.readyState !== 4) return;
          if (xhr.status !== 200) {
            reject(`${xhr.status}: ${xhr.statusText}`);
          } else {
            const set = JSON.parse(xhr.response);
            myDOM.setUsersList(set);
            resolve(xhr.responseText);
          }
        });
        xhr.send();
      });
    },

    getAndSetUser() {
      return new Promise((resolve, reject) => {
        xhr = new XMLHttpRequest();
        xhr.open("GET", "/getUser");
        xhr.addEventListener("readystatechange", () => {
          if (xhr.readyState !== 4) return;
          if (xhr.status !== 200) {
            reject(`${xhr.status}: ${xhr.statusText}`);
          } else {
            myDOM.setUser(xhr.responseText);
            resolve(xhr.responseText);
          }
        });
        xhr.send();
      });
    },
  };
}());
