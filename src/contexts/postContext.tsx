export enum CategoryEnum {
    Electronic,
    Clothing,
    Book,
    Food,
    Vehicle,
    Household,
    Unknown,
}

export enum PostTypeEnum {
    Donate,
    Receive,
}

export enum StatusEnum {
    Published,
    Verified,
    Matching,
    Matched,
}

export interface Item {
    name: string;
    quantity: string;
    category: CategoryEnum;
}

export interface PostForm {
    type: PostTypeEnum;
    title: string;
    body: string;
    items: Item[];
    status: StatusEnum;
    location: string;
    match: string[];
}
