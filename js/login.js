//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});


function enviar(){
    let usuario = document.getElementById("usuario").value;
    let contraseña = document.getElementById("contraseña").value

    if(usuario === "" || contraseña === ""){
        alert("Debe cargar todos los datos para poder continuar");
        document.getElementById('formulario-login').reset();
    }else{
        window.location.href = "home.html";
    }
}