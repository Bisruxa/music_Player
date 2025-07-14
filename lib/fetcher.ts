export default function fetcher(url: string, data = undefined) {
  return fetch(`${window.location.origin}/api${url}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data ? JSON.stringify(data) : undefined,
  }).then((res) => {
    // fix status check condition, should be status < 200 or >= 400
    if (res.status < 200 || res.status >= 400) {
      throw new Error('Network response was not ok')
    }
    return res.json()
  })
}
