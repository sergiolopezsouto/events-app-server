const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true,
      lowercase: true
    },
    username: {
      type: String,
      required: [true, 'Username is required.'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [2, 'La descripción debe tener min. 20 caracteres'],
      maxlength: [20, 'La descripción debe tener min. 20 caracteres']
    },
    // name: {
    //   type: String,
    //   required: [true, 'Name is required.'],
    //   minlength: [2, 'La descripción debe tener min. 20 caracteres']
    //   maxlength: [20, 'La descripción debe tener min. 20 caracteres']
    // },
    // surname: {
    //   type: String,
    //   required: [true, 'Surname is required.'],
    //   minlength: [2, 'La descripción debe tener min. 20 caracteres'],
    //   maxlength: [20, 'La descripción debe tener min. 20 caracteres'],
    // },
    password: {
      type: String,
    },
    // profileImg: {
    //   type: String,
    //   default: 'https://previews.123rf.com/images/thesomeday123/thesomeday1231712/thesomeday123171200009/91087331-icono-de-perfil-de-avatar-predeterminado-para-hombre-marcador-de-posici%C3%B3n-de-foto-gris-vector-de.jpg'
    // },
    role: {
      type: String,
      enum: ['ADMIN', 'USER'],
      default: 'USER'
    },
    following: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
    }],
    // rating: [{
    //     type: Number,
  },
  
  {
    timestamps: true
  }
)

const User = model("User", userSchema)

module.exports = User
