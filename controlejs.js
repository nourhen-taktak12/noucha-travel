
// Récupération des éléments
let formulaire = document.querySelector("form");

let nom = document.querySelector('[name="nom"]');
let email = document.querySelector('[name="email"]');
let telephone = document.querySelector('[name="telephone"]');
let destination = document.querySelector('[name="destination"]');

let datedep = document.getElementById("datedep");
let dateret = document.getElementById("dateret");
let nbp = document.getElementById("nbp");


// Contrôle du nom et prénom
function controleNom(ch) {
    let resultat = "";
    let debut = true;

    for (let i = 0; i < ch.length; i++) {
        let c = ch[i];

        if ((c >= "a" && c <= "z") || (c >= "A" && c <= "Z")) {
            if (debut == true) {
                resultat = resultat + c.toUpperCase();
                debut = false;
            }
            else {
                resultat = resultat + c.toLowerCase();
            }
        }
        else if (c == " ") {
            resultat = resultat + " ";
            debut = true;
        }
    }

    return resultat;
}

nom.addEventListener("input", function() {
    nom.value = controleNom(nom.value);
});


// Contrôle du formulaire
formulaire.addEventListener("submit", function(e) {

    e.preventDefault();

    // Nom
    if (nom.value.trim() == "") {
        alert("Veuillez saisir votre nom et prénom !");
        nom.focus();
        return;
    }

    // Email
    if (email.value.indexOf("@gmail.com") == -1 ||
        email.value.indexOf("@") == 0 ||
        email.value.indexOf("@") != email.value.lastIndexOf("@") ||
        email.value.indexOf(" ") != -1 ||
        email.value.substring(email.value.length - 10) != "@gmail.com") {

        alert("Email invalide !");
        email.focus();
        return;
    }

    // Téléphone
    if (telephone.value.length != 8) {
        alert("Le numéro doit contenir 8 chiffres !");
        telephone.focus();
        return;
    }

    for (let i = 0; i < telephone.value.length; i++) {
        if (telephone.value[i] < "0" || telephone.value[i] > "9") {
            alert("Le téléphone doit contenir seulement des chiffres !");
            telephone.focus();
            return;
        }
    }

    // Destination
    if (destination.value == "") {
        alert("Choisissez une destination !");
        destination.focus();
        return;
    }

    // Date de départ
    let aujourdHui = new Date();
    let date = new Date(datedep.value);

    if (datedep.value == "" || date <= aujourdHui) {
        alert("Date de départ invalide !");
        datedep.focus();
        return;
    }

    // Date de retour
    let retour = new Date(dateret.value);

    if (dateret.value == "" || retour <= date) {
        alert("Date de retour invalide !");
        dateret.focus();
        return;
    }

    // Nombre de personnes
    if (nbp.value == "" || nbp.value < 1 || nbp.value > 20) {
        alert("Nombre de personnes invalide !");
        nbp.focus();
        return;
    }

    // Type de voyage
    let type = document.querySelector('input[name="type"]:checked');

    if (type == null) {
        alert("Choisissez un type de voyage !");
        return;
    }

    // Réservation valide
    alert("Votre réservation est valide !");

});
