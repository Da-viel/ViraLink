import { useEffect, useState } from "react";
import { useToken } from "../context/TokenContext";

const useFetch = (url) => {
  const [token] = useToken();
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("Loading");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = !token
          ? {}
          : {
              headers: {
                Authorization: token,
              },
            };
        setStatus("Loading");
        const response = await fetch(url, params);
        if (!response.ok) throw new Error(response.statusText);

        const { data } = await response.json();
        setData(data);
        setStatus("Success");
      } catch (error) {
        setStatus(error);
      }
    };
    fetchData();
  }, [url, token]);

  return {
    data,
    status,
  };
};

export default useFetch;
