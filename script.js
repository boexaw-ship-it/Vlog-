// ပွဲစဉ်များနှင့် သုံးသပ်ချက် အချက်အလက်များကို ဒီမှာ စာရင်းလုပ်ထားပါမည်
const matches = [
    {
        teamAName: "Argentina",
        teamAFlag: "assets/flags/argentina.png",
        teamBName: "Spain",
        teamBFlag: "assets/flags/spain.png",
        prediction: "Argentina Win & Over 2.5 Goals"
    },
    {
        teamAName: "Brazil",
        teamAFlag: "assets/flags/brazil.png",
        teamBName: "France",
        teamBFlag: "assets/flags/france.png",
        prediction: "Brazil Win & Both Teams to Score (BTTS)"
    }
    // နောက်ရက်တွေ ပွဲတွေတိုးလာရင် ဒီအောက်မှာ ကော်မာ (,) ခံပြီး ထပ်တိုးရေးသွားလို့ ရပါတယ်
];

let currentIndex = 0;
const changeInterval = 5000; // 5 စက္ကန့် (မီလီစက္ကန့် ၅၀၀၀)

function updateMatchInfo() {
    const lowerThirdBox = document.querySelector('.lower-third-box');
    
    // ပထမဦးစွာ စာသားတွေမပြောင်းခင် အဟောင်းကို မှိန် (Fade out) လိုက်ပါမည်
    lowerThirdBox.style.opacity = 0;

    // Fade out ဖြစ်ဖို့ စက္ကန့်ဝက် (500ms) စောင့်ပြီးမှ စာသားအသစ် ချိန်းပါမည်
    setTimeout(() => {
        // နောက်တစ်ပွဲကို ရွှေ့ပါ (နောက်ဆုံးပွဲရောက်ရင် ပထမပွဲကို ပြန်လှည့်မည်)
        currentIndex = (currentIndex + 1) % matches.length;
        const match = matches[currentIndex];

        // HTML ထဲက ID များကို ဖမ်းပြီး Data အသစ်များ အစားထိုးထည့်ခြင်း
        document.getElementById('teamA-name').innerText = match.teamAName;
        document.getElementById('teamA-flag').src = match.teamAFlag;
        
        document.getElementById('teamB-name').innerText = match.teamBName;
        document.getElementById('teamB-flag').src = match.teamBFlag;
        
        document.getElementById('prediction-text').innerText = match.prediction;

        // Data ချိန်းပြီးရင် ပြန်လင်းလာစေမည် (Fade in)
        lowerThirdBox.style.opacity = 1;
    }, 500); 
}

// ၅ စက္ကန့် တစ်ကြိမ် အထက်ပါ Function ကို Auto အလုပ်လုပ်စေမည်
setInterval(updateMatchInfo, changeInterval);

