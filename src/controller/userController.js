const userModel = require("../model/user.js")




function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}


const regUser = async (req, res) => {
    try {

        const data = req.body
        const { userId, email } = data
        if (!email) return res.status(400).send({ status: false, Message: "Please enter email" });

        for (let userId = 1; userId <= 100000; userId++) {

            let newEmail = userId + "_" + email

            let randomPrice = randomIntFromInterval(10, 10000)

            let userDetail = await userModel.create({ userId: userId, email: newEmail, price: randomPrice })

        }

        const regiredUserList = await userModel.find()
        res.status(201).send({ status: true, Message: "All users --->>> ", regiredUserList })

    } catch (error) {
        res.status(500).send({ error: error.message })

    }
}


// fetching registered user list
const getUser = async (req, res) => {
    try {

        const userList = await userModel.find()

        if (userList.length) {
            return res.status(400).send({ status: true, count: userList.length, msg: "All user list", data: userList })
        } else {
            return res.status(404).send({ status: false, msg: "No user found" })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: error.message })

    }
}

const getReward = async (req, res) => {
    try {

        let Id = req.body.userId
        if(!Id) return res.status(400).send({status:false ,message : "Please enter user ID"})
        let indvUser = await userModel.findOne({ userId: Id })
        let IndvPrice = indvUser.price

        let sum = 0
        for (let userId = 1; userId <= 100000 && userId !=null; userId++) { // set userId <=10 to get immediate response because userId <=100000 takes to much time to respond

            let calPrice = await userModel.findOne({ userId: userId })
            sum = sum + calPrice.price
            //console.log(calPrice._id ,sum)
        }
        

        let rdmRiscount = randomIntFromInterval(70, 100)

        let percentage = IndvPrice * 100 /sum

        //let Reward = percentage * 70/100
        
        let Reward = (IndvPrice * rdmRiscount)/100

        return res.status(200).send({ status: true, Reward: Reward })
    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })
    }
}



module.exports = { regUser, getUser, getReward }

