import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const state = {
  data: [],
  color: null,
  lighting: null,
  belongsToGrid: false,
  selected: "",
  filterOnGridID:null
};

export const getters = {
  data: state => state.data,
  color: state => state.color,
  lighting: state => state.lighting,
  belongsToGrid: state => state.belongsToGrid,
  filterOnGridID: state => state.filterOnGridID
};

export const mutations = {
  initializeData(state, data) {
    state.data = data;
  },
  setColor(state, color) {
    state.color = color;
  },
  setLighting(state, lighting) {
    state.lighting = lighting;
  },
  refreshData(state, data) {
    const oldData = state.data;
    oldData.splice(0, 100);
    state.data = oldData.concat(data);
  },
  setBelongsToGrid(state) {
    state.belongsToGrid = true;
  },
  setSelected(state, data) {
    state.selected = data
  },
  setFilterOnGridID(state, data){
    state.filterOnGridID = data
  }
};

export const actions = {
  fetchData({ commit }) {
    axios.get('http://localhost:9000').then(response => {
      commit('initializeData', response.data);
    });
  },
  fetchColor({ commit }) {
    axios.get('http://localhost:9000/color').then(resp => {
      console.log(resp);
      commit('setColor', resp.data.color);
      commit('setLighting', resp.data.lighting);
    });
  },
  updateData({ commit }) {
    axios.get('http://localhost:9000/update').then(response => {
      commit('refreshData', response.data);
    });
  },
  changeTheme({ commit }, data) {
    commit('setColor', data);
  },
  setFilterOnGridID({commit}, data){
    console.log(data)
    commit('setFilterOnGridID', data)
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
