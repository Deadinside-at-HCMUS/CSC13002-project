export const apiUrl =
    process.env.NODE_ENV !== "production"
        ? "http://localhost:8080/api"
        : "somedeployURL";

export const LOCAL_STORAGE_TOKEN_USER = "connect-me";

export const POSTS_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POSTS_LOADED_FAIL = "POSTS_LOADED_FAIL";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const FIND_POST = "FIND_POST";

export const CLOUDINARY_NAME = "de6o8unxv";
export const CLOUDINARY_UPLOAD_PRESET = "nramtgvk";
export const CLOUDINARY_KEY = "829344473411369";
export const CLOUDINARY_SECRET = "EuIkOp7Rtan87alxbueAw0HllUQ";
