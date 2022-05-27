import { useState, useEffect } from "react"

export const useCreate = (url, method = "GET") => {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)


  const postData = (postData) => {
    setOptions({
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postData)
    })
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (fetchOptions) => {
      setIsPending(true)
    
      try {
        const res = await fetch(url, { ...fetchOptions, signal: controller.signal })
        const value = await res.json();
        if(value.statusCode === 400){
          setIsPending(false)
          setError(value.message)
          return;
        }else if(value.statusCode === 200){
          setData(value);
          setError(null);
          setIsPending(false);
        }
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          setError("No server response, check your internet connection")
        }
      }
    }
    if(method === "POST" && options){
      fetchData(options);
    }

    return () => {
      controller.abort()
    }

  }, [url, options, method])

  return { data, isPending, error, postData }
}