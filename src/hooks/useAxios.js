import axios from "axios";
import { useState } from "react";
import { useToast } from "../contexts";

export default function useAxios(url) {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useToast();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);

      return response.data;
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: "ERROR",
        payload: {
          message:
            err?.response?.data?.errorMessage ||
            "Server Error! Please try again",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const postData = async (body) => {
    try {
      setLoading(true);
      const response = await axios.post(url, body);

      return response.data;
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: "ERROR",
        payload: {
          message:
            err?.response?.data?.errorMessage ||
            "Server Error! Please try again",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const removeData = async (body) => {
    try {
      setLoading(true);
      const response = await axios.delete(url, { data: body });

      return response.data;
    } catch (err) {
      console.log(err.response);
      dispatch({
        type: "ERROR",
        payload: {
          message:
            err?.response?.data?.errorMessage ||
            "Server Error! Please try again",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, getData, postData, removeData };
}
