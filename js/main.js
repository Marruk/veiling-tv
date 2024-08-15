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
        // document.getElementById("rider").innerHTML = "Questo è tutto!"
        document.getElementById("rider").innerHTML = "Eso es!"
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

    return [
        "ABERASTURI Jon",
        "ADRIÀ Roger",
        "AFFINI Edoardo",
        "ALEOTTI Giovanni",
        "ALMEIDA João",
        "ARCAS Jorge",
        "ARENSMAN Thymen",
        "ARMIRAIL Bruno",
        "ASGREEN Kasper",
        "BALLERSTEDT Maurice",
        "BARONCINI Filippo",
        "BENNETT George",
        "BERASATEGI Xabier",
        "BERHE Welay Hagos",
        "BERRADE Urko",
        "BERTHET Clément",
        "BITTNER Pavel",
        "BIZKARRA Mikel",
        "BOU Joan",
        "BOUCHARD Geoffrey",
        "BRAET Vito",
        "BRUSSENSKIY Gleb",
        "BYSTRØM Sven Erik",
        "CAMPENAERTS Victor",
        "CANAL Carlos",
        "CARAPAZ Richard",
        "CARUSO Damiano",
        "CASTRILLO Pablo",
        "CATTANEO Mattia",
        "CEPEDA Jefferson Alexander",
        "CHAMPION Thomas",
        "CICCONE Giulio",
        "COQUARD Bryan",
        "COSTA Rui",
        "DE GENDT Thomas",
        "DE MARCHI Alessandro",
        "DE PESTEL Sander",
        "DE PLUS Laurens",
        "DEL TORO Isaac",
        "DENZ Nico",
        "DOULL Owain",
        "DUNBAR Eddie",
        "ELISSONDE Kenny",
        "ENGELHARDT Felix",
        "FERNÁNDEZ Rubén",
        "FORTUNATO Lorenzo",
        "FRIGO Marco",
        "GALL Felix",
        "GAMPER Patrick",
        "GAROFOLI Gianmarco",
        "GAUDU David",
        "GENIETS Kevin",
        "GEOGHEGAN HART Tao",
        "GERMANI Lorenzo",
        "GESBERT Élie",
        "GESINK Robert",
        "GOOSSENS Kobe",
        "GRADEK Kamil",
        "GREGAARD Jonas",
        "GROVES Kaden",
        "GUERNALEC Thibault",
        "GUGLIELMI Simon",
        "GUTIÉRREZ Jorge",
        "HAIG Jack",
        "HAMILTON Chris",
        "HARPER Chris",
        "HEIDUK Kim",
        "HERMANS Quinten",
        "HERRADA Jesús",
        "HOLLMANN Juri",
        "HUYS Laurens",
        "IRIBAR Unai",
        "ISASA Xabier",
        "IZAGIRRE Ion",
        "JUARISTI Txomin",
        "KEPPLINGER Rainer",
        "KNOX James",
        "KONRAD Patrick",
        "KRON Andreas",
        "KRUIJSWIJK Steven",
        "KÜNG Stefan",
        "KUSS Sepp",
        "LAFAY Victor",
        "LANDA Mikel",
        "LASTRA Jonathan",
        "LAZKANO Oier",
        "LE BERRE Mathis",
        "LECERF William Junior",
        "LEEMREIZE Gijs",
        "LEIJNSE Enzo",
        "LIPOWITZ Florian",
        "LIVYNS Arjen",
        "LÓPEZ Harold Martín",
        "MARIT Arne",
        "MARTIN Guillaume",
        "MARTÍN Gotzon",
        "MARTÍNEZ Daniel Felipe",
        "MAS Enric",
        "MATÉ Luis Ángel",
        "MCNULTY Brandon",
        "MEINTJES Louis",
        "MEURISSE Xandro",
        "MIHOLJEVIĆ Fran",
        "MIQUEL Pau",
        "MONIQUET Sylvain",
        "NABERMAN Tim",
        "NARVÁEZ Jhonatan",
        "O'CONNOR Ben",
        "OLIVEIRA Nelson",
        "OOMEN Sam",
        "OWSIAN Łukasz",
        "PACHER Quentin",
        "PAQUOT Tom",
        "PARET-PEINTRE Valentin",
        "PARRA José Félix",
        "PEDERSEN Casper",
        "PETILLI Simone",
        "PLANCKAERT Edward",
        "POOLE Max",
        "QUINTANA Nairo",
        "RAFFERTY Darren",
        "RAISBERG Nadav",
        "RICCITELLO Matthew",
        "RIES Michel",
        "RIESEBEEK Oscar",
        "RIVERA Brandon Smith",
        "ROCHAS Rémy",
        "RODRÍGUEZ Carlos",
        "RODRÍGUEZ Óscar",
        "RODRÍGUEZ Cristián",
        "ROGLIČ Primož",
        "ROTA Lorenzo",
        "RUBIO Einer",
        "RUIZ Ibon",
        "SÁNCHEZ Pelayo",
        "SCHELLING Ide",
        "SCHMID Mauro",
        "SCOTSON Callum",
        "SEPÚLVEDA Eduardo",
        "SHAW James",
        "SHEEHAN Riley",
        "SIVAKOV Pavel",
        "SKJELMOSE Mattias",
        "SOLER Marc",
        "SOTO Antonio Jesús",
        "STRONG Corbin",
        "SÜTTERLIN Jasha",
        "SWEENY Harry",
        "TAARAMÄE Rein",
        "TARLING Joshua",
        "TEJADA Harold",
        "TEUNS Dylan",
        "THOMPSON Reuben",
        "TIBERI Antonio",
        "TRÆEN Torstein",
        "TUSVELD Martijn",
        "UIJTDEBROEKS Cian",
        "UMBA Santiago",
        "URÁN Rigoberto",
        "VACEK Mathias",
        "VALTER Attila",
        "VAN AERT Wout",
        "VAN BAARLE Dylan",
        "VAN DEN BERG Julius",
        "VAN EETVELT Lennert",
        "VANSEVENANT Mauri",
        "VERGAERDE Otto",
        "VERGALLITO Luca",
        "VERONA Carlos",
        "VERVAEKE Louis",
        "VINE Jay",
        "VINOKUROV Nicolas",
        "VLASOV Aleksandr",
        "WOODS Michael",
        "YATES Adam",
        "ZANA Filippo"
    ]
}