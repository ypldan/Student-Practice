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
        myDOM.firstPostsLoad();
        myDOM.setUserConfiguration();
        myDOM.createPost({
            description: 'My first new Post!!!',
            hashtags: new Set(['#hey', '#physics_cool']),
            photoLink: 'https://static.appvn.com/a/uploads/thumbnails/112015/mr-square_icon.png'
        });
        myDOM.editPhotoPost(19, {description: 'It has been edited!!!'});
        localStorage.setItem("firstLoad", "loaded");
    }
};
document.addEventListener("DOMContentLoaded", loadDOM);
