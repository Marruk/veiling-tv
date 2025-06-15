const STORAGE_ITEM_KEY = 'riders-' + document.body.getAttribute('data-theme');

let riders;
let isFresh = true;
let isAnimating = false;
let riderElement, countElement;

const getStartlist = async () => {
  const theme = document.body.getAttribute('data-theme');
  switch (theme) {
    case 'giro': return GIRO_STARTLIST;
    case 'sumo': return SUMO_STARTLIST;
    case 'tour': return await getRemoteStartlist('tour-2025');
    case 'vuelta':
    default:
      return []
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  riderElement = document.getElementById('rider');
  countElement = document.getElementById('count');

  await init();
});

const init = async () => {
  try {
    riders = JSON.parse(localStorage.getItem(STORAGE_ITEM_KEY));
    
    if (riders !== null) {
      isFresh = false;
    } else {
      throw error;
    }
  } catch {
    const startlist = await getStartlist();
    riders = randomized(startlist);
    localStorage.setItem(STORAGE_ITEM_KEY, JSON.stringify(riders));
    isFresh = true;
  }

  if (!isFresh) {
    show();
  } else {
    playJingle();
    countElement.style.setProperty('--riders-left', riders.length);
  }
}

const show = () => {
  const rider = riders[0];

  isAnimating = true;
  riderElement.classList.add('animate');
  riderElement.addEventListener("animationend", () => {
    if (rider !== undefined) {
      if (typeof rider === 'string' || rider instanceof String) {
        riderElement.textContent = rider;
      } else {
        riderElement.innerHTML = `
          <img class="rider-flag" src="https://raw.githubusercontent.com/lipis/flag-icons/refs/heads/main/flags/4x3/${rider.nationality.toLowerCase()}.svg" />
          <span class="rider-name">${rider.name}</span>
          <a target="_blank" href="https://www.procyclingstats.com/${rider.url}">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#aaa"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>
          </a>
        `;
      }
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

const randomized = a => {
  const array = [...a];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const getRemoteStartlist = async (slug) => {
  try {
    const response = await fetch('https://veiling-tv-zieke-backend.onrender.com/graphql_api',
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query getStartList($slug: String!) {
            ridersByRace(slug: $slug) {
              id
              name
              nationality
              url
            }
          }`,
          variables: {
            slug: slug
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json.data?.ridersByRace ?? [];
  } catch (error) {
    console.error(error.message);
  }
}

const GIRO_STARTLIST = [
  "AFFINI Edoardo",
  "ALEOTTI Giovanni",
  "ARENSMAN Thymen",
  "ARRIETA Igor",
  "ASGREEN Kasper",
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
  "BRENNER Marco",
  "BUSATTO Francesco",
  "BYSTRØM Sven Erik",
  "CARAPAZ Richard",
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
  "DEBEAUMARCHÉ Nicolas",
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
  "KNOX James",
  "KONRAD Patrick",
  "KOOIJ Olav",
  "KRAGH ANDERSEN Søren",
  "KRIEGER Alexander",
  "KRUIJSWIJK Steven",
  "KUZMIN Anton",
  "LAMPERTI Luke",
  "LANDA Mikel",
  "LASTRA Jonathan",
  "LEEMREIZE Gijs",
  "LEMMEN Bart",
  "LIEPIŅŠ Emīls",
  "LONARDI Giovanni",
  "MAAS Jan",
  "MAESTRI Mirco",
  "MAGLI Filippo",
  "MAGNIER Paul",
  "MAJKA Rafał",
  "MARCELLUSI Martin",
  "MÄRKL Niklas",
  "MARTINELLI Alessio",
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
  "MOZZATO Luca",
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
  "PLOWRIGHT Jensen",
  "PLUIMERS Rick",
  "POELS Wout",
  "POOLE Max",
  "PRODHOMME Nicolas",
  "QUINTANA Nairo",
  "RAFFERTY Darren",
  "RIES Michel",
  "RIVERA Brandon Smith",
  "ROCHAS Rémy",
  "ROGLIČ Primož",
  "RUBIO Einer",
  "SAMITIER Sergio",
  "SCARONI Christian",
  "SCHULTZ Nick",
  "SHAW James",
  "SMITH Dion",
  "STEINHAUSER Georg",
  "STORER Michael",
  "STORK Florian",
  "STRONG Corbin",
  "SVESTAD-BÅRDSENG Embret",
  "TARLING Joshua",
  "TAROZZI Manuele",
  "THIJSSEN Gerben",
  "TIBERI Antonio",
  "TJØTTA Martin",
  "TONELLI Alessandro",
  "TORRES Albert",
  "TRATNIK Jan",
  "TURNER Ben",
  "ULISSI Diego",
  "VACEK Mathias",
  "VADER Milan",
  "VAN AERT Wout",
  "VAN BAARLE Dylan",
  "VAN DEN BOSSCHE Fabio",
  "VAN DER HOORN Taco",
  "VAN HOECKE Gijs",
  "VAN UDEN Casper",
  "VENDRAME Andrea",
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
];

const SUMO_STARTLIST = [
  "Hoshoryu",
  "Onosato",
  "Daieisho",
  "Takayasu",
  "Wakamotoharu",
  "Abi",
  "Tamawashi",
  "Takerufuji",
  "Ura",
  "Oshoma",
  "Hakuoho",
  "Onokatsu",
  "Aonishiki",
  "Meisei",
  "Endo",
  "Atamifuji",
  "Tokihayate",
  "Kotoshoho",
  "Ryuden",
  "Kayo",
  "Tamashoho",
  "Tochitaikai",
  "Kotozakura",
  "Kirishima",
  "Wakatakakage",
  "Oho",
  "Gonoyama",
  "Hiradoumi",
  "Ichiyamamoto",
  "Chiyoshoma",
  "Tobizaru",
  "Churanoumi",
  "Kinbozan",
  "Midorifuji",
  "Shodai",
  "Shishi",
  "Takanosho",
  "Sadanoumi",
  "Roga",
  "Shonannoumi",
  "Nishikigi",
  "Asakoryu"
];