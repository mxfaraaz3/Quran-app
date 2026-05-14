// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    console.log("App loaded!");
    
    // Hide splash after 3 seconds
    setTimeout(function() {
        var splash = document.getElementById('splash');
        if(splash) {
            splash.style.opacity = '0';
            setTimeout(function() {
                splash.style.display = 'none';
                document.getElementById('app').style.display = 'block';
            }, 1000);
        }
    }, 3000);
    
    loadSurahList();
});

// Simple Surah Data
const surahs = [
    { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", verses: 7 },
    { number: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286 },
    { number: 3, name: "Ali Imran", arabic: "آل عمران", verses: 200 },
    { number: 36, name: "Ya-Sin", arabic: "يس", verses: 83 },
    { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", verses: 4 },
    { number: 113, name: "Al-Falaq", arabic: "الفلق", verses: 5 },
    { number: 114, name: "An-Nas", arabic: "الناس", verses: 6 }
];

const ayahData = {
    1: [
        "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
        "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "الرَّحْمَنِ الرَّحِيمِ",
        "مَالِكِ يَوْمِ الدِّينِ",
        "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
    ],
    112: [
        "قُلْ هُوَ اللَّهُ أَحَدٌ",
        "اللَّهُ الصَّمَدُ",
        "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ"
    ],
    114: [
        "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        "مَلِكِ النَّاسِ",
        "إِلَهِ النَّاسِ",        "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
        "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
        "مِنَ الْجِنَّةِ وَالنَّاسِ"
    ]
};

function loadSurahList() {
    const list = document.getElementById('surahList');
    if(!list) return;
    
    list.innerHTML = '';
    surahs.forEach(surah => {
        const card = document.createElement('div');
        card.className = 'surah-card';
        card.onclick = () => openSurah(surah.number);
        card.innerHTML = `
            <div class="surah-number">${surah.number}</div>
            <div class="surah-info">
                <div class="surah-arabic">${surah.arabic}</div>
                <div class="surah-english">${surah.name}</div>
            </div>
            <div class="surah-details">
                <div>${surah.verses} Ayahs</div>
            </div>
        `;
        list.appendChild(card);
    });
}

function openSurah(number) {
    const surah = surahs.find(s => s.number === number);
    if(!surah) return;
    
    document.getElementById('surahName').textContent = `${surah.arabic} - ${surah.name}`;
    document.getElementById('surahInfo').textContent = `${surah.verses} Ayahs`;
    
    loadAyahs(number);
    showScreen('surahScreen');
}

function loadAyahs(surahNumber) {
    const container = document.getElementById('ayahContainer');
    if(!container) return;
    
    container.innerHTML = '';
    const ayahs = ayahData[surahNumber] || ["بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ"];
    
    ayahs.forEach((ayah, index) => {
        const ayahDiv = document.createElement('div');
        ayahDiv.className = 'ayah';        ayahDiv.innerHTML = `${ayah} <span class="ayah-number">${index + 1}</span>`;
        container.appendChild(ayahDiv);
    });
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const screen = document.getElementById(screenId);
    if(screen) screen.classList.add('active');
}

function goHome() {
    showScreen('homeScreen');
}

// Search
const searchInput = document.getElementById('searchInput');
if(searchInput) {
    searchInput.addEventListener('input', function(e) {
        const term = e.target.value.toLowerCase();
        const cards = document.querySelectorAll('.surah-card');
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            card.style.display = text.includes(term) ? 'flex' : 'none';
        });
    });
}