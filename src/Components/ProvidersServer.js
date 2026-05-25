// Components/ProvidersServer.jsx
import Providers from "./Providers";

const API = process.env.NEXT_PUBLIC_API_URL;

async function getJSON(url) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function ProvidersServer({ children }) {
  const [
    ChosenForYou,
    saree,
    premium,
    MostFavorite,
    flormar,
    fashion,
    bodyspray,
    bestSellings,
    newArrival,
    allOrder,
    blogs,
    products,
  ] = await Promise.all([
    getJSON(`${API}/productsByCategories?name=Tshirt`),
    getJSON(`${API}/productsByCategories?name=saree`),
    getJSON(`${API}/productsByCategories?name=shirt`),
    getJSON(`${API}/productsByCategories?name=Two piece`),
    getJSON(`${API}/productsByCategories?name=Three piece`),
    getJSON(`${API}/productsByCategories?name=Lehenga`),
    getJSON(`${API}/productsByCategories?name=Men watch`),
    getJSON(`${API}/productsByCategories?name=salwar`),
    getJSON(`${API}/productsByCategories?name=new`),
    getJSON(`${API}/orders`),
    getJSON(`${API}/getBlogs`),
    getJSON(`${API}/getProducts`), // ✅ change endpoint if your app uses different products endpoint
  ]);

  return (
    <Providers
      initialData={{
        ChosenForYou,
        saree,
        premium,
        MostFavorite,
        flormar,
        fashion,
        bodyspray,
        bestSellings,
        newArrival,
        allOrder,
        blogs,
        products,
      }}
    >
      {children}
    </Providers>
  );
}
