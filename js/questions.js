/**
 * Arabic Princess Battle - Bank Soal Bahasa Arab Kelas XI SMA/MA
 * Kategori: Mufradāt, Qawā‘id, Qirā’ah, Tarjamah, Insya’
 */

const QUESTIONS = [
  // ========== MUFRADĀT (Kosakata) ==========
  {
    id: "muf-e1",
    subject: "mufradat",
    difficulty: "easy",
    category: "Mufradāt",
    question: "Apa arti kata الشَّبَابُ ?",
    options: ["Masa tua", "Masa muda", "Masa kecil", "Masa depan"],
    answer: 1,
    explanation: "الشَّبَابُ artinya masa muda / pemuda.",
    damage: 10,
    arabicHint: "الشَّبَابُ"
  },
  {
    id: "muf-e2",
    subject: "mufradat",
    difficulty: "easy",
    category: "Mufradāt",
    question: "Kata الصِّحَّةُ berarti...",
    options: ["Penyakit", "Kesehatan", "Obat", "Rumah sakit"],
    answer: 1,
    explanation: "الصِّحَّةُ = kesehatan.",
    damage: 10
  },
  {
    id: "muf-e3",
    subject: "mufradat",
    difficulty: "easy",
    category: "Mufradāt",
    question: "Apa arti التَّعْلِيمُ ?",
    options: ["Belajar", "Pendidikan / pengajaran", "Sekolah", "Guru"],
    answer: 1,
    explanation: "التَّعْلِيمُ berarti pendidikan atau pengajaran.",
    damage: 10
  },
  {
    id: "muf-e4",
    subject: "mufradat",
    difficulty: "easy",
    category: "Mufradāt",
    question: "Kata الْبِيئَةُ artinya...",
    options: ["Lingkungan", "Udara", "Air", "Tanah"],
    answer: 0,
    explanation: "الْبِيئَةُ = lingkungan.",
    damage: 10
  },
  {
    id: "muf-e5",
    subject: "mufradat",
    difficulty: "easy",
    category: "Mufradāt",
    question: "مِهْنَةٌ berarti...",
    options: ["Hobi", "Profesi / pekerjaan", "Hobi bermain", "Cita-cita"],
    answer: 1,
    explanation: "مِهْنَةٌ (jamak: الْمِهَنُ) artinya profesi atau pekerjaan.",
    damage: 10
  },
  {
    id: "muf-m1",
    subject: "mufradat",
    difficulty: "medium",
    category: "Mufradāt",
    question: "Sinonim dari كَبِيرٌ adalah...",
    options: ["صَغِيرٌ", "عَظِيمٌ", "قَلِيلٌ", "ضَعِيفٌ"],
    answer: 1,
    explanation: "عَظِيمٌ sering digunakan sebagai sinonim/lebih kuat dari كَبِيرٌ (besar).",
    damage: 15
  },
  {
    id: "muf-m2",
    subject: "mufradat",
    difficulty: "medium",
    category: "Mufradāt",
    question: "Apa lawan kata dari نَظِيفٌ ?",
    options: ["جَمِيلٌ", "قَذِرٌ", "جَدِيدٌ", "قَدِيمٌ"],
    answer: 1,
    explanation: "نَظِيفٌ (bersih) lawannya قَذِرٌ (kotor).",
    damage: 15
  },
  {
    id: "muf-m3",
    subject: "mufradat",
    difficulty: "medium",
    category: "Mufradāt",
    question: "Kata يَقْرَأُ berasal dari kata dasar...",
    options: ["كَتَبَ", "قَرَأَ", "ذَهَبَ", "جَلَسَ"],
    answer: 1,
    explanation: "يَقْرَأُ adalah fi‘il mudhari‘ dari قَرَأَ (membaca).",
    damage: 15
  },
  {
    id: "muf-m4",
    subject: "mufradat",
    difficulty: "medium",
    category: "Mufradāt",
    question: "Apa arti الْمَكْتَبَةُ ?",
    options: ["Sekolah", "Perpustakaan / kantor", "Masjid", "Rumah"],
    answer: 1,
    explanation: "الْمَكْتَبَةُ bisa berarti perpustakaan atau kantor (tergantung konteks).",
    damage: 15
  },
  {
    id: "muf-h1",
    subject: "mufradat",
    difficulty: "hard",
    category: "Mufradāt",
    question: "Kata الْمُحَافَظَةُ عَلَى closely related to meaning...",
    options: ["Meninggalkan", "Menjaga / memelihara", "Menghancurkan", "Membeli"],
    answer: 1,
    explanation: "حَافَظَ عَلَى = menjaga / memelihara. Contoh: الْمُحَافَظَةُ عَلَى الْبِيئَةِ.",
    damage: 20
  },

  // ========== QAWĀ‘ID (Tata Bahasa) ==========
  {
    id: "qaw-e1",
    subject: "qawaid",
    difficulty: "easy",
    category: "Qawā‘id",
    question: "Kalimat الْعِلْمُ نُورٌ termasuk jenis...",
    options: ["Jumlah Fi‘liyyah", "Jumlah Ismiyyah", "Syibh Jumlah", "Fi‘il Amr"],
    answer: 1,
    explanation: "الْعِلْمُ نُورٌ adalah Jumlah Ismiyyah (dimulai dengan isim: الْعِلْمُ sebagai mubtada’).",
    damage: 10
  },
  {
    id: "qaw-e2",
    subject: "qawaid",
    difficulty: "easy",
    category: "Qawā‘id",
    question: "Dalam kalimat يَقْرَأُ الطَّالِبُ الْكِتَابَ, kata الطَّالِبُ berfungsi sebagai...",
    options: ["Maf‘ul bih", "Fa‘il", "Mubtada’", "Na‘at"],
    answer: 1,
    explanation: "الطَّالِبُ adalah fa‘il (pelaku) dari fi‘il يَقْرَأُ.",
    damage: 10
  },
  {
    id: "qaw-e3",
    subject: "qawaid",
    difficulty: "easy",
    category: "Qawā‘id",
    question: "Kata الْكِتَابَ dalam يَقْرَأُ الطَّالِبُ الْكِتَابَ adalah...",
    options: ["Fa‘il", "Maf‘ul bih", "Mubtada’", "Khabar"],
    answer: 1,
    explanation: "الْكِتَابَ adalah maf‘ul bih (objek) karena mendapat harakat fathah.",
    damage: 10
  },
  {
    id: "qaw-m1",
    subject: "qawaid",
    difficulty: "medium",
    category: "Qawā‘id",
    question: "Manakah yang termasuk Jumlah Fi‘liyyah?",
    options: ["الْمَدْرَسَةُ كَبِيرَةٌ", "ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ", "الْكِتَابُ مُفِيدٌ", "الْبَيْتُ جَمِيلٌ"],
    answer: 1,
    explanation: "ذَهَبَ الطَّالِبُ... dimulai dengan fi‘il, sehingga disebut Jumlah Fi‘liyyah.",
    damage: 15
  },
  {
    id: "qaw-m2",
    subject: "qawaid",
    difficulty: "medium",
    category: "Qawā‘id",
    question: "Dalam struktur مُبْتَدَأٌ + خَبَرٌ, khabar menjelaskan...",
    options: ["Fi‘il", "Mubtada’", "Fa‘il", "Maf‘ul"],
    answer: 1,
    explanation: "Khabar berfungsi menjelaskan atau memberi predikat kepada mubtada’.",
    damage: 15
  },
  {
    id: "qaw-m3",
    subject: "qawaid",
    difficulty: "medium",
    category: "Qawā‘id",
    question: "Kata الْجَمِيلَةُ dalam الْفَتَاةُ الْجَمِيلَةُ berfungsi sebagai...",
    options: ["Mubtada’", "Na‘at (sifat)", "Fa‘il", "Maf‘ul bih"],
    answer: 1,
    explanation: "الْجَمِيلَةُ adalah na‘at yang menyifati الْفَتَاةُ (man‘ut).",
    damage: 15
  },
  {
    id: "qaw-m4",
    subject: "qawaid",
    difficulty: "medium",
    category: "Qawā‘id",
    question: "Fi‘il yang menunjukkan waktu sekarang/akan datang disebut...",
    options: ["Fi‘il Madhi", "Fi‘il Mudhari‘", "Fi‘il Amr", "Isim Fa‘il"],
    answer: 1,
    explanation: "Fi‘il Mudhari‘ menyatakan perbuatan yang sedang atau akan terjadi.",
    damage: 15
  },
  {
    id: "qaw-h1",
    subject: "qawaid",
    difficulty: "hard",
    category: "Qawā‘id",
    question: "Manakah contoh struktur إِضَافَةٌ yang benar?",
    options: ["كِتَابٌ جَمِيلٌ", "كِتَابُ الطَّالِبِ", "الطَّالِبُ يَقْرَأُ", "ذَهَبَ إِلَى"],
    answer: 1,
    explanation: "كِتَابُ الطَّالِبِ adalah idhafah (mudhaf + mudhaf ilaih): buku milik siswa.",
    damage: 20
  },
  {
    id: "qaw-h2",
    subject: "qawaid",
    difficulty: "hard",
    category: "Qawā‘id",
    question: "Dhamir هِيَ digunakan untuk...",
    options: ["Mudzakkar mufrad", "Muannats mufrad", "Mutsanna", "Jamak mudzakkar"],
    answer: 1,
    explanation: "هِيَ adalah dhamir untuk muannats mufrad (perempuan tunggal / benda muannats).",
    damage: 20
  },
  {
    id: "qaw-h3",
    subject: "qawaid",
    difficulty: "hard",
    category: "Qawā‘id",
    question: "Huruf jar فِي biasanya menunjukkan makna...",
    options: ["Dari", "Di / dalam", "Ke", "Dengan"],
    answer: 1,
    explanation: "فِي adalah huruf jar yang paling sering berarti 'di' atau 'dalam'.",
    damage: 20
  },

  // ========== TARJAMAH ==========
  {
    id: "tar-e1",
    subject: "tarjamah",
    difficulty: "easy",
    category: "Tarjamah",
    question: "Terjemahan dari الْعِلْمُ نُورٌ adalah...",
    options: ["Ilmu itu sulit", "Ilmu adalah cahaya", "Ilmu itu banyak", "Ilmu adalah buku"],
    answer: 1,
    explanation: "الْعِلْمُ نُورٌ = Ilmu adalah cahaya / cahaya.",
    damage: 10
  },
  {
    id: "tar-e2",
    subject: "tarjamah",
    difficulty: "easy",
    category: "Tarjamah",
    question: "يَقْرَأُ الطَّالِبُ الْكِتَابَ artinya...",
    options: ["Siswa menulis buku", "Siswa membaca buku", "Siswa membeli buku", "Siswa membuka buku"],
    answer: 1,
    explanation: "يَقْرَأُ = membaca, الطَّالِبُ = siswa, الْكِتَابَ = buku.",
    damage: 10
  },
  {
    id: "tar-e3",
    subject: "tarjamah",
    difficulty: "easy",
    category: "Tarjamah",
    question: "تُحَافِظُ الطَّالِبَةُ عَلَى النَّظَافَةِ artinya...",
    options: ["Siswi menjaga kebersihan", "Siswi membersihkan kelas", "Siswi membuat kotor", "Siswi belajar kebersihan"],
    answer: 0,
    explanation: "تُحَافِظُ عَلَى = menjaga, النَّظَافَةِ = kebersihan.",
    damage: 10
  },
  {
    id: "tar-m1",
    subject: "tarjamah",
    difficulty: "medium",
    category: "Tarjamah",
    question: "يَجِبُ عَلَيْنَا أَنْ نَحْمِيَ الْبِيئَةَ artinya...",
    options: ["Kita harus menjaga lingkungan", "Kita ingin melihat lingkungan", "Kita harus merusak lingkungan", "Kita belajar tentang lingkungan"],
    answer: 0,
    explanation: "يَجِبُ عَلَيْنَا أَنْ = kita wajib / harus, نَحْمِيَ = menjaga/melindungi.",
    damage: 15
  },
  {
    id: "tar-m2",
    subject: "tarjamah",
    difficulty: "medium",
    category: "Tarjamah",
    question: "Apa terjemahan yang tepat untuk 'Siswa pergi ke sekolah'?",
    options: ["يَذْهَبُ الطَّالِبُ إِلَى الْمَدْرَسَةِ", "يَقْرَأُ الطَّالِبُ فِي الْمَدْرَسَةِ", "يَكْتُبُ الطَّالِبُ الْمَدْرَسَةَ", "يَجْلِسُ الطَّالِبُ فِي الْبَيْتِ"],
    answer: 0,
    explanation: "يَذْهَبُ = pergi, إِلَى الْمَدْرَسَةِ = ke sekolah.",
    damage: 15
  },
  {
    id: "tar-h1",
    subject: "tarjamah",
    difficulty: "hard",
    category: "Tarjamah",
    question: "Terjemahan terbaik dari الشَّبَابُ هُمْ أَمَلُ الْمُسْتَقْبَلِ adalah...",
    options: ["Pemuda adalah masa lalu bangsa", "Pemuda adalah harapan masa depan", "Pemuda harus belajar banyak", "Pemuda suka teknologi"],
    answer: 1,
    explanation: "الشَّبَابُ = pemuda, أَمَلُ = harapan, الْمُسْتَقْبَلِ = masa depan.",
    damage: 20
  },

  // ========== QIRĀ’AH (Pemahaman Bacaan) ==========
  {
    id: "qir-e1",
    subject: "qiraah",
    difficulty: "easy",
    category: "Qirā’ah",
    question: "Bacaan: التَّعْلِيمُ مُهِمٌّ جِدًّا فِي حَيَاةِ الْإِنْسَانِ. Gagasan utama teks ini adalah...",
    options: ["Olahraga penting", "Pendidikan sangat penting dalam kehidupan manusia", "Makanan sehat", "Teknologi modern"],
    answer: 1,
    explanation: "Teks menekankan bahwa pendidikan sangat penting bagi kehidupan manusia.",
    damage: 10
  },
  {
    id: "qir-m1",
    subject: "qiraah",
    difficulty: "medium",
    category: "Qirā’ah",
    question: "Bacaan: يَجِبُ عَلَى الشَّبَابِ أَنْ يَهْتَمُّوا بِالصِّحَّةِ وَالرِّيَاضَةِ. Teks ini menganjurkan pemuda untuk...",
    options: ["Hanya bermain game", "Memperhatikan kesehatan dan olahraga", "Tidak belajar", "Tidur terus"],
    answer: 1,
    explanation: "Teks mengatakan pemuda harus memperhatikan kesehatan dan olahraga.",
    damage: 15
  },
  {
    id: "qir-m2",
    subject: "qiraah",
    difficulty: "medium",
    category: "Qirā’ah",
    question: "Bacaan: حِمَايَةُ الْبِيئَةِ وَاجِبٌ عَلَى كُلِّ إِنْسَانٍ. Apa pesan utama bacaan?",
    options: ["Lingkungan tidak penting", "Menjaga lingkungan adalah kewajiban setiap orang", "Hanya pemerintah yang menjaga lingkungan", "Lingkungan sudah rusak"],
    answer: 1,
    explanation: "Pesan utamanya: menjaga lingkungan adalah kewajiban setiap manusia.",
    damage: 15
  },
  {
    id: "qir-h1",
    subject: "qiraah",
    difficulty: "hard",
    category: "Qirā’ah",
    question: "Bacaan: التِّكْنُولُوجِيَا تُسَاعِدُ الطُّلَّابَ فِي التَّعَلُّمِ، وَلَكِنْ يَجِبُ اسْتِخْدَامُهَا بِحِكْمَةٍ. Kesimpulan teks ini adalah...",
    options: ["Teknologi harus dihindari", "Teknologi membantu belajar tetapi harus digunakan dengan bijak", "Teknologi tidak berguna", "Siswa tidak boleh memakai HP"],
    answer: 1,
    explanation: "Teks mengakui manfaat teknologi untuk belajar, sekaligus menekankan penggunaan yang bijak.",
    damage: 20
  },

  // ========== INSYA’ (Menyusun Kalimat) ==========
  {
    id: "ins-e1",
    subject: "insya",
    difficulty: "easy",
    category: "Insya’",
    question: "Susunan yang benar dari kata: الطَّالِبُ - يَقْرَأُ - الْكِتَابَ adalah...",
    options: ["الْكِتَابَ يَقْرَأُ الطَّالِبُ", "يَقْرَأُ الطَّالِبُ الْكِتَابَ", "الطَّالِبُ الْكِتَابَ يَقْرَأُ", "يَقْرَأُ الْكِتَابَ الطَّالِبُ"],
    answer: 1,
    explanation: "Urutan standar Jumlah Fi‘liyyah: Fi‘il + Fa‘il + Maf‘ul → يَقْرَأُ الطَّالِبُ الْكِتَابَ.",
    damage: 10
  },
  {
    id: "ins-m1",
    subject: "insya",
    difficulty: "medium",
    category: "Insya’",
    question: "Kalimat yang benar untuk 'Ilmu adalah cahaya' adalah...",
    options: ["نُورٌ الْعِلْمُ", "الْعِلْمُ نُورٌ", "نُورٌ هُوَ الْعِلْمُ", "الْعِلْمُ هُوَ يَقْرَأُ"],
    answer: 1,
    explanation: "Jumlah Ismiyyah yang tepat: الْعِلْمُ نُورٌ.",
    damage: 15
  },
  {
    id: "ins-m2",
    subject: "insya",
    difficulty: "medium",
    category: "Insya’",
    question: "Manakah kalimat yang secara struktur paling tepat?",
    options: ["ذَهَبَ إِلَى الْمَدْرَسَةِ الطَّالِبُ", "الطَّالِبُ ذَهَبَ إِلَى الْمَدْرَسَةِ", "إِلَى الْمَدْرَسَةِ ذَهَبَ الطَّالِبُ", "Semua benar secara makna, tapi yang paling umum adalah B"],
    answer: 1,
    explanation: "Meskipun A juga grammatikal, urutan Fa‘il di depan lebih natural dalam banyak konteks modern. Namun yang paling standar adalah Fi‘il + Fa‘il.",
    damage: 15
  },
  {
    id: "ins-h1",
    subject: "insya",
    difficulty: "hard",
    category: "Insya’",
    question: "Susunlah menjadi kalimat yang benar: عَلَى - يَجِبُ - الْبِيئَةَ - نَحْمِيَ - أَنْ - عَلَيْنَا",
    options: ["يَجِبُ عَلَيْنَا أَنْ نَحْمِيَ الْبِيئَةَ", "نَحْمِيَ يَجِبُ عَلَيْنَا الْبِيئَةَ", "الْبِيئَةَ يَجِبُ أَنْ نَحْمِيَ", "عَلَيْنَا الْبِيئَةَ نَحْمِيَ"],
    answer: 0,
    explanation: "Struktur yang tepat: يَجِبُ عَلَيْنَا أَنْ + fi‘il mudhari‘ manshub + objek.",
    damage: 20
  },

  // Tambahan soal agar lebih banyak
  {
    id: "muf-e6",
    subject: "mufradat",
    difficulty: "easy",
    category: "Mufradāt",
    question: "Kata الثَّقَافَةُ berarti...",
    options: ["Olahraga", "Budaya", "Makanan", "Pakaian"],
    answer: 1,
    explanation: "الثَّقَافَةُ = budaya / kebudayaan.",
    damage: 10
  },
  {
    id: "muf-e7",
    subject: "mufradat",
    difficulty: "easy",
    category: "Mufradāt",
    question: "مَدْرَسَةٌ artinya...",
    options: ["Rumah", "Sekolah", "Masjid", "Pasar"],
    answer: 1,
    explanation: "مَدْرَسَةٌ = sekolah.",
    damage: 10
  },
  {
    id: "qaw-e4",
    subject: "qawaid",
    difficulty: "easy",
    category: "Qawā‘id",
    question: "Fi‘il Madhi menunjukkan waktu...",
    options: ["Sekarang", "Akan datang", "Lampau / sudah terjadi", "Perintah"],
    answer: 2,
    explanation: "Fi‘il Madhi menyatakan perbuatan yang sudah terjadi (masa lampau).",
    damage: 10
  },
  {
    id: "qaw-e5",
    subject: "qawaid",
    difficulty: "easy",
    category: "Qawā‘id",
    question: "Kata هُوَ adalah dhamir untuk...",
    options: ["Perempuan tunggal", "Laki-laki tunggal", "Jamak", "Mutsanna"],
    answer: 1,
    explanation: "هُوَ = dia (laki-laki / mudzakkar mufrad).",
    damage: 10
  },
  {
    id: "tar-e4",
    subject: "tarjamah",
    difficulty: "easy",
    category: "Tarjamah",
    question: "الْمَدْرَسَةُ كَبِيرَةٌ artinya...",
    options: ["Sekolah itu kecil", "Sekolah itu besar", "Sekolah itu jauh", "Sekolah itu baru"],
    answer: 1,
    explanation: "كَبِيرَةٌ = besar (bentuk muannats karena مَدْرَسَةٌ muannats).",
    damage: 10
  },
  {
    id: "tar-e5",
    subject: "tarjamah",
    difficulty: "easy",
    category: "Tarjamah",
    question: "أَنَا طَالِبٌ artinya...",
    options: ["Saya guru", "Saya siswa", "Saya dokter", "Saya anak"],
    answer: 1,
    explanation: "أَنَا = saya, طَالِبٌ = siswa laki-laki.",
    damage: 10
  },
  {
    id: "qaw-m5",
    subject: "qawaid",
    difficulty: "medium",
    category: "Qawā‘id",
    question: "Manakah yang merupakan huruf jar?",
    options: ["كَتَبَ", "فِي", "الطَّالِبُ", "يَقْرَأُ"],
    answer: 1,
    explanation: "فِي adalah huruf jar. Huruf jar membuat isim setelahnya majrur.",
    damage: 15
  },
  {
    id: "muf-m5",
    subject: "mufradat",
    difficulty: "medium",
    category: "Mufradāt",
    question: "Kata جَمِيلٌ lawannya adalah...",
    options: ["كَبِيرٌ", "قَبِيحٌ", "طَوِيلٌ", "قَصِيرٌ"],
    answer: 1,
    explanation: "جَمِيلٌ (indah/bagus) lawannya قَبِيحٌ (jelek).",
    damage: 15
  },
  {
    id: "tar-m3",
    subject: "tarjamah",
    difficulty: "medium",
    category: "Tarjamah",
    question: "Apa arti ذَهَبَ الطَّالِبُ إِلَى الْمَكْتَبَةِ ?",
    options: ["Siswa pergi ke perpustakaan", "Siswa membaca di perpustakaan", "Siswa menulis di perpustakaan", "Siswa tidur di perpustakaan"],
    answer: 0,
    explanation: "ذَهَبَ = pergi, إِلَى الْمَكْتَبَةِ = ke perpustakaan.",
    damage: 15
  },
  {
    id: "qir-e2",
    subject: "qiraah",
    difficulty: "easy",
    category: "Qirā’ah",
    question: "Bacaan: الصِّحَّةُ تَاجٌ عَلَى رُءُوسِ الْأَصِحَّاءِ. Pesan teks ini mendekati...",
    options: ["Kesehatan tidak penting", "Kesehatan adalah mahkota bagi orang yang sehat", "Hanya orang kaya yang sehat", "Olahraga berbahaya"],
    answer: 1,
    explanation: "Ungkapan klasik yang menekankan betapa berharganya kesehatan.",
    damage: 10
  },
  {
    id: "ins-e2",
    subject: "insya",
    difficulty: "easy",
    category: "Insya’",
    question: "Kalimat yang benar adalah...",
    options: ["الطَّالِبَةُ يَقْرَأُ الْكِتَابَ", "الطَّالِبَةُ تَقْرَأُ الْكِتَابَ", "الطَّالِبَةُ قَرَأَ الْكِتَابَ", "الطَّالِبَةُ نَحْنُ نَقْرَأُ"],
    answer: 1,
    explanation: "Karena fa‘il-nya muannats (الطَّالِبَةُ), fi‘il mudhari‘-nya harus تَقْرَأُ.",
    damage: 10
  },
  {
    id: "qaw-h4",
    subject: "qawaid",
    difficulty: "hard",
    category: "Qawā‘id",
    question: "Dalam kalimat كِتَابُ الْمُعَلِّمِ جَدِيدٌ, kata الْمُعَلِّمِ berkedudukan sebagai...",
    options: ["Mubtada’", "Mudhaf ilaih", "Khabar", "Fa‘il"],
    answer: 1,
    explanation: "Dalam idhafah كِتَابُ الْمُعَلِّمِ, kata الْمُعَلِّمِ adalah mudhaf ilaih.",
    damage: 20
  },
  {
    id: "muf-h2",
    subject: "mufradat",
    difficulty: "hard",
    category: "Mufradāt",
    question: "Kata الْمُسْتَقْبَلُ berarti...",
    options: ["Masa lalu", "Masa sekarang", "Masa depan", "Masa kecil"],
    answer: 2,
    explanation: "الْمُسْتَقْبَلُ = masa depan.",
    damage: 20
  },
  {
    id: "tar-h2",
    subject: "tarjamah",
    difficulty: "hard",
    category: "Tarjamah",
    question: "Terjemahan yang tepat untuk 'Kita harus menjaga kesehatan' adalah...",
    options: ["يَجِبُ عَلَيْنَا أَنْ نَحْمِيَ الصِّحَّةَ", "نُرِيدُ أَنْ نَأْكُلَ كَثِيرًا", "نَحْنُ نَلْعَبُ كُلَّ يَوْمٍ", "الصِّحَّةُ لَيْسَتْ مُهِمَّةً"],
    answer: 0,
    explanation: "Struktur يَجِبُ عَلَيْنَا أَنْ + fi‘il adalah cara umum menyatakan 'kita harus...'.",
    damage: 20
  }
];

// Helper
function getQuestionsByFilter({ subject = "campuran", difficulty = "medium", count = 12 }) {
  let pool = [...QUESTIONS];
  if (subject !== "campuran") {
    pool = pool.filter(q => q.subject === subject);
  }
  if (difficulty !== "campuran") {
    const preferred = pool.filter(q => q.difficulty === difficulty);
    if (preferred.length >= Math.min(count, 6)) pool = preferred;
  }
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, Math.min(count, pool.length));
}

console.log("Arabic questions loaded:", QUESTIONS.length);
