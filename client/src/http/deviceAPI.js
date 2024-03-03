import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const deleteType = async (typeName) => {
  try {
    const response = await $authHost.delete("api/type", {
      data: { name: typeName },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting type:", error);
    // You might want to handle the error or log it appropriately
    throw error; // Rethrow the error if needed
  }
};

export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const deleteBrand = async (brandName) => {
  try {
    const response = await $authHost.delete("api/brand", {
      data: { name: brandName },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting brand:", error);
    // You might want to handle the error or log it appropriately
    throw error; // Rethrow the error if needed
  }
};

export const fetchBrands = async (typeId, brandId, page, limit = 5) => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const deleteDevice = async (deviceName) => {
  try {
    const response = await $authHost.delete("api/device", {
      data: { name: deviceName },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting device:", error);
    // You might want to handle the error or log it appropriately
    throw error; // Rethrow the error if needed
  }
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

export const addRating = async (userId, deviceId, rating) => {
  try {
    const { data } = await $authHost.post("api/rating/", {
      userId: userId,
      deviceId: deviceId,
      rating: rating,
    });

    return data;
  } catch (error) {
    console.error("addRating error:", error);
  }
};

export const getRating = async (deviceId) => {
  try {
    const { data } = await $host.get("api/rating/", {
      params: { deviceId: deviceId },
    });
    if (data !== "Nan") {
      return data;
    } else {
      return 0;
    }
  } catch (error) {
    console.error("getRating error:", error);
  }
};
