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

export interface Item {
    idx: string;
    name: string;
    quantity: string;
    category: CategoryEnum;
}

export interface AuthorType {
    _id: string;
    username: string;
    email: string;
}

export interface Post {
    _id: string;
    type: string;
    title: string;
    body: string;
    author: AuthorType;
    items: Item[];
    status: string;
    location: string;
    match: string[];
    isArchived: boolean;
    photoUrl: string;
    photoID: string;
    createdAt: Date;
}

export function doesPostMatchQuery(post: Post, searchQuery: string): boolean {
    const query = searchQuery.toLowerCase(); // Convert the search query to lowercase for case-insensitive matching

    // Check if the lowercase title or body contains the query
    const titleMatches = post.title.toLowerCase().includes(query);
    const bodyMatches = post.body.toLowerCase().includes(query);

    return titleMatches || bodyMatches;
}

type PostState = {
    post: Post | null;
    posts: Post[];
    postsLoading: boolean;
};

type PostAction = {
    type: string;
    payload: Post | Post[] | string | null;
};

export const postReducer = (
    state: PostState,
    action: PostAction
): PostState => {
    const { type, payload } = action;

    switch (type) {
        case "POSTS_LOADED_SUCCESS":
            return {
                ...state,
                postsLoading: false,
                posts: payload as Post[],
            };

        case "ADD_POST":
            return {
                ...state,
                posts: [...state.posts, payload as Post],
            };

        case "DELETE_POST": {
            const postId = payload as string;
            return {
                ...state,
                posts: state.posts.filter((post) => post._id !== postId),
            };
        }

        case "UPDATE_POST": {
            const updatedPost = payload as Post;
            const newPosts = state.posts.map((post) =>
                post._id === updatedPost._id ? updatedPost : post
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
