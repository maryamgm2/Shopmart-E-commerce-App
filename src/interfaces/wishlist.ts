export interface WishlistProduct {
    _id: string;
    imageCover: string;
    title: string;
    price: number;
    category?: {
        name: string;
    };
    ratingsAverage?: number;
}

export interface WishlistResponse {
    status: string;
    count: number;
    data: WishlistProduct[];
}