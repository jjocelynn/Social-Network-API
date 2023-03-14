const usernames = [
  "Alex",
  "bob1",
  "iCarly",
  "Dino",
  "Earthling",
  "FrankOcean",
  "goob",
];

const emails = [
  "123@hotmail.com",
  "abc@gmail.com",
  "coolbeand@email.com",
  "dogz@hotmail.com",
  "cats@gmail.com",
  "horsegirl@outlook.com",
  "wevebeentryingtoreachyouaboutyourcarsextendedwarranty@spam.com",
];

const thoughts = [
  "I'm hungry",
  "I am not hungry",
  "Yay! I'm getting a new keyboard on Tuesday!",
  "I'm so excited for my new keeb",
  "Whats your favourite food?",
  "Are you being productive?",
  "random thought",
  "I'm going to lose my poop",
  "The poop has hit the fan",
  "I saw my neighbour in my basement",
  "running away from your problems is like running away from your shadow",
  "It's raining cats and dogs",
  "Live Laugh Love ✌️😗",
];

const reactions = [
  "wow!",
  "Cool!",
  "Neat",
  "I love it!",
  "Keep it up!",
  "side eye",
  "What is that?",
  "eww",
  "I'm telling your mom you said that",
  "Great!",
  "Good for you",
  "thats scary",
  "I'm calling the cops",
  "Thats unhinged",
  "Thats so profound",
  "I wish i was as smart as you",
  "Thats my greatest wish",
  "Thats my greatest fear",
  "that cute",
  "You went too far",
  "never heard of that"
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Function to generate random thoughts that we can add to the database. Includes thought reactions.

const getRandomThoughts = (int) => {
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandom(thoughts),
      username: getRandom(usernames),
      reactions: [...getReaction(3)],
    });
  }
  return results;
};

// Create the responses that will be added to each video
const getReaction = (int) => {
  if (int === 1) {
    return getRandom(reactions);
  }
  let results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      reactionBody: getRandom(reactions),
      username: getRandom(usernames),
    });
  }
  return results;
};

module.exports = { usernames, emails, getRandomThoughts };
