class Service {
  private API_URL = process.env.NEXT_PUBLIC_API_URL
  private token: string

  constructor(token: string) {
    this.token = token
  }

  public async get(endpoint: string, params?: Record<string, any>, signal?: AbortSignal): Promise<Response> {
    const url = new URL(`${this.API_URL}${endpoint}`)
    const validParameters = params ? JSON.parse(JSON.stringify(params)) : {}
    url.search = new URLSearchParams(validParameters).toString()

    return fetch(url.href, {
      signal,
      method: "GET",
      headers: this.getHeaders()
    }).then((response) => {
      if (!response.ok) throw response
      return response
    })
  }

  public async post(endpoint: string, params?: Record<string, any>, signal?: AbortSignal): Promise<Response> {
    const url = new URL(`${this.API_URL}${endpoint}`)
    return fetch(url.href, {
      signal,
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(params)
    }).then((response) => {
      if (!response.ok) throw response
      return response
    })
  }

  public async put(endpoint: string, params?: Record<string, any>, signal?: AbortSignal): Promise<Response> {
    const url = new URL(`${this.API_URL}${endpoint}`)
    return fetch(url.href, {
      signal,
      method: "PUT",
      headers: this.getHeaders(),
      body: JSON.stringify(params)
    }).then((response) => {
      if (!response.ok) throw response
      return response
    })
  }

  private getHeaders(): Headers {
    const token = this.token
    const headers: Headers = new Headers()

    headers.set("content-type", "application/json")
    headers.set("accept", "application/json, */*;q=0.9")
    if (token) headers.set("authorization", `Bearer ${token}`)
    return headers
  }
}

export default Service
