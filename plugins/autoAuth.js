export default context => {
  const { store } = context;
  const fireAuth = context.app.$fireAuth;

  return new Promise((resolve, reject) => {
    fireAuth.onAuthStateChanged(account => {
      store.commit("setAccount", account);
      resolve();
    });
    resolve();
  });
};
