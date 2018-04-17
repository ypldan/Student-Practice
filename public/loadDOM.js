loadDOM = function () {
    myDOM.addFormsAndFilterListeners();
    myDOM.loadAuthors();
    if (localStorage.getItem("firstLoad")!==undefined && localStorage.getItem("firstLoad")!=="null") {
        MyPortal.setAllPosts(myLocalStorage.getAllPosts());
        myDOM.setUser(myLocalStorage.getUser());
        myDOM.setAndShowCurrentPosts(myLocalStorage.getCurrentPosts());
        myDOM.setUserConfiguration();
        myDOM.setFilterFromLocalStorage(myLocalStorage.getFilter());
    } else {
        listeners.firstLoad();
        myDOM.setUserConfiguration();
        localStorage.setItem("firstLoad", "loaded");
    }
};
document.addEventListener("DOMContentLoaded", loadDOM);
