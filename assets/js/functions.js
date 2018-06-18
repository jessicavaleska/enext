//document.getElementById("btnOpenModal").addEventListener("click", modal);
document.getElementById("closeModal").addEventListener("click", modal);
document.getElementById("btnCloseModal").addEventListener("click", modal);

//document.getElementById("btnOpenModal").addEventListener("click", potions);

document.getElementById("btnMenu").addEventListener("click", menuOpen);

potions();

function menuOpen() {
    var element = document.getElementById("menu");

    if (element.classList.contains("menu-open")) {
        element.classList.remove("menu-open");
    } else {
        element.classList.add("menu-open");
    }
}

function modal() {
    var element = document.getElementById("modal");

    if (element.classList.contains("modal-aberto")) {
        element.classList.remove("modal-aberto");
    } else {
        element.classList.add("modal-aberto");
    }
}


function potions() {
    var request = new XMLHttpRequest();
    request.open('GET', '/enext-test/assets/json/potions.json', true);

    request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
            var data = JSON.parse(request.responseText);
            var html = "";

            console.log(data);

            for (var i in data.potions) {
                html += '<a class="each-product" id="eachPotion" data-potion="' + data.potions[i].id + '">' +
                    '<img src="assets/img/products/' + data.potions[i].image + '" alt="Potion" />' +
                    '<h2>' + data.potions[i].name + ' - <span>$' + data.potions[i].price + '</span></h2>' +
                    '</a>';
            }

            allPotions = document.getElementById("allPotions");
            allPotions.innerHTML = html;

            var query = document.querySelectorAll('.each-product');

            for (var i = 0; i < query.length; i++) {
                let idPotion = query[i].getAttribute('data-potion');
                query[i].addEventListener("click", function (event) {
                    console.log(idPotion);
                    var potion = data.potions[idPotion];
                    console.log(potion);
                    var ingredient = '';

                    for (var j = 0; j < potion.ingredients.length; j++) {
                        ingredient += '<p>' + potion.ingredients[j] + '</p>';
                    }

                    var imagePotion = '<img src="assets/img/products/' + potion.image + '" alt="Potion" />';

                    console.log(potion.image);
                    console.log(imagePotion);

                    var htmlPotion = '<h2>' + potion.name + '</h2>' +
                        '<h3>Use/Efect</h3>' +
                        '<p>' + potion.effect + '</p>' +
                        '<h3>Ingredients</h3>' +
                        '<p>' + ingredient + '</p>' +
                        '<h3>Price</h3>' +
                        '<p class="price">$' + potion.price + '</p>' +
                        '<button>ADD TO CART</button>';

                    var eachImagePotion = document.getElementById("imageProduct");
                    var eachPotion = document.getElementById("infoProduct");
                    eachImagePotion.innerHTML = imagePotion;
                    eachPotion.innerHTML = htmlPotion;
                    modal();
                    event.preventDefault();
                });
            }
        } else {
            alert('Ops. Something Went Wrong :(')
        }
    };

    request.onerror = function () {
        alert('Something Went Wrong :(')
    };

    request.send();
}