export default function({ store, redirect, route }) {
  //only allow auth users to see app
  (userLoggedIn(store) && isAuthRoute(route)) || route.name == "test"
    ? ""
    : redirect("/");
}

function userLoggedIn(store) {
  return store.state.account != null;
}

function isAuthRoute(route) {
  if (route.matched.some(record => record.path == "/test")) {
    return true;
  } else if (route.matched.some(record => record.path == "/app")) {
    return true;
  } else {
    return false;
  }
}
