const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { usernames, emails, getRandomThoughts, getRandom } = require("./data");
const { ObjectId } = require("mongoose").Types;

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

    const regex = /^(\w{24})$/;
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

  let userIds = await User.find({}, "userId");
  console.log(userIds);

  let friends = [];
  // loop through each user and give them random friends
  for (let i = 0; i < users.length; i++) {
    const randomFriendCount = Math.floor(Math.random() * users.length);
    // randomizing how many friends each user gets (can be their own friend. self-love.)
    for (let i = 0; i < randomFriendCount; i++) {
      friends.push(getRandom(userIds));
    }
  }

  console.log(friends);
  await User.updateOne({ _id: User._id }, { $set: { friends: friends } });

  //    let thoughts = [];
  //    thoughts.push(thoughtId);

  //    users.push({
  //      username,
  //      email,
  //      thoughts,
  //    });
  //  }
  //      email,
  //      thoughts,
  //    });
  //  }

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(thoughts);
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
