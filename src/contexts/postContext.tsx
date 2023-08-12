import { createContext, ReactNode, useReducer } from "react";
import { postReducer, Post } from "../reducers/postReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios, { AxiosError } from "axios";

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

export interface PostForm {
    _id: string;
    type: PostTypeEnum;
    title: string;
    body: string;
    items: Item[];
    status: StatusEnum;
    location: string;
    match: string[];
    isArchived: boolean;
    photo: string;
}

interface PostResponse {
    success: boolean;
    content: object;
    message: string;
}

interface PostStateType {
    postId: string;
    post: Post | null;
    posts: Post[];
    postsLoading: boolean;
}

interface PostContextType {
    addPost: (postForm: PostForm) => Promise<PostResponse>;
    postState: PostStateType;
}

interface PostContextProviderProps {
    children: ReactNode;
}

export const PostContext = createContext<PostContextType>(
    {} as PostContextType
);

const PostContextProvider: React.FC<PostContextProviderProps> = ({
    children,
}) => {
    const [postState, dispatch] = useReducer(postReducer, {
        postId: "",
        post: null,
        posts: [],
        postsLoading: true,
    });

    // Get all posts
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/post`);
            if (response.data.success) {
                dispatch({
                    type: "POSTS_LOADED_SUCCESS",
                    payload: response.data.posts,
                });
            }
        } catch (error) {
            console.log("Fail to load posts");
        }
    };

    const addPost = async (postForm: PostForm) => {
        try {
            const response = await axios.post(`${apiUrl}/post`, postForm);
            if (response.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.content
                );

                dispatch({ type: "ADD_POST", payload: response.data.post });
            } else {
                console.log(response.data);
            }

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                return (
                    axiosError.response?.data || {
                        success: false,
                        message: "Server error",
                    }
                );
            } else {
                console.log(error);
                return { success: false, message: "Unknown error" };
            }
        }
    };

    // Update post
    const updatePost = async (postForm: PostForm) => {
        try {
            const response = await axios.put(
                `${apiUrl}/post/${postForm._id}`,
                postForm
            );
            if (response.data.success) {
                dispatch({ type: "UPDATE_POST", payload: response.data.post });
                return response.data;
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                return (
                    axiosError.response?.data || {
                        success: false,
                        message: "Server error",
                    }
                );
            } else {
                console.log(error);
                return { success: false, message: "Unknown error" };
            }
        }
    };

    // Delete post
    const deletePost = async (postId: string) => {
        try {
            const response = await axios.delete(`${apiUrl}/post/${postId}`);
            if (response.data.success)
                dispatch({
                    type: "DELETE_POST",
                    payload: response.data.postId,
                });
        } catch (error) {
            console.log(error);
        }
    };

    const postContextData = {
        getPosts,
        addPost,
        updatePost,
        deletePost,
        postState,
    };
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
