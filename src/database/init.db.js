const mongoose = require("mongoose")
require("dotenv").config()
const URI_MONGOOSE = process.env.URI_MONGOOSE
console.log(URI_MONGOOSE);

class Database{
    constructor(){
        this.connect()
    }

    connect(){
        mongoose.connect(URI_MONGOOSE).then(() => console.log(`Mongoose connected.`)).catch(error => console.error(error))
    }

    static getInstance(){
        if(Database.instance){
            return Database.instance
        }
        Database.instance = new Database()
    }
}

const db = Database.getInstance()

module.exports = db
