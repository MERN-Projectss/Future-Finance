const {Schema, default: mongoose} = require("mongoose")

const userModel = new Schema ({
    userId : {type : Number , required :true },
    email  : { type :String , required :true},
    price  : { type : Number , default : 0 }
})

module.exports = mongoose.model("User", userModel) //users