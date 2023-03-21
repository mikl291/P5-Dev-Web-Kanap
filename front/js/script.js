// Récupère les données des produits dans l'api
// renvoie un fichier .json
fetch("http://localhost:3000/api/products")
	.then((res) => res.json())
	.then((data) => buildProducts(data))


	const buildProducts = (products) => { 
		// Affiche chaque product de products 
		products.forEach((product) => addProduct(product))
	}
	
	
	const addProduct = (product) => { 
		// Insère les "item" dans items 
		const items = document.getElementById("items")
		const item = document.createElement("a")
		items.append(item)
		// Ajoute lien vers page article
		item.setAttribute("href", "./product.html?id=" + product._id) 
		createArticle(item, product)
	}

	const createImg  = (product, article) => {
		// Insère img avec ses attributs (description/alt et url de l'image)
		const img = document.createElement("img")
		img.setAttribute("src", product.imageUrl)
		img.setAttribute("alt", product.altTxt)
		article.append(img)
	}
	const createName = (product, article) => {
		const productName = document.createElement("h3")
		productName.classList.add("productName")
		productName.textContent = product.name
		article.appendChild(productName)// Insère le titre de l'article
	}
	const createDescription = (product, article) => {
		const productDescription = document.createElement("p")
		productDescription.classList.add("productDescription")
		productDescription.textContent = product.description
		article.appendChild(productDescription) // Insère la description
	} 
	const createArticle = (item, product) => {
		// Insère l'élément article dans item
		const article = document.createElement("article")
		item.append(article)
		createImg(product, article)
		createName(product, article)
		createDescription(product, article)
	}