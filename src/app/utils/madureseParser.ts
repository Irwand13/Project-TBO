// EBNF Grammar untuk Bahasa Madura
// Kalimat = Subjek, Predikat, [Objek], [Keterangan];
// Subjek = Kata_Ganti | Kata_Benda;
// Predikat = Kata_Kerja | Kata_Sifat;
// Objek = Kata_Benda;
// Keterangan = Kata_Keterangan;

interface ParseResult {
  isValid: boolean;
  structure: string[];
  translation: string;
  tokens: {
    type: string;
    madurese: string;
    indonesian: string;
    suggestion?: string;
  }[];
  parseTree: ParseTreeNode | null;
  suggestions: Array<{ word: string; suggestion: string }>;
}

interface ParseTreeNode {
  label: string;
  children?: ParseTreeNode[];
  word?: string;
}

// Kamus Bahasa Madura ke Indonesia (diperluas)
const dictionary: { [key: string]: { word: string; type: string } } = {
  // Subjek - Kata Ganti
  'sengko': { word: 'saya', type: 'S' },
  'bhadha': { word: 'kamu', type: 'S' },
  'dhisa': { word: 'dia', type: 'S' },
  'kula': { word: 'saya', type: 'S' },
  'sampean': { word: 'anda', type: 'S' },
  'panjennengan': { word: 'beliau', type: 'S' },
  'arek': { word: 'kami', type: 'S' },
  'bhita': { word: 'kita', type: 'S' },
  'reng': { word: 'mereka', type: 'S' },
  
  // Subjek - Kata Benda (Orang)
  'oreng': { word: 'orang', type: 'S' },
  'lake': { word: 'laki-laki', type: 'S' },
  'bine': { word: 'perempuan', type: 'S' },
  'anak': { word: 'anak', type: 'S' },
  'guru': { word: 'guru', type: 'S' },
  'murid': { word: 'murid', type: 'S' },
  'bapa': { word: 'bapak', type: 'S' },
  'embu': { word: 'ibu', type: 'S' },
  'nyama': { word: 'saudara', type: 'S' },
  'kabbi': { word: 'adik', type: 'S' },
  'kaka': { word: 'kakak', type: 'S' },
  'popo': { word: 'kakek', type: 'S' },
  'nene': { word: 'nenek', type: 'S' },
  'polae': { word: 'petani', type: 'S' },
  'nelayan': { word: 'nelayan', type: 'S' },
  'pedagang': { word: 'pedagang', type: 'S' },
  'dokter': { word: 'dokter', type: 'S' },
  'mantri': { word: 'perawat', type: 'S' },
  
  // Subjek - Kata Benda (Hewan)
  'sape': { word: 'sapi', type: 'S' },
  'kebo': { word: 'kerbau', type: 'S' },
  'ajam': { word: 'ayam', type: 'S' },
  'bebek': { word: 'bebek', type: 'S' },
  'mano': { word: 'burung', type: 'S' },
  'kucing': { word: 'kucing', type: 'S' },
  'asu': { word: 'anjing', type: 'S' },
  'kambing': { word: 'kambing', type: 'S' },
  
  // Subjek - Kata Benda (Benda)
  'buku': { word: 'buku', type: 'S' },
  'meja': { word: 'meja', type: 'S' },
  'korsi': { word: 'kursi', type: 'S' },
  'omah': { word: 'rumah', type: 'S' },
  'sekolah': { word: 'sekolah', type: 'S' },
  'pasar': { word: 'pasar', type: 'S' },
  'mobil': { word: 'mobil', type: 'S' },
  'motor': { word: 'motor', type: 'S' },
  'sepeda': { word: 'sepeda', type: 'S' },
  
  // Predikat - Kata Kerja (Aktivitas Dasar)
  'makan': { word: 'makan', type: 'P' },
  'ngakan': { word: 'makan', type: 'P' },
  'ngenom': { word: 'minum', type: 'P' },
  'ngombe': { word: 'minum', type: 'P' },
  'ngaji': { word: 'membaca', type: 'P' },
  'maos': { word: 'membaca', type: 'P' },
  'nyurat': { word: 'menulis', type: 'P' },
  'noles': { word: 'menulis', type: 'P' },
  'todus': { word: 'tidur', type: 'P' },
  'teker': { word: 'tidur', type: 'P' },
  
  // Predikat - Kata Kerja (Pergerakan)
  'jalan': { word: 'berjalan', type: 'P' },
  'laju': { word: 'pergi', type: 'P' },
  'dateng': { word: 'datang', type: 'P' },
  'muleh': { word: 'pulang', type: 'P' },
  'bali': { word: 'kembali', type: 'P' },
  'lompat': { word: 'melompat', type: 'P' },
  'lari': { word: 'berlari', type: 'P' },
  'tekka': { word: 'naik', type: 'P' },
  'toron': { word: 'turun', type: 'P' },
  'tolak': { word: 'berangkat', type: 'P' },
  
  // Predikat - Kata Kerja (Aktivitas Lain)
  'ngajar': { word: 'mengajar', type: 'P' },
  'belajar': { word: 'belajar', type: 'P' },
  'gawe': { word: 'bekerja', type: 'P' },
  'nyambut': { word: 'bekerja', type: 'P' },
  'main': { word: 'bermain', type: 'P' },
  'dolanan': { word: 'bermain', type: 'P' },
  'nyanyi': { word: 'menyanyi', type: 'P' },
  'nari': { word: 'menari', type: 'P' },
  'masak': { word: 'memasak', type: 'P' },
  'ngumbah': { word: 'mencuci', type: 'P' },
  'marinta': { word: 'memerintah', type: 'P' },
  'ngomong': { word: 'berbicara', type: 'P' },
  'crita': { word: 'bercerita', type: 'P' },
  'tandhing': { word: 'bertanya', type: 'P' },
  
  // Predikat - Kata Sifat
  'bagus': { word: 'bagus', type: 'P' },
  'apek': { word: 'bagus', type: 'P' },
  'cepet': { word: 'cepat', type: 'P' },
  'lalar': { word: 'cepat', type: 'P' },
  'lemot': { word: 'lambat', type: 'P' },
  'alon': { word: 'lambat', type: 'P' },
  'rajin': { word: 'rajin', type: 'P' },
  'males': { word: 'malas', type: 'P' },
  'gedhe': { word: 'besar', type: 'P' },
  'keni': { word: 'kecil', type: 'P' },
  'tinggi': { word: 'tinggi', type: 'P' },
  'rendha': { word: 'rendah', type: 'P' },
  'berse': { word: 'bersih', type: 'P' },
  'reget': { word: 'kotor', type: 'P' },
  'panas': { word: 'panas', type: 'P' },
  'senneng': { word: 'senang', type: 'P' },
  'sedih': { word: 'sedih', type: 'P' },
  
  // Objek - Kata Benda (Makanan)
  'nase': { word: 'nasi', type: 'O' },
  'roti': { word: 'roti', type: 'O' },
  'tape': { word: 'kue', type: 'O' },
  'sate': { word: 'sate', type: 'O' },
  'soto': { word: 'soto', type: 'O' },
  'gule': { word: 'gulai', type: 'O' },
  'sayur': { word: 'sayur', type: 'O' },
  'buwa': { word: 'buah', type: 'O' },
  'daging': { word: 'daging', type: 'O' },
  'ulam': { word: 'lauk', type: 'O' },
  
  // Objek - Minuman
  'jukoq': { word: 'air', type: 'O' },
  'teh': { word: 'teh', type: 'O' },
  'kopi': { word: 'kopi', type: 'O' },
  'susu': { word: 'susu', type: 'O' },
  
  // Objek - Benda
  'pena': { word: 'pena', type: 'O' },
  'potlot': { word: 'pensil', type: 'O' },
  'kertas': { word: 'kertas', type: 'O' },
  'lesson': { word: 'pelajaran', type: 'O' },
  'tugas': { word: 'tugas', type: 'O' },
  'klambi': { word: 'baju', type: 'O' },
  'celana': { word: 'celana', type: 'O' },
  'topi': { word: 'topi', type: 'O' },
  'sepato': { word: 'sepatu', type: 'O' },
  
  // Keterangan - Tempat
  'dhibi': { word: 'di sini', type: 'K' },
  'dika': { word: 'di sana', type: 'K' },
  'bi': { word: 'di', type: 'K' },
  'ka': { word: 'ke', type: 'K' },
  'dhari': { word: 'dari', type: 'K' },
  'ning': { word: 'di dalam', type: 'K' },
  'loar': { word: 'di luar', type: 'K' },
  'attas': { word: 'di atas', type: 'K' },
  'baba': { word: 'di bawah', type: 'K' },
  
  // Keterangan - Waktu
  'ngala': { word: 'tadi', type: 'K' },
  'sateya': { word: 'sekarang', type: 'K' },
  'sabban': { word: 'besok', type: 'K' },
  'semalem': { word: 'kemarin', type: 'K' },
  'enjing': { word: 'pagi', type: 'K' },
  'siang': { word: 'siang', type: 'K' },
  'sore': { word: 'sore', type: 'K' },
  'malem': { word: 'malam', type: 'K' },
  'pole': { word: 'dahulu', type: 'K' },
  
  // Keterangan - Kata Hubung
  'kalaban': { word: 'dengan', type: 'K' },
  'se': { word: 'yang', type: 'K' },
  'lakar': { word: 'akan', type: 'K' },
  'sampean': { word: 'sudah', type: 'K' },
  'mon': { word: 'jika', type: 'K' },
  'tape': { word: 'tetapi', type: 'K' },
  'otaba': { word: 'atau', type: 'K' },
  
  // Keterangan - Lainnya
  'enggi': { word: 'ya', type: 'K' },
  'ta': { word: 'tidak', type: 'K' },
  'badha': { word: 'ada', type: 'K' },
  'tadha': { word: 'tidak ada', type: 'K' },
  'coma': { word: 'hanya', type: 'K' },
  'sakali': { word: 'sangat', type: 'K' },
  'bisa': { word: 'bisa', type: 'K' },
  'ta-bisa': { word: 'tidak bisa', type: 'K' },
};

// Levenshtein Distance untuk spell checking
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,    // deletion
          dp[i][j - 1] + 1,    // insertion
          dp[i - 1][j - 1] + 1 // substitution
        );
      }
    }
  }

  return dp[m][n];
}

// Fungsi untuk mencari kata terdekat
function findSuggestion(word: string): string | undefined {
  const threshold = 2; // maksimal 2 karakter berbeda
  let bestMatch: string | undefined;
  let minDistance = Infinity;

  for (const dictWord in dictionary) {
    const distance = levenshteinDistance(word.toLowerCase(), dictWord.toLowerCase());
    if (distance <= threshold && distance < minDistance) {
      minDistance = distance;
      bestMatch = dictWord;
    }
  }

  return bestMatch;
}

export function parseMadurese(sentence: string): ParseResult {
  // Normalisasi input
  const normalized = sentence.toLowerCase().trim();
  const words = normalized.split(/\s+/);
  
  const tokens: { type: string; madurese: string; indonesian: string; suggestion?: string }[] = [];
  const structure: string[] = [];
  const suggestions: Array<{ word: string; suggestion: string }> = [];
  let hasSubject = false;
  let hasPredicate = false;
  
  // Tokenisasi dan identifikasi jenis kata
  for (const word of words) {
    if (dictionary[word]) {
      const { word: translation, type } = dictionary[word];
      tokens.push({
        type: type,
        madurese: word,
        indonesian: translation,
      });
      
      if (!structure.includes(type)) {
        structure.push(type);
      }
      
      if (type === 'S') hasSubject = true;
      if (type === 'P') hasPredicate = true;
    } else {
      // Kata tidak dikenali, cari suggestion
      const suggestion = findSuggestion(word);
      if (suggestion) {
        suggestions.push({ word, suggestion });
        tokens.push({
          type: 'UNKNOWN',
          madurese: word,
          indonesian: word,
          suggestion,
        });
      } else {
        tokens.push({
          type: 'UNKNOWN',
          madurese: word,
          indonesian: word,
        });
      }
    }
  }
  
  // Validasi struktur minimal (harus ada S dan P)
  const isValid = hasSubject && hasPredicate;
  
  // Generate terjemahan
  const translation = tokens.map(t => t.indonesian).join(' ');
  
  // Generate parse tree
  const parseTree = isValid ? generateParseTree(tokens) : null;
  
  return {
    isValid,
    structure,
    translation: translation.charAt(0).toUpperCase() + translation.slice(1),
    tokens,
    parseTree,
    suggestions,
  };
}

function generateParseTree(tokens: { type: string; madurese: string; indonesian: string }[]): ParseTreeNode {
  const root: ParseTreeNode = {
    label: 'Kalimat',
    children: [],
  };
  
  const groups: { [key: string]: ParseTreeNode } = {
    S: { label: 'Subjek', children: [] },
    P: { label: 'Predikat', children: [] },
    O: { label: 'Objek', children: [] },
    K: { label: 'Keterangan', children: [] },
  };
  
  // Kelompokkan token berdasarkan tipe
  for (const token of tokens) {
    if (groups[token.type]) {
      groups[token.type].children!.push({
        label: token.madurese,
        word: token.indonesian,
      });
    }
  }
  
  // Tambahkan ke root sesuai urutan SPOK
  if (groups.S.children!.length > 0) root.children!.push(groups.S);
  if (groups.P.children!.length > 0) root.children!.push(groups.P);
  if (groups.O.children!.length > 0) root.children!.push(groups.O);
  if (groups.K.children!.length > 0) root.children!.push(groups.K);
  
  return root;
}

export function getEBNFGrammar(): string {
  return `Kalimat = Subjek, Predikat, [Objek], [Keterangan];

Subjek = Kata_Ganti | Kata_Benda;
Predikat = Kata_Kerja | Kata_Sifat;
Objek = Kata_Benda;
Keterangan = Kata_Keterangan | Kata_Tempat | Kata_Waktu;

Kata_Ganti = "sengko" | "bhadha" | "dhisa" | "kula" | "sampean" | "panjennengan" | "arek" | "bhita" | "reng";
Kata_Benda = "oreng" | "anak" | "guru" | "buku" | "nase" | ...;
Kata_Kerja = "makan" | "ngenom" | "ngaji" | "laju" | "dateng" | ...;
Kata_Sifat = "apek" | "cepet" | "rajin" | ...;
Kata_Keterangan = "dhibi" | "dika" | "sateya" | "kalaban" | ...;`;
}

export function getExampleSentences(): { 
  sentence: string; 
  isValid: boolean; 
  structure: string;
  meaning: string;
}[] {
  return [
    {
      sentence: "sengko makan nase",
      isValid: true,
      structure: "S - P - O",
      meaning: "Saya makan nasi",
    },
    {
      sentence: "guru ngajar lesson dhibi",
      isValid: true,
      structure: "S - P - O - K",
      meaning: "Guru mengajar pelajaran di sini",
    },
    {
      sentence: "anak belajar",
      isValid: true,
      structure: "S - P",
      meaning: "Anak belajar",
    },
    {
      sentence: "dhisa laju ka dika",
      isValid: true,
      structure: "S - P - K - K",
      meaning: "Dia pergi ke sana",
    },
    {
      sentence: "makan nase",
      isValid: false,
      structure: "P - O",
      meaning: "Tidak valid: tidak ada subjek",
    },
    {
      sentence: "buku apek",
      isValid: true,
      structure: "S - P",
      meaning: "Buku bagus",
    },
    {
      sentence: "murid ngaji buku bi dhibi",
      isValid: true,
      structure: "S - P - O - K - K",
      meaning: "Murid membaca buku di sini",
    },
  ];
}

export type { ParseResult, ParseTreeNode };