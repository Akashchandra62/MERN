const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String
            }
        }]
})

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = await jwt.sign({ _id: this._id }, "SecretKey")
        this.tokens = this.tokens.concat({token});
        await this.save();
        // console.log(token);
        return token;
    } catch (error) {
        console.log("Error in generating token : " + error  );
    }
}




const User = mongoose.model("user", userSchema)
module.exports = User;