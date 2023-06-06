const { Schema, model } = require("mongoose");


const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true, 
  }
);


const eventSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Title is mandatory']
        },
        description: {
            type: String,
            required: [true, 'Description is mandatory'],
            // default: 'There is not description for this event.'
            // minlength: [20, 'La descripción debe tener min. 20 caracteres']
        },
        date: {
            type: Date,
            required: [true, 'Date is mandatory'],
        },
        time: {
            type: String, 
        },
        imageUrl: {
            type: String,
            default: 'https://res.cloudinary.com/duewvq0qa/image/upload/v1684316440/ddgkodz01eq2ymkevhy3.png' ,
            // required: [true, 'Image is mandatory'],
        },
        location: {
            address: {
                type: String,
            },
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            }
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        // category: {
        //     type: String,
        //     enum: ['SPORT', 'CULTURAL' , 'LEISURE'],
        // },

        assistants: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],

        comments: [commentSchema],

    },
    
    {
        timestamps: true
    }
);

const Event = model("Event", eventSchema)

module.exports = Event