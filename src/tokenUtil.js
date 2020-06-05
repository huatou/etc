const TOKEN_NAME = "zigar_token_A8X91NXU8AX18X9BO38C3H8C";


const tokenUtil = {

    setToken(token) {
        window.localStorage.setItem(TOKEN_NAME, token);
    },

    getToken() {
        return window.localStorage.getItem(TOKEN_NAME);
    },

    clearToken() {
        window.localStorage.removeItem(TOKEN_NAME);
    }
}

export default tokenUtil;