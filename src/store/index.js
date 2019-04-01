import Vue from "vue";
import Vuex from 'vuex'
import types from "./mutation-types";

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        workbenchSize: {
            width: 0,
            height: 0
        },
        pages: [],
        isdrop: false,
        isCustom: false

    },
    getters: {
        workbenchSize: state => {
            return state.workbenchSize
        },
        isdrop: state => {
            return state.isdrop
        },
        isCustom:state => {
            return state.isCustom
        },
    },
    mutations: {
        [types.SET_WORKBENCH_SIZE](state, size) {
            state.workbenchSize.width = size.width || 0;
            state.workbenchSize.height = size.height || 0;
        },
        [types.SET_ISDROP](state, drop) {
            state.isdrop = drop;
        },
        [types.SET_ISCUSTOM](state, cus) {
            state.isCustom = cus;
        }
    }
});

export default store