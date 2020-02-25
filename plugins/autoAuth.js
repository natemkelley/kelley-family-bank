export default context => {
  const { store } = context;
  const fireAuth = context.app.$fireAuth;

  if(store.account){

  }
  fireAuth.onAuthStateChanged(account => {
      //console.log(account)
    //store.commit("setAccount", account);
  });
};
