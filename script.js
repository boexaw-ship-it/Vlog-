// === ပွဲစဉ်အချက်အလက်များ (CORS Error မတက်စေရန် ဤနေရာတွင် တိုက်ရိုက်သိမ်းဆည်းထားပါသည်) ===
const matches = [
    {
        "teamAName": "Argentina",
        "teamAFlag": "assets/flags/f1.png",
        "teamBName": "Egypt",
        "teamBFlag": "assets/flags/f1a.png",
        "prediction": "Argentina Win 57% Draws 18% Egypt Win 25%",
        "teamAFormation": "4-4-2",
        "teamBFormation": "4-2-3-1",
        "teamAPitchArr": [4, 4, 2],
        "teamBPitchArr": [4, 2, 3, 1],
        "teamAForm": ["W", "W", "W", "W", "W"],
        "teamBForm": ["L", "D", "W", "D", "D"]
    },
    {
        "teamAName": "Switzerland",
        "teamAFlag": "assets/flags/f2.png",
        "teamBName": "Colombia",
        "teamBFlag": "assets/flags/f2a.png",
        "prediction": "Switzerland Win 26% Draws 18% Colombia Win 56%",
        "teamAFormation": "4-2-3-1",
        "teamBFormation": "4-3-3",
        "teamAPitchArr": [4, 3, 3],
        "teamBPitchArr": [4, 2, 3, 1],
        "teamAForm": ["D", "D", "W", "W", "W"],
        "teamBForm": ["W", "W", "W", "D", "W"]
    }
];

let currentIndex = 0;
const changeInterval = 5000; // ပွဲစဉ်တစ်ခုကို ၅ စက္ကန့်စီ ပြသမည်
let isPlaying = true; 
let intervalId; 
let chromaActive = false; // Green Screen Mode သတ်မှတ်ချက်

// === ၁။ ဘောလုံးကွင်းထဲတွင် ကစားသမားနေရာ (အစက်များ) ထုတ်ပေးသည့် လုပ်ဆောင်ချက် ===
function generatePitchFormation(containerId, formationArray) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ''; 

    // ဂိုးသမား (GK) အစက်ကို အမြဲထည့်မည်
    const gkLine = document.createElement('div');
    gkLine.className = 'formation-line';
    gkLine.innerHTML = '<div class="player-dot"></div>';
    container.appendChild(gkLine);

    // ကျန်လိုင်းများ (DF, MF, FW) အား အဆင့်ဆင့် နေရာချမည်
    formationArray.forEach(count => {
        const line = document.createElement('div');
        line.className = 'formation-line';
        for (let i = 0; i < count; i++) {
            const player = document.createElement('div');
            player.className = 'player-dot';
            line.appendChild(player);
        }
        container.appendChild(line);
    });
}

// === ၂။ နိုင်/သရေ/ရှုံး (W, D, L) အဝိုင်းလေးများ ထုတ်ပေးသည့် လုပ်ဆောင်ချက် ===
function generateFormBadges(resultsArray) {
    if (!resultsArray || !Array.isArray(resultsArray)) return '';
    return resultsArray.map(res => {
        let className = 'win';
        if (res === 'D') className = 'draw';
        if (res === 'L') className = 'lose';
        return `<span class="${className}">${res}</span>`;
    }).join('');
}

// === ၃။ ပွဲစဉ်အချက်အလက်များအား အလိုအလျောက် နောက်တစ်ပွဲသို့ ပြောင်းလဲပေးသည့် လုပ်ဆောင်ချက် ===
function updateMatchInfo() {
    if (matches.length === 0) return;

    const lowerThirdBox = document.querySelector('.lower-third-box');
    const sidePanel = document.querySelector('.side-panel');
    
    // Smooth Fade Out (မှိန်သွားစေခြင်း)
    if (lowerThirdBox) lowerThirdBox.style.opacity = 0;
    if (sidePanel) sidePanel.style.opacity = 0;

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % matches.length;
        const match = matches[currentIndex];

        // Lower Third Data များအား ချိန်းခြင်း
        const teamANameEl = document.getElementById('teamA-name');
        const teamAFlagEl = document.getElementById('teamA-flag');
        const teamBNameEl = document.getElementById('teamB-name');
        const teamBFlagEl = document.getElementById('teamB-flag');
        const predictionTextEl = document.getElementById('prediction-text');

        if (teamANameEl) teamANameEl.innerText = match.teamAName;
        if (teamAFlagEl) teamAFlagEl.src = match.teamAFlag;
        if (teamBNameEl) teamBNameEl.innerText = match.teamBName;
        if (teamBFlagEl) teamBFlagEl.src = match.teamBFlag;
        if (predictionTextEl) predictionTextEl.innerText = match.prediction;

        // Side Panel Data များအား ချိန်းခြင်း
        const teamAFormTextEl = document.getElementById('teamA-formation-text');
        const teamBFormTextEl = document.getElementById('teamB-formation-text');
        const teamASmallFlagEl = document.getElementById('teamA-small-flag');
        const teamBSmallFlagEl = document.getElementById('teamB-small-flag');
        const teamAFormEl = document.getElementById('teamA-form');
        const teamBFormEl = document.getElementById('teamB-form');

        if (teamAFormTextEl) teamAFormTextEl.innerText = match.teamAFormation;
        if (teamBFormTextEl) teamBFormTextEl.innerText = match.teamBFormation;
        if (teamASmallFlagEl) teamASmallFlagEl.src = match.teamAFlag;
        if (teamBSmallFlagEl) teamBSmallFlagEl.src = match.teamBFlag;
        
        if (teamAFormEl) teamAFormEl.innerHTML = generateFormBadges(match.teamAForm);
        if (teamBFormEl) teamBFormEl.innerHTML = generateFormBadges(match.teamBForm);

        // Formation အစက်များ ကွင်းထဲတွင် ပြန်လည်နေရာချခြင်း
        generatePitchFormation('teamA-players', match.teamAPitchArr);
        generatePitchFormation('teamB-players', match.teamBPitchArr);

        // Fade In (ပြန်လင်းလာစေခြင်း)
        if (lowerThirdBox) lowerThirdBox.style.opacity = 1;
        if (sidePanel) sidePanel.style.opacity = 1;
    }, 500); 
}

// === ၄။ Play / Pause Auto-Play ထိန်းချုပ်မှုများ ===
function startAutoPlay() { 
    if (!intervalId) {
        intervalId = setInterval(updateMatchInfo, changeInterval); 
    }
}

function stopAutoPlay() { 
    if (intervalId) {
        clearInterval(intervalId); 
        intervalId = null;
    }
}

function togglePlay() {
    isPlaying = !isPlaying;
    const btn = document.getElementById('playPauseBtn');
    
    if(isPlaying) {
        startAutoPlay();
        if(btn) {
            btn.innerText = "⏸ Pause Auto-Play";
            btn.style.background = "linear-gradient(135deg, #e63946, #b0101d)";
        }
    } else {
        stopAutoPlay();
        if(btn) {
            btn.innerText = "▶️ Start Auto-Play";
            btn.style.background = "linear-gradient(135deg, #2a9d8f, #1f7066)";
        }
    }
}

// === ၅။ Green Screen (Chroma Mode) အဖွင့်/အပိတ် ပြုလုပ်ခြင်း ===
function toggleChromaMode() {
    chromaActive = !chromaActive;
    const body = document.body;
    const btn = document.getElementById('chromaBtn');
    
    if (chromaActive) {
        body.classList.add('chroma-key-active');
        if(btn) {
            btn.innerText = "🟢 Green Screen: ON";
            btn.style.background = "linear-gradient(135deg, #2a9d8f, #1f7066)";
        }
    } else {
        body.classList.remove('chroma-key-active');
        if(btn) {
            btn.innerText = "⚪ Green Screen: OFF";
            btn.style.background = "#475569";
        }
    }
}

// === ၆။ ပထမဆုံး စဖွင့်ဖွင့်ချင်း ပတ်ဝန်းကျင်အား စတင်လည်ပတ်စေခြင်း ===
function initOverlay() {
    // Play Button ၏ မူလဒီဇိုင်းအား သတ်မှတ်ခြင်း
    const playBtn = document.getElementById('playPauseBtn');
    if(playBtn) playBtn.style.background = "linear-gradient(135deg, #e63946, #b0101d)";

    if (matches.length > 0) {
        const firstMatch = matches[0];
        
        // ပထမဆုံးပွဲစဉ်အတွက် စာသားများနှင့် အလံပုံများ သတ်မှတ်ခြင်း
        const teamANameEl = document.getElementById('teamA-name');
        const teamAFlagEl = document.getElementById('teamA-flag');
        const teamBNameEl = document.getElementById('teamB-name');
        const teamBFlagEl = document.getElementById('teamB-flag');
        const predictionTextEl = document.getElementById('prediction-text');

        if (teamANameEl) teamANameEl.innerText = firstMatch.teamAName;
        if (teamAFlagEl) teamAFlagEl.src = firstMatch.teamAFlag;
        if (teamBNameEl) teamBNameEl.innerText = firstMatch.teamBName;
        if (teamBFlagEl) teamBFlagEl.src = firstMatch.teamBFlag;
        if (predictionTextEl) predictionTextEl.innerText = firstMatch.prediction;

        // Side Panel မူလအခြေအနေ သတ်မှတ်ခြင်း
        const teamAFormTextEl = document.getElementById('teamA-formation-text');
        const teamBFormTextEl = document.getElementById('teamB-formation-text');
        const teamASmallFlagEl = document.getElementById('teamA-small-flag');
        const teamBSmallFlagEl = document.getElementById('teamB-small-flag');
        const teamAFormEl = document.getElementById('teamA-form');
        const teamBFormEl = document.getElementById('teamB-form');

        if (teamAFormTextEl) teamAFormTextEl.innerText = firstMatch.teamAFormation;
        if (teamBFormTextEl) teamBFormTextEl.innerText = firstMatch.teamBFormation;
        if (teamASmallFlagEl) teamASmallFlagEl.src = firstMatch.teamAFlag;
        if (teamBSmallFlagEl) teamBSmallFlagEl.src = firstMatch.teamBFlag;
        
        if (teamAFormEl) teamAFormEl.innerHTML = generateFormBadges(firstMatch.teamAForm);
        if (teamBFormEl) teamBFormEl.innerHTML = generateFormBadges(firstMatch.teamBForm);

        // မူလ ကွင်းလယ် Formation အစက်များ ထုတ်ပေးခြင်း
        generatePitchFormation('teamA-players', firstMatch.teamAPitchArr);
        generatePitchFormation('teamB-players', firstMatch.teamBPitchArr);
        
        // Auto Play စတင်မည်
        startAutoPlay();
    }
}

// OBS တွင် စိတ်ချရစေရန် HTML DOM Loading ပြီးစီးချိန်၌သာ စတင်အလုပ်လုပ်စေခြင်း
document.addEventListener('DOMContentLoaded', initOverlay);
