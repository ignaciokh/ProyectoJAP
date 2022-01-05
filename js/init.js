const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://api.jsonbin.io/b/61ce769fc277c467cb38f380";
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
      let contenedor = document.getElementById("UsuarioContenedor");
      let infoUsuario = document.createElement("div");
      infoUsuario.innerHTML = `
      <div class="dropdown">
          <div class="dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
            <span id = "usuarioLogIn">
            ${usuario}
            </span>
          </div>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item" href="cart.html">Mi Carrito</a>
          <a class="dropdown-item" href="my-profile.html">Perfil</a>
          <a class="dropdown-item" onclick="emptyUser()" href="logIn.html" >Cerrar Sesión</a>
        </div>
      </div>
      `;

      contenedor.appendChild(infoUsuario);
    }
  }
}

/* Vacía los datos de usuario y contraseña para al salir del usuario no puedas accader con al link ya que
al no existir registros de usaurio y contraseña la funcion validacion() redirige automaticamente a LogIn */ 
function emptyUser(){
  localStorage.removeItem("usuario");
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