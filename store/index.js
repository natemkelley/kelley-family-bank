import Vuex from "vuex";
import firebase, {auth, GoogleProvider} from '@/services/fireinit.js';
import {checkIfUsernameIsReal } from '@/plugins/fireauth.js'

const createStore = () => {
  return new Vuex.Store({
    state: {
      user: null
    },
    getters: {
      activeUser: (state, getters) => {
        return state.user;
      }
    },
    mutations: {
      setUser(state, payload) {
        state.user = payload;
      }
    },
    actions: {
      autoSignIn({ commit }, payload) {
        commit("setUser", payload);
      },

      signInWithGoogle({ commit }) {
        return new Promise((resolve, reject) => {
          //auth.signInWithRedirect(GoogleProvider)
          resolve();
        });
      },

      signOut({ commit }) {
        commit("setUser", null);
      }
    }
  });
};

export default createStore;
