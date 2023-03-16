// récupère l'id des produits disponibles
const itemId = new URL(location.href).searchParams.get("id")

fetch("http://localhost:3000/api/products/" + itemId) 
// Requête pour récupérer les json dans Product.js 
// et créer les url pour chaque id de produit
  .then((res) => res.json())
  .then((json) => addDetails(json))

const addDetails = (product) => {
  // Ajout des détails du produit
  createImg(product)   //l'image
  createTitle(product) //le nom
  createPrice(product) //le prix
  createDecsription(product)  //la description
  createOption(product) // les options (couleurs et quantité)
  createSentCart() // l'envoie au panier
}

const createImg = (product) => {
  // création de l'element
  const img = document.createElement("img")
  // Ajout de l'url
  img.setAttribute("src", product.imageUrl) 
  // Ajout de l'alt
  img.setAttribute("alt", product.altTxt)
  // img crée avec 2 attributs
  const kanapImage = document.querySelector(".item__img")
  kanapImage.append(img)
  // .kanapImage créé , parent de img -> insère la photo de l'article
  console.log("Image ajoutée")
}


const createTitle = (product) => {
  const itemTitle = document.querySelector("#title")
  itemTitle.textContent = product.name
  // insère le nom du produit dans #title
  console.log("Titre ajouté")
}


const createPrice = (product) => {
  const itemPrice = document.querySelector("#price")
  itemPrice.textContent = product.price
  // insère le prix du produit dans #price
  console.log("Prix ajouté")
}


const createDecsription = (product) => {
  const itemDescription = document.getElementById("description")
  itemDescription.textContent = product.description
  // insère la description du produit dans description
  console.log("Description ajouté")
}


const createOption = (colors) => {
  const colorSelect = document.querySelector('#colors')
  colors.colors.forEach((color) => {
    const option = document.createElement("option")
    option.textContent = color
    option.value = color
    colorSelect.append(option)
    // insère la couleur dans la liste des couleurs
    console.log("Couleur disponible ajouté")
    console.log("Option ajouté")
    })
}
//////////////////RESTE A ENVOYER LA PAGE PRODUIT /////////////////
//////////////////      DANS LE PANIER            /////////////////  

// Si j'appuie sur le button l'objet est envoyé au panier
// avec la couleur et la quantité selectionné en vérifiant 
// si le produit est déjà dans le panier alors +1 (si meme couleur)
// sinon couleur differente = nouvelle ligne page panier (via l'id)
// alerte en cas de couleur ET quantité non choisi
// alors --> empecher la redirection vers la page panier

const createSentCart = () => {
  const addToCart = document.querySelector('#addToCart')
  // Verification quantités soit non nul
  if (addToCart != null) {
    // si addToCart est non égal à null
    // alors choix de la couleur et de la quantité
    addToCart.addEventListener('click', () => {
      // Ce qu'il se passe au "click" sur  le bouton
      const colorSelect = document.querySelector("#colors").value;
      const quantityChoise = parseInt(document.querySelector("#quantity").value); //parseInt permet de recuperer le nombre entier
        // si colorSelect ou quantityChoise est égal a "null"
      // si colorSelect est stictement égal à "" ou quantityChoise strictement égal à 0
      if (colorSelect == null || quantityChoise == null || colorSelect === "" ||  quantityChoise == 0) {
      // ALORS
      // alerte 
      alert("Merci de choisir une couleur et/où une quantité SVP.");
      console.log("alerte")
      return; // empêche la redirection vers la page panier
      }
      // si l'article n'existe pas encore, sur la page panier, 
      // alors on recupere ses datas
      // 
      const cartArticle = JSON.parse(localStorage.getItem("cart")) || [];
        // transforme le panier JSON en objet
      const newItem = cartArticle.find((itemData) => itemData.id == itemId && itemData.color == colorSelect)
      // .find = renvoie la valeur du premier élément trouvé dans le tableau 
      // qui respecte la condition donnée par la fonction de test passée en argument
      // verifie si l'id et la color sont identiques à un article déjà existant dans le panier
      // si l'article n'existe pas encore, on crée un nouveau item
      if (!newItem) {
        const newItem = {
        id: itemId,
        color: colorSelect,
        quantity: quantityChoise,
        }
      // Ajout d'une nouvelle ligne si nouvel article
      cartArticle.push(newItem) 
      }
      // sinon on augmente seulement la quantité
      else { 
        newItem.quantity += quantityChoise
      }
      // localStorage sauvegarde
      localStorage.setItem("cart", JSON.stringify(cartArticle))
      console.log("Le localStorage est à jour !", localStorage.getItem("cart"))

      // redirection vers la page panier
      window.location.href = "cart.html"
    })
  }
}