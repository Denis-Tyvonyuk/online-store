import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const fetchBrands = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};

export const createBasketDevice = async (basketId, deviceId) => {
  const { data } = await $authHost.post("api/basket/device", {
    basketId: basketId,
    deviceId: deviceId,
  });

  return data;
};

export const createOrGetBasket = async (userId) => {
  const { data } = await $authHost.post("api/basket", { userId: userId });
  console.log(data);
  return data.id;
};

export const getBasket = async (userId) => {
  const { data } = await $host.get("api/basket", { userId: userId });
  console.log(data);
  return data.id;
};

export const getBasketDevice = async (basketId) => {
  try {
    const { data } = await $authHost.get("api/basket/device", {
      params: {
        basketId: basketId,
      },
    });

    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching basket devices:", error);
    throw error; // rethrow the error so it can be handled by the calling code
  }
};
