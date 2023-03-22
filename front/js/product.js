// récupère l'id des produits disponibles
const itemId = new URL(location.href).searchParams.get("id")

fetch("http://localhost:3000/api/products/" + itemId) 
// Requête pour récupérer les json dans Product.js 
// et créer les url pour chaque id de produit
  .then((res) => res.json())
  .then((json) => addDetails(json))
  .catch(function (error) {   // retourner valeur si erreur de l'opération fetch
    error = `Erreur echec du chargement, merci de relancer votre demande.`;
    alert(error);
    })

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

const createSentCart = () => {
  const addToCart = document.querySelector('#addToCart');
  
  if (addToCart != null) {
    addToCart.addEventListener('click', () => {
      const colorSelect = document.querySelector("#colors").value;
      const quantityChoise = parseInt(document.querySelector("#quantity").value);

      if (colorSelect == null || colorSelect === "" || isNaN(quantityChoise) || quantityChoise <= 0 || quantityChoise > 100) {
        alert("Merci de choisir une couleur et une quantité valide entre 1 et 100.");
        return;
      }

      const cartArticle = JSON.parse(localStorage.getItem("cart")) || [];
      const newItem = cartArticle.find((itemData) => itemData.id == itemId && itemData.color == colorSelect);
      
      if (!newItem) {
        const newItem = {
          id: itemId,
          color: colorSelect,
          quantity: quantityChoise,
        };
        cartArticle.push(newItem);
      } else { 
        newItem.quantity += quantityChoise;
      }
      
      localStorage.setItem("cart", JSON.stringify(cartArticle));

      alert(`Votre produit a été ajouté au panier.`);
      window.location.href = "cart.html";
    });
  }
};

   
