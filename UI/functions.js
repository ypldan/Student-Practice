"use strict";
(function () {
    var pArray= [
        {
            id: '0',
            description: 'PhotoPost0',
            createdAt: new Date('2018-01-19T21:19:46'),
            author: 'Donald Trump',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#goodbye', '#hello', '#morning'],
            likes: ['Albert Einstein', 'Donald Trump', 'Hleb Salaujou', 'Mickie Mouse', 'unknown author']
        },
        {
            id: '1',
            description: 'PhotoPost1',
            createdAt: new Date('2018-01-14T08:51:31'),
            author: 'Hleb Salaujou',
            photoLink: 'images/sample.jpg',
            hashtags: ['#evening', '#goodbye', '#hello', '#morning'],
            likes: ['Albert Einstein', 'Hleb Salaujou', 'Mickie Mouse']
        },
        {
            id: '2',
            description: 'PhotoPost2',
            createdAt: new Date('2018-01-04T17:16:08'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye', '#hello', '#morning'],
            likes: ['Albert Einstein', 'Donald Trump', 'Hleb Salaujou', 'unknown author']
        },
        {
            id: '3',
            description: 'PhotoPost3',
            createdAt: new Date('2018-01-21T01:57:46'),
            author: 'Donald Trump',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye', '#hello'],
            likes: ['Alexey Navalny', 'Donald Trump', 'Mickie Mouse']
        },
        {
            id: '4',
            description: 'PhotoPost4',
            createdAt: new Date('2018-02-09T16:34:55'),
            author: 'Donald Trump',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#hello'],
            likes: ['Albert Einstein', 'Donald Trump', 'Hleb Salaujou', 'Mickie Mouse', 'unknown author']
        },
        {
            id: '5',
            description: 'PhotoPost5',
            createdAt: new Date('2018-01-03T10:54:33'),
            author: 'Albert Einstein',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye', '#morning'],
            likes: ['Albert Einstein', 'Alexey Navalny', 'Donald Trump', 'Hleb Salaujou', 'Mickie Mouse', 'unknown author']
        },
        {
            id: '6',
            description: 'PhotoPost6',
            createdAt: new Date('2018-02-15T03:20:24'),
            author: 'Hleb Salaujou',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#goodbye', '#morning'],
            likes: ['Albert Einstein', 'Hleb Salaujou', 'Mickie Mouse']
        },
        {
            id: '7',
            description: 'PhotoPost7',
            createdAt: new Date('2018-02-16T03:42:07'),
            author: 'Mickie Mouse',
            photoLink: 'images/sample.jpg',
            hashtags: ['#evening', '#hello'],
            likes: ['Albert Einstein', 'Alexey Navalny', 'Donald Trump', 'Mickie Mouse', 'unknown author']
        },
        {
            id: '8',
            description: 'PhotoPost8',
            createdAt: new Date('2018-01-19T03:51:55'),
            author: 'unknown author',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#hello'],
            likes: ['Alexey Navalny', 'Hleb Salaujou', 'Mickie Mouse', 'unknown author']
        },
        {
            id: '9',
            description: 'PhotoPost9',
            createdAt: new Date('2018-02-03T09:10:45'),
            author: 'Donald Trump',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#hello', '#morning'],
            likes: ['Alexey Navalny', 'Hleb Salaujou', 'Mickie Mouse']
        },
        {
            id: '10',
            description: 'PhotoPost10',
            createdAt: new Date('2018-01-11T20:15:44'),
            author: 'Albert Einstein',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#goodbye', '#morning'],
            likes: ['Albert Einstein', 'Alexey Navalny', 'Hleb Salaujou', 'Mickie Mouse', 'unknown author']
        },
        {
            id: '11',
            description: 'PhotoPost11',
            createdAt: new Date('2018-01-08T19:53:30'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#goodbye', '#hello', '#morning'],
            likes: ['Albert Einstein', 'Alexey Navalny', 'Donald Trump', 'Mickie Mouse', 'unknown author']
        },
        {
            id: '12',
            description: 'PhotoPost12',
            createdAt: new Date('2018-01-15T03:03:07'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg',
            hashtags: ['#evening', '#goodbye', '#hello', '#morning'],
            likes: ['Alexey Navalny', 'Donald Trump', 'Hleb Salaujou', 'unknown author']
        },
        {
            id: '13',
            description: 'PhotoPost13',
            createdAt: new Date('2018-01-25T03:11:51'),
            author: 'Alexey Navalny',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#hello', '#morning'],
            likes: ['Albert Einstein', 'Alexey Navalny', 'Donald Trump', 'Hleb Salaujou', 'Mickie Mouse', 'unknown author']
        },
        {
            id: '14',
            description: 'PhotoPost14',
            createdAt: new Date('2018-01-04T05:25:08'),
            author: 'unknown author',
            photoLink: 'images/sample.jpg',
            hashtags: ['#evening', '#goodbye', '#morning'],
            likes: ['Albert Einstein', 'Alexey Navalny', 'Donald Trump', 'Mickie Mouse', 'unknown author']
        },
        {
            id: '15',
            description: 'PhotoPost15',
            createdAt: new Date('2018-02-10T11:42:52'),
            author: 'Donald Trump',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye', '#morning'],
            likes: ['Albert Einstein', 'Alexey Navalny', 'Hleb Salaujou', 'Mickie Mouse', 'unknown author']
        },
        {
            id: '16',
            description: 'PhotoPost16',
            createdAt: new Date('2018-02-17T04:27:55'),
            author: 'Albert Einstein',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#goodbye', '#hello', '#morning'],
            likes: ['Albert Einstein', 'Alexey Navalny', 'Hleb Salaujou', 'Mickie Mouse']
        },
        {
            id: '17',
            description: 'PhotoPost17',
            createdAt: new Date('2018-01-10T06:19:46'),
            author: 'Donald Trump',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye', '#hello', '#morning'],
            likes: ['Albert Einstein', 'Alexey Navalny', 'Donald Trump', 'Hleb Salaujou', 'Mickie Mouse']
        },
        {
            id: '18',
            description: 'PhotoPost18',
            createdAt: new Date('2018-02-10T15:09:29'),
            author: 'unknown author',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye'],
            likes: ['Albert Einstein', 'Alexey Navalny', 'Donald Trump', 'Hleb Salaujou', 'Mickie Mouse']
        },
        {
            id: '19',
            description: 'PhotoPost19',
            createdAt: new Date('2018-02-18T01:34:40'),
            author: 'Albert Einstein',
            photoLink: 'images/sample.jpg',
            hashtags: ['#afternoon', '#evening', '#goodbye', '#hello', '#morning'],
            likes: ['Albert Einstein', 'Donald Trump', 'Hleb Salaujou', 'Mickie Mouse']
        }
    ];

    function getPhotoPosts(skip, top, filterConfig) {
        pArray.sort(comparePosts);
        var array=pArray;
        if (isUndefined(skip)) {
            skip = 0;
        }
        if (isUndefined(top)) {
            top = 10;
        }
        if (isUndefined(filterConfig)) {
            array=array.slice(skip,skip+top);
        } else {
            if (!isUndefined(filterConfig.author)) {
                array=getPosts(array, filterConfig.author);
            }
            if (!isUndefined(filterConfig.date)) {
                array=getPosts(array, filterConfig.date);
            }
            if (!isUndefined(filterConfig.hashtags)) {
                array=getPosts(array, filterConfig.hashtags);
            }
        }
        return array;
    }

    function comparePosts(post1, post2) {
        return post1.createdAt.getTime()-post2.createdAt.getTime();
    }

    function validate(photoPost) {
        var counter=0;
        for (var field in photoPost) {
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
    }

    function isPartiallyValid(photoPost) {
        return photoPost.description!==undefined || photoPost.photoLink!==undefined || photoPost.hashtags!==undefined;
    }

    function isFilter(filterConfig) {
        return filterConfig.author!==undefined||filterConfig.date!==undefined||filterConfig.hashtags!==undefined;
    }

    function addPhotoPost(photoPost) {
        if (validate(photoPost)) {
            pArray.push(photoPost);
            return true;
        } else {
            return false;
        }
    }

    function getPhotoPost(id) {
        if (isString(id)) {
            var photoPost=null;
            for (var i=0; i<pArray.length; i++) {
                if (pArray[i].id===id) {
                    photoPost=photoPost[i];
                    break;
                }
            }
            return photoPost;
        } else {
            return null;
        }
    }

    function getPosts(pArray, parameter) {
        if (!isUndefined(pArray)) {
            var array = [];
            if (typeof parameter === 'string') {
                var array = [];
                for (var i = 0; i < pArray.length; i++) {
                    if (pArray[i].author === parameter) {
                        array.push(pArray[i]);
                    }
                }
            } else if (parameter instanceof Date) {
                for (var i = 0; i < pArray.length; i++) {
                    if (pArray[i].createdAt.toDateString() === parameter.toDateString()) {
                        array.push(pArray[i]);
                    }
                }
            } else if (parameter instanceof Array) {
                for (var i = 0; i < pArray.length; i++) {
                    var result=true;
                    for (var j = 0; j < parameter.length; j++) {
                        if (!findString(pArray[i].hashtags, parameter[j])) {
                            result=false;
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
    }

    function getPhotoPostIndex(id) {
        if (isString(id)) {
            var index=null;
            for (var i=0; i<pArray.length; i++) {
                if (pArray[i].id===id) {
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
            if (photoPost.hashtags!==undefined) {
                toEdit.hashtags=photoPost.hashtags;
            }
            return true;
        } else {
            return false;
        }
    }

    function removePhotoPost(id) {
        var index=getPhotoPostIndex(id);
        if (index!==null) {
            pArray.splice(index,1);
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

    function isUndefined(variable) {
        return variable===undefined;
    }

    function findString(pArray, string) {
        var result=false;
        for (var i=0; i<pArray.length; i++) {
            if (pArray[i]===string) {
                result=true;
                break;
            }
        }
        return result;
    }
})();