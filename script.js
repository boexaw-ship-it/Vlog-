let matches = []; // JSON မှ data များ ဝင်လာမည့် နေရာ
let currentIndex = 0;
const changeInterval = 5000; 
let isPlaying = true; 
let intervalId; 

// ကွင်းထဲတွင် Formation အစက်များ ထုတ်ပေးသည့် လုပ်ဆောင်ချက်
function generatePitchFormation(containerId, formationArray) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = ''; 

    // ဂိုးသမား (GK) အစက်
    const gkLine = document.createElement('div');
    gkLine.className = 'formation-line';
    gkLine.innerHTML = '<div class="player-dot"></div>';
    container.appendChild(gkLine);

    // ကျန်လိုင်းများ (DF, MF, FW)
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

// W, D, L ခလုတ်လေးများ ထုတ်ပေးသည့် လုပ်ဆောင်ချက်
function generateFormBadges(resultsArray) {
    return resultsArray.map(res => {
        let className = 'win';
        if (res === 'D') className = 'draw';
        if (res === 'L') className = 'lose';
        return `<span class="${className}">${res}</span>`;
    }).join('');
}

// မျက်နှာပြင်ပေါ်ရှိ အချက်အလက်များအား ပြောင်းလဲပေးသည့် လုပ်ဆောင်ချက်
function updateMatchInfo() {
    if (matches.length === 0) return;

    const lowerThirdBox = document.querySelector('.lower-third-box');
    const sidePanel = document.querySelector('.side-panel');
    
    // Smooth Fade Out
    lowerThirdBox.style.opacity = 0;
    sidePanel.style.opacity = 0;

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % matches.length;
        const match = matches[currentIndex];

        // Lower Third Area
        document.getElementById('teamA-name').innerText = match.teamAName;
        document.getElementById('teamA-flag').src = match.teamAFlag;
        document.getElementById('teamB-name').innerText = match.teamBName;
        document.getElementById('teamB-flag').src = match.teamBFlag;
        document.getElementById('prediction-text').innerText = match.prediction;

        // Side Panel စာသားများ
        document.getElementById('teamA-formation-text').innerText = match.teamAFormation;
        document.getElementById('teamB-formation-text').innerText = match.teamBFormation;
        document.getElementById('teamA-small-flag').src = match.teamAFlag;
        document.getElementById('teamB-small-flag').src = match.teamBFlag;
        
        // Form Badges များ ထည့်ခြင်း
        document.getElementById('teamA-form').innerHTML = generateFormBadges(match.teamAForm);
        document.getElementById('teamB-form').innerHTML = generateFormBadges(match.teamBForm);

        // Formation အစက်များ နေရာချခြင်း
        generatePitchFormation('teamA-players', match.teamAPitchArr);
        generatePitchFormation('teamB-players', match.teamBPitchArr);

        // Fade In 
        lowerThirdBox.style.opacity = 1;
        sidePanel.style.opacity = 1;
    }, 500); 
}

// Play / Pause ထိန်းချုပ်မှုများ
function startAutoPlay() { intervalId = setInterval(updateMatchInfo, changeInterval); }
function stopAutoPlay() { clearInterval(intervalId); }

function togglePlay() {
    isPlaying = !isPlaying;
    const btn = document.getElementById('playPauseBtn');
    if(isPlaying) {
        startAutoPlay();
        btn.innerText = "⏸ Pause Auto-Play";
        btn.style.background = "#e63946";
    } else {
        stopAutoPlay();
        btn.innerText = "▶️ Start Auto-Play";
        btn.style.background = "#2a9d8f";
    }
}

// ကီးဘုတ် Shortcut အာရုံခံစနစ်
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' || event.key === 'p' || event.key === 'P') {
        event.preventDefault();
        togglePlay();
    }
});

// --- အဓိကအပိုင်း: data.json ဖိုင်ကို လှမ်းဖတ်ပြီး စတင်လည်ပတ်ခြင်း ---
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        matches = data;
        
        // ပထမဆုံးပွဲအတွက် မျက်နှာပြင်ပေါ်တွင် ချက်ချင်းသက်ရောက်စေရန်
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
            
            // Auto Play စတင်မည်
            startAutoPlay();
        }
    })
    .catch(error => console.error("JSON data ဖတ်ရာတွင် Error တက်နေပါသည် - ", error));
