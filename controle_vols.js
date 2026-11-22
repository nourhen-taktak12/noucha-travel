// =====================================================
// controle_vols.js : contrôle du formulaire de réservation de billet (vols.html)
// Les erreurs sont affichées avec alert()
// =====================================================


// ----- Fonctions utilitaires -----

// Retourne true si le texte contient au moins un chiffre
function contientDesChiffres(texte) {
    for (let i = 0; i < texte.length; i++) {
        if (texte[i] >= "0" && texte[i] <= "9") {
            return true;
        }
    }
    return false;
}

// Retourne true si le texte n'est pas vide et ne contient que des chiffres
function estQueDesChiffres(texte) {
    if (texte.length === 0) {
        return false;
    }
    for (let i = 0; i < texte.length; i++) {
        if (texte[i] < "0" || texte[i] > "9") {
            return false;
        }
    }
    return true;
}

// Email : pas d'espace, une seule @, au moins 1 caractère avant @, et fini par @gmail.com
function emailValide(email) {
    if (email.indexOf(" ") !== -1) {
        return false;
    }
    if (email.indexOf("@") < 1 || email.indexOf("@") !== email.lastIndexOf("@")) {
        return false;
    }
    return email.toLowerCase().endsWith("@gmail.com");
}

// Transforme "AAAA-MM-JJ" en Date à minuit (heure locale)
function versDate(texteDate) {
    return new Date(texteDate + "T00:00:00");
}

// Retourne aujourd'hui à minuit
function dateAujourdhui() {
    const maintenant = new Date();
    maintenant.setHours(0, 0, 0, 0);
    return maintenant;
}

// Retourne aujourd'hui au format "AAAA-MM-JJ" (pour l'attribut min du champ date)
function dateAujourdhuiTexte() {
    const d = new Date();
    return d.getFullYear() + "-" +
        String(d.getMonth() + 1).padStart(2, "0") + "-" +
        String(d.getDate()).padStart(2, "0");
}


// =====================================================
// RÉSERVATION DU BILLET
// =====================================================

function controleBillet() {

    const formBillet = document.getElementById("formBillet");

    // Sécurité : si le formulaire n'existe pas sur la page, on arrête proprement
    if (formBillet === null) {
        return;
    }

    const nom = document.getElementById("nom");
    const telephone = document.getElementById("telephone");
    const email = document.getElementById("email");
    const cin = document.getElementById("cin");
    const villeDepart = document.getElementById("villeDepart");
    const destination = document.getElementById("destination");
    const compagnie = document.getElementById("compagnie");
    const dateDepart = document.getElementById("dateDepart");
    const passagers = document.getElementById("passagers");
    const classe = document.getElementById("classe");

    // La date minimale affichée dans le calendrier est aujourd'hui
    dateDepart.min = dateAujourdhuiTexte();

    // On désactive les bulles natives du navigateur : seules nos alertes s'affichent
    formBillet.noValidate = true;

    formBillet.addEventListener("submit", function (e) {

        e.preventDefault();

        // 1. Nom : obligatoire et sans chiffres
        if (nom.value.trim() === "") {
            alert("Veuillez saisir le nom et prénom !");
            nom.focus();
            return;
        }
        if (contientDesChiffres(nom.value)) {
            alert("Le nom et prénom ne doivent pas contenir de chiffres !");
            nom.focus();
            return;
        }

        // 2. Téléphone : exactement 8 chiffres
        if (telephone.value.length !== 8 || !estQueDesChiffres(telephone.value)) {
            alert("Le téléphone doit contenir exactement 8 chiffres !");
            telephone.focus();
            return;
        }

        // 3. Email : obligatoire et valide
        if (email.value.trim() === "") {
            alert("Veuillez saisir votre adresse e-mail !");
            email.focus();
            return;
        }
        if (!emailValide(email.value.trim())) {
            alert("Email invalide ! Exemple : nom@gmail.com");
            email.focus();
            return;
        }

        // 4. CIN : exactement 8 chiffres
        if (cin.value.length !== 8 || !estQueDesChiffres(cin.value)) {
            alert("Le numéro CIN doit contenir exactement 8 chiffres !");
            cin.focus();
            return;
        }

        // 5. Ville de départ et destination : choisies et différentes
        if (villeDepart.value === "") {
            alert("Choisissez la ville de départ !");
            villeDepart.focus();
            return;
        }
        if (destination.value === "") {
            alert("Choisissez une destination !");
            destination.focus();
            return;
        }
        if (destination.value === villeDepart.value) {
            alert("La destination doit être différente de la ville de départ !");
            destination.focus();
            return;
        }

        // 6. Compagnie aérienne : choisie
        if (compagnie.value === "") {
            alert("Choisissez une compagnie aérienne !");
            compagnie.focus();
            return;
        }

        // 7. Date de départ : obligatoire et pas dans le passé
        if (dateDepart.value === "") {
            alert("Veuillez choisir la date de départ !");
            dateDepart.focus();
            return;
        }
        if (versDate(dateDepart.value) < dateAujourdhui()) {
            alert("La date de départ ne peut pas être dans le passé !");
            dateDepart.focus();
            return;
        }

        // 8. Nombre de passagers : entier entre 1 et 10
        if (!estQueDesChiffres(passagers.value) ||
            Number(passagers.value) < 1 || Number(passagers.value) > 10) {
            alert("Le nombre de passagers doit être entre 1 et 10 !");
            passagers.focus();
            return;
        }

        // 9. Classe : choisie
        if (classe.value === "") {
            alert("Choisissez une classe !");
            classe.focus();
            return;
        }

        // Tous les contrôles sont passés
        alert("Merci " + nom.value.trim() + " ! Votre réservation est enregistrée.");

        console.log("Nom :", nom.value);
        console.log("Téléphone :", telephone.value);
        console.log("Email :", email.value);
        console.log("CIN :", cin.value);
        console.log("Départ :", villeDepart.value);
        console.log("Destination :", destination.value);
        console.log("Compagnie :", compagnie.value);
        console.log("Date :", dateDepart.value);
        console.log("Passagers :", passagers.value);
        console.log("Classe :", classe.value);
    });
}


// Lancement (le script est chargé avec defer, donc la page est prête)
controleBillet();
