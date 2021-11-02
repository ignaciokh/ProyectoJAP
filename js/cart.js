let envioValue = 0.05;

//Muestro todo slos productos
function showProducts(info){

    let HtmlContent = "";
    let data =  info.articles;

    for(let i = 0; i < data.length; i++){
        

        HtmlContent = `
        <tr>
            <td class = ""><img src="${data[i].src}" alt="" style ="max-width: 60px"></td>
            <td class="align-middle">${data[i].name}</td>
            <td class="align-middle"><input  type="number" min ="1" value = "${data[i].count}" onchange="totalCount(this.value,${data[i].unitCost},${i},'${data[i].currency}')" style ="max-width: 60px"></td>
            <td class="align-middle">${data[i].currency} ${data[i].unitCost}</td>
            <td class="align-middle subtotal" id = "${i}"></td>
        <tr>
        `
        document.getElementById("productsContainer").innerHTML += HtmlContent;
        totalCount(data[i].count,data[i].unitCost, i, data[i].currency);
    }
    
}


//Subtotal 
function totalCount(input, cost, ubicacion, currency){

    if(currency === "UYU"){
        cost = cost / 40;
    }
    let subtotal = cost * input;
    document.getElementById(ubicacion).innerHTML = `USD ${subtotal}`;
    totalPrice();
}


// Precio total 
function totalPrice(){
    total = 0;
    subtotal = document.getElementsByClassName("subtotal");
    for(let s of subtotal){
        let content = s.innerHTML.substr(4);
        total += parseFloat(content);
        s.innerHTML = `USD ${content}`
    }
    document.getElementById("totalCount").innerHTML = `USD ${total}`;

}




//Costos tomando en cuenta el tipo de envío 
function TotalCost(){

    let totalValue = parseInt(document.getElementById("totalCount").innerHTML.substr(4));
    let subtotal = document.getElementById("subtotalCostos");
    let envio = document.getElementById("envioCostos");
    let total = document.getElementById("tatalCostos");
    
    console.log(totalValue);

    subtotal.innerHTML = totalValue;//valos subtotal musmi que el total
    let dataEnvio = totalValue * envioValue; //Costo de envío
    envio.innerHTML = parseInt(dataEnvio);    
    let totalValueData = totalValue + dataEnvio //valor total para agragrale un string de Dolares
    total.innerHTML = "USD " + parseInt(totalValueData);
}






//Validación de formulario
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();






document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL_DOS).then(function(info){
        if (info.status === "ok"){
            showProducts(info.data);
        }
    });
});
document.getElementById("oro").addEventListener("change", function(e){
    envioValue = 0.15;
    TotalCost();
});
document.getElementById("premium").addEventListener("change", function(e){
    envioValue = 0.07;
    TotalCost();
});
document.getElementById("estandar").addEventListener("change", function(e){
    envioValue = 0.05;
    TotalCost();
});