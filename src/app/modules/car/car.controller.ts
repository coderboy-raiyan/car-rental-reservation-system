import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import CarServices from "./car.service";

const createCar = catchAsync(async (req, res) => {
    const result = await CarServices.createCarIntoDB(req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.CREATED,
        message: "Car created successfully",
        data: result,
    });
});
const getAllCars = catchAsync(async (req, res) => {
    const result = await CarServices.getAllCarsFromDB(req.query);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Cars retrieved successfully",
        data: result,
    });
});
const getSingleCar = catchAsync(async (req, res) => {
    const result = await CarServices.getSingleCarFromDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Car retrieved successfully",
        data: result,
    });
});
const updateCar = catchAsync(async (req, res) => {
    const result = await CarServices.updateCarIntoDB(req.params.id, req.body);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Car updated successfully",
        data: result,
    });
});
const deleteCar = catchAsync(async (req, res) => {
    const result = await CarServices.deleteCarIntoDB(req.params.id);
    sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "Car Deleted successfully",
        data: result,
    });
});

const CarControllers = {
    createCar,
    getAllCars,
    getSingleCar,
    updateCar,
    deleteCar,
};

export default CarControllers;
