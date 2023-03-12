/* /api/thoughts

POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// example data
{
  "thoughtText": "Here's a cool thought...",
  "username": "lernantino",
  "userId": "5edff358a0fcb779aa7b118b"
}
*/

const router = require("express").Router();
const {} = require("../../controllers/appController"); //import controllers

// /api/thoughts
router.route("/")
.get() //GET to get all thoughts
.post(); //POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get() // GET to get a single thought by its _id
  .put() //PUT to update a thought by its _id
  .delete(); //DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions")
.post() // POST to create a reaction stored in a single thought's reactions array field
.delete(); // DELETE to pull and remove a reaction by the reaction's reactionId value

module.exports = router;
