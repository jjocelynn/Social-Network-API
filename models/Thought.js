const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");

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
      // Use a getter method to format the timestamp on query
    },
    username: {
      // (The user that created this thought)
      type: String,
      required: true,
      ref: "user",
    },
    reactions: [Reaction],
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

thoughtSchema
  .virtual("dateAndTime")
  .get(function () {
    return this.createdAt;
  })
  .set(function (created) {
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat

    const date = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(created);

    const time = new Intl.DateTimeFormat("en-US", {
      timeStyle: "short",
    }).format(created);

    this.set({ date, time });
  });

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
