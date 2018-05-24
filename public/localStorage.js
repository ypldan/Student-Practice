/* eslint-disable no-unused-vars,no-undef */

const myLocalStorage = (function () {
  function writeUser() {
    localStorage.setItem("user", JSON.stringify(myDOM.getUser()));
  }

  function getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  function writeFilter() {
    const filter = myDOM.getFilter();
    const toWrite = {};
    if (filter.author && filter.author !== null) {
      toWrite.author = filter.author;
    }
    if (filter.date && filter.date !== null) {
      toWrite.date = filter.date;
    }
    if (filter.hashtags && filter.hashtags !== null) {
      toWrite.hashtags = JSON.stringify(Array.from(filter.hashtags));
    }
    localStorage.setItem("filter", JSON.stringify(toWrite));
  }

  function getFilter() {
    const read = JSON.parse(localStorage.getItem("filter"));
    if (read.hashtags) {
      read.hashtags = new Set(JSON.parse(read.hashtags));
    }
    return read;
  }

  return {
    writeUser,
    getUser,
    writeFilter,
    getFilter,
  };
}());
