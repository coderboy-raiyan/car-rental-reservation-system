import { FilterQuery, Model, Query } from "mongoose";

class QueryBuilder<T> {
    public ModelQuery: Query<T[], T>;
    private query: Record<string, unknown>;

    constructor(ModelQuery: Model<T>, query: Record<string, unknown>) {
        this.ModelQuery = ModelQuery.find();
        this.query = query;
    }

    search<T extends Record<string, string>>(searchAbleFields: T[]) {
        if (!this.query?.searchTerm) {
            return this;
        }

        const query = [];

        // search any type of field despite boolean
        searchAbleFields.forEach((searchField) => {
            Object.entries(searchField).forEach(([field, type]) => {
                if (type === "array") {
                    query.push({
                        [field]: {
                            $in: [new RegExp(`^${this.query.searchTerm}`, "i")],
                        },
                    });
                }
                if (type === "string") {
                    query.push({
                        [field]: {
                            $regex: this.query?.searchTerm,
                            $options: "i",
                        },
                    });
                }
                if (!isNaN(this.query?.searchTerm as number) && type === "number") {
                    query.push({
                        [field]: Number(this.query?.searchTerm),
                    });
                }
            });
            return query;
        });

        this.ModelQuery = this.ModelQuery.find({
            $or: query,
        });

        return this;
    }

    filter() {
        const copyQuery = { ...this.query };
        const excludeFields = ["searchTerm", "page", "limit", "sort", "fields"];
        excludeFields.forEach((field) => delete copyQuery[field]);
        this.ModelQuery = this.ModelQuery.find(copyQuery as FilterQuery<T>);
        return this;
    }

    paginate() {
        const page = Number(this.query?.page) || 1;
        const limit = Number(this.query?.limit) || 10;
        const skip = (page - 1) * limit;
        this.ModelQuery = this.ModelQuery.skip(skip).limit(limit);
        return this;
    }

    sort() {
        const sortField = this.query?.sort || "-createdAt";
        this.ModelQuery = this.ModelQuery.sort(sortField as FilterQuery<T>);
        return this;
    }

    fields() {
        const excludeFields = (this.query?.fields as string)?.split(",")?.join(" ") || "-__v";
        this.ModelQuery = this.ModelQuery.select(excludeFields);
        return this;
    }
}

export default QueryBuilder;
