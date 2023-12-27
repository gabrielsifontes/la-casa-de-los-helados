import { useState, useEffect } from "react"

export default function useFetch(url, options) {

  const [loading, set_loading] = useState(true)
  const [result, set_result] = useState(null)
  const [error, set_error] = useState(null)

  useEffect(function() {
    (async function() {
      try {
        const res = await fetch(url, options)

        const json = await res.json()

        set_result(json)
        set_loading(false)
      } catch (err) {
        set_error(err)
        set_loading(false)
      }
    })()
  }, [options, url])

  return { loading, result, error }
}
