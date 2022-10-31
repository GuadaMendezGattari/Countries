const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    cca3: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false
      //validate: {len: [3]}
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      defaultValue: 'Unknown',
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.INTEGER
    },
    population: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  });
};

/* 
ID (Código de 3 letras) *
Nombre *
Imagen de la bandera *
Continente *
Capital *
Subregión
Área
Población
*/

/* 
{
  "name":{
    "common":"Greece",
    "official":"Hellenic Republic",
    "nativeName":{
      "ell":{
        "official":"Ελληνική Δημοκρατία",
        "common":"Ελλάδα"
      }
    }
  },
  "tld":[".gr"],
  "cca2":"GR",
  "ccn3":"300",
  "cca3":"GRC",
  "cioc":"GRE",
  "independent":true,
  "status":"officially-assigned",
  "unMember":true,
  "currencies":{
    "EUR":{
      "name":"Euro",
      "symbol":"€"
    }
  },
  "idd":{
    "root":"+3",
    "suffixes":["0"]
  },
  "capital":["Athens"],
  "altSpellings":[
    "GR",
    "Elláda",
    "Hellenic Republic",
    "Ελληνική Δημοκρατία"
  ],
  "region":"Europe",
  "subregion":"Southern Europe",
  "languages":{"ell":"Greek"},
  "translations":{
    "ara":{
      "official":"الجمهورية الهيلينية",
      "common":"اليونان"
    },
    "bre":{
      "official":"Republik Hellenek",
      "common":"Gres"
    },
    "ces":{
      "official":"Řecká republika",
      "common":"Řecko"
    },
    "cym":{
      "official":"Hellenic Republic",
      "common":"Greece"
    },
    "deu":{
      "official":"Hellenische Republik",
      "common":"Griechenland"
    },
    "est":{
      "official":"Kreeka Vabariik",
      "common":"Kreeka"
    },
    "fin":{
      "official":"Helleenien tasavalta",
      "common":"Kreikka"
    },
    "fra":{
      "official":"République hellénique",
      "common":"Grèce"
    },
    "hrv":{
      "official":"Helenska Republika",
      "common":"Grčka"
    },
    "hun":{
      "official":"Görög Köztársaság",
      "common":"Görögország"
    },
    "ita":{
      "official":"Repubblica ellenica",
      "common":"Grecia"
    },
    "jpn":{
      "official":"ギリシャ共和国",
      "common":"ギリシャ"
    },
    "kor":{
      "official":"그리스 공화국",
      "common":"그리스"
    },
    "nld":{
      "official":"Helleense Republiek",
      "common":"Griekenland"
    },
    "per":{
      "official":"جمهوری یونان",
      "common":"یونان"
    },
    "pol":{
      "official":"Republika Grecka",
      "common":"Grecja"
    },
    "por":{
      "official":"República Helénica",
      "common":"Grécia"
    },
    "rus":{
      "official":"Греческая Республика",
      "common":"Греция"
    },
    "slk":{
      "official":"Grécka republika",
      "common":"Greécko"
    },
    "spa":{
      "official":"República Helénica",
      "common":"Grecia"
    },
    "swe":{
      "official":"Republiken Grekland",
      "common":"Grekland"
    },
    "urd":{
      "official":"جمہوریہ ہیلینیہ",
      "common":"یونان"
    },
    "zho":{
      "official":"希腊共和国",
      "common":"希腊"
    }
  },
  "latlng":[39.0,22.0],
  "landlocked":false,
  "borders":[
    "ALB",
    "BGR",
    "TUR",
    "MKD"
  ],
  "area":131990.0,
  "demonyms":{
    "eng":{
      "f":"Greek",
      "m":"Greek"
    },
    "fra":{
      "f":"Grecque",
      "m":"Grec"
    }
  },
  "flag":"\uD83C\uDDEC\uD83C\uDDF7",
  "maps":{
    "googleMaps":"https://goo.gl/maps/LHGcAvuRyD2iKECC6",
    "openStreetMaps":"https://www.openstreetmap.org/relation/192307"
  },
  "population":10715549,
  "gini":{"2018":32.9},
  "fifa":"GRE",
  "car":{
    "signs":["GR"],
    "side":"right"
  },
  "timezones":["UTC+02:00"],
  "continents":["Europe"],
  "flags":[
    "https://flagcdn.com/gr.svg",
    "https://flagcdn.com/w320/gr.png"
  ]
}
*/