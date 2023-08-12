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
    _id: string;
    type: PostTypeEnum;
    title: string;
    body: string;
    author: string;
    items: Item[];
    status: StatusEnum;
    location: string;
    match: string[];
    isArchived: boolean;
    photo: string;
}

type PostState = {
    postId: string;
    post: Post | null;
    posts: Post[];
    postsLoading: boolean;
};

type PostAction = {
    type: string;
    payload: {
        postId?: string;
        post: Post | null;
    };
};

export const postReducer = (
    state: PostState,
    action: PostAction
): PostState => {
    const {
        type,
        payload: { postId, post },
    } = action;

    switch (type) {
        case "POSTS_LOADED_SUCCESS":
            return {
                ...state,
                postsLoading: false,
                post,
            };

        case "ADD_POST":
            if (post) {
                return {
                    ...state,
                    posts: [...state.posts, post],
                };
            }
            return state;

        case "DELETE_POST":
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== postId),
            };

        case "UPDATE_POST": {
            const newPosts = state.posts.map((post) =>
                post._id === postId ? post : post
            );

            return {
                ...state,
                posts: newPosts,
            };
        }

        default:
            return state;
    }
};
