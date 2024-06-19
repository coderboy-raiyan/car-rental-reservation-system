import { Schema, model } from "mongoose";
import CarConstants from "./car.constant";
import { TCar } from "./car.interface";

const carSchema = new Schema<TCar>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
        isElectric: {
            type: Boolean,
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(CarConstants.CarStatus),
            default: "available",
        },
        features: [
            {
                type: String,
                required: true,
            },
        ],
        pricePerHour: {
            type: Number,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

carSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
carSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

const Car = model("Car", carSchema);

export default Car;
