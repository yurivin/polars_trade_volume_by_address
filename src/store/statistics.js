import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        // addresses: [],
        address: [],
        // pol: new Map(),
        sortPol: new Map(),
        // bPOLaddresses: [],
        bPOLaddress: [],
        // bPol: new Map(),
        sortBPol: new Map(),
        url: "https://graphql.bitquery.io/",
    },
    actions:{

    },
    mutations:{

        updateSortBPOL(state, payload) {
            state.sortBPol = payload
        },
        updateBPOLAddress(state, payload) {
            state.bPOLaddresses = payload
        },
        updateSortPOL(state, payload) {
            state.sortPol = payload
        },
        updatePOLAddress(state, payload) {
            state.addresses = payload
        },

    },

    getters:{
        addresses(state){
            return state.addresses
        },
        sortPol(state){
            return state.sortPol
        },
        bPOLaddresses(state){
            return state.bPOLaddresses
        },
        sortBPol(state){
            return state.sortBPol
        },

    },

})