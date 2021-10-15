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


function totalCount(input, cost, ubicacion, currency){

    if(currency === "UYU"){
        cost = cost / 40;
    }
    let subtotal = cost * input;
    document.getElementById(ubicacion).innerHTML = `USD ${subtotal}`;
    totalPrice();
}


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




document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL_DOS).then(function(info){
        if (info.status === "ok"){
            showProducts(info.data);
        }
    });
});