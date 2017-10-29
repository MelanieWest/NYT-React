const router = require("express").Router();
const booksController = require("../../controllers/booksController");
//names of controller functions not changed yet


// Matches with "/api/articles"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/articles/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
