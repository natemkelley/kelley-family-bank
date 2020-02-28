
const Cookie = process.client ? require('js-cookie') : undefined;
const cookieparser = process.server ? require('cookieparser') : undefined

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
    console.log('reset store')
    state.account = null;
    state.serverUser = null;
    Cookie.remove('account')
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
  nuxtServerInit({commit}, ctx) {
    var req = ctx.req;

    if (this.$fireAuth === null) {
      throw "nuxtServerInit Example not working - this.$fireAuth cannot be accessed.";
    }

    if (ctx.$fireAuth === null) {
      throw "nuxtServerInit Example not working - ctx.$fireAuth cannot be accessed.";
    }

    if (ctx.app.$fireAuth === null) {
      throw "nuxtServerInit Example not working - ctx.$fireAuth cannot be accessed.";
    }

    //grab user cookie
    var account = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        account = JSON.parse(parsed.account)
        commit("setAccount", account, { expires: 365 });
        commit("setServerUser", account, { expires: 365 });
      } catch (err) {
        console.warn('no cookie found')
      }
    }


    /** Get the VERIFIED authUser from the server */
    var ssrVerifiedAuthUserClaims;
    var ssrVerifiedAuthUser;

    // ctx.res does not exist in nuxt "generate mode"
    if (ctx.res) {
      ssrVerifiedAuthUser = ctx.res.verifiedFireAuthUser;
      ssrVerifiedAuthUserClaims = ctx.res.verifiedFireAuthUserClaims;
    }

    if (ssrVerifiedAuthUserClaims && ssrVerifiedAuthUser && account != null) {
      commit("setServerUser", ssrVerifiedAuthUserClaims);
      commit("setAccount", ssrVerifiedAuthUserClaims);
    }
  },

  handleSuccessfulAuthentication({ commit }, { authUser }) {
    // Install servicerWorker if supported on sign-in/sign-up page.
    if (process.browser && "serviceWorker" in navigator) {
      console.log("registering service worker");
      navigator.serviceWorker.register("/firebase-auth-sw.js", {
        scope: "/"
      });
    }
    commit("setAccount", authUser);
    commit("setUserReady", true);
    Cookie.set('account', authUser) // saving token in cookie for server rendering
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
      console.info('logout')
      await this.$fireAuth.signOut();
    } catch (e) {
      // Do nothing, not properly signed in anyway.
      console.error(e);
    } finally {
      commit("resetStore");
    }
  }
};
