
export interface CreateResponse {
    name: string;
    price: number;
    description: string;
    category: string;
    message: string;
    status: number;
}

export interface CreateProps extends CreateResponse {
    data: CreateResponse
}

export interface ListApi {
    _id: string;
    name: string;
    price: number;
    description: string;
    category: string;

}

export interface ListResponse {
    message: string;
    status: number;
    product: ListApi[];
}

export interface DetailsResponse {
    name: string;
    price: number;
    description: string;
    category: string;
    message: string;
    status: number;
}

export interface DetailsProps extends DetailsResponse {
    data: DetailsResponse
}

export interface DeleteResponse {
    name: string;
    price: number;
    description: string;
    category: string;
    message: string;
    status: number;
    id: string;
}

export interface DeletesProps extends DeleteResponse {
    data: DeleteResponse
}