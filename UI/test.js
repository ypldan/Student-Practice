console.log("Testing function \'getPhotoPosts(id)\'");
console.log(MyPortal.getPhotoPost('2'));
console.log(MyPortal.getPhotoPost('21'));
console.log(MyPortal.getPhotoPost(2));
console.log(MyPortal.getPhotoPost());
console.log("Testing function \'validate(photoPost)\'");
let rightPost = {
    id: '20',
    description: 'PhotoPost3',
    createdAt: new Date('2018-01-21T01:57:46'),
    author: 'Daniil',
    photoLink: 'images/sample.jpg',
    hashtags: ['#js', '#programming'],
    likes: ['Alexey Navalny', 'Donald Trump', 'Mickie Mouse']
};
console.log(MyPortal.validate(rightPost));
console.log(MyPortal.validate({}));
console.log(MyPortal.validate({
    description: 'PhotoPost3',
    createdAt: new Date('2018-01-21T01:57:46'),
    author: 'Donald Trump',
    photoLink: 'images/sample.jpg',
    hashtags: ['#afternoon', '#evening', '#goodbye', '#hello'],
    likes: ['Alexey Navalny', 'Donald Trump', 'Mickie Mouse']
}));
console.log(MyPortal.validate({
    description: 'PhotoPost3',
    author: 'Donald Trump',
    photoLink: 'images/sample.jpg',
    hashtags: [],
    likes: ['Alexey Navalny', 'Donald Trump', 'Mickie Mouse']
}));
console.log("Testing function \'addPhotoPost(photoPost)\'");
console.log(MyPortal.addPhotoPost(rightPost));
console.log(MyPortal.getPhotoPost('20'));
console.log("Testing function \'removePhotoPost(photoPost)\'");
console.log(MyPortal.getPhotoPost('1'));
console.log(MyPortal.removePhotoPost('1'));
console.log(MyPortal.getPhotoPost('1'));
console.log(MyPortal.removePhotoPost('25'));
console.log("Testing function \'getPhotoPost(skip,top,filter)\'");
console.log(MyPortal.getPhotoPosts('0', '10', {}));
console.log(MyPortal.getPhotoPosts('0', '10', {author: 'Albert Einstein'}));
console.log(MyPortal.getPhotoPosts('10', '7'));
console.log("Testing function \'editPhotoPost(skip,top,filter)\'");
console.log(MyPortal.getPhotoPost('5'));
console.log(MyPortal.editPhotoPost('5', {description: 'Post has been edited!'}));
console.log(MyPortal.getPhotoPost('5'));