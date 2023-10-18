export const startSession = (user) => {
  localStorage.setItem("email", user.email);
  localStorage.setItem("accessToken", user.accessToken);
  localStorage.setItem("user", JSON.stringify(user));
}

export const getSession = () => {
  return {
    email: localStorage.getItem("email"),
    accessToken: localStorage.getItem("accessToken"),
    user: JSON.parse(localStorage.getItem("user"))
  }
}

export const endSession = () => {
  localStorage.clear();
}

export const isLoggedIn = () => {
  return getSession();
}