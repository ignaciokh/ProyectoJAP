const ORDER_ASC_BY_PRICE = "Precio de mayor a menor";
const ORDER_DESC_BY_PRICE = "Precio de menor a mayor";
const ORDER_BY_PROD_RELEVANT = "Relevancia";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var JsonContenido = [];


function sortProduct(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_RELEVANT) {
        result = array.sort(function (a, b) {

            if (a.soldCount > b.soldCount) { return -1; }
            if (a.soldCount < b.soldCount) { return 1; }
            return 0;
        });
    }

    return result;// va a dar como resultado una array results con los elementos ordenados
}





function showProductsList() {

    let htmlContentToAppend = "";
    for (let i = 0; i < currentCategoriesArray.length; i++) {
        let product = currentCategoriesArray[i]; // variable creada al coemienzo del código

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) { // comprueba que category.productCount esté entre las valores agregados en el elemento


            htmlContentToAppend += `
            <div class="card col-12 col-lg-3 m-3 p-3" style="border-radius: 2%; background-color: #D3D3D3;">
                <img src="${product.imgSrc}" class="card-img-top" style= "border-radius: 5%; cursor:pointer" alt="..." onclick="sendProducsInfo()">
                <hr>
                <div class ="card-body">
                    <h4 class ="card-title">${product.name}</h4>
                    <p><small class ="text-secondary">Total de artículos vendidos: ${product.soldCount} </small></p>
                    <p class ="card-text">${product.description}</p>
                    <div>
                    <p class = "mt-2">${product.currency} ${product.cost}</p>
                    </div>
                </div>
                <button class="btn btn-dark" onclick=sendCarrito("${product.imgSrc}","${product.currency}",${product.cost})><i class="fas fa-shopping-cart"></i></button>
            </div>`
        }

        document.getElementById("contenedorProductos").innerHTML = htmlContentToAppend;
    }
}


//Gurdando data de producto en local para pasar a carrito
sendCarrito = (img, moneda, precio) => {

    let objetoCarrito = 
    {
    "imagen": img,                    
    "moneda": moneda,
    "precio": precio
    }

    console.log(objetoCarrito);
    localStorage.setItem('ObjetosCarritoCompra', JSON.stringify(objetoCarrito));

};

//REDIRECCIÓN
sendProducsInfo = () => window.location.href = "product-info.html";



function sortAndShowProducts(sortCriteria, categoriesArray) {
    currentSortCriteria = sortCriteria;

    if (categoriesArray != undefined) {
        currentCategoriesArray = categoriesArray;
    }

    currentCategoriesArray = sortProduct(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (enlace) {
        if (enlace.status === "ok") {

            JsonContenido = enlace.data;
            sortAndShowProducts(ORDER_ASC_BY_PRICE, enlace.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_RELEVANT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });



    //buscador
    document.getElementById("formularioBusqueda").addEventListener(`keyup`, () => {
        let contenedor = document.getElementById("formularioBusqueda");
        let h4 = document.getElementsByTagName("h4");

        for (let i = 0; i < h4.length; i++) {
            let contenido = h4[i].innerText;

            if (contenido.toLowerCase().indexOf(contenedor.value.toLowerCase()) !== -1) {
                h4[i].parentNode.parentNode.style.display = "";
            } else {
                h4[i].parentNode.parentNode.style.display = "none";
            }
        }
    });
});





