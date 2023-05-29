const { Schema, model } = require("mongoose");

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
            // required: [true, 'Date is mandatory'],
        },
        imageUrl: {
            type: String,
            default: 'https://res.cloudinary.com/duewvq0qa/image/upload/v1684316440/ddgkodz01eq2ymkevhy3.png'
            // required: [true, 'La imagen es obligatoria'],
        },
        location: {
            type: {
                type: String
            },
            coordinates: [Number]
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        // category: {
        //     type: String,
        //     enum: ['sport', 'cultural' , 'leisure'],
        // },
        // assistants: [{
        //     type: Schema.Types.ObjectId,
        //     ref: 'User',
        //     default: []
        // }],
        // comments: [{
        //     type: {
        //         user: {
        //             type: Schema.Types.ObjectId,
        //             ref: 'User'
        //         },
        //         message: {
        //             type: String
        //         }
        //      },
        //      default: []
        // }]
    },
    {
        timestamps: true
    }
);

const Event = model("Event", eventSchema)

module.exports = Event