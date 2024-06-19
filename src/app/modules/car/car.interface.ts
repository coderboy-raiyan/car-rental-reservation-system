import CarConstants from "./car.constant";

export type TCarStatus = keyof typeof CarConstants.CarStatus;

export type TCar = {
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    status: TCarStatus;
    features: string[];
    pricePerHour: number;
    isDeleted: boolean;
};
