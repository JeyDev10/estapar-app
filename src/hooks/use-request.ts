import { useState } from "react"

export type UseRequestProps<ParamsType> = {
  request(params?: ParamsType): Promise<Response>
  onSuccess?(): void
  onError?(error: any): void
}

export function useRequest<ParamsType, ReturnType>(props: UseRequestProps<ParamsType>) {
  const [data, setData] = useState<ReturnType>()
  const [error, setError] = useState<unknown>()
  const [isLoading, setIsloading] = useState(false)

  async function handleRequest(params: ParamsType) {
    setData(undefined)
    setError(undefined)
    setIsloading(true)
    try {
      const response = await props.request(params)
      const mountedResponse: ReturnType = await response.json()
      setData(mountedResponse)
      props?.onSuccess?.()
      return mountedResponse
    } catch (error) {
      props.onError?.(error)
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
