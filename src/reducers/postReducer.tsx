export enum CategoryEnum {
    Electronic,
    Clothing,
    Book,
    Food,
    Vehicle,
    Household,
    Medical,
    Unknown,
}

export enum PostTypeEnum {
    Donate,
    Receive,
}

export enum StatusEnum {
    Posted,
    Verified,
    Waiting,
    Done,
    Doing,
}

export interface Item {
    name: string;
    quantity: string;
    category: CategoryEnum;
}

export interface Post {
    type: PostTypeEnum;
    title: string;
    body: string;
    author: string;
    items: Item[];
    status: StatusEnum;
    location: string;
    match: string[];
    isArchived: boolean;
}

type PostState = {
    post: Post | null;
    posts: Post[];
    postsLoading: boolean;
};

type PostAction = {
    type: string;
    payload: {
        post: Post | null;
    };
};

export const postReducer = (
    state: PostState,
    action: PostAction
): PostState => {
    const {
        type,
        payload: { post },
    } = action;

    switch (type) {
        case "POSTS_LOADED_SUCCESS":
            return {
                ...state,
                postsLoading: false,
                post,
            };

        case "POSTS_LOADED_FAIL":
            return {
                ...state,
                posts: [],
                postsLoading: false,
            };

        case "ADD_POST":
            if (post) {
                return {
                    ...state,
                    posts: [...state.posts, post],
                };
            }
            return state;

        // case "DELETE_POST":
        //     return {
        //         ...state,
        //         posts: state.posts.filter((post) => post._id !== payload),
        //     };

        // case "FIND_POST":
        //     return { ...state, post: payload };

        // case "UPDATE_POST":
        //     const newPosts = state.posts.map((post) =>
        //         post._id === payload._id ? payload : post
        //     );

        //     return {
        //         ...state,
        //         posts: newPosts,
        //     };

        default:
            return state;
    }
};
