const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// thought schema
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
      ref: "user",
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//  Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// formatting time
thoughtSchema.virtual("timeStamp").get(function () {
  let created = this.createdAt;
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(created);

  const time = new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
  }).format(created);

  return `${date} at ${time}`;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
