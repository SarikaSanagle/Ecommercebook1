import mongoose from "mongoose";

const RegistrationSchema = mongoose.Schema(
    {

        Username: {
            type: String,
            require: true,
        },

        Password: {
            type: String,
            require: true,
        },

        Confirmpassword: {
            type: String,
            require: true,
        },
        Email: {
            type: String,
            require: true,
        },
    },
    {
        Timestamp: true,
    }

);


const UserRegi = mongoose.model('registration', RegistrationSchema);
export default UserRegi; 