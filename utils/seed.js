const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { usernames, emails, getRandomThoughts } = require("./data");
const { ObjectId } = require("mongoose").Types;

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  await Thought.deleteMany({});
  await User.deleteMany({});

  const users = [];
  let thoughts = getRandomThoughts(10);

  await Thought.collection.insertMany(thoughts);

  for (let i = 0; i < usernames.length; i++) {
    const username = usernames[i];
    const email = emails[i];

    let thoughtId = (await Thought.find({ username: username }, "_id"));
    let thoughts = [];
    thoughts.push(thoughtId);
    thoughts.flat();
    // let thoughts = [];
    // for (const thought of thoughtId) {
    //   let regex = /^"[\w]{24}"$/;
    //   let string = JSON.stringify(thought)
    //   const id = string.match(regex);
    //   console.log(id)
    //   thoughts.push(ObjectId(id));
    // }

    // let thoughtIndex = [];
    // for (const thought of thoughts) {
    //   let thoughtUser = thought.username;
    //   if (thoughtUser === username) {
    //     // thoughtIndex.push(thoughts.indexOf(thought));
    //     thoughtIndex = thoughts.indexOf(thought)
    //   }
    // }

    // let thoughtArray = thoughts[thoughtIndex];
    // console.log(thoughtIndex);
    // console.log(thoughtArray);
    users.push({
      username,
      email,
      thoughts,
    });
    // console.log(thoughts);
    // console.log(users);
  }

  await User.collection.insertMany(users);

  // loop through the saved applications, for each application we need to generate a application response and insert the application responses
  console.table(thoughts);
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
