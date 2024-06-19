import { StatusCodes } from "http-status-codes";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import CarConstants from "./car.constant";
import { TCar } from "./car.interface";
import Car from "./car.model";

const createCarIntoDB = async (payload: TCar) => {
    const { name } = payload;
    const car = await Car.findOne({ name });
    if (car) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Car already exists!");
    }
    const result = await Car.create(payload);
    return result;
};

const getAllCarsFromDB = async (query: Record<string, unknown>) => {
    const modelQuery = new QueryBuilder(Car, query)
        .search(CarConstants.SearchAbleFields)
        .filter()
        .paginate()
        .sort()
        .fields();
    const result = await modelQuery.ModelQuery;
    return result;
};

const getSingleCarFromDB = async (id: string) => {
    const result = await Car.findById(id);
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, "Car not found!");
    }
    return result;
};

const updateCarIntoDB = async (id: string, payload: Partial<TCar>) => {
    const { features, ...restObj } = payload;

    const result = await Car.findByIdAndUpdate(
        id,
        {
            ...restObj,
            $addToSet: { features: { $each: features && features.length ? features : [] } },
        },
        { new: true }
    );

    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, "Car not found!");
    }

    return result;
};

const deleteCarIntoDB = async (id: string) => {
    const result = await Car.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, "Car not found!");
    }

    return result;
};

const CarServices = {
    createCarIntoDB,
    getAllCarsFromDB,
    getSingleCarFromDB,
    updateCarIntoDB,
    deleteCarIntoDB,
};

export default CarServices;
