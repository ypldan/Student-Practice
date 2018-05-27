/* eslint-disable no-undef */

loadDOM = function () {
  myDOM.addFormsAndFilterListeners();
  listeners.getAndSetUser();
  listeners.getAndSetAuthorsSet();
  if (localStorage.getItem("firstLoad") !== undefined && localStorage.getItem("firstLoad") !== "null") {
    myDOM.setFilterFromLocalStorage(myLocalStorage.getFilter());
    listeners.loadPosts();
    myDOM.setUserConfiguration();
  } else {
    listeners.firstLoad();
    myDOM.setUserConfiguration();
    localStorage.setItem("firstLoad", "loaded");
  }
};
document.addEventListener("DOMContentLoaded", loadDOM);
