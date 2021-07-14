import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import {User, UserModel} from './types'
const {Schema, model } = mongoose


const UserSchema = new Schema<User, UserModel>( {

    email: {type: String , required: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    profilePic: String,
    githubURl: String,
    portfolioURL: String,
    capstoneURL: String,
    linkedinURL: String,
    youtubeURL: String,
    availableToRelocation: Boolean,
    located: String,
    desiredPosition: String,
    approved: { type: Boolean, default: false},
    hired: { type: Boolean, default: false},
    track: { type: String, enum:['FS','AI']},
    oneLiner: String,
},
{timestamps: true}

)

UserSchema.pre("save", async function(next){
const newUser = this
const plainPW = newUser.password 
if(newUser.isModified("password")){
  newUser.password = await bcrypt.hash(plainPW,10)
   
}
next()
})

UserSchema.statics.checkCredentials = async function(email, password) {
const user = await this.findOne({email})
if(user){
const isOk = await bcrypt.compare(password, user.password)

if(isOk)
return user
else return null
} else return null
export default model<User, UserModel>("User", UserSchema)