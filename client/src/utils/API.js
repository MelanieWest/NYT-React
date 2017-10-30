import axios from "axios";

export default {
  // Gets all articles -- focus on this first
  getArticles: function() {
    return axios.get("/api/articles");
  },
  getNew: function() {
    return axios.get("/api/articles/nyt");
  }, 
  // Gets the book with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the book with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a book to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
