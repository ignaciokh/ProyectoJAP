var infoProducts = [];

//Mostrar el producto y elementos 
function showProductsInfo(data){

    document.getElementById("nombreProductos").innerHTML = data.name;
    document.getElementById("categoriasProducts").innerHTML = data.category;
    document.getElementById("descripction").innerHTML = data.description;
    document.getElementById("currencyCost").innerHTML = data.currency + " " + data.cost;
    document.getElementById("soldCount").innerHTML = data.soldCount;
    showImagesInfo(data);
}



// Muestra solo las imagenes del producto
function showImagesInfo(array){

    let HTMLContettoHappened = `
    <div class="carousel-item active">
        <img src="${array.images[0]}" class="d-block w-100">
    </div>
        `
    document.getElementById("imgContent").innerHTML = HTMLContettoHappened;// Fuera del for porque la primer imagen necesita tener clase active 
    

    for(let i = 1; i< array.images.length; i++){
      
        let HTMLContent = 
        `
        <div class="carousel-item">
            <img src="${array.images[i]}" class="d-block w-100">
        </div>

        `
        document.getElementById("imgContent").innerHTML += HTMLContent;
    }
    
}


// Productos relacionados
function relatedProducts(data){
    let info = infoProducts.relatedProducts

    for(let i = 0; i < info.length; i++){

        htmlContent = `
        <div class="col-12 col-lg-3 " onclick= "sendProducts()">
                <div class="card border border-3 my-2 bg-light" style="width: 250px; height: 350px;">
                    <img src="${data[info[i]].imgSrc}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <h5 class="card-title">${data[info[i]].name}</h5>
                    <p class="card-text">${data[info[i]].description}</p>
                    </div>
                </div>
        </div>`

    document.getElementById("ContenedorProductosRel").innerHTML += htmlContent;
    }
}
//redirección desde artículos relacionados 
function sendProducts(){
    window.location.href = "products.html";
}



// Función usada solo para las estrellas ya que se repite en las dos funciones que corresponden a comentarios  
function checkStars(data){

    let puntuacion = "";

    for(let i = 0; i < data; i++){
        let HTMLComentario = `            
                <span class="fa fa-star checked"></span>
            `

        puntuacion += HTMLComentario;
    }
    for(let j= data; j < 5; j++){
        puntuacion += `            
        <span class="fa fa-star "></span>
    `
    }
    return puntuacion;
}



// Mustra los cometarios recuperados del doc Json
function showComents(data){

    for(datos of data){

        let HTMLContent = `
            <div class="ComentConteiner" >
                <div class=" mb-4">
                    <div class = "d-flex justify-content-end"">
                        <small class = "text-muted">${datos.dateTime}</small> 
                    </div>
                        <div><strong>${datos.user}</strong>             
                    </div>
                </div>    
                    <p>${datos.description}</p>
                <div class = "mt-5 ">
                    ${checkStars(datos.score)}
                </div>
            <div>
        `
        document.getElementById("ContenedorComents").innerHTML += HTMLContent;
    }
}





// Agrega el comentario realizado
function postComments(){
    let comentario = document.getElementById("areaComentario").value;
    let usuario = localStorage.getItem("usuario");
    let puntuacion = document.getElementById("PuntuacionProduct");
    let comentariosLista = document.getElementById("ContenedorComents");
    let fecha = new Date();
    


    if(comentario === ""){
        alert("Debes completar todos los campos antes de enviar tu comentario");
    }else{

        let contentHTML =
        `<div class="ComentConteiner" >
            <div class="d-flex w-100 justify-content-between mb-4">
                <div class = "mb-1"><strong>${usuario}</strong></div>
                <small class = "text-muted">${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()} - ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}</small>
            </div>    
            <p>${comentario}</p>
            <div>
                <p>${checkStars(parseInt(puntuacion.value))}</p>
            </div>
        <div>`


        comentariosLista.innerHTML += contentHTML;
        document.getElementById("areaComentario").value = "";
    }
}



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function (enlace) {
        if (enlace.status === "ok") {
            
            showProductsInfo(enlace.data);
            infoProducts = enlace.data;
        
            getJSONData(PRODUCTS_URL).then(function (enlace) {
                if (enlace.status === "ok") {
        
                    relatedProducts(enlace.data);
                }
            });
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (enlace) {
        if (enlace.status === "ok"){

            showComents(enlace.data)
        };
    });
});



