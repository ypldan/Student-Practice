"use strict";
const listeners=(function () {

    const defaultDescription='Describe your photo!';
    const defaultHashtags='Add some hashtags!';
    const defaultAddImage="images/dragzone.png";
    let currentID=null;

    function validateHashtagsString(string) {
        let template=/^(#\w+ )*(#\w+)?$/;
        return template.test(string);
    }

    function validateAddInput(img, description, hashtags) {
        return (hashtags==="" || validateHashtagsString(hashtags))
            && img.src!==defaultAddImage
            && description!=="";
    }

    function validateEditInput(description, hashtags) {
        return (hashtags==="" || validateHashtagsString(hashtags))
            && description!=="";
    }

    function clickOnAreaAdd(event) {
        if (event.srcElement.id==='add-photo-block') {
            let img=document.getElementById("drag-image");
            if (img.src!==defaultAddImage) {
                img.src=defaultAddImage;
                let input=document.getElementById('drag-image');
                input.value="";
            }
            let wrong=document.getElementById("add-wrong");
            wrong.style.display="none";
            myDOM.hideAddField();
        }
    }

    function clickOnAreaLogIn(event) {
        if (event.srcElement.id==='log-in-block') {
            myDOM.hideLogInField();
        }
    }

    function clickOnLogOut() {
        myDOM.setUser();
        myDOM.setUserConfiguration();
        myDOM.clearPosts();
        myDOM.firstPostsLoad();
    }

    function clickOnOpenMore() {
        myDOM.loadPosts(myDOM.getNumberPostsLoaded(),10,myDOM.getFilter());
    }

    function clickOnDeletePost(event) {
        let target=event.srcElement;
        let parent=target.parentElement.parentElement.parentElement;
        myDOM.removePost(parent.id);
    }

    function clickOnLike(event) {
        let target=event.srcElement;
        let parent=target.parentElement.parentElement;
        let post=MyPortal.getPhotoPost(myDOM.parsePostId(parent.id));
        if (post.likes.has(myDOM.getUser())) {
            post.likes.delete(myDOM.getUser());
            target.className="fa fa-heart-o";
        } else {
            post.likes.add(myDOM.getUser());
            target.className="fa fa-heart";
        }
    }

    function clickOnAreaEdit(event) {
        if (event.srcElement.id==='edit-block') {
            myDOM.hideEditField();
            let wrong=document.getElementById("edit-wrong");
            wrong.style.display="none";
            currentID=null;
        }
    }

    function clickOnOpenAdd() {
        let description=document.querySelector("#add-description");
        description.value=defaultDescription;
        let hashtags=document.querySelector("#add-hashtags");
        hashtags.value=defaultHashtags;
        myDOM.createAddField();
    }

    function clickOnOpenEdit(event) {
        let target=event.srcElement;
        let parentID=target.parentElement.parentElement.parentElement.id;
        currentID=parentID;
        let post=MyPortal.getPhotoPost(myDOM.parsePostId(parentID));
        let description=document.getElementById("description-edit");
        let hashtags=document.getElementById("hashtags-edit");
        description.value=post.description;
        let string="";
        post.hashtags.forEach(function (hashtag) {
            string+=hashtag+" ";
        });
        hashtags.value=string;
        let img=document.getElementById("image-edit");
        img.src=post.photoLink;
        myDOM.createEditField();
    }

    function focusOnAddDescription(event) {
        let target=event.srcElement;
        if (target.value===defaultDescription) {
            target.value="";
        }
        let wrong=document.getElementById("add-wrong");
        if (wrong.style.display==='block') {
            wrong.style.display='none';
        }
    }
    
    function blurOnAddDescription(event) {
        let target=event.srcElement;
        if (target.value==="") {
            target.value=defaultDescription;
        }
    }

    function focusOnAddHashtags(event) {
        let target=event.srcElement;
        if (target.value===defaultHashtags) {
            target.value="";
        }
        let wrong=document.getElementById("add-wrong");
        if (wrong.style.display==='block') {
            wrong.style.display='none';
        }
    }

    function blurOnAddHashtags(event) {
        let target=event.srcElement;
        if (target.value==="") {
            target.value=defaultHashtags;
        }
    }

    function changeOnInputImage(event) {
        let target=event.srcElement;
        let img=document.getElementById("drag-image");
        img.src=window.URL.createObjectURL(target.files[0]);
}

    function clickOnCloseAdd() {
        let img=document.getElementById("drag-image");
        if (img.src!==defaultAddImage) {
            img.src=defaultAddImage;
            let input=document.getElementById('drag-image');
            input.value="";
        }
        let wrong=document.getElementById("add-wrong");
        wrong.style.display="none";
        myDOM.hideAddField();
    }

    function clickOnCloseEdit() {
        myDOM.hideEditField();
        let wrong=document.getElementById("edit-wrong");
        wrong.style.display="none";
        currentID=null;
    }

    function clickOnConfirmAdd() {
        let img=document.getElementById("drag-image");
        let description=document.getElementById("add-description").value;
        let hashtags=document.getElementById("add-hashtags").value;
        if (validateAddInput(img, description, hashtags)&& currentID!==null) {
            let hashtagsSet=new Set();
            let pattern=/#\w+/g;
            let temp;
            do {
                temp=pattern.exec(hashtags);
                if (temp) {
                    hashtagsSet.add(temp[0]);
                }
            } while(temp);
            let post={};
            post.hashtags=hashtagsSet;
            post.description=description;
            post.photoLink=img.src;
            myDOM.createPost(post);
            clickOnCloseAdd();
        } else {
            let wrong=document.getElementById("add-wrong");
            wrong.style.display='block';
        }
    }

    function clickOnConfirmEdit() {
        let description=document.getElementById("description-edit").value;
        let hashtags=document.getElementById("hashtags-edit").value;
        if (validateEditInput(description, hashtags)) {
            let hashtagsSet=new Set();
            let pattern=/#\w+/g;
            let temp;
            do {
                temp=pattern.exec(hashtags);
                if (temp) {
                    hashtagsSet.add(temp[0]);
                }
            } while(temp);
            let post={};
            post.hashtags=hashtagsSet;
            post.description=description;
            MyPortal.editPhotoPost(myDOM.parsePostId(currentID),post);
            let tempString="#"+currentID+"hashtags";
            let element=document.querySelector(tempString);
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
            hashtagsSet.forEach(function (hashtag) {
                let tag=document.createElement('p');
                tag.className='hashtag';
                tag.innerHTML=hashtag;
                element.appendChild(tag);
            });
            tempString="#"+currentID+"description";
            let descriptionArea=document.querySelector(tempString);
            descriptionArea.firstChild.innerHTML=description;
            clickOnCloseEdit();
        } else {
            let wrong=document.getElementById("edit-wrong");
            wrong.style.display="block";
        }
    }

    return {

        addOpenAdd: function () {
            let close=document.querySelector('#menu-add-photo');
            close.addEventListener("click", clickOnOpenAdd);
        },

        addCloseAdd: function () {
            let close=document.querySelector('#close-add');
            close.addEventListener('click', clickOnCloseAdd);
            let area=document.querySelector("#add-photo-block");
            area.addEventListener('click', clickOnAreaAdd);
        },

        addOpenLogIn : function () {
            let close=document.querySelector('#menu-log-in');
            close.addEventListener('click', myDOM.createLogInField);
        },

        addCloseLogIn: function () {
            let close=document.querySelector('#close-log-in');
            close.addEventListener('click', myDOM.hideLogInField);
            let area=document.querySelector("#log-in-block");
            area.addEventListener('click', clickOnAreaLogIn);
        },

        addOpenEdit: function (node) {
            node.addEventListener('click', clickOnOpenEdit);
        },

        addCloseEdit: function() {
            let close=document.querySelector('#close-edit');
            close.addEventListener('click', clickOnCloseEdit);
            let area=document.querySelector("#edit-block");
            area.addEventListener('click', clickOnAreaEdit);
        },

        addLogOut: function () {
            let logout=document.querySelector("#menu-log-out");
            logout.addEventListener("click", clickOnLogOut);
        },

        addOpenMore: function () {
            let open=document.querySelector("#open-more");
            open.addEventListener("click", clickOnOpenMore);
        },

        addDeletePost: function (node) {
            node.addEventListener("click", clickOnDeletePost);
        },

        addLikeClick: function (node) {
            node.addEventListener("click", clickOnLike);
        },

        addFormsListeners: function () {
            let addDescription=document.querySelector("#add-description");
            addDescription.addEventListener('focus', focusOnAddDescription);
            addDescription.addEventListener('blur', blurOnAddDescription);
            let addHashtags=document.querySelector("#add-hashtags");
            addHashtags.addEventListener('focus', focusOnAddHashtags);
            addHashtags.addEventListener('blur', blurOnAddHashtags);
            let imageInput=document.getElementById("choose-file");
            imageInput.addEventListener('change', changeOnInputImage);
            let confirmAdd=document.getElementById('send-button');
            confirmAdd.addEventListener('click', clickOnConfirmAdd);
            let confirmEdit=document.getElementById("send-button-edit");
            confirmEdit.addEventListener('click', clickOnConfirmEdit);
        },

        validateString: function (string) {
            return validateHashtagsString(string);
        }
    }
})();