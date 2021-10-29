let dataUsuario = {};


function guardarDatos(){

    // Valores de los tags pasados a JSON
    //Se ejecuta solo al presionar en guardar. 
    dataUsuario.nombre = document.getElementById("nombre").value;
    dataUsuario.apellido = document.getElementById("apellido").value;
    dataUsuario.edad = document.getElementById("edad").value;
    dataUsuario.telefono = document.getElementById("telefono").value;
    dataUsuario.correo = document.getElementById("correo").value;
    dataUsuario.Imagen = document.getElementById("imgCargada").src;

    let datosActualizados = JSON.stringify(dataUsuario);
    localStorage.setItem("data", datosActualizados);

    alert("Los datos fueron guardados de forma satisfactoria");

}


function checkData(){
    
    let valores = JSON.parse(localStorage.getItem("data"));

    //En caso de que el objeto no sea nulo se muestra el valor de cada elemento. De lo contrario se coloca una imagen "perfil"

    if(valores !== null){

        document.getElementById("nombre").value = valores.nombre;
        document.getElementById("apellido").value = valores.apellido;
        document.getElementById("edad").value = valores.edad;
        document.getElementById("telefono").value = valores.telefono;
        document.getElementById("correo").value = valores.correo;
        document.getElementById("imgCargada").src = valores.Imagen;
    
    }else{
  
        document.getElementById("imgCargada").src = "img/perfil.png";
    
    }

}


document.addEventListener("DOMContentLoaded", function (e) {
    checkData();
});
document.getElementById("Imagen").addEventListener("change", () => {

    //Se ejcuta cuando cambia el input de Imagen mostrando la primera de las imagenes cargadas
    let imagen = document.getElementById("imgCargada");
    let addImg = document.getElementById("Imagen").files[0];

    const reader = new FileReader();

    if(addImg){
        reader.readAsDataURL(addImg);
    }else{
        imagen.src = "img/perfil.png";
    }

    reader.addEventListener("load", () => {
        imagen.src = reader.result;
    })

})
