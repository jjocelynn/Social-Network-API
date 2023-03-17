const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { usernames, emails, getRandomThoughts, getRandom } = require("./data");
const regex = /^(\w{24})$/;

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  let thoughts = getRandomThoughts(5);

  await Thought.collection.insertMany(thoughts);

  for (let i = 0; i < usernames.length; i++) {
    const username = usernames[i];
    const email = emails[i];

    let thoughtId = await Thought.find({ username: username }, "_id");

    let thoughts = [];

    for (const thoughtIdString of thoughtId) {
      const id = thoughtIdString._id.toString();
      let filtered = id.match(regex);
      thoughts.push(filtered);
    }

    thoughts = thoughts.flat();

    users.push({
      username,
      email,
      thoughts,
    });
  }

  await User.create(users);

  //  for (let i = 0; i < usernames.length; i++) {

  // let userIds = await User.find({}, "userId");

  // //translating userId to strings and saving in userIdArray
  // let userIdArray = [];
  // for (const userIdString of userIds) {
  //   const id = userIdString._id.toString();
  //   let filtered = id.match(regex);
  //   userIdArray.push(filtered);
  // }

  // let friends = [];

  // // loop through each user and give them random friends
  // for (let i = 0; i < usernames.length; i++) {
  //   // randomizing how many friends each user gets (can be their own friend. self-love.)
  //   const randomFriendCount = Math.floor(Math.random() * usernames.length);
  //   for (let i = 0; i < randomFriendCount; i++) {
  //     friends.push(getRandom(userIdArray));
  //   }
  // }

  // await User.collection.updateMany({}, { $set: { friends: friends } });

  
  console.table(thoughts);
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
