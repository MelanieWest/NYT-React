const db = require("../models");
const request = require("request");
const cheerio = require("cheerio");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Article
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Article
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Article
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Article
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Article
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  findNew: function(req, res) {

    request("http://www.nytimes.com/",function(error, response, html) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(html);
  
      // Now, we grab every h2 within an article tag, and do the following:
      $("h2.story-heading").each(function(i, element) {
  
        var link = $(element).find("a").attr("href");
        var title = $(element).find("a").text();
  
        console.log('found an h2');
        if (title && link) {
            db.Article.create({
                link: link,
                title: title,
            }).then(function(dbArticle){
              res.send("scrape complete");
            }).catch(function(err){
              res.json(err);
            })
            
        };
        });
      });
      
  }

};
