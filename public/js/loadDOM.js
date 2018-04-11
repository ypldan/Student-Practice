loadDOM = function () {
    myDOM.addFormsAndFilterListeners();
    myDOM.loadAuthors();
    if (localStorage.getItem("firstLoad")!==undefined && localStorage.getItem("firstLoad")!=="null") {
        myDOM.setUser(myLocalStorage.getUser());
        myDOM.setUserConfiguration();
        myDOM.setAndShowCurrentPosts(myLocalStorage.getCurrentPosts());
        myDOM.setFilterFromLocalStorage(myLocalStorage.getFilter());
        MyPortal.setAllPosts(myLocalStorage.getAllPosts());
    } else {
        myDOM.firstPostsLoad();
        myDOM.setUserConfiguration();
        localStorage.setItem("firstLoad", "loaded");
    }
};
document.addEventListener("DOMContentLoaded", loadDOM);
