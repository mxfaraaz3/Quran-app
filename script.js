const surahs = [
    {n:1, name:"Al-Fatiha", mean:"The Opening", arb:"الفاتحة", aya:7},
    {n:2, name:"Al-Baqara", mean:"The Cow", arb:"البقرة", aya:286},
    {n:3, name:"Ali Imran", mean:"Family of Imran", arb:"آل عمران", aya:200},
    {n:4, name:"An-Nisa", mean:"The Women", arb:"النساء", aya:176},
    {n:5, name:"Al-Ma'idah", mean:"The Table Spread", arb:"المائدة", aya:120},
    {n:55, name:"Ar-Rahman", mean:"The Beneficent", arb:"الرحمن", aya:78},
    {n:114, name:"An-Nas", mean:"Mankind", arb:"الناس", aya:6}
];

const quranText = {
    1: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        "الرَّحْمَٰنِ الرَّحِيمِ",
        "مَالِكِ يَوْمِ الدِّينِ",
        "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
    ],
    2: [
        "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        "الم",
        "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِلْمُتَّقِينَ",
        "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ"
    ]
};

function renderSurahs() {
    let html = '';
    surahs.forEach(s => {
        html += `
            <div class="surah-item" onclick="openSurah(${s.n})">
                <div class="surah-num">${s.n}</div>
                <div class="surah-info">
                    <div class="surah-name">${s.name}</div>
                    <div class="surah-mean">${s.mean}</div>
                </div>
                <div class="surah-arabic">
                    <div class="surah-arabic-name">${s.arb}</div>
                    <div class="surah-ayahs">${s.aya} ayahs</div>
                </div>
            </div>`;
    });
    document.getElementById('surahList').innerHTML = html;
}

function openSurah(n) {
    const surah = surahs.find(s => s.n === n);
    if (!surah) return;

    let readHTML = `
        <div class="read-header">
            <div class="back-btn" onclick="go('home')">←</div>
            <div class="read-title">
                <h2>${surah.arb}</h2>
                <p>${surah.name} • ${surah.mean}</p>
            </div>
        </div>
        <div class="bismillah-read">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <div class="ayahs-container"></div>
    `;

    document.getElementById('read').innerHTML = readHTML;

    const container = document.querySelector('.ayahs-container');
    const ayats = quranText[n] || [];

    if (ayats.length > 0) {
        ayats.forEach((text, i) => {
            const div = document.createElement('div');
            div.className = 'ayah';
            div.innerHTML = `<span class="ayah-num">${i+1}</span> ${text}`;
            container.appendChild(div);
        });
    } else {
        container.innerHTML = `<div class="ayah" style="text-align:center; padding:40px 20px;">Ayats abhi add nahi kiye gaye hain.</div>`;
    }

    go('read');
}

function openLast() {
    openSurah(2);
}

function go(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(page).classList.add('active');
}

// Initialize
window.onload = function() {
    renderSurahs();
    document.getElementById('contName').textContent = "Aayat Kursi";
    document.getElementById('contMean').textContent = "Al-Baqara • Ayat 255";
};