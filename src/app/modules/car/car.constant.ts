const CarStatus = {
    available: "available",
    unavailable: "unavailable",
};

const SearchAbleFields: Record<string, string>[] = [
    { name: "string" },
    { description: "string" },
    { color: "string" },
    { isElectric: "boolean" },
    { features: "array" },
    { pricePerHour: "number" },
];

const CarConstants = {
    CarStatus,
    SearchAbleFields,
};

export default CarConstants;
