// ======================================
// DECISION INTELLIGENCE CENTER
// Esteban Salinas
// app.js
// ======================================

const counters = [
    { id: "kpi1", target: 48 },
    { id: "kpi2", target: 26 },
    { id: "kpi3", target: 125 },
    { id: "kpi4", target: 310 }
];

//============================
// CONTADORES
//============================
function animateCounter(id, target, suffix = "") {

    const element = document.getElementById(id);

    if (!element) return;

    let current = 0;

    const increment = Math.max(1, Math.ceil(target / 80));

    const timer = setInterval(() => {

        current += increment;

        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        element.innerHTML = current + suffix;

    }, 20);

}

//============================
// INICIO
//============================
window.addEventListener("load", () => {

    counters.forEach(counter => {

        animateCounter(counter.id, counter.target);

    });

    animateCounter("services", 1875);

    animateCounter("conversion", 87, "%");

    drawChart();

    initializePrediction();

    const button = document.getElementById("explorar");

    if (button) {

        button.addEventListener("click", () => {

            document
                .getElementById("dashboard")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });

    }

});

//============================
// MODELO PREDICTIVO
//============================
function initializePrediction() {

    const sliders = [

        document.getElementById("demand"),
        document.getElementById("team"),
        document.getElementById("budget")

    ];

    sliders.forEach(slider => {

        if (slider) {

            slider.value = 50;

            slider.addEventListener("input", updatePrediction);

        }

    });

    updatePrediction();

}

function updatePrediction() {

    const demand = Number(document.getElementById("demand").value);

    const team = Number(document.getElementById("team").value);

    const budget = Number(document.getElementById("budget").value);

    const probability = Math.round(

        demand * 0.40 +
        team * 0.30 +
        budget * 0.30

    );

    document.getElementById("predictionValue").innerHTML =
        probability + "%";

}

//============================
// DASHBOARD
//============================
function drawChart() {

    const canvas = document.getElementById("trendChart");

    if (!canvas) return;

    canvas.width = 800;

    canvas.height = 320;

    const ctx = canvas.getContext("2d");

    const values = [

        120,
        150,
        180,
        210,
        190,
        250,
        280,
        320,
        340,
        360,
        410,
        470

    ];

    ctx.clearRect(

        0,
        0,
        canvas.width,
        canvas.height

    );

    // Líneas horizontales

    ctx.strokeStyle = "rgba(255,255,255,.12)";

    ctx.lineWidth = 1;

    for (let i = 0; i < 6; i++) {

        ctx.beginPath();

        ctx.moveTo(40, 40 + i * 45);

        ctx.lineTo(760, 40 + i * 45);

        ctx.stroke();

    }

    // Curva

    ctx.strokeStyle = "#3bc9ff";

    ctx.lineWidth = 4;

    ctx.beginPath();

    values.forEach((value, index) => {

        const x = 50 + index * 60;

        const y = 280 - value / 2;

        if (index === 0)

            ctx.moveTo(x, y);

        else

            ctx.lineTo(x, y);

    });

    ctx.stroke();

    // Puntos

    ctx.fillStyle = "#3bc9ff";

    values.forEach((value, index) => {

        const x = 50 + index * 60;

        const y = 280 - value / 2;

        ctx.beginPath();

        ctx.arc(

            x,
            y,
            5,
            0,
            Math.PI * 2

        );

        ctx.fill();

    });

    ctx.fillStyle = "#ffffff";

    ctx.font = "14px Segoe UI";

    ctx.fillText(

        "Indicadores Estratégicos",

        40,

        22

    );

}

//============================
// SIMULACIÓN EN TIEMPO REAL
//============================
setInterval(() => {

    const services = document.getElementById("services");

    if (!services) return;

    let value = parseInt(services.innerHTML);

    if (isNaN(value)) {

        value = 1800;

    }

    value += Math.floor(Math.random() * 5);

    services.innerHTML = value;

}, 2500);
