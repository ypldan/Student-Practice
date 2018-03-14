(function () {
    alert("Hello!");

    var photoPosts= [
        {
            id: '0',
            description: 'PhotoPost0',
            createdAt: new Date('2018-02-9T17-33-10'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '1',
            description: 'PhotoPost1',
            createdAt: new Date('2018-01-22T12-13-07'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '2',
            description: 'PhotoPost2',
            createdAt: new Date('2018-02-17T11-09-19'),
            author: 'Mickie Mouse',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '3',
            description: 'PhotoPost3',
            createdAt: new Date('2018-02-20T16-35-47'),
            author: 'Albert Einstein',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '4',
            description: 'PhotoPost4',
            createdAt: new Date('2018-02-22T06-44-15'),
            author: 'Albert Einstein',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '5',
            description: 'PhotoPost5',
            createdAt: new Date('2018-01-25T10-03-05'),
            author: 'Albert Einstein',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '6',
            description: 'PhotoPost6',
            createdAt: new Date('2018-01-7T19-07-26'),
            author: 'Mickie Mouse',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '7',
            description: 'PhotoPost7',
            createdAt: new Date('2018-01-27T21-14-06'),
            author: 'Donald Trump',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '8',
            description: 'PhotoPost8',
            createdAt: new Date('2018-01-16T05-17-28'),
            author: 'Donald Trump',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '9',
            description: 'PhotoPost9',
            createdAt: new Date('2018-02-28T05-25-27'),
            author: 'Mickie Mouse',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '10',
            description: 'PhotoPost10',
            createdAt: new Date('2018-02-4T02-05-03'),
            author: 'Donald Trump',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '11',
            description: 'PhotoPost11',
            createdAt: new Date('2018-01-26T02-04-21'),
            author: 'Mickie Mouse',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '12',
            description: 'PhotoPost12',
            createdAt: new Date('2018-02-11T15-48-56'),
            author: 'Donald Trump',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '13',
            description: 'PhotoPost13',
            createdAt: new Date('2018-01-4T10-00-45'),
            author: 'Albert Einstein',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '14',
            description: 'PhotoPost14',
            createdAt: new Date('2018-02-1T13-18-43'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '15',
            description: 'PhotoPost15',
            createdAt: new Date('2018-02-7T16-46-28'),
            author: 'Albert Einstein',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '16',
            description: 'PhotoPost16',
            createdAt: new Date('2018-01-17T13-01-55'),
            author: 'Donald Trump',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '17',
            description: 'PhotoPost17',
            createdAt: new Date('2018-01-10T05-03-18'),
            author: 'Mickie Mouse',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '18',
            description: 'PhotoPost18',
            createdAt: new Date('2018-02-12T08-29-22'),
            author: 'Donald Trump',
            photoLink: 'images/sample.jpg'
        },
        {
            id: '19',
            description: 'PhotoPost19',
            createdAt: new Date('2018-01-7T18-12-08'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg'
        }
    ];

    //Functions for photo posts

    function getPhotoPosts(skip, top, filterConfig) {
        if (skip===undefined) {
            skip=0;
        }
        if (top===undefined) {
            top=10;
        }

    }

    function validate(photoPost) {
        var counter=0;
        for (var field in photoPost) {
            counter++;
        }
        return !(counter !== 5 ||
            photoPost.id === undefined ||
            photoPost.description === undefined ||
            photoPost.createdAt === undefined ||
            photoPost.author === undefined ||
            photoPost.photoLink === undefined);
    }

    function isPartiallyValid(photoPost) {
        return photoPost.description!==undefined || photoPost.photoLink!==undefined;
    }

    function addPhotoPost(photoPost) {
        if (validate(photoPost)) {
            photoPosts.push(photoPost);
            return true;
        } else {
            return false;
        }
    }

    function getPhotoPost(id) {
        if (isString(id)) {
            var photoPost=null;
            for (var i=0; i<photoPosts.length; i++) {
                if (photoPosts[i].id===id) {
                    photoPost=photoPost[i];
                    break;
                }
            }
            return photoPost;
        } else {
            return null;
        }
    }

    function getPhotoPostIndex(id) {
        if (isString(id)) {
            var index=null;
            for (var i=0; i<photoPosts.length; i++) {
                if (photoPosts[i].id===id) {
                    index=i;
                    break;
                }
            }
            return index;
        } else {
            return null;
        }
    }

    function editPhotoPost(id, photoPost) {
        if (isString(id) && isPartiallyValid(photoPost)) {
            var toEdit=getPhotoPost(id);
            if (photoPost.description!==undefined) {
                toEdit.description=photoPost.description;
            }
            if (photoPost.photoLink!==undefined) {
                toEdit.photoLink=photoPost.photoLink;
            }
            return true;
        } else {
            return false;
        }
    }

    function removePhotoPost(id) {
        var index=getPhotoPostIndex(id);
        if (index!==null) {
            photoPosts.splice(index,1);
            return true;
        } else {
            return false;
        }
    }

    //Common functions

    function isString(variable) {
        return typeof variable === 'string';
    }

    function isNumber(variable) {
        return typeof variable === 'number';
    }
})();