"use strict";
const myDOM=(function () {
    let user='Daniil';

    function isUserIn() {
        return user!==null;
    }

    return {
        setUserConfiguration: function () {
            if (isUserIn()) {
                let userNickname=document.createElement('a');
                userNickname.className="header-button-nickname";
                userNickname.innerHTML=user;
                let buttons=document.getElementById("buttons");
                buttons.insertBefore(userNickname,buttons.children[2]);
                return true;
            } else {
                return false;
            }
        }
    }
})();