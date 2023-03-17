import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const usePost = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const postData = async () => {
      setLoading(true);
      try {
        const res = await axios.post(url);
        setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    postData();
  }, [url]);

  const rePostData = async () => {
    setLoading(true);
    try {
      const res = await axios.post(url);
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  return { data, loading, error, rePostData };
};
export default usePost;
