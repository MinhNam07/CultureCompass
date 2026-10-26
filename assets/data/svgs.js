/* Scene art: AI-generated editorial paintings with a lightweight interactive SVG layer.
   Geometry belongs to the controls; paintings remain intact. No figure-shaped placeholder art.
   Files, authorship and limitations are recorded in assets.json. */
window.CC = window.CC || {};
(function () {
  var art = {
  "sc01": {
    "file": "homestay",
    "alt": "Painted interpretation of a Hà Nội homestay: cô Lan welcomes a traveller; shoes sit beside the door and her mother and son wait in the living room.",
    "pins": [
      [
        "hs-host",
        280,
        160
      ],
      [
        "hs-shoes",
        123,
        352
      ],
      [
        "hs-family",
        650,
        195
      ]
    ]
  },
  "sc02": {
    "file": "dinner",
    "alt": "Painted interpretation of a shared family dinner: grandmother, cô Lan, her son and a traveller sit around a wooden table with greens, fish, soup, rice bowls and water.",
    "pins": [
      [
        "hs-bowl",
        282,
        322
      ],
      [
        "hs-dish",
        445,
        222
      ],
      [
        "hs-chop",
        350,
        336
      ],
      [
        "hs-spoon",
        445,
        280
      ],
      [
        "hs-glass",
        282,
        220
      ]
    ]
  },
  "sc03": {
    "file": "temple",
    "alt": "Interpretive painting of the Temple of Literature: a visitor at the gate, an information board, turtle-mounted stelae and a staff member beside a worship hall. This is not an architectural plan.",
    "pins": [
      [
        "hs-sign",
        77,
        265
      ],
      [
        "hs-stelae",
        405,
        240
      ],
      [
        "hs-hall",
        710,
        163
      ],
      [
        "hs-staff",
        643,
        310
      ]
    ]
  },
  "sc04": {
    "file": "street",
    "alt": "Painted interpretation of a Hà Nội street: a traveller and shopkeeper on the pavement, a fruit vendor with baskets, motorbike traffic and a nearby signal and marked crossing.",
    "pins": [
      [
        "hs-crossing",
        746,
        269
      ],
      [
        "hs-traffic",
        500,
        223
      ],
      [
        "hs-bag",
        113,
        255
      ],
      [
        "hs-shop",
        229,
        172
      ],
      [
        "hs-vendor",
        612,
        265
      ]
    ]
  }
};
  window.CC.sceneArt = art;
  window.CC.svgs = {};
  Object.keys(art).forEach(function (id) {
    var a = art[id];
    a.src = 'assets/img/scenes/' + a.file + '.jpg';
    window.CC.svgs[id] = '<svg class="cc-stage cc-painted-stage" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + a.alt + '">' +
      '<g class="scene-camera"><image href="' + a.src + '" width="800" height="450" preserveAspectRatio="xMidYMid slice"/>' +
      a.pins.map(function (p, i) {
        return '<g class="hotspot art-pin" data-hotspot="' + p[0] + '" transform="translate(' + p[1] + ' ' + p[2] + ')" aria-hidden="true">' +
          '<circle class="hs-hit" r="25" fill="transparent"/><circle class="art-pin-halo" r="22"/>' +
          '<circle class="art-pin-disc" r="13"/><text class="art-pin-number" text-anchor="middle" y="5">' + (i + 1) + '</text></g>';
      }).join('') + '</g></svg>';
  });
})();

/* Line-art icons for the home compass (viewBox 48x48, drawn with currentColor).
   Keys are used by topics.json ("icon") and by the item types scene / claim / phrase. */
(function () {
  function icon(body) {
    return '<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" ' +
      'stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + body + '</svg>';
  }
  window.CC.icons = {
    /* rice bowl with chopsticks */
    bowl: icon('<path d="M9 25h30a15 13 0 0 1-30 0z"/><path d="M19 38h10"/><path d="M15 21c2-3 5-4 9-4s7 1 9 4"/>' +
      '<path d="M27 10l12-5M29 13l12-4"/><path d="M18 30c2 2 4 3 6 3"/>'),
    /* two people bowing slightly toward each other */
    greet: icon('<circle cx="15" cy="12" r="4"/><circle cx="33" cy="12" r="4"/>' +
      '<path d="M15 16c-3 3-4 8-4 13v12M15 16c3 3 6 6 7 10M33 16c3 3 4 8 4 13v12M33 16c-3 3-6 6-7 10"/>' +
      '<path d="M18 41v-9M30 41v-9"/>'),
    /* house with tiled roof and open door */
    house: icon('<path d="M6 22L24 9l18 13"/><path d="M10 20v19h28V20"/><path d="M20 39V28h8v11"/>' +
      '<path d="M13 25h4v4h-4zM31 25h4v4h-4z"/><path d="M4 23l2-1M44 23l-2-1"/>'),
    /* temple gate with curved roof */
    temple: icon('<path d="M6 17c6 1 12-3 18-8 6 5 12 9 18 8"/><path d="M10 17v4h28v-4"/><path d="M12 21v19M36 21v19"/>' +
      '<path d="M18 40V27h12v13"/><path d="M8 40h32"/><path d="M22 14h4"/><circle cx="24" cy="32" r="1"/>'),
    /* motorbike, side view */
    motorbike: icon('<circle cx="12" cy="32" r="6"/><circle cx="37" cy="32" r="6"/>' +
      '<path d="M12 32h9l5-9h7l4 9"/><path d="M26 23l-3-6h-5M33 23l2-7h4"/><path d="M19 26h6"/>'),
    /* conical hat (nón lá) */
    hat: icon('<path d="M5 31L24 9l19 22"/><path d="M5 31c6 4 32 4 38 0"/><path d="M12 23l24 0M9 27l30 0" stroke-dasharray="2 3"/>' +
      '<path d="M15 34c2 4 4 6 6 7M33 34c-2 4-4 6-6 7"/>'),
    /* speech bubble with a Vietnamese letter */
    speech: icon('<path d="M8 10h32v21H22l-9 8v-8H8z"/><path d="M19 17a5 5 0 1 0 0 8 5 5 0 0 0 0-8z"/>' +
      '<path d="M24 16c1-2 3-2 3-2"/><path d="M30 21h4"/>'),
    /* stone stele on a turtle */
    stele: icon('<path d="M17 30V12c0-3 3-5 7-5s7 2 7 5v18"/><path d="M21 15h6M21 19h6M21 23h6"/>' +
      '<path d="M9 36c2-5 8-6 15-6s13 1 15 6z"/><path d="M39 34l4-1M12 38l-2 3M36 38l2 3"/>'),
    /* paper lantern */
    lantern: icon('<path d="M24 4v4"/><path d="M18 8h12"/><path d="M15 12c-4 4-4 18 0 22h18c4-4 4-18 0-22z"/>' +
      '<path d="M15 12h18M15 34h18"/><path d="M21 12c-2 5-2 17 0 22M27 12c2 5 2 17 0 22"/><path d="M24 34v8M21 44h6"/>'),
    /* item types */
    /* a water puppet on a rod above ripples (Arts & creativity) */
    puppet: icon('<circle cx="24" cy="12" r="5"/><path d="M17 26c0-5 3-8 7-8s7 3 7 8v5H17z"/><path d="M14 23l4 3M34 23l-4 3"/>' +
      '<path d="M24 31v5"/><path d="M6 40c3-2 6-2 9 0s6 2 9 0 6-2 9 0 6 2 9 0"/>'),
    play: icon('<circle cx="24" cy="24" r="16"/><path d="M20 16l12 8-12 8z"/>'),
    know: icon('<path d="M12 6h20l6 6v30H12z"/><path d="M32 6v6h6"/><path d="M18 20h14M18 26h14M18 32h9"/>'),
    say: icon('<path d="M8 12h32v19H23l-9 7v-7H8z"/><path d="M16 21c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/>'),
    /* the centre of the compass */
    compass: icon('<circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="13" stroke-dasharray="1.5 3"/>' +
      '<path d="M24 9l4 15-4 15-4-15z"/><path d="M24 9l4 15h-8z" fill="currentColor"/>' +
      '<path d="M24 2v3M24 43v3M2 24h3M43 24h3"/>')
  };
})();
