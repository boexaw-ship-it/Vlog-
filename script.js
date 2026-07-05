const matches = [
    {
        "teamAName": "Argentina",
        "teamAFlag": "assets/flags/argentina.png",
        "teamBName": "Spain",
        "teamBFlag": "assets/flags/spain.png",
        "prediction": "Argentina Win & Over 2.5 Goals",
        "teamAFormation": "4-3-3",
        "teamBFormation": "4-2-3-1",
        "teamAPitchArr": [4, 3, 3],
        "teamBPitchArr": [4, 2, 3, 1],
        "teamAForm": ["W", "W", "W", "D", "W"],
        "teamBForm": ["W", "W", "D", "W", "W"]
    },
    {
        "teamAName": "Brazil",
        "teamAFlag": "assets/flags/brazil.png",
        "teamBName": "France",
        "teamBFlag": "assets/flags/france.png",
        "prediction": "Brazil Win & Both Teams to Score (BTTS)",
        "teamAFormation": "4-2-3-1",
        "teamBFormation": "4-3-3",
        "teamAPitchArr": [4, 2, 3, 1],
        "teamBPitchArr": [4, 3, 3],
        "teamAForm": ["W", "W", "L", "W", "W"],
        "teamBForm": ["W", "D", "W", "W", "W"]
    }
];

let currentIndex = 0;
const changeInterval = 5000; 
let isPlaying = true; 
let intervalId; 

function generatePitchFormation(containerId, formationArray) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ''; 
    const gkLine = document.createElement('div');
    gkLine.className = 'formation-line';
    gkLine.innerHTML = '<div class="player-dot"></div>';
    container.appendChild(gkLine);
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

function generateFormBadges(resultsArray) {
    return resultsArray.map(res => {
        let className = 'win';
        if (res === 'D') className = 'draw';
        if (res === 'L') className = 'lose';
        return `<span class="${className}">${res}</span>`;
    }).join('');
}

function updateMatchInfo() {
    if (matches.length === 0) return;
    const lowerThirdBox = document.querySelector('.lower-third-box');
    const sidePanel = document.querySelector('.side-panel');
    lowerThirdBox.style.opacity = 0;
    sidePanel.style.opacity = 0;

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % matches.length;
        const match = matches[currentIndex];
        document.getElementById('teamA-name').innerText = match.teamAName;
        document.getElementById('teamA-flag').src = match.teamAFlag;
        document.getElementById('teamB-name').innerText = match.teamBName;
        document.getElementById('teamB-flag').src = match.teamBFlag;
        document.getElementById('prediction-text').innerText = match.prediction;
        document.getElementById('teamA-formation-text').innerText = match.teamAFormation;
        document.getElementById('teamB-formation-text').innerText = match.teamBFormation;
        document.getElementById('teamA-small-flag').src = match.teamAFlag;
        document.getElementById('teamB-small-flag').src = match.teamBFlag;
        document.getElementById('teamA-form').innerHTML = generateFormBadges(match.teamAForm);
        document.getElementById('teamB-form').innerHTML = generateFormBadges(match.teamBForm);
        generatePitchFormation('teamA-players', match.teamAPitchArr);
        generatePitchFormation('teamB-players', match.teamBPitchArr);
        lowerThirdBox.style.opacity = 1;
        sidePanel.style.opacity = 1;
    }, 500); 
}

function startAutoPlay() { 
    if(!intervalId) {
        intervalId = setInterval(updateMatchInfo, changeInterval); 
    }
}
function stopAutoPlay() { 
    clearInterval(intervalId); 
    intervalId = null;
}

// ပြင်ပမှ လှမ်းထိန်းချုပ်နိုင်ရန် အခြေအနေ ပြောင်းလဲပေးသည့် လုပ်ဆောင်ချက်
function setPlayState(play) {
    isPlaying = play;
    const btn = document.getElementById('playPauseBtn');
    if(isPlaying) {
        startAutoPlay();
        if(btn) btn.innerText = "⏸ Pause Auto-Play";
        if(btn) btn.style.background = "#e63946";
    } else {
        stopAutoPlay();
        if(btn) btn.innerText = "▶️ Start Auto-Play";
        if(btn) btn.style.background = "#2a9d8f";
    }
}

function togglePlay() {
    const newState = !isPlaying;
    setPlayState(newState);
    // အခြား Screen/OBS က သိရှိနိုင်ရန် ချက်ချင်း သိမ်းဆည်းလိုက်မည်
    localStorage.setItem('doePhaGyi_playing', newState ? 'true' : 'false');
}

// === [စနစ်သစ်] OBS ထဲမှနေ၍ အခြေအနေကို စက္ကန့်ဝက်တစ်ခါ လှမ်းစစ်မည့် စနစ် ===
setInterval(() => {
    const remoteState = localStorage.getItem('doePhaGyi_playing');
    if (remoteState !== null) {
        const shouldPlay = remoteState === 'true';
        if (shouldPlay !== isPlaying) {
            setPlayState(shouldPlay);
        }
    }
}, 500);

function initOverlay() {
    localStorage.setItem('doePhaGyi_playing', 'true'); // စဖွင့်ချင်း Play ထားမည်
    if (matches.length > 0) {
        const firstMatch = matches[0];
        document.getElementById('teamA-name').innerText = firstMatch.teamAName;
        document.getElementById('teamA-flag').src = firstMatch.teamAFlag;
        document.getElementById('teamB-name').innerText = firstMatch.teamBName;
        document.getElementById('teamB-flag').src = firstMatch.teamBFlag;
        document.getElementById('prediction-text').innerText = firstMatch.prediction;
        document.getElementById('teamA-formation-text').innerText = firstMatch.teamAFormation;
        document.getElementById('teamB-formation-text').innerText = firstMatch.teamBFormation;
        document.getElementById('teamA-small-flag').src = firstMatch.teamAFlag;
        document.getElementById('teamB-small-flag').src = firstMatch.teamBFlag;
        document.getElementById('teamA-form').innerHTML = generateFormBadges(firstMatch.teamAForm);
        document.getElementById('teamB-form').innerHTML = generateFormBadges(firstMatch.teamBForm);
        generatePitchFormation('teamA-players', firstMatch.teamAPitchArr);
        generatePitchFormation('teamB-players', firstMatch.teamBPitchArr);
        startAutoPlay();
    }
}

window.onload = initOverlay;
