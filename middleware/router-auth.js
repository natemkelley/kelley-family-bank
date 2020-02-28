export default function({ store, redirect, route }) {
  console.log(userLoggedIn(store))
  if(isAuthRoute(route) && !userLoggedIn(store)){
    redirect("/")
  }
}

function userLoggedIn(store) {
  return store.state.account != null;
}

function isAuthRoute(route) {
  if (route.matched.some(record => record.path == "/test")) {
    return false;
  } else if (route.matched.some(record => record.path == "/app")) {
    return true;
  } else {
    return false;
  }
}

//https://levelup.gitconnected.com/using-firebase-authentication-in-a-nuxt-server-side-rendered-application-c2a624a9e999