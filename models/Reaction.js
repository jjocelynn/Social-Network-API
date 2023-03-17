const { Schema, Types } = require("mongoose");

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: function(){
        return new Types.ObjectId();
      }},
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
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

reactionSchema
.virtual("timeStamp")
  .get(function () {
    let created = this.createdAt
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
    const date = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
    }).format(created);

    const time = new Intl.DateTimeFormat("en-US", {
      timeStyle: "short",
    }).format(created);

    return (`${date} at ${time}`);
  })

module.exports = reactionSchema;
