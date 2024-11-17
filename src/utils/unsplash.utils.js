import axios from "axios"

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export const fetchUnsplashImages = async (query, count = 10) => {
  const response = await axios.get("https://api.unsplash.com/photos/random", {
    params: {
      query,
      count,
      client_id: UNSPLASH_ACCESS_KEY,
    },
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    },
  })

  return response.data.map((image) => ({
    id: image.id,
    // name: image.description || image.alt_description || "Untitled",
    imageUrl: image.urls.small,
    price: +Math.floor(Math.random() * 100) + 1,
  }))
}
