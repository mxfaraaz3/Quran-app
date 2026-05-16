// Complete 114 Surahs Data
const surahs = [
    {n:1, name:"Al-Fatiha", mean:"The Opening", arb:"الفاتحة", aya:7},
    {n:2, name:"Al-Baqara", mean:"The Cow", arb:"البقرة", aya:286},
    // ... Agar aapke paas pura 114 surah ka data hai to yahan paste kar dena
    {n:114, name:"An-Nas", mean:"Mankind", arb:"الناس", aya:6}
];

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

    document.getElementById('readArabic').textContent = surah.arb;
    document.getElementById('readEnglish').textContent = `${surah.name} • ${surah.mean}`;

    const container = document.getElementById('ayahs');
    container.innerHTML = '';

    if (n === 1) {
        // Real Al-Fatiha
        const fatiha = [
            "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
            "الرَّحْمَٰنِ الرَّحِيمِ",
            "مَالِكِ يَوْمِ الدِّينِ",
            "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
            "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
            "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ"
        ];
        fatiha.forEach((text, i) => {
            const div = document.createElement('div');
            div.className = 'ayah';
            div.innerHTML = `<span class="ayah-num">${i+1}</span> ${text}`;
            container.appendChild(div);
        });
    } else {
        // Placeholder for other surahs
        for (let i = 1; i <= Math.min(8, surah.aya); i++) {
            const div = document.createElement('div');
            div.className = 'ayah';
            div.innerHTML = `<span class="ayah-num">\( {i}</span> ﴿ \){i}﴾ Sample Ayah from ${surah.name}`;
            container.appendChild(div);
        }
    }

    go('read');
}

function openLast() {
    openSurah(2); // Aayat Kursi wali surah
}

function go(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    if (page === 'home') {
        document.getElementById('home').classList.add('active');
    } else if (page === 'read') {
        document.getElementById('read').classList.add('active');
    }
    // Baaki pages (bookmark, settings) abhi incomplete hain
}

// Initialize App
window.onload = function() {
    renderSurahs();
    document.getElementById('contName').textContent = "Aayat Kursi";
    document.getElementById('contMean').textContent = "Al-Baqara • Ayat 255";
};