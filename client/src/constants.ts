export const API_URI = (process.env.NODE_ENV === 'development') ? 'http://localhost/api/v1' : 'http://fakedropbox.fun/api/v1' ;
export const BASE_URI = (process.env.NODE_ENV === 'development') ? 'http://localhost' : 'http://fakedropbox.fun'

export const URL_PATHS = {
    HOME : "/",
    SIGN_IN : "/sign-in",
    SIGN_UP : "/sign-up"
}

export const SESSION_ITEMS = {
    USER : 'user'
}