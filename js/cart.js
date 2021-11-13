let envioValue = 0.15;// Inicializo con este valor que corresponde a oro porque es el que aparece checked

//Muestro todo slos productos
function showProducts(info) {

    let HtmlContent = "";
    let data = info.articles;

    for (let i = 0; i < data.length; i++) {


        HtmlContent = `
        <tr id = "fila${i}">
            <td class = ""><img src="${data[i].src}" alt="" style ="max-width: 60px"></td>
            <td class="align-middle">${data[i].name}</td>
            <td class="align-middle"><input  type="number" min ="1" value = "${data[i].count}" onchange="totalCount(this.value,${data[i].unitCost},${i},'${data[i].currency}')" style ="max-width: 60px"></td>
            <td class="align-middle">${data[i].currency} ${data[i].unitCost}</td>
            <td class="align-middle subtotal" id = "${i}"></td><div></div>
            <td class="align-middle"> <i class="fas fa-times-circle" onclick = deleteElement(${i})></i></td>
        <tr>
        `
        document.getElementById("productsContainer").innerHTML += HtmlContent;
        totalCount(data[i].count, data[i].unitCost, i, data[i].currency);
    }

}

//Precio Subtotal 
function totalCount(input, cost, ubicacion, currency) {

    if (currency === "UYU") {
        cost = cost / 40;
    }
    let subtotal = cost * input;
    document.getElementById(ubicacion).innerHTML = `USD ${subtotal}`;
    totalPrice();
}

//Precio total 
function totalPrice() {
    total = 0;
    subtotal = document.getElementsByClassName("subtotal");
    for (let s of subtotal) {
        let content = s.innerHTML.substr(4);
        total += parseFloat(content);
        s.innerHTML = `USD ${content}`
    }
    document.getElementById("totalCount").innerHTML = `USD ${total}`;
    TotalCost()
}

//Costos tomando en cuenta el tipo de envío 
function TotalCost() {
    let totalValue = parseInt(document.getElementById("totalCount").innerHTML.substr(4));
    let subtotal = document.getElementById("subtotalCostos");
    let envio = document.getElementById("envioCostos");
    let total = document.getElementById("tatalCostos");


    subtotal.innerHTML = totalValue;//valos subtotal musmi que el total
    let dataEnvio = totalValue * envioValue; //Costo de envío
    envio.innerHTML = parseInt(dataEnvio);
    let totalValueData = totalValue + dataEnvio //valor total para agragrale un string de Dolares
    total.innerHTML = "USD " + parseInt(totalValueData);
}

//Eliminar Elementos
function deleteElement(e) {
    let element = document.getElementById(`fila${e}`);
    element.remove();
    totalPrice();
}

//Validación de campos
function validate() {

    let calle = document.getElementById("calleInput");
    let numero = document.getElementById("numeroImput");
    let esquina = document.getElementById("esquinaInput");
    let inputTarjeta = document.getElementById("tarjetaPago");
    let tarjeta = document.getElementById("tarjetaInput");
    let codigo = document.getElementById("codigoInput");
    let vencimiento = document.getElementById("vencimientoInput");
    let inputTarjeta2 = document.getElementById("tarjeta");
    let cuenta = document.getElementById("cuentaInput");
    let validateContent = true;

    if (calle.value === "") {
        calle.classList.add("emptyField");
        document.getElementById("mensaje0").style.display = "block";
        validateContent = false;
    }
    if (numero.value === "") {
        numero.classList.add("emptyField");
        document.getElementById("mensaje1").style.display = "block";
        validateContent = false;
    }
    if (esquina.value === "") {
        esquina.classList.add("emptyField");
        document.getElementById("mensaje2").style.display = "block";
        validateContent = false;
    }
    if (inputTarjeta.checked) {
        if (tarjeta.value === "") {
            tarjeta.classList.add("emptyField");
            document.getElementById("mensaje3").style.display = "block";
            validateContent = false;
        }
        if (codigo.value === "") {
            codigo.classList.add("emptyField");
            document.getElementById("mensaje4").style.display = "block";
            validateContent = false;
        }
        if (vencimiento.value === "") {
            vencimiento.classList.add("emptyField");
            document.getElementById("mensaje5").style.display = "block";
            validateContent = false;
        }
    }
    if (inputTarjeta2.checked) {
        if (cuenta.value === "") {
            cuenta.classList.add("emptyField");
            document.getElementById("mensaje6").style.display = "block";
            validateContent = false;
        }
    }
    if (validateContent === true) {
        alert("Información enviada de manera");
        let inputConten = document.getElementsByClassName("form-control");
        for (data of inputConten) {
            if (data.class === "emptyField");
            data.classList.remove("emptyField");
        }
        let parrafo = document.getElementsByClassName("mensajeError");
        for (p of parrafo) {
            if (p.style.display === "block");
            p.style.display = "none";
        }
    } else {
        alert("Necesita completar todos los campos");
    }
}




document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL_DOS).then(function (info) {
        if (info.status === "ok") {
            showProducts(info.data);
        }
    });
});
document.getElementById("oro").addEventListener("change", function (e) {
    envioValue = 0.15;
    TotalCost();
});
document.getElementById("premium").addEventListener("change", function (e) {
    envioValue = 0.07;
    TotalCost();
});
document.getElementById("estandar").addEventListener("change", function (e) {
    envioValue = 0.05;
    TotalCost();
});
document.getElementById("enviarDatos").addEventListener("click", function (e) {
    validate();
});