import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        token: null,
        authority: null,
        username: null,
        deviceStatus: null
    },
    mutations: {
        setAuthority(state, authority) {
            this.state.authority = authority;
        },
        setToken(state, token) {
            this.state.token = token;
        },
        setUsername(state, username) {
            this.state.username = username;
        },
        setDeviceStatus(state, deviceStatus) {
            this.state.deviceStatus = deviceStatus;
        }
    },
    getters: {
        getAuthority: state => {
            return state.authority;
        },
        getToken: state => {
            return state.token;
        },
        getUsername: state => {
            return state.username;
        },
        getDeviceStatus: state => {
            return state.deviceStatus;
        }
    },
    actions: {}
})

export default store;
