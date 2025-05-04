document.addEventListener("DOMContentLoaded", function () {
    var storedRiders = JSON.parse(localStorage.getItem("riders"))

    if (!storedRiders || storedRiders.length === 0) {
        var riders = getRiders()
        shuffleArray(riders)

        localStorage.setItem("riders", JSON.stringify(riders));
    }

    playJingle()
});

function playJingle() {
    var jingle = document.getElementById("jingle");
    jingle.play();
}

function nextRider() {
    var riders = JSON.parse(localStorage.getItem("riders"));

    var nextRider = riders.shift();

    if (!nextRider) {
        // document.getElementById("rider").innerHTML = "C'est Ça!";
        document.getElementById("rider").innerHTML = "Questo è tutto!"
        // document.getElementById("rider").innerHTML = "Eso es!"
        // document.getElementById("rider").innerHTML = "We zijn er weer bij en dat is priiihhhmaaah"
    } else {
        document.getElementById("rider").innerHTML = nextRider;
        document.getElementById("count").innerHTML = riders.length;
        localStorage.setItem("riders", JSON.stringify(riders));
    }
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function getRiders() {
    // TXT to js array: https://codepen.io/franciskim/pen/eNjrpR
    // document.querySelectorAll('.table-cont .uppercase').forEach(e => {e.innerHTML = e.innerHTML.toUpperCase()})

    return [
        "AFFINI Edoardo",
        "ALEOTTI Giovanni",
        "ALLEGAERT Piet",
        "ARENSMAN Thymen",
        "ARRIETA Igor",
        "AULAR Orluis",
        "AYUSO Juan",
        "AZPARREN Xabier Mikel",
        "BAIS Davide",
        "BAIS Mattia",
        "BARDET Romain",
        "BARONCINI Filippo",
        "BARRENETXEA Jon",
        "BENNETT Sam",
        "BERNAL Egan",
        "BILBAO Pello",
        "BOUCHARD Geoffrey",
        "BOUWMAN Koen",
        "BRAMBILLA Gianluca",
        "BRENNER Marco",
        "BUSATTO Francesco",
        "BYSTRØM Sven Erik",
        "CARAPAZ Richard",
        "CARTHY Hugh",
        "CARUSO Damiano",
        "CASTROVIEJO Jonathan",
        "CATTANEO Mattia",
        "CEPEDA Jefferson Alexander",
        "CEPEDA Jefferson Alveiro",
        "ČERNÝ Josef",
        "CICCONE Giulio",
        "CLARKE Simon",
        "COLLEONI Kevin",
        "CONCI Nicola",
        "COVILI Luca",
        "DAVY Clément",
        "DE BONDT Dries",
        "DE PRETTO Davide",
        "DEL TORO Isaac",
        "DENZ Nico",
        "DEWULF Stan",
        "DONOVAN Mark",
        "DOUBLE Paul",
        "DOULL Owain",
        "EDMONDSON Alex",
        "ENGELHARDT Felix",
        "EPIS Giosuè",
        "EULÁLIO Afonso",
        "FIORELLI Filippo",
        "FORMOLO Davide",
        "FORTUNATO Lorenzo",
        "FRETIN Milan",
        "FRIGO Marco",
        "FRISON Frederik",
        "FUGLSANG Jakob",
        "GAROFOLI Gianmarco",
        "GAUDU David",
        "GEE Derek",
        "GENIETS Kevin",
        "GERMANI Lorenzo",
        "GODON Dorian",
        "GOVEKAR Matevž",
        "GROVES Kaden",
        "GUDMESTAD Tord",
        "GUGLIELMI Simon",
        "HAMILTON Lucas",
        "HAMILTON Chris",
        "HARPER Chris",
        "HAYTER Ethan",
        "HEIDUK Kim",
        "HEPBURN Michael",
        "HERMANS Quinten",
        "HINDLEY Jai",
        "HIRT Jan",
        "HOLLMANN Juri",
        "HONORÉ Mikkel Frølich",
        "HOOLE Daan",
        "HOULE Hugo",
        "HOWSON Damien",
        "HUYS Laurens",
        "JANSSENS Jimmy",
        "KANTER Max",
        "KELDERMAN Wilco",
        "KIELICH Timo",
        "KIRSCH Alex",
        "KNOX James",
        "KONRAD Patrick",
        "KOOIJ Olav",
        "KRIEGER Alexander",
        "KRUIJSWIJK Steven",
        "KUZMIN Anton",
        "LAMPERTI Luke",
        "LANDA Mikel",
        "LASTRA Jonathan",
        "LEEMREIZE Gijs",
        "LEMMEN Bart",
        "LONARDI Giovanni",
        "MAESTRI Mirco",
        "MAGLI Filippo",
        "MAGNIER Paul",
        "MAJKA Rafał",
        "MARCELLUSI Martin",
        "MÄRKL Niklas",
        "MARTÍNEZ Daniel Felipe",
        "MASNADA Fausto",
        "MCNULTY Brandon",
        "MEINTJES Louis",
        "MIHOLJEVIĆ Fran",
        "MILESI Lorenzo",
        "MONIQUET Sylvain",
        "MOSCA Jacopo",
        "MOSCHETTI Matteo",
        "MOSCON Gianni",
        "MUÑOZ Francisco",
        "OLDANI Stefano",
        "PACHER Quentin",
        "PALENI Enzo",
        "PASQUALON Andrea",
        "PEDERSEN Mads",
        "PELLIZZARI Giulio",
        "PEREZ Anthony",
        "PETILLI Simone",
        "PIDCOCK Thomas",
        "PIETROBON Andrea",
        "PIGANZOLI Davide",
        "PINARELLO Alessandro",
        "PLANCKAERT Edward",
        "PLAPP Luke",
        "PLUIMERS Rick",
        "POELS Wout",
        "POOLE Max",
        "PRODHOMME Nicolas",
        "QUINTANA Nairo",
        "RIES Michel",
        "RIVERA Brandon Smith",
        "ROCHAS Rémy",
        "ROGLIČ Primož",
        "ROJAS Vicente",
        "RUBIO Einer",
        "SAMITIER Sergio",
        "SCARONI Christian",
        "SCHULTZ Nick",
        "SHAW James",
        "SMITH Dion",
        "STAUNE-MITTET Johannes",
        "STEINHAUSER Georg",
        "STORER Michael",
        "STORK Florian",
        "STRONG Corbin",
        "SVESTAD-BÅRDSENG Embret",
        "TARLING Joshua",
        "TAROZZI Manuele",
        "THIERRY Pierre",
        "THIJSSEN Gerben",
        "TIBERI Antonio",
        "TJØTTA Martin",
        "TONELLI Alessandro",
        "TORRES Albert",
        "TOUMIRE Hugo",
        "TRATNIK Jan",
        "TURNER Ben",
        "ULISSI Diego",
        "VACEK Mathias",
        "VALGREN Michael",
        "VAN AERT Wout",
        "VAN BAARLE Dylan",
        "VAN DEN BOSSCHE Fabio",
        "VAN DER HOORN Taco",
        "VAN HOECKE Gijs",
        "VAN UDEN Casper",
        "VENDRAME Andrea",
        "VERGALLITO Luca",
        "VERONA Carlos",
        "VERRE Alessandro",
        "VINE Jay",
        "VOISARD Yannis",
        "WARBASSE Larry",
        "WELTEN Bram",
        "YATES Simon",
        "YATES Adam",
        "ZAMBANINI Edoardo",
        "ZANA Filippo",
        "ZANONCELLO Enrico",
        "ZIJLAARD Maikel",
        "ZUKOWSKY Nickolas"
    ]
}