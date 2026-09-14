// src/refs/alphabet_reference.ts
var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var Alphabet = class {
  letters = [];
  get() {
    return this.letters;
  }
  normal() {
    this.letters = alphabet;
    return this;
  }
  shuffle() {
    this.letters = [];
    do {
      let letter = alphabet[Math.round(Math.random() * 25)];
      if (this.letters.indexOf(letter) === -1) this.letters.push(letter);
    } while (this.letters.length < 26);
    return this;
  }
};

// src/ciphers/alpha_template/MutationTemplate.ts
var MutationTemplate = class {
  static reciproque(msg) {
    let formated_msg = "";
    for (let i = 0; i < msg.length; i++) {
      formated_msg += new Alphabet().normal().get()[26 - new Alphabet().normal().get().indexOf(msg[i]) - 1];
    }
    return formated_msg;
  }
  static decalage(msg, revert, dec) {
    const decalage = Math.round(Math.random() * 23) + 1;
    let formated_msg = "";
    for (let i = 0; i < msg.length; i++) {
      let pos = new Alphabet().normal().get().indexOf(msg[i]);
      if (revert) {
        pos -= dec || decalage;
        if (pos < 0) pos += 25;
      } else {
        pos += decalage;
        if (pos > 25) pos -= 25;
      }
      formated_msg += new Alphabet().normal().get()[pos];
    }
    return { msg: formated_msg, decalage };
  }
};

// src/ciphers/alpha_template/OrderTemplate.ts
var OrderTemplate = class {
  static reverse(msg) {
    let formated_msg = "";
    for (let i = msg.length - 1; i > -1; i--) {
      formated_msg += msg[i];
    }
    return formated_msg;
  }
  static random(msg, ref, revert) {
    let formated_msg = "";
    const alpha_s = revert ? ref : new Alphabet().shuffle().get();
    const alpha_n = new Alphabet().normal().get();
    for (let i = 0; i < msg.length; i++) {
      formated_msg += revert ? alpha_n[(alpha_s || []).indexOf(msg[i])] : (alpha_s || [])[alpha_n.indexOf(msg[i])];
    }
    return { alpha_ref: alpha_s || [], msg: formated_msg };
  }
};

// src/ciphers/Cipher.ts
var Cipher = class {
  symbols = [];
  /**
   * encode
      msg: string : string    
  */
  encode(msg) {
    let coded_msg = "";
    for (let i = 0; i < msg.length; i++) {
      if (i > 0) coded_msg += " ";
      coded_msg += this.symbols[new Alphabet().normal().get().indexOf(msg[i])];
    }
    return coded_msg;
  }
  /**
   * decode
      msg: string : string    
  */
  decode(msg) {
    return msg.split(" ").map((symbol) => new Alphabet().normal().get()[this.symbols.indexOf(symbol)]).join("");
  }
};

// src/ciphers/type/SCBacon.ts
var SCBacon = class extends Cipher {
  constructor() {
    super();
    this.initSymbols();
  }
  initSymbols() {
    this.symbols = [
      "AABAA",
      "AABAB",
      "AABBA",
      "AABBB",
      "ABAAA",
      "ABAAB",
      "ABABA",
      "ABABB",
      "ABBAA",
      "ABBAB",
      "ABBBA",
      "ABBBB",
      "BAAAA",
      "BAAAB",
      "BAABA",
      "BAABB",
      "BABAA",
      "BABAB",
      "BABBA",
      "BABBB",
      "BBAAA",
      "BBAAB",
      "BBABA",
      "BBABB",
      "BBBAA",
      "BBBAB"
    ];
  }
};

// src/ciphers/type/SCBinary.ts
var SCBinary = class extends Cipher {
  constructor() {
    super();
    this.initSymbols();
  }
  initSymbols() {
    this.symbols = [
      "01000001",
      "01000010",
      "01000011",
      "01000100",
      "01000101",
      "01000110",
      "01000111",
      "01001000",
      "01001001",
      "01001010",
      "01001011",
      "01001100",
      "01001101",
      "01001110",
      "01001111",
      "01010000",
      "01010001",
      "01010010",
      "01010011",
      "01010100",
      "01010101",
      "01010110",
      "01010111",
      "01011000",
      "01011001",
      "01011010"
    ];
  }
};

// src/ciphers/type/SCEnigma/SCEComponent/SCECReflector.ts
var SCECReflector = class {
  wiring;
  constructor(wiring) {
    this.wiring = wiring;
  }
  reflect(input) {
    return this.wiring.charCodeAt(input) - 65;
  }
};

// src/ciphers/type/SCEnigma/SCEComponent/SCECRotor.ts
var SCECRotor = class {
  wiring;
  position;
  notch;
  constructor(wiring, notch) {
    this.wiring = wiring;
    this.position = 0;
    this.notch = notch;
  }
  step() {
    this.position = (this.position + 1) % 26;
  }
  forward(input) {
    let index = (input + this.position) % 26;
    return (this.wiring.charCodeAt(index) - 65 - this.position + 26) % 26;
  }
  backward(input) {
    let index = (this.wiring.indexOf(String.fromCharCode((input + this.position) % 26 + 65)) - this.position + 26) % 26;
    return index;
  }
};

// src/ciphers/type/SCEnigma/SCEComponent/SCECPlugboard.ts
var SCECPlugboard = class {
  wiring;
  constructor(connections) {
    this.wiring = {};
    connections.forEach((connection) => {
      const [a, b] = connection.split("");
      if (!a || !b) throw new Error("Invalid connection");
      this.wiring[a] = b;
      this.wiring[b] = a;
    });
  }
  swap(char) {
    return this.wiring[char] || char;
  }
};

// src/ciphers/type/SCEnigma/SCEnigma.ts
var SCEnigma = class {
  rotors;
  reflector;
  plugboard;
  constructor(rotors, reflector, plugboard) {
    this.rotors = rotors;
    this.reflector = reflector;
    this.plugboard = plugboard;
  }
  encrypt(char) {
    char = this.plugboard.swap(char);
    let input = char.charCodeAt(0) - 65;
    for (let rotor of this.rotors) {
      input = rotor.forward(input);
    }
    input = this.reflector.reflect(input);
    for (let i = this.rotors.length - 1; i >= 0; i--) {
      input = this.rotors[i].backward(input);
    }
    char = String.fromCharCode(input + 65);
    char = this.plugboard.swap(char);
    this.rotors[0].step();
    for (let i = 1; i < this.rotors.length; i++) {
      if (this.rotors[i - 1].position === this.rotors[i - 1].notch) {
        this.rotors[i].step();
      } else {
        break;
      }
    }
    return char;
  }
  encryptMessage(message) {
    return message.split("").map((char) => this.encrypt(char)).join("");
  }
};
function encode(msg) {
  const rotors = [];
  for (let i = 0; i < 10; i++) rotors.push(new SCECRotor(new Alphabet().shuffle().get().join(""), 7));
  const reflector = new SCECReflector("YRUHQSLDPXNGOKMIEBFZCWVJAT");
  const plugboard = new SCECPlugboard([]);
  const encryptMessage = new SCEnigma(rotors, reflector, plugboard).encryptMessage(msg);
  return {
    rotors,
    reflector,
    encryptMsg: encryptMessage
  };
}
function decode(key) {
  key.rotors.forEach((rotor) => rotor.position = 0);
  return new SCEnigma(key.rotors, key.reflector, new SCECPlugboard([])).encryptMessage(key.encryptMsg);
}

// src/ciphers/type/SCFrama.ts
var SCFrama = class extends Cipher {
  constructor(key) {
    super();
    this.initSymbols(key);
  }
  initSymbols(key) {
    const symbols_ref = [
      "\u2042",
      "\u204B",
      "\u205B",
      "\u205C",
      "\u2059",
      "\u2056",
      "\u2116",
      "\u2041",
      "\u2301",
      "\u23D5",
      "\u23D6",
      "\u23D4",
      "\u20A9",
      "\u20B2",
      "\u20B9",
      "\u20AA",
      "\u0AF1",
      "\u0BF9",
      "\uFDFC\u20BF",
      "\u20B3",
      "\u20B7",
      "\u09FB",
      "\u20A0",
      "\u20B0",
      "\u20BB",
      "\xA4"
    ];
    key.split("").forEach((letter) => {
      let symbol = symbols_ref[new Alphabet().normal().get().indexOf(letter)];
      if (this.symbols.indexOf(symbol) === -1) this.symbols.push(symbol);
    });
    symbols_ref.forEach((symbol) => {
      if (this.symbols.indexOf(symbol) === -1) this.symbols.push(symbol);
    });
  }
};

// src/ciphers/type/SCMorse.ts
var SCMorse = class extends Cipher {
  constructor() {
    super();
    this.initSymbols();
  }
  initSymbols() {
    this.symbols = [
      ".-",
      "-...",
      "-.-.",
      "-..",
      ".",
      "..-.",
      "--.",
      "....",
      "..",
      ".---",
      "-.-",
      ".-..",
      "--",
      "-.",
      "---",
      ".--.",
      "--.-",
      ".-.",
      "...",
      "-",
      "..-",
      "...-",
      ".--",
      "-..-",
      "-.--",
      "--.."
    ];
  }
};

// src/ciphers/type/SCNavajo.ts
var SCNavajo = class extends Cipher {
  constructor() {
    super();
    this.initSymbols();
  }
  initSymbols() {
    this.symbols = [
      "Wol-la-chee",
      "Shush",
      "Moasi",
      "Be",
      "Dzeh",
      "Ma-e",
      "Klizzie",
      "Lin",
      "Tkin",
      "Tkele-cho-g",
      "Klizzie-yazi",
      "Dibeh-yazzie",
      "Na-as-tso-si",
      "Nesh-chee",
      "Ne-ahs-jah",
      "Bi-sodih",
      "Ca-yeilth",
      "Gah",
      "Dibe",
      "Than-zie",
      "No-da-ih",
      "A-keh-di-glini ",
      "Gloe-ih",
      "Al-na-as-dzoh",
      "Tsa-as-zih",
      "Besh-do-gliz"
    ];
  }
};

// src/ciphers/type/SCPolybe.ts
function generateGrid(gridSeq) {
  let grid = [];
  let row = [];
  do {
    gridSeq.split("").map((l) => {
      if (row.length === 5) {
        grid.push(row);
        row = [];
      }
      if (l !== "J") row.push(l);
    });
    if (grid.length > 5) grid = [];
  } while (grid.length < 5);
  return grid;
}
function polybeEncode(message) {
  const grid_ref = new Alphabet().shuffle().get().join("");
  const grid = generateGrid(grid_ref);
  const encodeChar = (char) => {
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === char) {
          return `${r + 1}${c + 1}`;
        }
      }
    }
    return char;
  };
  return { msg: message.split("").map((c) => encodeChar(c)).join(" "), grid_ref };
}
function polybeDecode(encoded, gridSeq) {
  const grid = generateGrid(gridSeq);
  const decodeChar = (pair) => {
    const [r, c] = pair.split("").map((n) => parseInt(n) - 1);
    return grid[r][c] || "";
  };
  return encoded.split(" ").map((pair) => decodeChar(pair)).join("");
}

// src/ciphers/type/SCSimply.ts
var SCSimply = class extends Cipher {
  constructor(level) {
    super();
    this.initSymbols(level);
  }
  initSymbols(level) {
    const helper = (it) => {
      let sbls = [];
      if (it.dir) {
        for (let i = it.init; i <= it.end; i++) sbls.push(`${i}`);
      } else {
        for (let i = it.init; i >= it.end; i--) sbls.push(`${i}`);
      }
      return sbls;
    };
    switch (level) {
      case 0 /* tecla */:
        this.symbols = helper({ init: 65, end: 90, dir: true });
        break;
      case 1 /* tecla_m */:
        let pattern_1 = helper({ init: 65, end: 90, dir: true });
        let pattern_2 = helper({ init: 90, end: 65, dir: false });
        pattern_1.forEach((symbol, i) => {
          this.symbols.push(`${symbol[0]}${pattern_2[i][0]}${symbol[1]}${pattern_2[i][1]}`);
        });
        break;
      case 2 /* a_num */:
        new Alphabet().normal().get().forEach((letter, i) => {
          this.symbols.push(`${i + 1}`);
        });
    }
  }
};

// src/ciphers/type/SCVigenere.ts
var SCVigenere = class extends Cipher {
  key;
  msg;
  constructor(key, msg) {
    super();
    this.key = key;
    this.msg = msg;
    this.format_key(msg);
  }
  format_key(msg) {
    if (this.key.length < msg.length) {
      do {
        this.key += this.key;
      } while (this.key.length < msg.length);
    }
  }
  encode() {
    return this.msg.split("").map((letter, i) => {
      const alpha_ref = new Alphabet().normal().get();
      let pos = alpha_ref.indexOf(letter) + alpha_ref.indexOf(this.key[i]);
      if (pos > 25) pos %= 26;
      return alpha_ref[pos];
    }).join("");
  }
  decode() {
    return this.msg.split("").map((letter, i) => {
      const alpha_ref = new Alphabet().normal().get();
      let pos = alpha_ref.indexOf(letter) - alpha_ref.indexOf(this.key[i]);
      if (pos < 0) pos = 26 + alpha_ref.indexOf(letter) - alpha_ref.indexOf(this.key[i]);
      return alpha_ref[pos];
    }).join("");
  }
};

// src/refs/pattern_symbols_refs.ts
var PatternSymbols = class {
  static all() {
    return [
      "$",
      // SCSimply TK
      "\xA2",
      // SCSimply TM
      "@",
      // SCSimply Num
      "\xAC",
      // SCMorse
      "\xA3",
      // SCBinary
      "#",
      // SCPolybe
      "*",
      // SCNavajo
      "?",
      // SCEnigma
      "|",
      // SCVigenere
      "\xA7",
      // SCFrama
      "\u20A2",
      // SCBacon
      "&",
      // Mutation reciproque
      "~",
      // Mutation decalage
      ":",
      // Order reverse
      "\xB0"
      // Order random
    ];
  }
  static all_names() {
    return [
      "SCSimply.key",
      // SCSimply TK
      "SCSimply.key_m",
      // SCSimply TM
      "SCSimply.a_num",
      // SCSimply Num
      "SCMorse",
      // SCMorse
      "SCBinary",
      // SCBinary
      "SCPolybe",
      // SCPolybe
      "SCNavajo",
      // SCNavajo
      "SCEnigma",
      // SCEnigma
      "SCVigenere",
      // SCVigenere
      "SCFrama",
      // SCFrama
      "SCBacon",
      // SCBacon
      "MutationTemplate.reciprocity",
      // Mutation reciproque
      "MutationTemplate.decalation",
      // Mutation decalage
      "OrderTemplate.reverse",
      // Order reverse
      "OrderTemplate.random"
      // Order random
    ];
  }
  static global() {
    return [
      "?",
      // SCEnigma
      "|",
      // SCVigenere
      "&",
      // Mutation reciproque
      "~",
      // Mutation decalage
      ":",
      // Order reverse
      "\xB0"
      // Order random
    ];
  }
  static with_config() {
    return [
      "#",
      // SCPolybe
      "?",
      // SCEnigma
      "|",
      // SCVigenere
      "\xA7",
      // SCFrama
      "~",
      // Mutation decalage
      "\xB0"
      // Order random
    ];
  }
};

// src/pattern/validate.ts
function validatePattern(pattern) {
  if (!pattern || pattern.length === 0) return false;
  let end = false;
  for (const symbol of pattern) {
    if (PatternSymbols.all().indexOf(symbol) === -1) return false;
    if (end) return false;
    if (PatternSymbols.global().indexOf(symbol) === -1) end = true;
  }
  return true;
}
function validateConfig(pattern, config) {
  const wConfig = pattern.split("").filter((s) => PatternSymbols.with_config().indexOf(s) !== -1);
  if ((config === null || config === "") && wConfig.length > 0) {
    return false;
  }
  const tokens = config?.split(" ") ?? [];
  for (const symbol of wConfig) {
    switch (symbol) {
      case "#": {
        const v = tokens.shift();
        if (v === void 0 || v.length !== 26) return false;
        break;
      }
      case "?": {
        if (tokens.length < 11) return false;
        for (let i = 0; i < 11; i++) {
          const t = tokens.shift();
          if (t === void 0 || t.length !== 26) return false;
        }
        break;
      }
      case "|": {
        const v = tokens.shift();
        if (v === void 0 || v.length !== 10) return false;
        break;
      }
      case "\xA7": {
        const v = tokens.shift();
        if (v === void 0 || v.length !== 10) return false;
        break;
      }
      case "~": {
        const v = tokens.shift();
        if (v === void 0 || Number.isNaN(Number(v))) return false;
        break;
      }
      case "\xB0": {
        const v = tokens.shift();
        if (v === void 0 || v.length !== 26) return false;
        break;
      }
    }
  }
  if (tokens.length > 0 && config !== "") return false;
  return true;
}

// src/decrypt.ts
function decrypt({ encrypted, pattern, config }) {
  if (encrypted.length === 0) {
    throw new Error("Message is empty");
  }
  if (!validatePattern(pattern)) {
    throw new Error("Invalid pattern");
  }
  if (!validateConfig(pattern, config)) {
    throw new Error("Invalid config");
  }
  let decrypted = encrypted;
  const config_ = config?.split(" ").reverse();
  const pattern_ = pattern.split("").reverse();
  try {
    pattern_.forEach((symbol) => {
      switch (symbol) {
        case "$":
          decrypted = new SCSimply(0 /* tecla */).decode(decrypted);
          break;
        case "\xA2":
          decrypted = new SCSimply(1 /* tecla_m */).decode(decrypted);
          break;
        case "@":
          decrypted = new SCSimply(2 /* a_num */).decode(decrypted);
          break;
        case "\xAC":
          decrypted = new SCMorse().decode(decrypted);
          break;
        case "\xA3":
          decrypted = new SCBinary().decode(decrypted);
          break;
        case "#":
          decrypted = polybeDecode(decrypted, config_?.shift() || "");
          break;
        case "*":
          decrypted = new SCNavajo().decode(decrypted);
          break;
        case "?": {
          const rotors = [];
          const reflector = new SCECReflector(config_?.shift() || "");
          let l = 0;
          while (l < 10) {
            rotors.push(new SCECRotor(config_?.shift() || "", 7));
            l++;
          }
          decrypted = decode({
            rotors: rotors.reverse(),
            reflector,
            encryptMsg: decrypted
          });
          break;
        }
        case "|":
          decrypted = new SCVigenere(config_?.shift() || "", decrypted).decode();
          break;
        case "\xA7":
          decrypted = new SCFrama(config_?.shift() || "").decode(decrypted);
          break;
        case "\u20A2":
          decrypted = new SCBacon().decode(decrypted);
          break;
        case "&":
          decrypted = MutationTemplate.reciproque(decrypted);
          break;
        case "~":
          decrypted = MutationTemplate.decalage(
            decrypted,
            true,
            Number(config_?.shift())
          ).msg;
          break;
        case ":":
          decrypted = OrderTemplate.reverse(decrypted);
          break;
        case "\xB0": {
          let ref = "";
          config_?.forEach((c, i) => {
            if (i === 0) ref = c;
          });
          config_?.shift();
          decrypted = OrderTemplate.random(decrypted, ref.split(""), true).msg;
          break;
        }
      }
    });
    return { status: "success", message: decrypted };
  } catch (e) {
    return {
      status: "error",
      message: e instanceof Error ? e.message : "Unexpected error during decryption."
    };
  }
}

// src/encrypt.ts
function encrypt({ message, pattern }) {
  if (message.length === 0) {
    throw new Error("Message is empty");
  }
  if (!validatePattern(pattern)) {
    throw new Error("Invalid pattern");
  }
  let decrypt_config = "";
  let crypted = message;
  let key = "";
  function generateKey() {
    return new Alphabet().shuffle().get().map((l, i) => {
      if (i < 10) return l;
    }).join("");
  }
  pattern.split("").forEach((symbol) => {
    switch (symbol) {
      case "$":
        crypted = new SCSimply(0 /* tecla */).encode(crypted);
        break;
      case "\xA2":
        crypted = new SCSimply(1 /* tecla_m */).encode(crypted);
        break;
      case "@":
        crypted = new SCSimply(2 /* a_num */).encode(crypted);
        break;
      case "\xAC":
        crypted = new SCMorse().encode(crypted);
        break;
      case "\xA3":
        crypted = new SCBinary().encode(crypted);
        break;
      case "#":
        const polybe = polybeEncode(crypted);
        decrypt_config += ` ${polybe.grid_ref}`;
        crypted = polybe.msg;
        break;
      case "*":
        crypted = new SCNavajo().encode(crypted);
        break;
      case "?":
        const enigmaKey = encode(crypted);
        enigmaKey.rotors.forEach((rotor) => {
          decrypt_config += ` ${rotor.wiring}`;
        });
        decrypt_config += ` ${enigmaKey.reflector.wiring}`;
        crypted = enigmaKey.encryptMsg;
        break;
      case "|":
        key = generateKey();
        crypted = new SCVigenere(key, crypted).encode();
        decrypt_config += ` ${key}`;
        break;
      case "\xA7":
        key = generateKey();
        crypted = new SCFrama(key).encode(crypted);
        decrypt_config += ` ${key}`;
        break;
      case "\u20A2":
        crypted = new SCBacon().encode(crypted);
        break;
      case "&":
        crypted = MutationTemplate.reciproque(crypted);
        break;
      case "~":
        const gap = MutationTemplate.decalage(crypted);
        crypted = gap.msg;
        decrypt_config += ` ${gap.decalage}`;
        break;
      case ":":
        crypted = OrderTemplate.reverse(crypted);
        break;
      case "\xB0":
        const rand = OrderTemplate.random(crypted);
        crypted = rand.msg;
        decrypt_config += ` ${rand.alpha_ref.join("")}`;
    }
  });
  return {
    encrypted: crypted,
    config: decrypt_config.trim(),
    pattern,
    message
  };
}

// src/ciphers/index.ts
var CIPHERS = [
  { name: "Simply", symbol: "$", description: "SCSimply (tecla level)." },
  { name: "Simply", symbol: "\xA2", description: "SCSimply (tecla_m level)." },
  { name: "Simply", symbol: "@", description: "SCSimply (a_num level)." },
  { name: "Morse", symbol: "\xAC", description: "Morse code." },
  { name: "Binary", symbol: "\xA3", description: "Binary encoding." },
  { name: "Polybe", symbol: "#", description: "Polybius square." },
  { name: "Navajo", symbol: "*", description: "Navajo code talkers." },
  { name: "Enigma", symbol: "?", description: "WWII Enigma machine." },
  { name: "Vigenere", symbol: "|", description: "Vigen\xE8re cipher." },
  { name: "Frama", symbol: "\xA7", description: "Frama symbol substitution." },
  { name: "Bacon", symbol: "\u20A2", description: "Bacon's cipher." },
  { name: "Mutation", symbol: "&", description: "Mutation \u2014 reciprocity." },
  { name: "Mutation", symbol: "~", description: "Mutation \u2014 decalation." },
  { name: "Order", symbol: ":", description: "Order \u2014 reverse." },
  { name: "Order", symbol: "\xB0", description: "Order \u2014 random." }
];
function listCiphers() {
  return CIPHERS;
}

// src/pattern/symbols.ts
function isSymbolValid(symbol) {
  return PatternSymbols.all().indexOf(symbol) !== -1;
}
function isSymbolGlobal(symbol) {
  return PatternSymbols.global().indexOf(symbol) !== -1;
}
function symbolNeedsConfig(symbol) {
  return PatternSymbols.with_config().indexOf(symbol) !== -1;
}
function allSymbols() {
  return PatternSymbols.all();
}
function allGlobalSymbols() {
  return PatternSymbols.global();
}
function allNames() {
  return PatternSymbols.all_names();
}

// src/utils/in/verify_char.ts
function valid_char(char) {
  if (new Alphabet().normal().get().indexOf(char) !== -1) return true;
  return false;
}

// src/utils/in/format_str.ts
function format_str(str) {
  str = str.toUpperCase().trim();
  let formated_str = "";
  for (let i = 0; i < str.length; i++) {
    if (valid_char(str[i])) formated_str += str[i];
  }
  return formated_str;
}

export { Alphabet, CIPHERS, allGlobalSymbols, allNames, allSymbols, decrypt as decode, encrypt as encode, format_str, isSymbolGlobal, isSymbolValid, listCiphers, symbolNeedsConfig, valid_char, validateConfig, validatePattern };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map