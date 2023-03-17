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
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addThoughtReaction,
  removeReaction,
} = require("../../controllers/thoughtsController"); //import controllers (specify after the /)

// /api/thoughts
router.route("/")
.get(getThoughts) //GET to get all thoughts
.post(createThought); //POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought) // GET to get a single thought by its _id
  .put(updateThought) //PUT to update a thought by its _id
  .delete(deleteThought); //DELETE to remove a thought by its _id

// /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions")
.post(addThoughtReaction) // POST to create a reaction stored in a single thought's reactions array field

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction); // DELETE to pull and remove a reaction by the reaction's reactionId value

module.exports = router;
