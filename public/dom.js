/* eslint-disable no-undef */

const myDOM = (function () {
  let user = null;
  let currentPosts = [];
  let currentFilter = {};
  const users = new Set(["Albert Einstein",
    "Alexey Navalny",
    "Mickie Mouse",
    "ypldan",
    "Hleb Salaujou",
    "Donald Trump",
    "unknown author",
    "ypl"]);

  function isUserIn() {
    // listeners.getAndSetUser();
    return user !== null && user !== "" && user;
  }

  function createAdd() {
    const addBlock = document.createElement("div");
    addBlock.className = "new-button";
    addBlock.id = "menu-add-photo";
    addBlock.innerHTML = "Add new photo";
    return addBlock;
  }

  function createLogInOrOut(isIn) {
    const logOutBlock = document.createElement("div");
    logOutBlock.className = "new-button";
    if (isIn) {
      logOutBlock.innerHTML = "log out";
      logOutBlock.id = "menu-log-out";
    } else {
      logOutBlock.innerHTML = "log in";
      logOutBlock.id = "menu-log-in";
    }
    return logOutBlock;
  }

  function createUserNickName(username) {
    const userNicknameBlock = document.createElement("div");
    userNicknameBlock.className = "new-button";
    userNicknameBlock.innerHTML = username;
    return userNicknameBlock;
  }

  function createUserHeader() {
    const addBlock = createAdd();
    const logOutBlock = createLogInOrOut(true);
    const userNicknameBlock = createUserNickName(user);
    const rightHeader = document.getElementById("right-header");
    rightHeader.appendChild(addBlock);
    rightHeader.appendChild(logOutBlock);
    rightHeader.appendChild(userNicknameBlock);
  }

  function createNonUserHeader() {
    const logInBlock = createLogInOrOut(false);
    const rightHeader = document.getElementById("right-header");
    rightHeader.appendChild(logInBlock);
  }

  function createImage(post) {
    const image = document.createElement("img");
    image.className = "post-element";
    image.setAttribute("src", post.photoLink);
    return image;
  }

  function createUserArea(post) {
    const userArea = document.createElement("div");
    userArea.className = "user-area";
    const userCircle = document.createElement("div");
    userCircle.className = "fa fa-user-circle";
    userCircle.setAttribute("style", "font-size:32px;");
    const userName = document.createElement("p");
    userName.innerHTML = post.author;
    userArea.appendChild(userCircle);
    userArea.appendChild(userName);
    return userArea;
  }

  function createHashtagsArea(post) {
    const hashtagsArea = document.createElement("div");
    hashtagsArea.className = "hashtags-area";
    hashtagsArea.id = `post${post.id}hashtags`;
    post.hashtags.forEach((hashtag) => {
      const tag = document.createElement("p");
      tag.className = "hashtag";
      tag.innerHTML = hashtag;
      hashtagsArea.appendChild(tag);
    });
    return hashtagsArea;
  }

  function createUserHashtags(post) {
    const userHashtags = document.createElement("div");
    userHashtags.className = "user-hashtags post-element";
    userHashtags.appendChild(createUserArea(post));
    userHashtags.appendChild(createHashtagsArea(post));
    return userHashtags;
  }

  function createLike(post) {
    const like = document.createElement("div");
    if (post.likes.has(user)) {
      like.className = "fa fa-heart";
    } else {
      like.className = "fa fa-heart-o";
    }
    like.style = "font-size:32px;";
    listeners.addLikeClick(like);
    return like;
  }

  function createDescriptionArea(post) {
    const descriptionArea = document.createElement("div");
    descriptionArea.className = "description-area";
    descriptionArea.id = `post${post.id}description`;
    const description = document.createElement("p");
    description.className = "description";
    description.innerHTML = post.description;
    descriptionArea.appendChild(description);
    return descriptionArea;
  }

  function createUserInstruments() {
    const userInstruments = document.createElement("div");
    userInstruments.className = "user-instruments";
    const edit = document.createElement("div");
    edit.className = "fa fa-edit";
    edit.style = "font-size:32px;";
    listeners.addOpenEdit(edit);
    userInstruments.appendChild(edit);
    const close = document.createElement("div");
    close.className = "fa fa-trash delete-post";
    close.style = "font-size:32px;";
    listeners.addDeletePost(close);
    userInstruments.appendChild(close);
    return userInstruments;
  }

  function createUserPanel(post, isIn) {
    const userPanel = document.createElement("div");
    userPanel.className = "user-panel post-element";
    const like = createLike(post);
    const instruments = createUserInstruments(post);
    if (!isIn) {
      like.style.display = "none";
    }
    if (user !== post.author || !isIn) {
      instruments.style.display = "none";
    }
    userPanel.appendChild(like);
    userPanel.appendChild(createDescriptionArea(post));
    userPanel.appendChild(instruments);
    return userPanel;
  }

  function dateTimeToString(date) {
    let result = "";
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    result += hours;
    result += ":";
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    result += minutes;
    result += "<br>";
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    result += day;
    result += ".";
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    result += month;
    result += ".";
    result += date.getFullYear();
    return result;
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

  function createTimeArea(post) {
    const timeArea = document.createElement("div");
    timeArea.className = "time-area post-element";
    timeArea.innerHTML = dateTimeToString(post.createdAt);
    return timeArea;
  }

  function createPhotoPost(post, isIn) {
    const result = document.createElement("figure");
    result.id = `post${post.id}`;
    result.appendChild(createImage(post));
    result.appendChild(createUserHashtags(post));
    result.appendChild(createUserPanel(post, isIn));
    result.appendChild(createTimeArea(post));
    return result;
  }

  function parsePostId(string) {
    const result = string.substring(4);
    return Number.parseInt(result, 10);
  }

  function setUsersList(usersSet) {
    const authors = document.getElementById("filter-author");
    while (authors.firstChild) {
      authors.removeChild(authors.firstChild);
    }
    const defaultOption = new Option("---not chosen---", "-1", true, true);
    authors.appendChild(defaultOption);
    usersSet.sort();
    usersSet.forEach((author) => {
      const option = new Option(author, author);
      authors.appendChild(option);
    });
  }

  function clearHeader() {
    const header = document.getElementById("right-header");
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
    let likes = document.querySelectorAll(".fa-heart-o");
    likes.forEach((like) => {
      const parentID = like.parentElement.parentElement.id;
      const post = myDOM.getPost(myDOM.parsePostId(parentID));
      if (post.likes.has(user)) {
        like.className = "fa fa-heart";
      }
      like.style.display = "block";
    });
    likes = document.querySelectorAll(".fa-heart");
    likes.forEach((like) => {
      const parentID = like.parentElement.parentElement.id;
      const post = myDOM.getPost(myDOM.parsePostId(parentID));
      if (!post.likes.has(user)) {
        like.className = "fa fa-heart-o";
      }
      like.style.display = "block";
    });
  }

  function hideLikes() {
    let likes = document.querySelectorAll(".fa-heart-o");
    likes.forEach((like) => {
      like.style.display = "none";
    });
    likes = document.querySelectorAll(".fa-heart");
    likes.forEach((like) => {
      like.style.display = "none";
    });
  }

  function showInstruments() {
    const instruments = document.querySelectorAll(".user-instruments");
    instruments.forEach((node) => {
      const parentID = node.parentElement.parentElement.id;
      const post = myDOM.getPost(myDOM.parsePostId(parentID));
      if (user === post.author) {
        node.style.display = "flex";
      }
    });
  }

  function hideInstruments() {
    const instruments = document.querySelectorAll(".user-instruments");
    instruments.forEach((node) => {
      node.style.display = "none";
    });
  }

  return {

    setUserConfiguration() {
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

    loadPosts(processingPosts) {
      const postsArray = document.getElementById("posts-array");
      const isIn = isUserIn();
      processingPosts.forEach((post) => {
        postsArray.appendChild(createPhotoPost(post, isIn));
        currentPosts.push(post);
      });
      return true;
    },

    clearPosts() {
      const postsArray = document.getElementById("posts-array");
      while (postsArray.firstChild) {
        postsArray.removeChild(postsArray.firstChild);
      }
      currentPosts = [];
      return true;
    },

    removePost(string) {
      const figure = document.getElementById(string);
      const parent = document.getElementById("posts-array");
      parent.removeChild(figure);
      // myLocalStorage.writeAllPosts();
      // this.clearPosts();
      // this.loadPosts(0,10,currentFilter);
      return true;
    },

    createAddField() {
      const posts = document.getElementById("add-photo-block");
      posts.style.display = "flex";
    },

    hideAddField() {
      const add = document.getElementById("add-photo-block");
      add.style.display = "none";
    },

    createLogInField() {
      const login = document.querySelector("#log-in-block");
      login.style.display = "flex";
      const loginInput = document.querySelector("#log-in-input");
      loginInput.value = "";
      const passwordInput = document.querySelector("#password-input");
      passwordInput.value = "";
    },

    hideLogInField() {
      const login = document.getElementById("log-in-block");
      login.style.display = "none";
    },

    createEditField() {
      const edit = document.querySelector("#edit-block");
      edit.style.display = "flex";
    },

    hideEditField() {
      const edit = document.querySelector("#edit-block");
      edit.style.display = "none";
    },

    isUserIn: isUserIn(),

    getPost(id) {
      for (let i = 0; i < currentPosts.length; i++) {
        if (currentPosts[i].id === id) {
          return currentPosts[i];
        }
      }
      return null;
    },

    getUser() {
      return user;
    },

    setUser(username) {
      if (!username || typeof username !== "string") {
        user = null;
        return false;
      }
      user = username;
      return true;
    },

    setFilterAuthor(author) {
      currentFilter.author = author;
      myLocalStorage.writeFilter();
    },

    setFilterDate(date) {
      currentFilter.date = date;
      myLocalStorage.writeFilter();
    },

    setFilterHashtags(hashtags) {
      currentFilter.hashtags = hashtags;
      myLocalStorage.writeFilter();
    },

    setFilterFromLocalStorage(newFilter) {
      currentFilter = newFilter;
      if (currentFilter.author) {
        const authors = document.getElementById("filter-author");
        authors.value = currentFilter.author;
      }
      if (currentFilter.date) {
        const date = document.getElementById("filter-date");
        date.value = currentFilter.date;
      }
      if (currentFilter.hashtags) {
        const hashtags = document.getElementById("filter-hashtags");
        let string = "";
        currentFilter.hashtags.forEach((tag) => {
          string += `${tag} `;
        });
        hashtags.value = string;
      }
    },

    getFilter() {
      return currentFilter;
    },

    clearFilter() {
      currentFilter.author = null;
      currentFilter.hashtags = null;
      currentFilter.date = null;
      myLocalStorage.writeFilter();
    },

    getNumberPostsLoaded() {
      return currentPosts.length;
    },

    parsePostId(string) {
      return parsePostId(string);
    },

    addFormsAndFilterListeners() {
      listeners.addCloseEdit();
      listeners.addFormsListeners();
      listeners.addFilterListeners();
    },

    getUsers() {
      return users;
    },

    dateToString,

    getCurrentPosts() {
      return currentPosts;
    },

    editPost(edited) {
      const currentID = `post${edited.id}`;
      let tempString = `#${currentID}hashtags`;
      const hej = this.getPost(edited.id);
      hej.description = edited.description;
      hej.hashtags = edited.hashtags;
      hej.photoLink = edited.photoLink;
      const element = document.querySelector(tempString);
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
      edited.hashtags.forEach((hashtag) => {
        const tag = document.createElement("p");
        tag.className = "hashtag";
        tag.innerHTML = hashtag;
        element.appendChild(tag);
      });
      const img = document.querySelector(`#post${edited.id}`).firstChild;
      img.src = edited.photoLink;
      tempString = `#${currentID}description`;
      const descriptionArea = document.querySelector(tempString);
      descriptionArea.firstChild.innerHTML = edited.description;
    },

    setUsersList,
  };
}());
