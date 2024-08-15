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
        document.getElementById("rider").innerHTML = "C'est Ça!";
        // document.getElementById("rider").innerHTML = "Questo è tutto!"
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

    return ["VINGEGAARD Jonas", "BENOOT Tiesj", "JORGENSON Matteo", "LAPORTE Christophe", "TRATNIK Jan", "VAN AERT Wout", "KELDERMAN Wilco", "LEMMEN Bart", "GALL Felix", "PETERS Nans", "GODON Dorian", "NAESEN Oliver", "BENNETT Sam", "PRODHOMME Nicolas", "LAPEIRA Paul", "ARMIRAIL Bruno", "PHILIPSEN Jasper", "VAN DER POEL Mathieu", "RICKAERT Jonas", "LAURANCE Axel", "VERMEERSCH Gianni", "GHYS Robbe", "DILLIER Silvan", "KRAGH ANDERSEN Søren", "DÉMARE Arnaud", "VAUQUELIN Kévin", "RODRÍGUEZ Cristián", "MOZZATO Luca", "MCLAY Daniel", "GARCÍA PIERNA Raúl", "CHAMPOUSSIN Clément", "CAPIOT Amaury", "CAVENDISH Mark", "MØRKØV Michael", "BALLERINI Davide", "BOL Cees", "FEDOROV Yevgeniy", "TEJADA Harold", "GAZZOLI Michele", "LUTSENKO Alexey", "MOHORIČ Matej", "POELS Wout", "BILBAO Pello", "BAUHAUS Phil", "BUITRAGO Santiago", "HAIG Jack", "WRIGHT Fred", "ARNDT Nikias", "HINDLEY Jai", "VLASOV Aleksandr", "VAN POPPEL Danny", "DENZ Nico", "SOBRERO Matteo", "ROGLIČ Primož", "JUNGELS Bob", "HALLER Marco", "COQUARD Bryan", "MARTIN Guillaume", "IZAGIRRE Ion", "HERRADA Jesús", "GESCHKE Simon", "RENARD Alexis", "ZINGLE Axel", "ALLEGAERT Piet", "CARAPAZ Richard", "POWLESS Neilson", "HEALY Ben", "VAN DEN BERG Marijn", "BISSEGGER Stefan", "QUINN Sean", "COSTA Rui", "BETTIOL Alberto", "GAUDU David", "GENIETS Kevin", "GRÉGOIRE Romain", "KÜNG Stefan", "MARTINEZ Lenny", "MADOUAS Valentin", "PACHER Quentin", "RUSSO Clément", "PIDCOCK Thomas", "THOMAS Geraint", "RODRÍGUEZ Carlos", "KWIATKOWSKI Michał", "TURNER Ben", "CASTROVIEJO Jonathan", "BERNAL Egan", "DE PLUS Laurens", "MEINTJES Louis", "GIRMAY Biniam", "REX Laurenz", "PAGE Hugo", "TEUNISSEN Mike", "ZIMMERMANN Georg", "GOOSSENS Kobe", "THIJSSEN Gerben", "VERONA Carlos", "CICCONE Giulio", "STUYVEN Jasper", "BERNARD Julien", "PEDERSEN Mads", "GIBBONS Ryan", "DECLERCQ Tim", "SKUJIŅŠ Toms", "MAS Enric", "LAZKANO Oier", "OLIVEIRA Nelson", "FORMOLO Davide", "ARANBURU Alex", "GAVIRIA Fernando", "ROMO Javier", "MÜHLBERGER Gregor", "EVENEPOEL Remco", "LANDA Mikel", "VAN WILDER Ilan", "VERVAEKE Louis", "HIRT Jan", "PEDERSEN Casper", "LAMPAERT Yves", "MOSCON Gianni", "BARDET Romain", "BARGUIL Warren", "DEGENKOLB John", "EEKHOFF Nils", "JAKOBSEN Fabio", "ONLEY Oscar", "VAN DEN BROEK Frank", "WELTEN Bram", "GROENEWEGEN Dylan", "MEZGEC Luka", "YATES Simon", "REINDERS Elmar", "DURBRIDGE Luke", "HARPER Chris", "JUUL-JENSEN Christopher", "MATTHEWS Michael", "POGAČAR Tadej", "AYUSO Juan", "ALMEIDA João", "YATES Adam", "SIVAKOV Pavel", "SOLER Marc", "WELLENS Tim", "POLITT Nils", "BOIVIN Guillaume", "STEWART Jake", "FUGLSANG Jakob", "WILLIAMS Stephen", "ACKERMANN Pascal", "GEE Derek", "HOULE Hugo", "NEILANDS Krists", "DE LIE Arnaud", "CAMPENAERTS Victor", "VAN GILS Maxim", "VAN MOER Brent", "DRIZNERS Jarrad", "VANHOUCKE Harm", "GRIGNARD Sébastien", "BEULLENS Cedric", "CORT Magnus", "KULSET Johannes", "TILLER Rasmus", "EIKING Odd Christian", "KRISTOFF Alexander", "WÆRENSKJOLD Søren", "JOHANNESSEN Tobias Halland", "ABRAHAMSEN Jonas", "BURGAUDEAU Mathieu", "CRAS Steff", "TURGIS Anthony", "JEGAT Jordan", "GACHIGNARD Thomas", "VERCHER Mattéo", "DUJARDIN Sandy", "GRELLIER Fabien"]
}