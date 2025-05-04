const STORAGE_ITEM_KEY = 'riders';

let riders;
let isFresh = true;
let isAnimating = false;
let riderElement, countElement;

document.addEventListener('DOMContentLoaded', () => {
  if (isFresh) {
    playJingle();
  }

  riderElement = document.getElementById('rider');
  countElement = document.getElementById('count');

  init();
});

const init = () => {
  try {
    riders = JSON.parse(localStorage.getItem(STORAGE_ITEM_KEY)) ?? STARTLIST;
  } catch {
    riders = STARTLIST;
    localStorage.setItem(STORAGE_ITEM_KEY, JSON.stringify(riders));
  }

  if (riders.length !== STARTLIST.length) {
    isFresh = false;
    show();
  } else {
    countElement.style.setProperty('--riders-left', riders.length);
  }
}

const show = () => {
  const rider = riders[0];

  isAnimating = true;
  riderElement.classList.add('animate');
  riderElement.addEventListener("animationend", () => {
    if (rider !== undefined) {
      riderElement.textContent = rider;
    } else {
      riderElement.innerHTML = '<small class="last"></small>';
    }
    countElement.style.setProperty('--riders-left', riders.length);
    document.getElementById('rider-next').blur();

    riderElement.addEventListener("animationend", () => {
      riderElement.classList.remove('animate');
      isAnimating = false;
    }, { once: true });
  }, { once: true });
}

const reset = () => {
  localStorage.clear(STORAGE_ITEM_KEY);
  window.location.reload();
}

const next = () => {
  if (isAnimating) {
    alert('doe rustig');
    return;
  }

  if (!isFresh) {
    riders.shift();
    localStorage.setItem(STORAGE_ITEM_KEY, JSON.stringify(riders));
  }

  isFresh = false;
  show();
}

const playJingle = async () => {
  try {
    await document.getElementById('jingle').play();
  } catch {
    // Geen liedje jammer
  }
}

const STARTLIST = [
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
].sort(_ => 0.5 - Math.random());