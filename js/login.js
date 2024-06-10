//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.getElementById("button-Login").addEventListener("click", function(e){

    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value

    localStorage.setItem("usuario", usuario); //setItem almacena el dato en la posición "usuario"
    localStorage.setItem("contrasena", contrasena);
    window.location.href = "index.html";

});
