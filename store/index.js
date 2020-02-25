export const strict = false;

export const state = () => ({
  account: null,
  serverUser: null,
  userReady: false
});

export const mutations = {
  setAccount(state, payload) {
    state.account = payload;
  },
  setServerUser(state, payload) {
    state.serverUser = payload;
  },
  setUserReady(state, payload) {
    state.userReady = payload;
  },
  resetStore(state) {
    state.account = null;
    state.serverUser = null;
  }
};
export const getters = {
  isLoggedIn: state => {
    try {
      return state.account.id !== null;
    } catch {
      return false;
    }
  }
};

export const actions = {
  nuxtServerInit({ commit }, ctx) {
    if (this.$fireAuth === null) {
      throw "nuxtServerInit Example not working - this.$fireAuth cannot be accessed.";
    }

    if (ctx.$fireAuth === null) {
      throw "nuxtServerInit Example not working - ctx.$fireAuth cannot be accessed.";
    }

    if (ctx.app.$fireAuth === null) {
      throw "nuxtServerInit Example not working - ctx.$fireAuth cannot be accessed.";
    }

    console.info(
      "Success. Nuxt-fire Objects can be accessed in nuxtServerInit action via this.$fire___, ctx.$fire___ and ctx.app.$fire___"
    );

    /** Get the VERIFIED authUser from the server */
    var ssrVerifiedAuthUserClaims;
    var ssrVerifiedAuthUser;

    // ctx.res does not exist in nuxt "generate mode"
    if (ctx.res) {
      ssrVerifiedAuthUser = ctx.res.verifiedFireAuthUser;
      ssrVerifiedAuthUserClaims= ctx.res.verifiedFireAuthUserClaims;
    }

    if (ssrVerifiedAuthUserClaims && ssrVerifiedAuthUser) {
      commit("setServerUser", ssrVerifiedAuthUserClaims);
      commit("setAccount", ssrVerifiedAuthUserClaims);
      commit("setUserReady", true);
    }
  },

  handleSuccessfulAuthentication({ commit }, { authUser }) {
    // Install servicerWorker if supported on sign-in/sign-up page.
    if (process.browser && "serviceWorker" in navigator) {
      console.log("registering service worker");
      navigator.serviceWorker.register("/firebase-auth-sw.js", { scope: "/" });
    }
    commit("setAccount", authUser);
    commit("setUserReady", true);
  },

  checkVuexStore(ctx) {
    if (this.$fireAuth === null) {
      throw "Vuex Store example not working - this.$fireAuth cannot be accessed.";
    }

    alert(
      "Success. Nuxt-fire Objects can be accessed in store actions via this.$fire___"
    );
    return;
  },

  async logoutUser({ commit, dispatch }) {
    try {
      await this.$fireAuth.signOut();
    } catch (e) {
      // Do nothing, not properly signed in anyway.
      console.error(e);
    } finally {
      commit("resetStore");
    }
  }
};
