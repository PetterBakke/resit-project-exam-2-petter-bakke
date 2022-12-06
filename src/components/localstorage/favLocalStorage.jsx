export default function FavLocalStorage(favs) {
  localStorage.setItem("Favourites", JSON.stringify(favs))
}