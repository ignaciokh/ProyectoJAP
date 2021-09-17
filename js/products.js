const ORDER_ASC_BY_PRICE = "Precio de mayor a menor";
const ORDER_DESC_BY_PRICE = "Precio de menor a mayor";
const ORDER_BY_PROD_RELEVANT = "Relevancia";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var JsonContenido = [];


function sortProduct(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_PRICE){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_RELEVANT){
        result = array.sort(function(a, b) {

            if ( a.soldCount > b.soldCount ){ return -1; }
            if ( a.soldCount < b.soldCount ){ return 1; }
            return 0;
        });
    }

    return result;// va a dar como resultado una array results con los elementos ordenados
}





function showProductsList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let product = currentCategoriesArray[i]; // variable creada al coemienzo del código

        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))){ // comprueba que category.productCount esté entre las valores agregados en el elemento
              

            htmlContentToAppend +=  `
                <div class="list-group-item"  onclick="sendProducsInfo()">
                    <div>
                        <div class="d-flex justify-content-between">
                            <h4 class="card-title"> ${product.name} </h4>
                            <p><small class="text-secondary">Total de artículos vendidos:  ${product.soldCount} </small></p>
                        </div>
                        <div>
                            <p> ${product.description} </p>
                        </div>
                    </div>
                    <div>
                        <div class="img">
                            <img src=" ${product.imgSrc}" " class="img-fluid">
                        </div>
                        <div>
                            <p>${product.currency} ${product.cost}</p>
                        </div>    
                    </div>
                </div>`
            }

        document.getElementById("contenedorProductos").innerHTML = htmlContentToAppend;
    }
}



function sortAndShowProducts(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;

    if(categoriesArray != undefined){
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

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_RELEVANT);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });


    document.getElementById("formularioBusqueda").addEventListener(`keyup`, () =>{
        let contenedor = document.getElementById("formularioBusqueda");

        for(JsonContent of JsonContenido){
            if(JsonContent.name.indexOf(contenedor.value) != -1){
                
            htmlContentToAppend =  `
                <div class="list-group-item"  onclick="sendProducsInfo()">
                    <div>
                        <div class="d-flex justify-content-between">
                            <h4 class="card-title"> ${JsonContent.name} </h4>
                            <p><small class="text-secondary">Total de artículos vendidos:  ${JsonContent.soldCount} </small></p>
                        </div>
                        <div>
                            <p> ${JsonContent.description} </p>
                        </div>
                    </div>
                    <div>
                        <div class="img">
                            <img src=" ${JsonContent.imgSrc}" " class="img-fluid">
                        </div>
                        <div>
                            <p>${JsonContent.currency} ${JsonContent.cost}</p>
                        </div>    
                    </div>
                </div>`

            document.getElementById("contenedorProductos").innerHTML = htmlContentToAppend;
            if(contenedor.value === "")
                showProductsList();
            }
        }
    });
});

    function sendProducsInfo(){
        window.location.href = "product-info.html";
    }