import { fetchUnsplashImages } from "./utils/unsplash.utils"

const fetchShopData = async () => {
  const hats = await fetchUnsplashImages("hats")
  const sneakers = await fetchUnsplashImages("sneakers")
  const jackets = await fetchUnsplashImages("jackets")
  const womens = await fetchUnsplashImages("womens fashion")
  const mens = await fetchUnsplashImages("mens fashion")

  return [
    { title: "Hats", items: hats },
    { title: "Sneakers", items: sneakers },
    { title: "Jackets", items: jackets },
    { title: "Womens", items: womens },
    { title: "Mens", items: mens },
  ]
}

export default fetchShopData
