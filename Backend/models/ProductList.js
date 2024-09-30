import mongoose from "mongoose";

const ProductlistSchema = mongoose.Schema(
    {

        Bookname: {
            type: String,
            require: true,
        },

        Author: {
            type: String,
            require: true,
        },

        Edition: {
            type: String,
            require: true,
        },
        Price: {
            type: String,
            require: true,
        },
        Stock: {
            type: String,
            require: true,
        },
    },
    {
        Timestamp: true,
    }

);


const Productlist = mongoose.model('productlists', ProductlistSchema);
export default Productlist; 