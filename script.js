function calculateCyclePhase() {
    const lastPeriodDate = document.getElementById('lastPeriodDate').value;
    const cycleLength = parseInt(document.getElementById('cycleLength').value);

    if (lastPeriodDate && cycleLength) {
        const lastPeriod = new Date(lastPeriodDate);
        const currentDate = new Date();
        // Calculate the number of days since the last period
        const daysSinceLastPeriod = Math.floor((currentDate - lastPeriod) / (1000 * 60 * 60 * 24));
        
        // Determine the cycle phase based on the number of days since the last period
        const cyclePosition = daysSinceLastPeriod % cycleLength;

        let phase = '';
        if (cyclePosition < 5) {
            phase = 'Menstruation Phase';
        } else if (cyclePosition < 15) {
            phase = 'Follicular Phase';
        } else if (cyclePosition < 22) {
            phase = 'Ovulation Phase';
        } else {
            phase = 'Luteal Phase';
        }

        // Display the cycle phase result
        document.getElementById('cyclePhaseResult').innerText = `You are in the ${phase}.`;

        // Display wellness tips based on cycle phase
        showWellnessTips(phase);
    } else {
        alert('Please fill in all fields!');
    }
}

// Function to show wellness tips based on cycle phase
function showWellnessTips(phase) {
    let tips = '';
    if (phase === 'Menstruation Phase') {
        tips = 'Eat iron-rich foods, stay hydrated, and get enough rest.';
    } else if (phase === 'Follicular Phase') {
        tips = 'Focus on strength training and consume protein-rich foods.';
    } else if (phase === 'Ovulation Phase') {
        tips = 'Great time for cardio and staying active, maintain a balanced diet.';
    } else if (phase === 'Luteal Phase') {
        tips = 'Practice relaxation techniques and focus on light exercises.';
    }

    const apiKey = 'AIzaSyDvptEJhlPM-I_mOGrb5Vzt1VLo4eT3-JA';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const requestData = {
        contents: [{
            parts: [{
                text: "Give a nutritional and exercise tip for a woman in " + phase + " in one sentence."
            }]
        }]
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        // Process the response data
        const content = data.candidates[0].content.parts[0].text;
        document.getElementById('wellnessTips').innerText = content;
    })
    .catch(error => {
        console.error('Error during the request:', error);
    });
}

// Function to log water intake and track progress
let totalWaterIntake = 0;
const hydrationGoal = 2000; // 2000 ml goal

function logWaterIntake() {
    const waterIntake = parseInt(document.getElementById('waterIntake').value);

    if (waterIntake) {
        totalWaterIntake += waterIntake;
        const progress = (totalWaterIntake / hydrationGoal) * 100;

        // Display hydration progress
        document.getElementById('hydrationProgress').innerText = `You've consumed ${totalWaterIntake} ml. ${progress.toFixed(2)}% of your daily goal.`;

        // Reset the input field
        document.getElementById('waterIntake').value = '';
    } else {
        alert('Please enter the amount of water you drank!');
    }
}
