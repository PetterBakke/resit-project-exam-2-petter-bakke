export function logOut(navigate) {
  localStorage.clear();
  navigate("/");
}

export default logOut;