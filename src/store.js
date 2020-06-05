import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        data5: {},
        data12: {},
        data25: {},
        data30: {},
    },
    mutations: {
        setData5(state, data) {
            this.state.data5 = data;
        },
        setData12(state, data) {
            this.state.data12 = data;
        },
        setData25(state, data) {
            this.state.data25 = data;
        },
        setData30(state, data) {
            this.state.data30 = data;
        }
    },
    getters: {
        getData5: state => {
            return state.data5;
        },
        getData12: state => {
            return state.data12;
        },
        getData25: state => {
            return state.data25;
        },
        getData30: state => {
            return state.data30;
        }
    },
    actions: {}
})

export default store;
