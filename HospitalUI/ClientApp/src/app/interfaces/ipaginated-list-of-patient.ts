import { IPatient } from "./patients/ipatient";

export interface IPaginatedListOfPatient{
    items: IPatient[];
    pageNumber: number;
    totalPages: number;
    totalCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}