"use strict";
const listeners=(function () {

    function clickOnAreaAdd(event) {
        if (event.srcElement.id==='add-photo-block') {
            myDOM.hideAddField();
        }
    }

    function clickOnAreaLogIn(event) {
        if (event.srcElement.id==='log-in-block') {
            myDOM.hideLogInField();
        }
    }

    return {

        addOpenAdd: function () {
            let close=document.querySelector('#menu-add-photo');
            close.addEventListener('click', myDOM.createAddField);
        },

        addCloseAdd: function () {
            let close=document.querySelector('#close-add');
            close.addEventListener('click', myDOM.hideAddField);
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
        }
    }
})();