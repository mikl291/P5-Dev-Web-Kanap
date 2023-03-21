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
}


const createTitle = (product) => {
  const itemTitle = document.querySelector("#title")
  itemTitle.textContent = product.name
  // insère le nom du produit dans #title
}


const createPrice = (product) => {
  const itemPrice = document.querySelector("#price")
  itemPrice.textContent = product.price
  // insère le prix du produit dans #price
}


const createDecsription = (product) => {
  const itemDescription = document.getElementById("description")
  itemDescription.textContent = product.description
  // insère la description du produit dans description
}


const createOption = (colors) => {
  const colorSelect = document.querySelector('#colors')
  colors.colors.forEach((color) => {
    const option = document.createElement("option")
    option.textContent = color
    option.value = color
    colorSelect.append(option)
    // insère la couleur dans la liste des couleurs
    })
}

const createSentCart = () => {
  const addToCart = document.querySelector('#addToCart')
  // Verification quantités soit non nul
  if (addToCart != null) {
    // si addToCart est non égal à null
    // alors choix de la couleur et de la quantité
    addToCart.addEventListener('click', () => {
      // Ce qu'il se passe au "click" sur  le bouton
      const colorSelect = document.querySelector("#colors").value;
      const quantityChoice = parseInt(document.querySelector("#quantity").value); //parseInt permet de recuperer le nombre entier
        // si colorSelect ou quantityChoice est égal a "null"
      // si colorSelect est stictement égal à "" ou quantityChoice strictement égal à 0
      if (colorSelect == null || quantityChoice == null || colorSelect === "" ||  quantityChoice == 0 || quantityChoice <0 ) {
      alert("Merci de choisir une couleur et/où une quantité SVP.");
      return; // empêche la redirection vers la page panier
      }

      function validateForm(colors, colorThatDoesNotExist) {
        const validColors = {}

        for (let i = 0; i < colors.length; i++) {
          const color = colors[i]
          validColors[color] = true
        }
        if (validColors[colorThatDoesNotExist]) {
          return true
        }
        return false
        }

      // si l'article n'existe pas encore, sur la page panier, 
      // alors on recupere ses datas
      // 
      const cartArticle = JSON.parse(localStorage.getItem("cart")) || [];
        // transforme le panier JSON en objet
      const newItem = cartArticle.find((itemData) => itemData.id == itemId && itemData.color == colorSelect)
      
      // verifie si l'id et la color sont identiques à un article déjà existant dans le panier
      // si l'article n'existe pas encore, on crée un nouveau item
      if (!newItem) {
        const newItem = {
        id: itemId,
        color: colorSelect,
        quantity: quantityChoice,
        }
      // Ajout d'une nouvelle ligne si nouvel article
      cartArticle.push(newItem) 
      }
      // sinon on augmente seulement la quantité
      else { 
        newItem.quantity += quantityChoice
      }
      // localStorage sauvegarde
      localStorage.setItem("cart", JSON.stringify(cartArticle))

      // redirection vers la page panier
      window.location.href = "cart.html"
    })
  }
}