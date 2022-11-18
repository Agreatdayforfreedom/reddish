import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Config } from "../../interfaces/interfaces";

interface Payload {
  id?: string;
  payload?: {
    content: string;
  };
  config?: Config;
}

export const getAnswersThunk = createAsyncThunk(
  "answer/getAnswers",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/answer/${id}`
      );
      return data;
    } catch (error) {
      return rejectWithValue("There was an problem, please try again");
    }
  }
);

export const getAnswerThunk = createAsyncThunk(
  "answer/getAnswer",
  async ({ id, config }: Payload, { rejectWithValue }) => {
    try {
      const { data } = await axios(
        `${import.meta.env.VITE_BACKEND_URL}/answer/get/${id}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue("There was an problem, please try again");
    }
  }
);

export const createAnswerThunk = createAsyncThunk(
  "answer/createAnswer",
  async ({ id, payload, config }: Payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/answer/new/${id}`,
        payload,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);

export const editAnswerThunk = createAsyncThunk(
  "answer/editAnswer",
  async ({ id, payload, config }: Payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/answer/edit/${id}`,
        payload,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);

export const deleteAnswerThunk = createAsyncThunk(
  "answer/deleteAnswer",
  async ({ id, config }: Payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/answer/delete/${id}`,
        config
      );
      return { data, id };
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);
