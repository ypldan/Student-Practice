loadDOM = function () {
    myDOM.addFormsAndFilterListeners();
    myDOM.loadAuthors();
    myDOM.firstPostsLoad();
    myDOM.setUserConfiguration();
    myDOM.createPost({
        description: 'My first new Post!!!',
        hashtags: new Set(['#hey', '#physics_cool']),
        photoLink: 'https://static.appvn.com/a/uploads/thumbnails/112015/mr-square_icon.png'
    });
    myDOM.editPhotoPost(19, {description: 'It has been edited!!!'});
};
document.addEventListener("DOMContentLoaded", loadDOM);
