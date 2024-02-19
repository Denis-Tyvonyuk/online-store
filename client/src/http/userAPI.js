import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode"; // Correct import statement

export const registration = async (email, password) => {
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role: "ADMIN",
  });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", { email, password });
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const check = async () => {
  const { data } = await $authHost.get("api/user/auth");

  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

export const getUserInfo = async () => {
  try {
    const { data } = await $authHost.get("api/user/auth");
    localStorage.setItem("token", data.token);
    const info = jwtDecode(data.token);
    return info;
  } catch {
    return console.log("the user is not registered");
  }
};
