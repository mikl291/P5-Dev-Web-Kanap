const cartForArticle = JSON.parse(localStorage.getItem("cart")) || [];
// utilisée pour convertir cette chaîne de caractères en un objet JavaScript

cartForArticle.forEach((cartItem) => {
  // Requête qui renvoie une promesse, la réponse est convertie en objet JSON
  fetch("http://localhost:3000/api/products/" + cartItem.id)
    .then((res) => res.json())
    .then((product) => displayCartItems(cartItem, product))
    // "catch()" gère les erreurs qui pourraient se produire et s'il y en a une elle est
    // stockée dans la variable "error" et une alerte est affichée pour informer l'utilisateur de l'erreur
    .catch(function (error) {   
      error = `ECHEC DU CHARGEMENT, MERCI DE BIEN VOULOIR RAFFRAICHIR LA PAGE OU APPUYER SUR F5.`;
      alert(error);
      })
})


// met à jour le pris et la quantité du panier
const updateQuantityAndPrice = () => {
  let totalQuantity = 0
  let totalArticlePrice = 0
  let totalCartPrice = 0
  // pointe pour récupérer tous les éléments "article" de la classe "cart__item" dans le DOM
  const articles = document.querySelectorAll("article.cart__item") 
  articles.forEach((article) => {
  // récupère la valeur de la quantité de l'article
  let articleQuantity = parseInt(article.querySelector(".itemQuantity").value)
  // Verification si la quantité est < 1 ou > 100
  if (articleQuantity < 1 || articleQuantity > 100) {
    // math.min/max permet de limiter la quantité saisie par l'utilisateur entre 1 et 100
  articleQuantity = Math.min(Math.max(articleQuantity, 1), 100)
  article.querySelector(".itemQuantity").value = articleQuantity
  alert("LA QUANTITÉ DOIT ETRE COMPRISE ENTRE 1 ET 100!   Merci.")
}
    // récupère le contenu string du 2nd p (correspond à la quantité) et le transforme en number
    totalQuantity += parseInt(articleQuantity) // parseInt convertit une string en number
    const articlePrice = parseInt(article.querySelector(".cart__item__content__description p:nth-of-type(2)").textContent)
    // total par article (non affiché)
    totalArticlePrice = articlePrice * articleQuantity
    // somme de tous les totaux par article (prix du panier)
    totalCartPrice += totalArticlePrice
  })
  // envoie le résultat de totalCartPrice dans le contenu de #totalPrice
  document.querySelector("#totalPrice").textContent = `${totalCartPrice}`
  // idem que précédemment pour #totalQuantity
  document.querySelector("#totalQuantity").textContent = totalQuantity
}


const displayCartItems = (cartItem, product) => {
  //affiche un article
  const cartItems = document.getElementById("cart__items")
  // pointe vers #cart__items où on veut mettre l'article
  const createArticle = () => {
    const cartArticle = document.createElement("article") // crée l'élément HTML article
    cartArticle.classList.add("cart__item") // ajoute une classe à article
    cartArticle.dataset.id = cartItem.id // ajoute un data-id à article
    cartArticle.dataset.color = cartItem.color // ajoute un data-color à article
    cartItems.appendChild(cartArticle) // article est créé avec ses attributs comme enfant de "cart__items"

    createImgWrapper(product, cartArticle)

    const createItemContent = () => {
      const cartItemContent = document.createElement("div")
      cartItemContent.classList.add("cart__item__content")
      //div content créée avec sa classe
      cartArticle.appendChild(cartItemContent)

      const createItemDescription = () => {
        const cartItemDescription = document.createElement("div")
        cartItemDescription.classList.add("cart__item__content__description")
        cartItemContent.appendChild(cartItemDescription)
        //div description créée avec sa classe

        const createItemName = (product) => {
          const cartItemName = document.createElement("h2")
          cartItemName.textContent = product.name
          cartItemDescription.appendChild(cartItemName)
          // h2 name créé
        }
        createItemName(product)

        const createItemColor = (cartItem) => {
          const cartItemColor = document.createElement("p")
          cartItemColor.textContent = cartItem.color
          cartItemDescription.appendChild(cartItemColor)
          // p color créé
        }
        createItemColor(cartItem)

        const createItemPrice = (product) => {
          const cartItemPrice = document.createElement("p")
          const cartItemPriceValue = Number(product.price)
          cartItemPrice.textContent = cartItemPriceValue + "€"
          cartItemDescription.appendChild(cartItemPrice)
          //p price créé
        }
        createItemPrice(product)
      }
      createItemDescription()

      const createItemSettings = () => {}
      const cartItemSettings = document.createElement("div")
      cartItemSettings.classList.add("cart__item__content__settings")
      cartItemContent.appendChild(cartItemSettings)
      //div settings créée avec sa classe

      const createSettingsQuantity = () => {}
      const cartItemSettingsQuantity = document.createElement("div")
      cartItemSettingsQuantity.classList.add("cart__item__content__settings__quantity")
      cartItemSettings.appendChild(cartItemSettingsQuantity)
      // div quantity créée avec sa classe

      const createItemQuantity = () => {}
      const cartItemQuantity = document.createElement("p")
      cartItemQuantity.textContent = "Qté : "
      cartItemSettingsQuantity.appendChild(cartItemQuantity)
      // p quantity créé

      const createInputQuantity = () => {}
      const itemQuantityInput = document.createElement("input")
      itemQuantityInput.type = "number"
      itemQuantityInput.classList.add("itemQuantity")
      itemQuantityInput.name = "itemQuantity"
      itemQuantityInput.min = "1"
      itemQuantityInput.max = "100"
      itemQuantityInput.value = cartItem.quantity
      cartItemSettingsQuantity.appendChild(itemQuantityInput)
      // input quantity créé avec ses attributs


      const createSettingsDelete = () => {}
      const cartItemSettingsDelete = document.createElement("div")
      cartItemSettingsDelete.classList.add("cart__item__content__settings__delete")
      cartItemSettings.appendChild(cartItemSettingsDelete)

      cartItemSettingsDelete.addEventListener(
        "click",
        (deleteItem = () => {
          // donne l'index de l'article cliqué
          const itemToDelete = cartForArticle.findIndex((itemInCart) => 
          cartItem.id === itemInCart.id && cartItem.color === itemInCart.color) 
          // supprime du cart l'article cliqué de façon permanente
          cartForArticle.splice(itemToDelete) 

          // pointe l'article correspondant à l'item
          const articleToDelete = document.querySelector(`article[data-id="${cartItem.id}"][data-color="${cartItem.color}"]`)
          articleToDelete.remove() 
          // supprime l'article du HTML
          window.alert("VOTRE PRODUIT A BIEN ÉTÉ SUPPRIMÉ DU PANIER").

          updateQuantityAndPrice()
          storage()
        })
      )

      const createItemDelete = () => {
        const cartItemDelete = document.createElement("p")
        cartItemDelete.classList.add("deleteItem")
        cartItemDelete.textContent = "Supprimer"
        cartItemSettingsDelete.appendChild(cartItemDelete)
        // p delete créé avec son content
      }
      createItemDelete()
      
      updateQuantityAndPrice()

      itemQuantityInput.addEventListener("change", updateQuantityAndPrice) // change de l'input et exécute l'update

      itemQuantityInput.addEventListener("change", () => {
        // écoute le change de l'input
        let newItemQuantity = document.querySelector(".itemQuantity").value // pointe vers value de itemQuantity pour y mettre la nouvelle value
        const itemToUpdate = cartForArticle.findIndex((article) => article.id === cartItem.id && article.color === cartItem.color) // récupère l'index de l'article à updater
        if (itemToUpdate != -1) {
          // si l'article existe, alors :
          newItemQuantity = Number(itemQuantityInput.value) //remplace la quantié par la nouvelle valeur dans le panier
        }
        cartItem.quantity = newItemQuantity // recalcule la somme des quantités en tenant compte des nouvelles valeurs dans le panier
      })
    }
    createItemContent()
  }

  const createImgWrapper = (product, cartArticle) => {
    // crée la div image de l'article et son contenu dans l'HTML
    const cartItemImg = document.createElement("div")
    cartItemImg.classList.add("cart__item__img")
    cartArticle.appendChild(cartItemImg)
    // div img créée avec sa classe, enfant de "article"

    const itemImg = document.createElement("img")
    itemImg.setAttribute("src", product.imageUrl)
    itemImg.setAttribute("alt", product.altTxt)
    cartItemImg.appendChild(itemImg)
    // élément img créé avec ses attributs, enfant de "cart__item__img"
  }
  createArticle()
}

const storage = () => {
  document.addEventListener(
    "click",
    () => {
      // écoute le click sur le document
      localStorage.setItem("cart", JSON.stringify(cartForArticle))
      updateQuantityAndPrice()
    },
    [cartForArticle]
  ) 
  // remplace le contenu du localStorage par celui du cartContent 
  // afin de sauvegarder dans le cache le panier après avoir quitter la page
  updateQuantityAndPrice()
}
updateQuantityAndPrice()
storage()

// --------------------------------------- Formulaire---------------------------------- //

const form = document.querySelector("#form")
const orderButton = document.querySelector("#order")

orderButton.addEventListener("click", (event) => {
  event.preventDefault();

  // Récupérer les valeurs de contact et de produits
  const productsIdsFromCache = () => cartForArticle.map(({ id }) => id.split("-")[0])
  const contact = {
    firstName: firstName.value,
    lastName: lastName.value,
    address: address.value,
    city: city.value,
    email: email.value,
  };

  // Vérifier que tous les champs requis ont été remplis
  const requiredFields = ["firstName", "lastName", "address", "city", "email"]; // champs requis
  const missingFields = requiredFields.filter((field) => !contact[field].trim()); // en cas de champs requis manquant
  if (missingFields.length) {
    alert(`LES CHAMPS DE SAISIES SONT OBLIGATOIRE : ${missingFields.join(", ")}`);
    return;
  }

  // Vérifier la validité de l'adresse mail
  if (!emailRegex.test(contact.email)) {
    alert("VEUILLEZ SAISIR UNE ADRESSE MAIL VALIDE DE TYPE exemple@domaine.xx");
    return;
  }

  // Effectuer la requête fetch
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    body: JSON.stringify({ contact, products: productsIdsFromCache() }),
    headers: { "Content-type": "application/json" },
  })
    .then((res) => res.json())
    .then(({ orderId }) => {
      window.location.href = `/front/html/confirmation.html?orderId=${orderId}`;
    });
});


const nameRegex = /^[a-zA-Z\-\'\s]+$/;
const addressRegex = /^[a-zA-Z0-9\s\,\'\-]*$/;
const cityRegex = /^[a-zA-Z\-\'\s]+$/;
const emailRegex = /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+\.[A-Za-z][A-Za-z]{1,}$/;

const validateString = (val) => {
  const trimmedVal = val.trim();
  return !trimmedVal.startsWith(" ") && nameRegex.test(trimmedVal);
};

const addTrimEventListener = (element, errorElement, regex, errorMsg) => {
  element.addEventListener("input", (event) => {
    event.preventDefault();
    const content = element.value;
    const trimmedContent = content.trimStart();
    if (!regex.test(trimmedContent)) {
      errorElement.textContent = errorMsg;
      element.focus();
    } else if (element.id === "email" && !emailRegex.test(trimmedContent)) { // Vérification de l'email
      errorElement.textContent = "Format d'adresse mail non conforme.";
      element.focus();
    } else {
      element.value = trimmedContent;
      errorElement.textContent = "";
    }
    if (content !== trimmedContent) {
      alert("LES ESPACES INUTILES SERONT DÉTECTÉS ET SUPPRIMÉS AUTOMATIQUEMENT");
    }
  });
};

addTrimEventListener(firstName, document.querySelector("#firstNameErrorMsg"), nameRegex, "Le prénom doit être composé de lettres (le tiret et l'apostrophe sont acceptés).");
addTrimEventListener(lastName, document.querySelector("#lastNameErrorMsg"), nameRegex, "Le nom doit être composé de lettres (le tiret et l'apostrophe sont acceptés).");
addTrimEventListener(address, document.querySelector("#addressErrorMsg"), addressRegex, "Format d'adresse non conforme.");
addTrimEventListener(city, document.querySelector("#cityErrorMsg"), nameRegex, "Le nom de la ville doit être composé de lettres (le tiret et l'apostrophe sont acceptés).");
addTrimEventListener(email, document.querySelector("#emailErrorMsg"), emailRegex, "Format d'adresse mail non conforme.");