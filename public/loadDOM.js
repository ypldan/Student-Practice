loadDOM = function () {
    myDOM.addFormsAndFilterListeners();
    myDOM.loadAuthors();
    if (localStorage.getItem("firstLoad")!==undefined && localStorage.getItem("firstLoad")!=="null") {
        myDOM.setFilterFromLocalStorage(myLocalStorage.getFilter());
        myDOM.setUser(myLocalStorage.getUser());
        listeners.loadPosts();
        myDOM.setUserConfiguration();
    } else {
        listeners.firstLoad();
        myDOM.setUserConfiguration();
        localStorage.setItem("firstLoad", "loaded");
    }
};
document.addEventListener("DOMContentLoaded", loadDOM);
