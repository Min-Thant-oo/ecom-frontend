import React, { useEffect, useState } from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const imageRoute = process.env.NEXT_PUBLIC_IMAGE_ROUTE;
const baseApiRoute = process.env.NEXT_PUBLIC_BASE_API_URL;

export const addToFavouriteAsync = createAsyncThunk(
  "amazon/addToFavourite",
  async ({ user_id, product_id, api_token }, thunkAPI) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("product_id", product_id);

    try {
      const response = await axios.post(`${baseApiRoute}/favourite`, formData, {
        headers: {
          Authorization: `Bearer ${api_token}`,
        },
      });
      // amazonSlice.actions.addToFavourite({
      //   product_id: product_id,
      // });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeFromFavouriteAsync = createAsyncThunk(
  "amazon/removeFromFavourite",
  async ({ user_id, product_id, api_token }, thunkAPI) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("product_id", product_id);

    try {
      const response = await axios.post(
        `${baseApiRoute}/removefromfavourite`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${api_token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserFavouritesAsync = createAsyncThunk(
  "amazon/fetchUserFavourites",
  async ({ api_token }, thunkAPI) => {
    try {
      const response = await axios.get(`${baseApiRoute}/getfavourite`, {
        headers: {
          Authorization: `Bearer ${api_token}`,
          Accept: "application/json",
        },
      });
      return response.data.favourites;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserNameAsync = createAsyncThunk(
  "amazon/fetchUserNameFavourties",
  async ({ api_token }, thunkAPI) => {
    try {
      const response = await axios.get(`${baseApiRoute}/userinfo`, {
        headers: {
          Authorization: `Bearer ${api_token}`,
          Accept: "application/json",
        },
      });
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// export const fetchCategoryAsync = createAsyncThunk(
//   "amazon/fetchCategoryAsync",
//   async (thunkAPI) => {
//     try {
//       const response = await axios.get(`${baseApiRoute}/getcategories`)
//       return response.data.category;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data);
//     }
//   }
// )

const initialState = {
  products: [],
  favourites: [],
  categories: [],
  userInfo: {
    name: null,
    email: null,
    image: null,
  },
  // isLoading: false,
  error: false,
};

export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    // Actions

    // setUsername: (state, action) => {
    //   state.userInfo.name = action.payload;
    // },

    setUsername: (state, action) => {
      state.userInfo = { ...state.userInfo, name: action.payload };
    },

    clearUsername: (state) => {
      state.userInfo.name = null;
    },

    setUserEmail: (state, action) => {
      state.userInfo = { ...state.userInfo, email: action.payload };
    },

    setUserImage: (state, action) => {
      state.userInfo = { ...state.userInfo, image: action.payload };
    },

    // setCategories: (state, action) => {
    //   state.categories = { ...state.categories, name: action.payload }
    // },

    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.products = [];
      window.scrollTo({ top: 0 });
    },

    quantityIncrement: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      item.quantity++;
    },

    quantityDecrement: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },

    setFavourites: (state, action) => {
      state.favourites = action.payload;
    },

    addToFavourite: (state, action) => {
      const item = state.favourites.find((item) => item === action.payload.id);
      if (!item) {
        state.favourites.push(action.payload);
      }
    },

    removeFromFavourite: (state, action) => {
      // const item = state.favourites.find(
      //   (item) => item === action.payload.id
      // );
      // if (item) {
      state.favourites = state.favourites.filter(
        (item) => item.id !== action.payload.id
      );
      // }
    },

    clearFavourite: (state, action) => {
      state.favourites = [];
    },
  },
});

export const {
  setUsername,
  setUserEmail,
  setUserImage,
  clearUsername,
  setCategories,
  addToCart,
  removeFromCart,
  clearCart,
  setFavourites,
  addToFavourite,
  removeFromFavourite,
  clearFavourite,
  quantityIncrement,
  quantityDecrement,
} = amazonSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.amazon.products;
export const selectFavourites = (state) => state.amazon.favourites;
export const selectUsername = (state) => state.amazon.userInfo.name;
export const selectUserEmail = (state) => state.amazon.userInfo.email;
export const selectUserImage = (state) => state.amazon.userInfo.image;
export const selectCategories = (state) => state.amazon.categories;
export const selectTotal = (state) =>
  state.amazon.products.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

export default amazonSlice.reducer;
