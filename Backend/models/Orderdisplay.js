import mongoose from "mongoose";

const OrderdisplaySchema = mongoose.Schema(
    {

        Username: {
            type: String,
            require: true,
        },
        Address: {
            type: String,
            require: true,
        },
        Phoneno: {
            type: String,
            require: true,
        },

        Orderno: {
            type: Number,
            require: true,
        },

        Orderdate: {
            type: Date,
            require: true,
        },
        Totalbooks: {
            type: Number,
            require: true,
        },
        Totalamt: {
            type: Number,
            require: true,
        },
        Orderstatus: {
            type: String,
            require: true,
        },
    },
    {
        Timestamp: true,
    }

);


const Orderdisplay = mongoose.model('Orderdisplay', OrderdisplaySchema);
export default Orderdisplay; 