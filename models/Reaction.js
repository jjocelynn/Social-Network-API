const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //Use a getter method to format the timestamp on query
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

reactionSchema
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

    this.set({ date, time});
  });

module.exports = reactionSchema;
