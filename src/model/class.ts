import mongoose, { Schema } from 'mongoose'


const ClassSchema: Schema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'students'
    }]
})
export const ClassDB = mongoose.model('class', ClassSchema)
