import createPersistedState from 'vuex-persistedstate'

export default ({
  store
}) => {
  createPersistedState({
    paths: ['account'],
    fetchBeforeUse: true
  })(store);

  createPersistedState({
    storage: window.sessionStorage,
    paths: ['activeProfile'],
    fetchBeforeUse: true
  })(store);
}


/*
  window.onNuxtReady(() => {
    createPersistedState({
      paths: ['account'],
      fetchBeforeUse:true
    })(store);

    createPersistedState({
      storage: window.sessionStorage,
      paths: ['activeProfile']
    })(store);

  })
*/




/*import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
    console.log('auto auth')
    window.onNuxtReady(() => {
      new VuexPersistence({
        storage: window.localStorage
      }).plugin(store);
    });
  }
*/
