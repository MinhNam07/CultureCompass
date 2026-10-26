import type { GlobeMarker } from "@/components/ui/3d-globe";

export interface CountryMarker extends GlobeMarker {
  code: string;
  image: string;
  alt: string;
  place: string;
  credit: string;
  sourceUrl: string;
}

export const countries: CountryMarker[] = [
  {
    "code": "vn",
    "label": "Vietnam",
    "lat": 16,
    "lng": 106,
    "src": "assets/img/flags/vn.svg",
    "image": "assets/img/hn-old-quarter.jpg",
    "alt": "Old Quarter shopfronts in Hanoi packed with colourful goods under awnings, with people on motorbikes passing in front.",
    "place": "Hà Nội, Vietnam",
    "credit": "Maryam Laura Moazedi, “Vietnam hanoi old quarter”",
    "sourceUrl": "https://commons.wikimedia.org/w/index.php?curid=3635148"
  },
  {
    "code": "us",
    "label": "United States",
    "lat": 39,
    "lng": -98,
    "src": "assets/img/flags/us.svg",
    "image": "assets/img/world/hula-merrie-monarch-l.webp",
    "alt": "Male hula kahiko dancers with flower lei and patterned wraps performing on stage.",
    "place": "Merrie Monarch Festival, Hawaiʻi",
    "credit": "Thomas Tunsch, “Hula dancers (a0007139)”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Hula_dancers_(a0007139).jpg"
  },
  {
    "code": "mx",
    "label": "Mexico",
    "lat": 23,
    "lng": -102,
    "src": "assets/img/flags/mx.svg",
    "image": "assets/img/world/alebrije-oaxaca-l.webp",
    "alt": "A young artisan painting a carved wooden alebrije figure with a fine brush.",
    "place": "San Martín Tilcajete, Oaxaca",
    "credit": "Alejandro Linares Garcia, “AngelesTilcajete042”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:AngelesTilcajete042.JPG"
  },
  {
    "code": "br",
    "label": "Brazil",
    "lat": -14,
    "lng": -52,
    "src": "assets/img/flags/br.svg",
    "image": "assets/img/world/capoeira-rio-l.webp",
    "alt": "Two capoeiristas mid-movement inside a roda while the circle around them claps and plays.",
    "place": "Rio de Janeiro, Brazil",
    "credit": "Estela Neto, “Roda de Capoeira tradicional do Engenho da Rainha 5”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Roda_de_Capoeira_tradicional_do_Engenho_da_Rainha_5.jpg"
  },
  {
    "code": "gb",
    "label": "United Kingdom",
    "lat": 55,
    "lng": -3,
    "src": "assets/img/flags/gb.svg",
    "image": "assets/img/world/highland-glasgow-l.webp",
    "alt": "Three girls in tartan kilts leaping during a Highland dance competition.",
    "place": "Glasgow Green, Scotland",
    "credit": "Thyes, “Highland-dance-2008-3-girls”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Highland-dance-2008-3-girls.JPG"
  },
  {
    "code": "fr",
    "label": "France",
    "lat": 46.6,
    "lng": 2.2,
    "src": "assets/img/flags/fr.svg",
    "image": "assets/img/world/breton-quimper-l.webp",
    "alt": "A smiling boy in a black hat and embroidered Breton costume in a festival parade.",
    "place": "Quimper, Brittany",
    "credit": "Kergourlay, “Photo - Festival de Cornouaille 2013 - Défilé en fête 90”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Photo_-_Festival_de_Cornouaille_2013_-_D%C3%A9fil%C3%A9_en_f%C3%AAte_90.jpg"
  },
  {
    "code": "es",
    "label": "Spain",
    "lat": 40,
    "lng": -4,
    "src": "assets/img/flags/es.svg",
    "image": "assets/img/world/castellers-vilanova-l.webp",
    "alt": "A child in a helmet climbing the shoulders of castellers in green shirts as they build a human tower.",
    "place": "Vilanova i la Geltrú, Catalonia",
    "credit": "Xavier Rondón Medina, “Diada castellera de la festa major de Vilanova i la Geltrú (5991385725)”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Diada_castellera_de_la_festa_major_de_Vilanova_i_la_Geltr%C3%BA_(5991385725).jpg"
  },
  {
    "code": "tr",
    "label": "Turkey",
    "lat": 39,
    "lng": 35,
    "src": "assets/img/flags/tr.svg",
    "image": "assets/img/world/cotton-carding-turkey-l.webp",
    "alt": "A man carding cotton by hand with a bow-string tool in a dim workshop.",
    "place": "Turkey",
    "credit": "Musatalasli, “Cotton miller of Kültür Turkey”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Cotton_miller_of_K%C3%BClt%C3%BCr_Turkey.jpg"
  },
  {
    "code": "eg",
    "label": "Egypt",
    "lat": 27,
    "lng": 30,
    "src": "assets/img/flags/eg.svg",
    "image": "assets/img/world/tanoura-egypt-l.webp",
    "alt": "A tanoura dancer spinning in a wide, colourful skirt under stage lights.",
    "place": "Egypt",
    "credit": "summering2018, “Traditional Tanoura Dance0”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Traditional_Tanoura_Dance0.jpg"
  },
  {
    "code": "in",
    "label": "India",
    "lat": 22,
    "lng": 79,
    "src": "assets/img/flags/in.svg",
    "image": "assets/img/world/theyyam-kerala-l.webp",
    "alt": "A Theyyam performer in a red painted face, ornate headdress and costume during a night ritual, drummers behind.",
    "place": "Muzhappilangad, Kerala",
    "credit": "Shagil Kannur, “Theyyam of Kerala 3”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Theyyam_of_Kerala_3.jpg"
  },
  {
    "code": "cn",
    "label": "China",
    "lat": 35,
    "lng": 104,
    "src": "assets/img/flags/cn.svg",
    "image": "assets/img/world/miao-dance-guizhou-l.webp",
    "alt": "Miao women in embroidered skirts and tall silver headdresses dancing in a village square.",
    "place": "Guizhou, China",
    "credit": "PeterSzabo83, “Miao folkdance - Guizhou, China”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Miao_folkdance_-_Guizhou,_China.jpg"
  },
  {
    "code": "jp",
    "label": "Japan",
    "lat": 37,
    "lng": 138,
    "src": "assets/img/flags/jp.svg",
    "image": "assets/img/world/taiko-matsuyama-l.webp",
    "alt": "Taiko drummers in festival jackets playing on a stage at night during the autumn festival.",
    "place": "Matsuyama, Japan",
    "credit": "Maarten Heerlien, “Taiko drummers at the Matsuyama Autumn festival (6454024691)”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Taiko_drummers_at_the_Matsuyama_Autumn_festival_(6454024691).jpg"
  },
  {
    "code": "kr",
    "label": "South Korea",
    "lat": 36,
    "lng": 128,
    "src": "assets/img/flags/kr.svg",
    "image": "assets/img/world/nongak-namwon-l.webp",
    "alt": "Nongak performers with drums and ribboned hats dancing through a village street.",
    "place": "Namwon, South Korea",
    "credit": "Cultural Heritage Administration of Korea, “남원농악”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:%EB%82%A8%EC%9B%90%EB%86%8D%EC%95%85.jpg"
  },
  {
    "code": "th",
    "label": "Thailand",
    "lat": 15,
    "lng": 101,
    "src": "assets/img/flags/th.svg",
    "image": "assets/img/world/nang-yai-ratchaburi-l.webp",
    "alt": "A nang yai performer silhouetted behind a glowing screen, holding up a large carved leather puppet.",
    "place": "Wat Khanon, Ratchaburi",
    "credit": "Paul-shy, “Grand shadow play at Wat Khanon Temple 003”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Grand_shadow_play_at_Wat_Khanon_Temple_003.jpg"
  },
  {
    "code": "id",
    "label": "Indonesia",
    "lat": -3,
    "lng": 118,
    "src": "assets/img/flags/id.svg",
    "image": "assets/img/world/batik-cirebon-l.webp",
    "alt": "A woman drawing hot wax onto cloth with a canting tool to make batik tulis.",
    "place": "Trusmi, Cirebon",
    "credit": "Ahaetulla, “Batik Artisan Drawing Wax with Canting in Trusmi Cirebon Indonesia”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Batik_Artisan_Drawing_Wax_with_Canting_in_Trusmi_Cirebon_Indonesia.jpg"
  },
  {
    "code": "nz",
    "label": "New Zealand",
    "lat": -41,
    "lng": 174,
    "src": "assets/img/flags/nz.svg",
    "image": "assets/img/world/kapa-haka-zayed-l.webp",
    "alt": "Students in headscarves and woven sashes performing kapa haka.",
    "place": "Zayed College for Girls, New Zealand",
    "credit": "Office of the Governor-General of New Zealand, “Zayed College 04”",
    "sourceUrl": "https://commons.wikimedia.org/wiki/File:Zayed_College_04.jpg"
  }
];

export function countryHref(country: CountryMarker) {
  return country.code === "vn" ? "vietnam.html" : `country-details.html?country=${encodeURIComponent(country.code)}`;
}
