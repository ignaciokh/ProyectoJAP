document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function (enlace) {
        if (enlace.status === "ok") {
            
            showProductsInfo(enlace.data);
            
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (enlace) {
        if (enlace.status === "ok"){

            showComents(enlace.data)
        };
    });
});


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
    
    for(let i = 0; i< array.images.length; i++){
       
        let HTMLContent = 
        `
        <div  class="col-lg-4 col-md-6 col-12 p-3">   
            <img class="img-fluid img-thumbnail " src="` + array.images[i] + `" alt=""> 
        </div>`
        document.getElementById("imgContent").innerHTML += HTMLContent;
    }
    
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
            <div class="p-3 m-3 border border-dark" >
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
        `<div class="p-3 m-3 border border-dark" >
            <div class="d-flex w-100 justify-content-between mb-4">
                <div class = "mb-1"><strong>${usuario}</strong></div>
                <small class = "text-muted">${fecha.getDay()}/${fecha.getMonth()}/${fecha.getFullYear()}</small>
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

