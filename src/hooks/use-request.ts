import { useState } from "react"

export type UseRequestProps<ParamsType, ReturnType> = {
  request(params?: ParamsType): Promise<Response>
}

export function useRequest<ParamsType, ReturnType>(props: UseRequestProps<ParamsType, ReturnType>) {
  const [data, setData] = useState<ReturnType>()
  const [error, setError] = useState<any>()
  const [isLoading, setIsloading] = useState(false)

  async function handleRequest(params: ParamsType) {
    setData(undefined)
    setError(undefined)
    setIsloading(true)
    try {
      const response = await props.request(params)
      const mountedResponse: ReturnType = await response.json()
      setData(mountedResponse)
      return mountedResponse
    } catch (error) {
      setError(error)
    } finally {
      setIsloading(false)
    }
  }

  return {
    handleRequest,
    data,
    error,
    isLoading
  }
}
