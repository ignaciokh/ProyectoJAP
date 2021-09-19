const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

function validacion() {
  let usuario = localStorage.getItem("usuario");
  let contrasena = localStorage.getItem("contrasena");
  
  if (!location.pathname.endsWith("logIn.html")) {
    if (usuario === null || contrasena === null) {
      window.location.href = "logIn.html";
    }else{
      let contenedor = document.getElementsByClassName("container d-flex flex-column flex-md-row justify-content-between");
      let infoUsuario = document.createElement("p");
      infoUsuario.innerHTML = `
      <div class = "align-self-start">
        <div class="chip">
          <img src="img/img_avatar.png" alt="Person" width="96" height="96">
          ${usuario}
        </div>
      </div>
      `;

      contenedor[0].prepend(infoUsuario);
    }
  }
}

function salirusuario(){
  let contenedor = document.getElementsByClassName("container d-flex flex-column flex-md-row justify-content-between");
  let botonSalir = document.createElement("button");
  botonSalir.type = "button";
  botonSalir.className = "btn btn-secondary";
  botonSalir.innerHTML = "Salir";

  botonSalir.addEventListener("click", function(){

    let usuario = localStorage.getItem("usuario");
    let contrasena = localStorage.getItem("contrasena");
    usuario = "";
    contrasena = "";

    window.location.href = "logIn.html"

  })

  contenedor[0].appendChild(botonSalir);
}



var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  validacion();
  salirusuario()
});