import Cookies from "universal-cookie";

const cookies = new Cookies(document.cookie ?? null, {
  path: "/",
  expires: new Date(new Date().setDate(new Date().getDate() + 1)),
});

export default cookies;
