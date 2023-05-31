const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


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
      // minlength: [2, 'La descripción debe tener min. 20 caracteres'],
      // maxlength: [20, 'La descripción debe tener min. 20 caracteres']
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
      required: [true, 'Password is required.'],
      minlength: [3, 'Password must be at least 3 characters'],
    },
    profileImg: {
      type: String,
      default: 'https://res.cloudinary.com/duewvq0qa/image/upload/v1684316440/ddgkodz01eq2ymkevhy3.png'
    },
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


userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})


userSchema.methods.signToken = function () {
  const { _id, username, email, profileImg } = this
  const payload = { _id, username, email, profileImg }

  const authToken = jwt.sign(
    payload,
    process.env.TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn: "6h" }
  )

  return authToken
}


userSchema.methods.validatePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password)
}



const User = model("User", userSchema)

module.exports = User
