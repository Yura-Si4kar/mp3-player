export const startSession = (user) => {
  localStorage.setItem("email", user.email);
  localStorage.setItem("accessToken", user.accessToken);
}

export const getSession = () => {
  return {
    email: localStorage.getItem("email"),
    accessToken: localStorage.getItem("accessToken"),
  }
}

export const endSession = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("accessToken");
}

export const isLoggedIn = () => {
  return !!getSession().accessToken;
}