export async function apiGet(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`)
  }
  return res.json()
}
