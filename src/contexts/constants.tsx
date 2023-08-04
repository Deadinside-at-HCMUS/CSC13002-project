export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:8080/api"
    : "somedeployURL";

export const LOCAL_STORAGE_TOKEN_NAME = "connect-me";
