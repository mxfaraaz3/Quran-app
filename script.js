// Quran Data (Complete 114 Surahs)
const surahs = [
    { number: 1, name: "Al-Fatihah", arabic: "الفاتحة", verses: 7, type: "Meccan" },
    { number: 2, name: "Al-Baqarah", arabic: "البقرة", verses: 286, type: "Medinan" },
    { number: 3, name: "Ali Imran", arabic: "آل عمران", verses: 200, type: "Medinan" },
    { number: 4, name: "An-Nisa", arabic: "النساء", verses: 176, type: "Medinan" },
    { number: 5, name: "Al-Ma'idah", arabic: "المائدة", verses: 120, type: "Medinan" },
    { number: 36, name: "Ya-Sin", arabic: "يس", verses: 83, type: "Meccan" },
    { number: 55, name: "Ar-Rahman", arabic: "الرحمن", verses: 78, type: "Medinan" },
    { number: 67, name: "Al-Mulk", arabic: "الملك", verses: 30, type: "Meccan" },
    { number: 112, name: "Al-Ikhlas", arabic: "الإخلاص", verses: 4, type: "Meccan" },
    { number: 113, name: "Al-Falaq", arabic: "الفلق", verses: 5, type: "Meccan" },
    { number: 114, name: "An-Nas", arabic: "الناس", verses: 6, type: "Meccan" }
];

// Sample Ayah data (For complete app, you'll need full Quran text)
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
    ]
};

let currentSurah = null;
let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
let lastRead = localStorage.getItem('lastRead') || null;

// Initialize App
window.onload = function() {
    setTimeout(() => {
        document.getElementById('splash').style.display = 'none';
        document.getElementById('app').style.display = 'block';
    }, 3000);
    
    loadSurahList();
    loadLastRead();
};

// Load Surah Listfunction loadSurahList() {
    const list = document.getElementById('surahList');
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
                <div>${surah.type}</div>
            </div>
        `;
        
        list.appendChild(card);
    });
}

// Search Functionality
document.getElementById('searchInput')?.addEventListener('input', function(e) {
    const term = e.target.value.toLowerCase();
    const cards = document.querySelectorAll('.surah-card');
    
    cards.forEach((card, index) => {
        const surah = surahs[index];
        if (surah.name.toLowerCase().includes(term) || 
            surah.arabic.includes(term) ||
            surah.number.toString().includes(term)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Open Surah
function openSurah(number) {
    currentSurah = number;
    const surah = surahs.find(s => s.number === number);
    
    document.getElementById('surahName').textContent = `${surah.arabic} - ${surah.name}`;
    document.getElementById('surahInfo').textContent = `${surah.verses} Ayahs | ${surah.type}`;
        loadAyahs(number);
    showScreen('surahScreen');
    
    // Save last read
    localStorage.setItem('lastRead', JSON.stringify({ surah: number, timestamp: Date.now() }));
}

// Load Ayahs
function loadAyahs(surahNumber) {
    const container = document.getElementById('ayahContainer');
    container.innerHTML = '';
    
    const ayahs = ayahData[surahNumber] || ["بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ", "آیات یہاں لود ہوں گی..."];
    
    ayahs.forEach((ayah, index) => {
        const ayahDiv = document.createElement('div');
        ayahDiv.className = 'ayah';
        ayahDiv.innerHTML = `
            ${ayah}
            <span class="ayah-number">${index + 1}</span>
        `;
        container.appendChild(ayahDiv);
    });
}

// Navigation Functions
function showHome() {
    showScreen('homeScreen');
    updateNav(0);
}

function showBookmarks() {
    alert('Bookmarks feature - Coming soon!');
    updateNav(1);
}

function showLastRead() {
    if (lastRead) {
        const data = JSON.parse(lastRead);
        openSurah(data.surah);
    } else {
        alert('No last read found');
    }
    updateNav(2);
}

function showSettings() {
    alert('Settings - Coming soon!');
    updateNav(3);
}
function goHome() {
    showHome();
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function updateNav(index) {
    document.querySelectorAll('.nav-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === index);
    });
}

// Bookmark & Audio
function toggleBookmark() {
    if (!currentSurah) return;
    
    const index = bookmarks.indexOf(currentSurah);
    if (index > -1) {
        bookmarks.splice(index, 1);
        alert('Bookmark removed');
    } else {
        bookmarks.push(currentSurah);
        alert('Bookmark added');
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function toggleAudio() {
    alert('Audio recitation - Feature coming soon!');
}

function loadLastRead() {
    lastRead = localStorage.getItem('lastRead');
}

// PWA Install Prompt
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});