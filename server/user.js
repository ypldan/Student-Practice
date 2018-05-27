const fs = require("fs");

const authorizer = (function () {
  const users = JSON.parse(fs.readFileSync("server/data/users.json"));

  function containsUser(username) {
    let result = false;
    for (let i = 0; i < users.length; i++) {
      if (users[i].name === username) {
        result = true;
        break;
      }
    }
    return result;
  }

  function getUser(username) {
    let result = null;
    for (let i = 0; i < users.length; i++) {
      if (users[i].name === username) {
        result = users[i];
        break;
      }
    }
    return result;
  }

  return {
    containsUser,
    getUser,
  };
}());

module.exports = authorizer;
