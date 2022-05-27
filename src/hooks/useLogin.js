import { useState, useEffect } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = (url, method = "GET") => {
  // const [data, setData] = useState(null)
  // const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)
  const { dispatch } = useAuthContext()

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
        console.log("🍗res", res)
        const datas = await res.json()
        console.log("4️⃣", datas)
        if(datas.code === 400){ //user  does not exist
          setIsPending(false)
          setError(datas.message)
          return;
        }else if(datas.code === 200){
          setError(null)
          setIsPending(false)
          dispatch({type: 'LOGIN', payload: datas.data});
        }else if(datas.status === 401){
          setError(null)
          setIsPending(false)
          throw new Error("Invalid username or password")
          // return
        }
      } catch (err) {
        if (err.name === "AbortError") {
          console.log("the fetch was aborted")
        } else {
          setIsPending(false)
          if(err.message === "Failed to fetch"){
            setError("No server response, check your internet connection")
          }else{
            setError(err.message)
          }
        }
      }
    }
    
    if(method === "GET"){
      fetchData();
    }
    if(method === "POST" && options){
      fetchData(options);
    }

    return () => {
      controller.abort()
    }

  }, [url, options, method, dispatch])

  return {isPending, error, postData }
}