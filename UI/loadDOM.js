myDOM.setUserConfiguration();
myDOM.loadAuthors();
myDOM.loadPosts(0,20);
myDOM.createPost({description: 'My first new Post!!!',
    hashtags: ['#hey', '#physics-cool'],
    photoLink: 'https://static.appvn.com/a/uploads/thumbnails/112015/mr-square_icon.png'});
myDOM.editPhotoPost('19', {description: 'It has been edited!!!'});