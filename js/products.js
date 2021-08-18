document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (enlace) {
        if (enlace.status === "ok") {

            showProducts(enlace.data);

        };
    });
});


function showProducts(enlace) {


    for (let product of enlace) {

        let HTMLContentToAppend = "";

        HTMLContentToAppend +=
            `
        <div class="list-group-item">
            <div>
                <div class="d-flex justify-content-between">
                    <h4 class="card-title"> ${product.name} </h4>
                    <p><small class="text-secondary">Total de artículos vendidos:  ${product.soldCount} </small></p>
                </div>
                <div>
                    <p> ${product.description} </p>
                </div>
            </div>
            <div>
                <div class="img">
                    <img src=" ${product.imgSrc}" " class="img-fluid">
                </div>
            </div>
        </div>`

        document.getElementById("contenedorProductos").innerHTML += HTMLContentToAppend;

    };
};