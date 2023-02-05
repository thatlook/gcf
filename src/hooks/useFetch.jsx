import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import qs from 'query-string';

// reference: https://dev.to/techcheck/custom-react-hook-usefetch-eid
export const useFetch = url => {
  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState(null);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await axios.get(`http://localhost:3000${url}`);
        const data = await resp?.data;

        setApiData(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setServerError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, apiData, serverError };
};

// reference: https://medium.com/suyeonme/react-how-to-implement-an-infinite-scroll-749003e9896a
export const useFetchInfiniteScroll = (url, query) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState([]);

  const sendQuery = useCallback(
    async startIndex => {
      try {
        await setLoading(true);
        await setError(false);
        const res = await axios.get(
          `http://localhost:3000${url}?${qs.stringify({
            ...query,
            page: startIndex
          })}` // todo: check multiple queries
        );
        if (startIndex === 0) {
          await setList(prev => [...res.data]);
        } else {
          await setList(prev => [...prev, ...res.data]);
        }
        setLoading(false);
      } catch (err) {
        setError(err);
      }
    },
    [url, query]
  );

  useEffect(() => {
    sendQuery(0);
  }, [url, query]);

  return { loading, error, list, sendQuery };
};
