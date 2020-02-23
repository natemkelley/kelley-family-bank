import { auth, DB } from "@/services/fireinit.js";
console.log("fireauth");

function checkIfUsernameIsReal(name) {
  return new Promise(function(resolve, reject) {
    console.log("checking", name);
    setTimeout(() => {
      resolve(false);
    }, 1000);
  });
}

export { checkIfUsernameIsReal };

export default context => {
  const { store } = context;

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        return resolve(store.commit("setUser", user));
      }
      return resolve();
    });
  });
};
