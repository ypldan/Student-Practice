"use strict";
const MyPortal = (function () {
    let photoPosts = [
        {
            id: '0',
            description: 'PhotoPost0',
            createdAt: new Date('2018-03-17T14:37:57'),
            author: 'unknown author',
            photoLink: 'images/sample.jpg',
            hashtags: ['#evening', '#hello'],
            likes: new Set(['Albert Einstein', 'Alexey Navalny', 'unknown author'])
        },
        {
            id: '1',
            description: 'PhotoPost1',
            createdAt: new Date('2018-03-28T02:18:41'),
            author: 'unknown author',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#goodbye', '#hello', '#morning'],
            likes: new Set(['Albert Einstein', 'Alexey Navalny', 'Hleb Salaujou', 'Mickie Mouse'])
        },
        {
            id: '2',
            description: 'PhotoPost2',
            createdAt: new Date('2018-01-19T05:48:02'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg',
            hashtags: ['#evening', '#hello', '#morning'],
            likes: new Set(['Albert Einstein', 'Mickie Mouse', 'unknown author'])
        },
        {
            id: '3',
            description: 'PhotoPost3',
            createdAt: new Date('2018-01-02T02:02:28'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye', '#hello', '#morning'],
            likes: new Set(['Albert Einstein', 'Alexey Navalny', 'Hleb Salaujou', 'Mickie Mouse'])
        },
        {
            id: '4',
            description: 'PhotoPost4',
            createdAt: new Date('2018-01-27T12:57:52'),
            author: 'Albert Einstein',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#hello'],
            likes: new Set(['Alexey Navalny', 'Donald Trump', 'Hleb Salaujou', 'Mickie Mouse'])
        },
        {
            id: '5',
            description: 'PhotoPost5',
            createdAt: new Date('2018-01-11T10:39:24'),
            author: 'Mickie Mouse',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#hello'],
            likes: new Set(['Albert Einstein', 'Alexey Navalny', 'Hleb Salaujou', 'Mickie Mouse', 'unknown author'])
        },
        {
            id: '6',
            description: 'PhotoPost6',
            createdAt: new Date('2018-03-19T09:35:38'),
            author: 'Hleb Salaujou',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#goodbye', '#morning'],
            likes: new Set(['Albert Einstein', 'Alexey Navalny', 'Donald Trump', 'unknown author'])
        },
        {
            id: '7',
            description: 'PhotoPost7',
            createdAt: new Date('2018-02-23T17:20:25'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye', '#hello'],
            likes: new Set(['Albert Einstein', 'Hleb Salaujou', 'Mickie Mouse', 'unknown author'])
        },
        {
            id: '8',
            description: 'PhotoPost8',
            createdAt: new Date('2018-02-15T01:52:12'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg',
            hashtags: ['#evening', '#hello', '#morning'],
            likes: new Set(['Albert Einstein', 'Alexey Navalny', 'Mickie Mouse'])
        },
        {
            id: '9',
            description: 'PhotoPost9',
            createdAt: new Date('2018-02-19T00:14:34'),
            author: 'Mickie Mouse',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#goodbye', '#hello', '#morning'],
            likes: new Set(['Albert Einstein', 'Donald Trump', 'Hleb Salaujou', 'Mickie Mouse', 'unknown author'])
        },
        {
            id: '10',
            description: 'PhotoPost10',
            createdAt: new Date('2018-03-20T22:23:21'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg',
            hashtags: ['#evening', '#goodbye', '#hello', '#morning'],
            likes: new Set(['Albert Einstein', 'Donald Trump', 'Mickie Mouse', 'unknown author'])
        },
        {
            id: '11',
            description: 'PhotoPost11',
            createdAt: new Date('2018-03-12T14:30:29'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye', '#hello', '#morning'],
            likes: new Set(['Albert Einstein', 'Hleb Salaujou', 'Mickie Mouse'])
        },
        {
            id: '12',
            description: 'PhotoPost12',
            createdAt: new Date('2018-01-03T07:08:55'),
            author: 'Mickie Mouse',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#hello'],
            likes: new Set(['Albert Einstein', 'Alexey Navalny', 'Donald Trump', 'Hleb Salaujou', 'Mickie Mouse'])
        },
        {
            id: '13',
            description: 'PhotoPost13',
            createdAt: new Date('2018-02-27T08:45:18'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye', '#morning'],
            likes: new Set(['Albert Einstein', 'Alexey Navalny', 'Donald Trump', 'Hleb Salaujou', 'Mickie Mouse'])
        },
        {
            id: '14',
            description: 'PhotoPost14',
            createdAt: new Date('2018-03-05T18:15:52'),
            author: 'Donald Trump',
            photoLink: 'images/sample.jpg',
            hashtags: ['#evening', '#goodbye', '#hello'],
            likes: new Set(['Alexey Navalny', 'Donald Trump', 'Hleb Salaujou', 'Mickie Mouse', 'unknown author'])
        },
        {
            id: '15',
            description: 'PhotoPost15',
            createdAt: new Date('2018-01-27T21:17:28'),
            author: 'unknown author',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye', '#hello', '#morning'],
            likes: new Set(['Alexey Navalny', 'Mickie Mouse', 'unknown author'])
        },
        {
            id: '16',
            description: 'PhotoPost16',
            createdAt: new Date('2018-02-15T06:14:22'),
            author: 'Mickie Mouse',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye', '#morning'],
            likes: new Set(['Albert Einstein', 'Donald Trump', 'Hleb Salaujou', 'Mickie Mouse', 'unknown author'])
        },
        {
            id: '17',
            description: 'PhotoPost17',
            createdAt: new Date('2018-02-08T03:29:44'),
            author: 'Albert Einstein',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#goodbye', '#morning'],
            likes: new Set(['Alexey Navalny', 'Hleb Salaujou', 'Mickie Mouse', 'unknown author'])
        },
        {
            id: '18',
            description: 'PhotoPost18',
            createdAt: new Date('2018-02-14T10:07:44'),
            author: 'unknown author',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye', '#morning'],
            likes: new Set(['Albert Einstein', 'Alexey Navalny', 'Mickie Mouse', 'unknown author'])
        },
        {
            id: '19',
            description: 'PhotoPost19',
            createdAt: new Date('2018-02-05T15:08:45'),
            author: 'unknown author',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye', '#morning'],
            likes: new Set(['Albert Einstein', 'Alexey Navalny', 'Donald Trump', 'Hleb Salaujou', 'Mickie Mouse', 'unknown author'])
        }
    ];
    let lastID=photoPosts.length;

    function comparePosts(post1, post2) {
        return post2.createdAt.getTime() - post1.createdAt.getTime();
    }

    function isString(letiable) {
        return typeof letiable === 'string';
    }

    function isNumber(letiable) {
        return typeof letiable === 'number';
    }

    function isUndefined(letiable) {
        return letiable === undefined;
    }

    function findString(pArray, string) {
        let result = false;
        for (let i = 0; i < pArray.length; i++) {
            if (pArray[i] === string) {
                result = true;
                break;
            }
        }
        return result;
    }

    function isFilter(filterConfig) {
        return filterConfig.author !== undefined || filterConfig.date !== undefined || filterConfig.hashtags !== undefined;
    }

    return {

        getPhotoPosts: function (skip, top, filterConfig) {
            photoPosts.sort(comparePosts);
            let array = photoPosts;
            if (isUndefined(skip)) {
                skip = 0;
            }
            if (isUndefined(top)) {
                top = 10;
            }
            if (isUndefined(filterConfig)) {
                array = array.slice(skip, skip + top);
            } else {
                if (!isUndefined(filterConfig.author)) {
                    array = this.getPosts(array, filterConfig.author);
                }
                if (!isUndefined(filterConfig.date)) {
                    array = this.getPosts(array, filterConfig.date);
                }
                if (!isUndefined(filterConfig.hashtags)) {
                    array = this.getPosts(array, filterConfig.hashtags);
                }
                array = array.slice(skip, skip + top);
            }
            return array;
        },

        validate: function (photoPost) {
            let counter = 0;
            for (let field in photoPost) {
                counter++;
            }
            return !(counter !== 7 ||
                photoPost.id === undefined ||
                photoPost.description === undefined ||
                photoPost.createdAt === undefined ||
                photoPost.author === undefined ||
                photoPost.photoLink === undefined ||
                photoPost.likes === undefined ||
                photoPost.hashtags === undefined);
        },

        isPartiallyValid: function (photoPost) {
            return photoPost.description !== undefined || photoPost.photoLink !== undefined || photoPost.hashtags !== undefined;
        },

        isValidToCreate: function (post) {
            return post.description!==undefined &&
                post.hashtags!==undefined &&
                post.photoLink!==undefined;
        },

        addPhotoPost: function (photoPost) {
            if (this.validate(photoPost)) {
                photoPosts.push(photoPost);
                return true;
            } else {
                return false;
            }
        },

        getPhotoPost: function (id) {
            if (isString(id)) {
                let photoPost = null;
                for (let i = 0; i < photoPosts.length; i++) {
                    if (photoPosts[i].id === id) {
                        photoPost = photoPosts[i];
                        break;
                    }
                }
                return photoPost;
            } else {
                return null;
            }
        },

        getPosts: function (pArray, parameter) {
            if (!isUndefined(pArray)) {
                let array = [];
                if (typeof parameter === 'string') {
                    array = [];
                    for (let i = 0; i < pArray.length; i++) {
                        if (pArray[i].author === parameter) {
                            array.push(pArray[i]);
                        }
                    }
                } else if (parameter instanceof Date) {
                    for (let i = 0; i < pArray.length; i++) {
                        if (pArray[i].createdAt.toDateString() === parameter.toDateString()) {
                            array.push(pArray[i]);
                        }
                    }
                } else if (parameter instanceof Array) {
                    for (let i = 0; i < pArray.length; i++) {
                        let result = true;
                        for (let j = 0; j < parameter.length; j++) {
                            if (!findString(pArray[i].hashtags, parameter[j])) {
                                result = false;
                                break;
                            }
                        }
                        if (result) {
                            array.push(pArray[i]);
                        }
                    }
                }
                return array;
            } else {
                return [];
            }
        },

        getPhotoPostIndex: function (id, array) {
            if (array===undefined) {
                array=photoPosts;
            }
            if (isString(id)) {
                let index = null;
                for (let i = 0; i < array.length; i++) {
                    if (array[i].id === id) {
                        index = i;
                        break;
                    }
                }
                return index;
            } else {
                return null;
            }
        },

        editPhotoPost: function (id, photoPost) {
            if (isString(id) && this.isPartiallyValid(photoPost)) {
                let toEdit = this.getPhotoPost(id);
                if (photoPost.description !== undefined) {
                    toEdit.description = photoPost.description;
                }
                if (photoPost.photoLink !== undefined) {
                    toEdit.photoLink = photoPost.photoLink;
                }
                if (photoPost.hashtags !== undefined) {
                    toEdit.hashtags = photoPost.hashtags;
                }
                return true;
            } else {
                return false;
            }
        },

        removePhotoPost: function (id) {
            let index = this.getPhotoPostIndex(id);
            if (index !== null) {
                photoPosts.splice(index, 1);
                return true;
            } else {
                return false;
            }
        },

        getPostsNumber: function () {
            return photoPosts.length;
        },

        incrementLastID : function () {
            let temp=lastID;
            lastID++;
            return temp;
        },

        getAuthorsSet: function () {
            let set=new Set();
            photoPosts.forEach(function (post) {
                set.add(post.author);
            });
            return set;
        }
    }
})();