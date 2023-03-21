const getOrder= () => {
    const windowSearch = window.location.search
    // récupère le n° de cmd
    const urlParams = new URLSearchParams(windowSearch)
    // retourne le n° de cmd
    return urlParams.get("orderId")
 }
 
const displayOrder = (orderId) => {
    // récupère le contenu du storage
    const orderIdItem = document.getElementById("orderId")
    orderIdItem.textContent = orderId // affiche le n° de cmd
    // retourne le contenu du storage
 }
 
const clearCart = () => {
    const cartCache = window.localStorage
    // efface le contenue du storage
    cartCache.clear()
}
 
const orderId = getOrder()
 // obtient le n° cmd
 displayOrder(orderId) 
 clearCart() // efface le panier après confiramation de cmd
