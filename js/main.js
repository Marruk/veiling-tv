const STORAGE_ITEM_KEY = 'riders-' + document.body.getAttribute('data-theme');

let riders;
let isFresh = true;
let isAnimating = false;
let riderElement, countElement;

const getStartlist = async () => {
  const theme = document.body.getAttribute('data-theme');
  switch (theme) {
    case 'giro': return new URLSearchParams(window.location.search).get('backup') === 'jalekker' ? GIRO_STARTLIST : await getRemoteStartlist('giro-d-italia-2026');
    case 'sumo': return SUMO_STARTLIST;
    case 'tour': return new URLSearchParams(window.location.search).get('backup') === 'jalekker' ? TOUR_STARTLIST : await getRemoteStartlist('tour-2025');
    case 'vuelta': return new URLSearchParams(window.location.search).get('backup') === 'jalekker' ? VUELTA_STARTLIST : await getRemoteStartlist('vuelta-2025');
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
  console.error(rider);

  isAnimating = true;
  riderElement.classList.add('animate');
  riderElement.addEventListener("animationend", () => {
    if (rider !== undefined) {
      if (typeof rider === 'string' || rider instanceof String) {
        riderElement.innerHTML = `
          <div class="rider-name">
            ${rider}
          </div>
        `;
      } else {
        const maxSpecialtyPoints = Math.max(...Object.values(rider.specialtyScores));
        const age = (_ => { 
          const difference = new Date(Date.now() - new Date(rider.dateOfBirth).getTime());
          return Math.abs(difference.getUTCFullYear() - 1970);
        })();
        const isYoungRider = new Date(rider.dateOfBirth).getUTCFullYear() >= 2001;

        if (Math.random() < 0.1) {
          rider.imageUrl = undefined;
        }

        riderElement.innerHTML = `
          <div class="rider-detailed">
            <div class="rider-stuff">
              <img class="rider-avatar" src="${rider.pcsImgUrl ?? './assets/nielske.png'}" />
              <div class="rider-info">
                <div class="rider-main">
                  <div class="rider-name">${rider.fullName}</div>
                  <img class="rider-flag" src="https://raw.githubusercontent.com/lipis/flag-icons/refs/heads/main/flags/4x3/${rider.nationality.toLowerCase()}.svg" />
                </div>
                <div class="rider-subtitle">
                  <span class="rider-team">
                    ${rider.teamName}
                  </span>
                </div>
                <div class="rider-subtitle">
                  <span class="rider-weight">${rider.weightKg ?? '?'} kg</span> •
                  <span class="rider-height">${rider.heightCm ?? '?'} cm</span> •
                  <span class="rider-age">${isNaN(age) ? '?' : age} jr</span>${isYoungRider ? '<img class="rider-young" src="./assets/white.svg">' : ''}
                </div>
                <div class="rider-subtitle">
                  <span class="rider-birthplace">Geboren in het ${['pittoreske', 'prachtige', 'fantastische', 'mooie', 'idyllische'][Math.round(Math.random() * 4)]} ${rider.birthPlace ?? 'Weeknie'}</span>
                </div>
                <div class="rider-badges">
                  <span class="rider-badge rider-badge--gc ${rider.gcKopman ? '' : 'rider-badge--inactive'}">GC Kopman</span>
                  <span class="rider-badge rider-badge--sprint ${rider.sprintKopman ? '' : 'rider-badge--inactive'}">Sprint Kopman</span>
                </div>
                <a class="rider-link" target="_blank" href="${rider.riderUrlPcs}">
                  <img src="./assets/pcs-logo.png">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#aaa"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h560v-280h80v280q0 33-23.5 56.5T760-120H200Zm188-212-56-56 372-372H560v-80h280v280h-80v-144L388-332Z"/></svg>
                </a>
                <div class="rider-specialties">`
            +
            [
              {
                class: 'oneday',
                property: 'oneDayRaces',
                label: 'One day races',
                color: '#A0D54C'
              },
              {
                class: 'gc',
                property: 'gc',
                label: 'Gc',
                color: '#F42A0E'
              },
              {
                class: 'tt',
                property: 'timeTrial',
                label: 'Time trial',
                color: '#5DA9EF'
              },
              {
                class: 'sprint',
                property: 'sprint',
                label: 'Sprint',
                color: '#FFAD4E'
              },
              {
                class: 'climber',
                property: 'climber',
                label: 'Climber',
                color: '#aa3df2'
              },
              {
                class: 'hills',
                property: 'hills',
                label: 'Hills',
                color: '#ff64d3'
              }
            ].map(specialty => {
              const points = rider.specialtyScores[specialty.property] ?? 0;
              return `
                <div class="rider-specialty rider-specialty--${specialty.class}">
                  <div class="rider-specialty-bar">
                    <div class="rider-specialty-bar-fill" style="background-color: ${specialty.color}; width: ${Math.round((points / maxSpecialtyPoints) * 100)}%"></div>
                  </div>
                  <span class="rider-specialty-label">
                    ${specialty.label}
                  </span>
                  <span class="rider-specialty-points">
                    ${points}
                  </span>
                </div>
              `
            }).join('')
            +
            `   </div>
              </div>
            </div>
            `
            +
            `
            ${rider.feitje !== undefined ?
              `
                <hr class="rider-separator" />
                <div class="rider-fact">
                  <div class="rider-fact-title">
                    <strong>Leuke weetjes</strong>
                    <small>
                      (misschien klopt het niet want Niels heeft AI gebruikt om nog wat extra bomen te verbranden)
                    </small>
                  </div>
                  ${rider.feitje.text}
                  ${rider.feitje.feitje2 ? `<div class="rider-fact-extra">${rider.feitje.feitje2}</div>` : ''}
                </div>
                ${rider.feitje.quote ? `
                  <hr class="rider-separator" />
                  <div class="rider-fact">
                    <div class="rider-fact-title">
                      <strong>Leuke quote</strong>
                    <small>
                      (waarschijnlijk gehallucineerd)
                    </small>
                    </div>
                    <blockquote class="rider-quote">${rider.feitje.quote}</blockquote>
                  </div>
                ` : ''}
              `
              : ''
            }
            `
            +
            `
          </div>
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

const openBackup = () => {
  const params = new URLSearchParams(window.location.search);
  params.set('backup', 'jalekker');
  localStorage.clear(STORAGE_ITEM_KEY);
  window.location.search = params.toString();
  setTimeout(() => { window.location.reload(); }, 100);
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
    const response = await fetch('https://vettewielrenbackend.koenen-bolt.nl/graphql',
      {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `query getStartList($slug: String!) {
            meerdaagseKoers(slug: $slug) {
              startList {
                rider {
                  birthPlace
                  dateOfBirth
                  feitje {
                    source
                    text
                    quote
                    feitje2
                  }
                  fullName
                  heightCm
                  nationality
                  pcsImgUrl
                  riderType
                  gcKopman
                  sprintKopman
                  riderUrlPcs
                  slug
                  specialtyScores {
                    climber
                    gc
                    hills
                    oneDay
                    sprint
                    tt
                  }
                  teamName
                  teamPcsUrl
                  weightKg
                }
              }
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
    return (json.data?.meerdaagseKoers?.startList ?? []).map(riderData => riderData.rider);
  } catch (error) {
    console.error(error.message);
  }
}

const TOUR_STARTLIST = [
  "ABRAHAMSEN Jonas",
  "ACKERMANN Pascal",
  "AFFINI Edoardo",
  "ALAPHILIPPE Julian",
  "ALBANESE Vincenzo",
  "ALMEIDA João",
  "ANDRESEN Tobias Lund",
  "ARANBURU Alex",
  "ARENSMAN Thymen",
  "ARMIRAIL Bruno",
  "ASGREEN Kasper",
  "ASKEY Lewis",
  "BALLERINI Davide",
  "BARGUIL Warren",
  "BARRÉ Louis",
  "BARTA Will",
  "BARTHE Cyril",
  "BAUDIN Alex",
  "BAUHAUS Phil",
  "BENOOT Tiesj",
  "BERCKMOES Jenno",
  "BERTHET Clément",
  "BISSEGGER Stefan",
  "BITTNER Pavel",
  "BLACKMORE Joseph",
  "BOIVIN Guillaume",
  "BOL Cees",
  "BRAET Vito",
  "BUCHMANN Emanuel",
  "BUITRAGO Santiago",
  "BURGAUDEAU Mathieu",
  "CAMPENAERTS Victor",
  "CAPIOT Amaury",
  "CASTRILLO Pablo",
  "CATTANEO Mattia",
  "CHAMPOUSSIN Clément",
  "CONSONNI Simone",
  "COQUARD Bryan",
  "CORT Magnus",
  "COSTIOU Ewen",
  "CRAS Steff",
  "DAINESE Alberto",
  "DE BUYST Jasper",
  "DE LIE Arnaud",
  "DELETTRE Alexandre",
  "DÉMARE Arnaud",
  "DILLIER Silvan",
  "DRIZNERS Jarrad",
  "DUNBAR Eddie",
  "DURBRIDGE Luke",
  "EENKHOORN Pascal",
  "EVENEPOEL Remco",
  "FEDOROV Yevgeniy",
  "FLYNN Sean",
  "FOSS Tobias",
  "FREDHEIM Stian",
  "GACHIGNARD Thomas",
  "GALL Felix",
  "GANNA Filippo",
  "GARCÍA CORTINA Iván",
  "GARCÍA PIERNA Raúl",
  "GIRMAY Biniam",
  "GRADEK Kamil",
  "GRÉGOIRE Romain",
  "GRIGNARD Sébastien",
  "GROENEWEGEN Dylan",
  "GROVES Kaden",
  "HAIG Jack",
  "HALLER Marco",
  "HEALY Ben",
  "HIGUITA Sergio",
  "HIRSCHI Marc",
  "HOELGAARD Markus",
  "IZAGIRRE Ion",
  "JEANNIÈRE Emilien",
  "JEGAT Jordan",
  "JOHANNESSEN Tobias Halland",
  "JOHANNESSEN Anders Halland",
  "JORGENSON Matteo",
  "KUSS Sepp",
  "LAURANCE Axel",
  "LE BERRE Mathis",
  "LEKNESSUND Andreas",
  "LIENHARD Fabian",
  "LIPOWITZ Florian",
  "LOUVEL Matis",
  "LUTSENKO Alexey",
  "MADOUAS Valentin",
  "MÄRKL Niklas",
  "MARTIN Guillaume",
  "MARTINEZ Lenny",
  "MAS Enric",
  "MAYRHOFER Marius",
  "MEEUS Jordi",
  "MERLIER Tim",
  "MEURISSE Xandro",
  "MEZGEC Luka",
  "MILAN Jonathan",
  "MOHORIČ Matej",
  "MOSCON Gianni",
  "MÜHLBERGER Gregor",
  "NABERMAN Tim",
  "NAESEN Oliver",
  "NARVÁEZ Jhonatan",
  "NEILANDS Krists",
  "NYS Thibau",
  "O'CONNOR Ben",
  "OLIVEIRA Nelson",
  "ONLEY Oscar",
  "PACHER Quentin",
  "PAGE Hugo",
  "PARET-PEINTRE Valentin",
  "PARET-PEINTRE Aurélien",
  "PENHOËT Paul",
  "PHILIPSEN Jasper",
  "PITHIE Laurence",
  "PLAPP Luke",
  "POGAČAR Tadej",
  "POLITT Nils",
  "POWLESS Neilson",
  "REINDERS Elmar",
  "RENARD Alexis",
  "REX Laurenz",
  "RICKAERT Jonas",
  "RODRÍGUEZ Carlos",
  "RODRÍGUEZ Cristián",
  "ROGLIČ Primož",
  "ROMEO Iván",
  "RUBIO Einer",
  "RUSSO Clément",
  "RUTSCH Jonas",
  "SCHACHMANN Maximilian",
  "SCHMID Mauro",
  "SCOTSON Callum",
  "SEPÚLVEDA Eduardo",
  "SIMMONS Quinn",
  "SIVAKOV Pavel",
  "SKJELMOSE Mattias",
  "SKUJIŅŠ Toms",
  "SOLER Marc",
  "STANNARD Robert",
  "STEWART Jake",
  "STORER Michael",
  "STUYVEN Jasper",
  "SWEENY Harry",
  "SWIFT Connor",
  "TEJADA Harold",
  "TEUNISSEN Mike",
  "TEUNS Dylan",
  "THEUNS Edward",
  "THOMAS Geraint",
  "THOMAS Benjamin",
  "TOUZÉ Damien",
  "TRENTIN Matteo",
  "TRONCHON Bastien",
  "TURGIS Anthony",
  "VALGREN Michael",
  "VAN AERT Wout",
  "VAN DEN BERG Marijn",
  "VAN DEN BROEK Frank",
  "VAN DER POEL Mathieu",
  "VAN DIJKE Mick",
  "VAN EETVELT Lennert",
  "VAN LERBERGHE Bert",
  "VAN MOER Brent",
  "VAN POPPEL Danny",
  "VAN SINTMAARTENSDIJK Roel",
  "VAN WILDER Ilan",
  "VAUQUELIN Kévin",
  "VELASCO Simone",
  "VENTURINI Clément",
  "VERCHER Mattéo",
  "VERMEERSCH Gianni",
  "VERSTRYNGE Emiel",
  "VINGEGAARD Jonas",
  "VLASOV Aleksandr",
  "WATSON Samuel",
  "WELLENS Tim",
  "WOODS Michael",
  "WRIGHT Fred",
  "WÆRENSKJOLD Søren",
  "YATES Adam",
  "YATES Simon",
  "ZIMMERMANN Georg"
];

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

const VUELTA_STARTLIST = [
  "ALEOTTI Giovanni",
  "ALMEIDA João",
  "ANIOŁKOWSKI Stanisław",
  "APARICIO Mario",
  "ARCAS Jorge",
  "ARMIRAIL Bruno",
  "ARTZ Huub",
  "AULAR Orluis",
  "AYUSO Juan",
  "AZPARREN Xabier Mikel",
  "BAGIOLI Andrea",
  "BALDERSTONE Abel",
  "BARCELÓ Fernando",
  "BAYER Tobias",
  "BELOKI Markel",
  "BENNETT George",
  "BERNAL Egan",
  "BERNARD Julien",
  "BIERMANS Jenthe",
  "BISIAUX Léo",
  "BJERG Mikkel",
  "BONNEU Kamiel",
  "BOU Joan",
  "BOUWMAN Koen",
  "BRAZ AFONSO Clément",
  "BUCHMANN Emanuel",
  "BUITRAGO Santiago",
  "BURATTI Nicolò",
  "CAMPENAERTS Victor",
  "CAMPRUBÍ Marcel",
  "CANAL Carlos",
  "CARR Simon",
  "CASTRILLO Pablo",
  "CAVAGNA Rémi",
  "CAVIA Daniel",
  "CEPEDA Jefferson Alveiro",
  "CHAVES Esteban",
  "CHRISTEN Fabio",
  "CHUMIL Sergio Geovani",
  "CICCONE Giulio",
  "CONCI Nicola",
  "COQUARD Bryan",
  "CÔTÉ Pier-André",
  "CRAPS Lars",
  "DE BUYST Jasper",
  "DE LA CALLE Hugo",
  "DE LA CRUZ David",
  "DE PESTEL Sander",
  "DE POOTER Dries",
  "DEBRUYNE Ramses",
  "DENZ Nico",
  "DUNBAR Eddie",
  "EDDY Patrick",
  "ERMAKOV Roman",
  "FAGÚNDEZ Eric Antonio",
  "FAURA José Luis",
  "FERNÁNDEZ Sinuhé",
  "FISHER-BLACK Finn",
  "FOLDAGER Anders",
  "FORTUNATO Lorenzo",
  "FRIGO Marco",
  "GALL Felix",
  "GAMPER Patrick",
  "GANNA Filippo",
  "GARCÍA CORTINA Iván",
  "GARCÍA PIERNA Carlos",
  "GARCÍA PIERNA Raúl",
  "GAROFOLI Gianmarco",
  "GAUDU David",
  "GHEBREIGZABHIER Amanuel",
  "GLIVAR Gal",
  "GONZÁLEZ David",
  "GREGAARD Jonas",
  "GROßSCHARTNER Felix",
  "GRUEL Thibaud",
  "GUARDEÑO Jaume",
  "GUERNALEC Victor",
  "HAIG Jack",
  "HAMILTON Chris",
  "HARPER Chris",
  "HERRADA Jesús",
  "HESSMANN Michel",
  "HIGUITA Sergio",
  "HINDLEY Jai",
  "HIRT Jan",
  "HOOLE Daan",
  "HOWSON Damien",
  "JORGENSON Matteo",
  "JUNGELS Bob",
  "JUUL-JENSEN Christopher",
  "KELDERMAN Wilco",
  "KNIGHT Oliver",
  "KOERDT Bjorn",
  "KRAGH ANDERSEN Søren",
  "KÜNG Stefan",
  "KUSS Sepp",
  "KWIATKOWSKI Michał",
  "LABROSSE Jordan",
  "LANDA Mikel",
  "LANGELLOTTI Victor",
  "LECERF Junior",
  "LEEMREIZE Gijs",
  "LIVYNS Arjen",
  "LÓPEZ Harold Martín",
  "LOZOUET Léandre",
  "MARIT Arne",
  "MARTIN Guillaume",
  "MARTINEZ Juan Guillermo",
  "MASNADA Fausto",
  "MEINTJES Louis",
  "MIHKELS Madis",
  "MOLARD Rudy",
  "MOLENAAR Alex",
  "NERURKAR Lukas",
  "NICOLAU Joel",
  "NOVAK Domen",
  "O'BRIEN Kelland",
  "O'CONNOR Ben",
  "OLIVEIRA Ivo",
  "OTRUBA Jakub",
  "OURSELIN Paul",
  "PAASSCHENS Mathijs",
  "PARET-PEINTRE Valentin",
  "PEDERSEN Mads",
  "PELLIZZARI Giulio",
  "PETERS Nans",
  "PETILLI Simone",
  "PHILIPSEN Jasper",
  "PICKERING Finlay",
  "PIDCOCK Thomas",
  "PLANCKAERT Edward",
  "POELS Wout",
  "QUINN Sean",
  "RAISBERG Nadav",
  "REINDERINK Pepijn",
  "RICCITELLO Matthew",
  "RICKAERT Jonas",
  "RIESEBEEK Oscar",
  "RIVERA Brandon Smith",
  "RODRÍGUEZ Cristián",
  "ROLLAND Brieuc",
  "ROMO Javier",
  "ROOSEN Timo",
  "ROULAND Louis",
  "RYAN Archie",
  "SAMITIER Sergio",
  "SCHACHMANN Maximilian",
  "SCOTSON Callum",
  "SEGAERT Alec",
  "SEPÚLVEDA Eduardo",
  "SHAW James",
  "SHEFFIELD Magnus",
  "SILVA Guillermo Thomas",
  "SLOCK Liam",
  "SMITH Dion",
  "SOBRERO Matteo",
  "SOLER Marc",
  "STAUNE-MITTET Johannes",
  "STEWART Jake",
  "TEJADA Harold",
  "THIERRY Pierre",
  "TIBERI Antonio",
  "TRÆEN Torstein",
  "TULETT Ben",
  "TURNER Ben",
  "VAN BAARLE Dylan",
  "VAN BOVEN Luca",
  "VAN DER LEE Jardi Christiaan",
  "VAN DIJKE Tim",
  "VAN UDEN Casper",
  "VANSEVENANT Mauri",
  "VERGALLITO Luca",
  "VERMAERKE Kevin",
  "VERNON Ethan",
  "VERONA Carlos",
  "VERRE Alessandro",
  "VERVAEKE Louis",
  "VINE Jay",
  "VINGEGAARD Jonas",
  "VINOKUROV Nicolas",
  "VIVIANI Elia",
  "ZINGLE Axel",
  "ZUKOWSKY Nickolas",
  "ZWIEHOFF Ben",
]

// Array.from(document.querySelectorAll('.player dt a span')).map(e => e.innerHTML).filter(f => f !== "")

const SUMO_STARTLIST = [
  "Hoshoryu",
  "Kotozakura",
  "Kirishima",
  "Oho",
  "Ichiyamamoto",
  "Ura",
  "Takanosho",
  "Daieisho",
  "Tamawashi",
  "Hiradoumi",
  "Oshoma",
  "Shodai",
  "Gonoyama",
  "Tokihayate",
  "Chiyoshoma",
  "Midorifuji",
  "Tobizaru",
  "Shishi",
  "Ryuden",
  "Asanoyama",
  "Asahakuryu",
  "Onosato",
  "Aonishiki",
  "Takayasu",
  "Wakamotoharu",
  "Yoshinofuji",
  "Wakatakakage",
  "Hakunofuji",
  "Atamifuji",
  "Churanoumi",
  "Onokatsu",
  "Fujinokawa",
  "Kinbozan",
  "Roga",
  "Kotoshoho",
  "Nishikifuji",
  "Abi",
  "Tomokaze",
  "Mitakeumi",
  "Asakoryu",
  "Oshoumi",
  "Hatsuyama"
];