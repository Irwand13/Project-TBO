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
  'bakna': { word: 'kamu', type: 'S' },
  'kula': { word: 'saya', type: 'S' },
  'sampean': { word: 'anda', type: 'S' },
  'panjennengan': { word: 'beliau', type: 'S' },
  'kula-sajadah': { word: 'kami', type: 'S' },
  'oreng-oreng-rowa': { word: 'mereka', type: 'S' },
  'vio': { word: 'vio', type: 'S' },
  'irwan': { word: 'irwan', type: 'S' },
  
  // Subjek - Kata Benda (Orang)
  'oreng': { word: 'orang', type: 'S' },
  'lake': { word: 'laki-laki', type: 'S' },
  'bine': { word: 'perempuan', type: 'S' },
  'na-kana': { word: 'anak', type: 'S' },
  'guru': { word: 'guru', type: 'S' },
  'mored': { word: 'murid', type: 'S' },
  'bapa': { word: 'bapak', type: 'S' },
  'ebhu': { word: 'ibu', type: 'S' },
  'taretan': { word: 'saudara', type: 'S' },
  'alekna': { word: 'adik', type: 'S' },
  'kakakna': { word: 'kakak', type: 'S' },
  'kake': { word: 'kakek', type: 'S' },
  'embu': { word: 'nenek', type: 'S' },
  'reng tani': { word: 'petani', type: 'S' },
  'dokter': { word: 'dokter', type: 'S' },
  
  // Subjek - Kata Benda (Hewan)
  'sape': { word: 'sapi', type: 'S' },
  'kebo': { word: 'kerbau', type: 'S' },
  'ajem': { word: 'ayam', type: 'S' },
  'etek': { word: 'bebek', type: 'S' },
  'mano': { word: 'burung', type: 'S' },
  'koceng': { word: 'kucing', type: 'S' },
  'patek': { word: 'anjing', type: 'S' },
  'embik': { word: 'kambing', type: 'S' },
  'jharan': { word: 'kuda', type: 'S' },
  
  // Subjek - Kata Benda (Benda)
  'buku': { word: 'buku', type: 'S' },
  'meja': { word: 'meja', type: 'S' },
  'korsi': { word: 'kursi', type: 'S' },
  'romah': { word: 'rumah', type: 'S' },
  'sekolah': { word: 'sekolah', type: 'S' },
  'pasar': { word: 'pasar', type: 'S' },
  'mobil': { word: 'mobil', type: 'S' },
  'motor': { word: 'motor', type: 'S' },
  'sepeda': { word: 'sepeda', type: 'S' },
  
  // Predikat - Kata Kerja (Aktivitas Dasar)
  'ngakan': { word: 'makan', type: 'P' },
  'ngenom': { word: 'minum', type: 'P' },
  'macah': { word: 'membaca', type: 'P' },
  'noles': { word: 'menulis', type: 'P' },
  'tedung': { word: 'tidur', type: 'P' },
  'andik': { word: 'mempunyai', type: 'P' },
  
  // Predikat - Kata Kerja (Pergerakan)
  'ajhalen': { word: 'berjalan', type: 'P' },
  'mangkat': { word: 'pergi', type: 'P' },
  'dateng': { word: 'datang', type: 'P' },
  'moleh': { word: 'pulang', type: 'P' },
  'abeli': { word: 'kembali', type: 'P' },
  'nompak': { word: 'naik', type: 'P' },
  'toron': { word: 'turun', type: 'P' },
  'adinakagi': { word: 'berangkat', type: 'P' },
  
  // Predikat - Kata Kerja (Aktivitas Lain)
  'ngajar': { word: 'mengajar', type: 'P' },
  'ajher': { word: 'belajar', type: 'P' },
  'alakoh': { word: 'bekerja', type: 'P' },
  'amain': { word: 'bermain', type: 'P' },
  'anyanyi': { word: 'menyanyi', type: 'P' },
  'ajugit': { word: 'menari', type: 'P' },
  'amasak': { word: 'memasak', type: 'P' },
  'nyassa': { word: 'mencuci', type: 'P' },
  'marenta': { word: 'memerintah', type: 'P' },
  'abenta': { word: 'berbicara', type: 'P' },
  'acareta': { word: 'bercerita', type: 'P' },
  'tanya': { word: 'bertanya', type: 'P' },
  'ngowan': { word: 'memelihara', type: 'P' },
  'ngoding': { word: 'ngoding', type: 'P' },

  // Predikat - Kata Sifat
  'apek': { word: 'bagus', type: 'P' },
  'cepet': { word: 'cepat', type: 'P' },
  'laon': { word: 'lambat', type: 'P' },
  'bhajheng': { word: 'rajin', type: 'P' },
  'males': { word: 'malas', type: 'P' },
  'rajhe': { word: 'besar', type: 'P' },
  'kenik': { word: 'kecil', type: 'P' },
  'tenggi': { word: 'tinggi', type: 'P' },
  'rendha': { word: 'rendah', type: 'P' },
  'berseh': { word: 'bersih', type: 'P' },
  'keddhe': { word: 'kotor', type: 'P' },
  'panas': { word: 'panas', type: 'P' },
  'senneng': { word: 'senang', type: 'P' },
  'sossa': { word: 'sedih', type: 'P' },
  'ghanteng': { word: 'ganteng', type: 'P' },
  'raddin': { word: 'cantik', type: 'P' },
  
  // Objek - Kata Benda (Makanan)
  'nase': { word: 'nasi', type: 'O' },
  'roti': { word: 'roti', type: 'O' },
  'sate': { word: 'sate', type: 'O' },
  'soto': { word: 'soto', type: 'O' },
  'gule': { word: 'gulai', type: 'O' },
  'sayur': { word: 'sayur', type: 'O' },
  'buwaan': { word: 'buah', type: 'O' },
  'buwana-naga': { word: 'buah naga', type: 'O' },
  'somangka': { word: 'semangka', type: 'O' },
  'deging': { word: 'daging', type: 'O' },
  'jhuko': { word: 'ikan', type: 'O' },
  
  
  // Objek - Minuman
  'aeng': { word: 'air', type: 'O' },
  'teh': { word: 'teh', type: 'O' },
  'kopi': { word: 'kopi', type: 'O' },
  'susu': { word: 'susu', type: 'O' },
  
  // Objek - Benda
  'bolpen': { word: 'pena', type: 'O' },
  'potlot': { word: 'pensil', type: 'O' },
  'dhalubang': { word: 'kertas', type: 'O' },
  'pangajharan': { word: 'pelajaran', type: 'O' },
  'ngajhari': { word: 'mengajari', type: 'O' },
  'lalakon': { word: 'tugas', type: 'O' },
  'kalambi': { word: 'baju', type: 'O' },
  'lebbhar': { word: 'celana', type: 'O' },
  'topi': { word: 'topi', type: 'O' },
  'sepato': { word: 'sepatu', type: 'O' },
  'buku': { word: 'buku', type: 'O' },
  
  // Keterangan - Tempat
  'edissa': { word: 'di sana', type: 'K' },
  'edinna' : {word : 'di sini', type: 'K'},
  'e': { word: 'di', type: 'K' },
  'ka': { word: 'ke', type: 'K' },
  'dhari': { word: 'dari', type: 'K' },
  'loar': { word: ' luar', type: 'K' },
  'attas': { word: ' atas', type: 'K' },
  'baba': { word: ' bawah', type: 'K' },
  'romah' : { word: ' rumah', type: 'K' },
  'kelas' : { word: ' kelas', type: 'K' },
  'pasar' : { word: ' pasar', type: 'K' },
  
  // Keterangan - Waktu
  'lebbhi ngadak': { word: 'tadi', type: 'K' },
  'sateya': { word: 'sekarang', type: 'K' },
  'lagguna': { word: 'besok', type: 'K' },
  'bheri': { word: 'kemarin', type: 'K' },
  'lagghuk': { word: 'pagi', type: 'K' },
  'siang': { word: 'siang', type: 'K' },
  'sore': { word: 'sore', type: 'K' },
  'malem': { word: 'malam', type: 'K' },
  'sabeluna': { word: 'dahulu', type: 'K' },
  
  // Keterangan - Kata Hubung
  'asareng': { word: 'dengan', type: 'K' },
  'sekemma': { word: 'yang', type: 'K' },
  'bhakal': { word: 'akan', type: 'K' },
  'mareh': { word: 'sudah', type: 'K' },
  'mon': { word: 'jika', type: 'K' },
  'tape': { word: 'tetapi', type: 'K' },
  'otabe': { word: 'atau', type: 'K' },
  
  // Keterangan - Lainnya
  'iya': { word: 'ya', type: 'K' },
  'ta': { word: 'tidak', type: 'K' },
  'bedhe': { word: 'ada', type: 'K' },
  'tadha': { word: 'tidak ada', type: 'K' },
  'coma': { word: 'hanya', type: 'K' },
  'bisa': { word: 'bisa', type: 'K' },
  'tak bisa': { word: 'tidak bisa', type: 'K' },
  'settong': { word: 'satu', type: 'K' },
  'duwe': { word: 'dua', type: 'K' },
  'tello': { word: 'tiga', type: 'K' },
  'appat': { word: 'empat', type: 'K' },
  'lema': { word: 'lima', type: 'K' },
  'enem': { word: 'enam', type: 'K' },
  'pettong': { word: 'tujuh', type: 'K' },
  'balluk': { word: 'delapan', type: 'K' },
  'sangak': { word: 'sembilan', type: 'K' },
  'sapolo': { word: 'sepuluh', type: 'K' },  
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

Kata_Ganti = "sengko" | "ebhu" | "bapa" | "kula-sajadah" | "sampean" | "na-kana" | "bine" | "lake" | "oreng";
Kata_Benda = "buku" | "meja" | "korsi" | "romah" | "pasar" | ...;
Kata_Kerja = "ngakan" | "ngenom" | "macah" | "mangkat" | "dateng" | ...;
Kata_Sifat = "apek" | "raddin" | "gantheng" | ...;
Kata_Keterangan = "edinna" | "laguna" | "sateya" | "bheri" | ...;`;
}

export function getExampleSentences(): { 
  sentence: string; 
  isValid: boolean; 
  structure: string;
  meaning: string;
}[] {
  return [
    {
      sentence: "sengko ngakan sate embik",
      isValid: true,
      structure: "S - P - O - S",
      meaning: "Saya makan sate kambing",
    },
    {
      sentence: "guru ngajar pangajharan edinna",
      isValid: true,
      structure: "S - P - O - K",
      meaning: "Guru mengajar pelajaran di sini",
    },
    {
      sentence: " jhuko vio bheri",
      isValid: false,
      structure: "O - S - K",
      meaning: "Tidak valid: tidak ada predikat",
    },
    {
      sentence: "oreng lake mangkat edissa",
      isValid: true,
      structure: "S - S - P - K",
      meaning: "Dia pergi ke sana",
    },
    {
      sentence: "ngakan nase",
      isValid: false,
      structure: "P - O",
      meaning: "Tidak valid: tidak ada subjek",
    },
    {
      sentence: "nase e ngakan vio ",
      isValid: true,
      structure: "O - K - P - S",
      meaning: "Nasi di makan vio",
    },
    {
      sentence: "murid macah buku bi edinna",
      isValid: true,
      structure: "S - P - O - K - K",
      meaning: "Murid membaca buku di sini",
    },
  ];
}

export type { ParseResult, ParseTreeNode };