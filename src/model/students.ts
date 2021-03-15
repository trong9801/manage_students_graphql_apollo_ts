import mongoose, {Schema} from 'mongoose'



const StudentsSchema: Schema = new Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    nameClass: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'class'
    },
    age : Number,
    codeStudents : {
        type : String,
        require :true
    },
    status: Number
})
export  const StudentsDB = mongoose.model('students', StudentsSchema);

