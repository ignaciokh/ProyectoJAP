const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
const CART_INFO_URL_DOS = "https://japdevdep.github.io/ecommerce-api/cart/654.json";

function validacion() {
  let usuario = localStorage.getItem("usuario");
  let contrasena = localStorage.getItem("contrasena");
  
  if (!location.pathname.endsWith("logIn.html")) {
    if (usuario === null || contrasena === null) {
      window.location.href = "logIn.html";
    }else{
      let contenedor = document.getElementsByClassName("container d-flex flex-column flex-md-row justify-content-between");
      let infoUsuario = document.createElement("div");
      infoUsuario.innerHTML = `
      <div class="dropdown" id = "usuarioLogIn">
          <div class="chip btn btn-secondary dropdown-toggle bg-secondary text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img src="img/img_avatar.png" alt="Person" width="96" height="96">
            ${usuario}
          </div>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="cart.html">Mi Carrito</a>
          <a class="dropdown-item" href="my-profile.html">Perfil</a>
          <a class="dropdown-item" onclick="emptyUser()" href="logIn.html" >Cerrar Sesión</a>
        </div>
      </div>
      `;

      contenedor[0].appendChild(infoUsuario);
    }
  }
}

/* Vacía los datos de usuario y contraseña para al salir del usuario no puedas accader con al link ya que
al no existir registros de usaurio y contraseña la funcion validacion() redirige automaticamente a LogIn */ 
function emptyUser(){
  localStorage.clear();
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
});