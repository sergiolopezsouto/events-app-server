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
            default: 'https://res.cloudinary.com/dzfqxfogn/image/upload/v1686259481/d1vyhyl4dm2zuuzxq1td.png' ,
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

        price: {
            type: Number,
            default: 0,
            // required: [true, 'Price is mandatory']
        },

        comments: [commentSchema],

    },
    
    {
        timestamps: true
    }
);

const Event = model("Event", eventSchema)

module.exports = Event