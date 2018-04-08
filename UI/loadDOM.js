loadDOM = function () {
    myDOM.addFormsListeners();
    myDOM.createFilter();
    myDOM.firstPostsLoad();
    myDOM.setUserConfiguration();
    myDOM.createPost({
        description: 'My first new Post!!!',
        hashtags: ['#hey', '#physics_cool'],
        photoLink: 'https://static.appvn.com/a/uploads/thumbnails/112015/mr-square_icon.png'
    });
    myDOM.editPhotoPost(19, {description: 'It has been edited!!!'});
};
document.addEventListener("DOMContentLoaded", loadDOM);
