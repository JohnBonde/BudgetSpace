import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";
import AuthService from "../AuthService";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    user: {},
    budgets: [],
    myBudget: {},
    myBudgetRaw: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBudgets(state, budgets) {
      state.budgets = budgets;
    },
    setMyBudget(state, budget) {
      state.myBudget = budget;
    },
    setMyBudgetRaw(state, budget) {
      state.myBudgetRaw = budget;
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds);
        commit("setUser", user);
        router.push({ name: "home" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds);
        commit("setUser", user);
        router.push({ name: "home" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout();
        if (!success) {
        }
        commit("resetState");
        router.push({ name: "login" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    //#endregion

    //#region -- BUDGETS --
    async getBudgets({ commit, dispatch }) {
      let res = await api.get("budgets");
      commit("setBudgets", res.data);
    },
    async getMyBudget({ commit, dispatch }) {
      let res = await api.get("budgets/user");
      commit("setMyBudget", res.data);
      commit("setMyBudgetRaw", res.data);
    },
    async createBudget({ commit, dispatch }, rawData) {
      let res = await api.post("budgets", rawData);
      commit("setMyBudget", res.data);
      dispatch(this.getBudgets);
    },
    async editBudget({ commit, dispatch }, update) {
      debugger;
      let res = await api.put("budgets", update);
      commit("setMyBudget", res.data);
      dispatch(this.getBudgets);
    }
    //#endregion
  }
});
