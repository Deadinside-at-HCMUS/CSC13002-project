import { createContext, ReactNode, useReducer } from "react";
import { postReducer, Post } from "../reducers/postReducer";
import {
    apiUrl,
    POSTS_LOADED_SUCCESS,
    POSTS_LOADED_FAIL,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST,
    CLOUDINARY_NAME,
    CLOUDINARY_UPLOAD_PRESET,
} from "./constants";
import axios, { AxiosError } from "axios";
import { Item } from "../reducers/postReducer";

export interface PostForm {
    type: string;
    title: string;
    body: string;
    author: string;
    items: Item[];
    status: string;
    location: string;
    match: string[];
    isArchived: boolean;
    photoId: string;
    photoUrl: string;
    createAt: string;
}

interface PostResponse {
    success: boolean;
    content: object;
    message: string;
}

interface PostStateType {
    post: Post | null;
    posts: Post[];
    postsLoading: boolean;
}

interface PostContextType {
    addPost: (postForm: PostForm) => Promise<PostResponse>;
    getPosts: () => Promise<void>;
    updatePost: (postForm: PostForm) => Promise<PostResponse>;
    deletePost: (id: string) => Promise<void>;
    uploadImage: (
        img: File | null
    ) => Promise<{ photoId: string; photoUrl: string }>;
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

    // Upload Image
    const uploadImage = async (
        img: File | null
    ): Promise<{ photoId: string; photoUrl: string }> => {
        const cloudApi = `https://api.Cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;

        const imgForm = new FormData();
        imgForm.append("file", img as File);
        imgForm.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

        const options = {
            method: "POST",
            body: imgForm,
        };

        try {
            const response = await fetch(cloudApi, options);
            const result = await response.json();
            const { asset_id, url } = result;
            return { photoId: asset_id, photoUrl: url };
        } catch (error) {
            console.log("Error:", error);
            return { photoId: "", photoUrl: "" };
        }
    };

    // Add post
    const addPost = async (postForm: PostForm) => {
        try {
            const submitForm = {
                type: postForm.type,
                title: postForm.title,
                body: postForm.body,
                author: postForm.author,
                items: postForm.items,
                status: postForm.status,
                location: postForm.location,
                match: postForm.match,
                isArchived: postForm.isArchived,
                photoId: postForm.photoId,
                photoUrl: postForm.photoUrl,
            };
            console.log(postForm);
            const response = await axios.post(`${apiUrl}/post`, submitForm);

            console.log(response);
            if (response.data.success) {
                localStorage.setItem(ADD_POST, response.data.content);

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
                `${apiUrl}/post/${postForm.id}`,
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
        uploadImage,
        postState,
    };
    return (
        <PostContext.Provider value={postContextData}>
            {children}
        </PostContext.Provider>
    );
};

export default PostContextProvider;
