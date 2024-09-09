let ciphertext = [];

class EllipticCurve {
    constructor(a, b, p) {
        this.a = a;
        this.b = b;
        this.p = p;
    }

    isOnCurve(x, y) {
        if (x === null || y === null) return false;
        return (y ** 2) % this.p === (x ** 3 + this.a * x + this.b) % this.p;
    }

    pointAddition(P, Q) {
        if (!P || !Q) return [null, null];
        if (P[0] === null) return Q;
        if (Q[0] === null) return P;

        const [x1, y1] = P;
        const [x2, y2] = Q;

        if (x1 === x2 && y1 !== y2) return [null, null];

        let m;
        if (x1 === x2 && y1 === y2) {
            if (y1 === 0) return [null, null];
            m = ((3 * x1 ** 2 + this.a) * this.modInverse(2 * y1, this.p)) % this.p;
        } else {
            m = ((y2 - y1) * this.modInverse(x2 - x1, this.p)) % this.p;
        }

        if (m < 0) m += this.p;

        const x3 = (m ** 2 - x1 - x2 + this.p) % this.p;
        const y3 = (m * (x1 - x3) - y1 + this.p) % this.p;

        return [(x3 + this.p) % this.p, (y3 + this.p) % this.p];
    }

    scalarMultiplication(k, P) {
        let result = [null, null];
        let addend = P;

        while (k > 0) {
            if (k & 1) {
                result = this.pointAddition(result, addend);
            }
            addend = this.pointAddition(addend, addend);
            k >>= 1;
        }

        return result;
    }

    modInverse(a, p) {
        let m0 = p;
        let y = 0, x = 1;

        if (p === 1) return 0;

        while (a > 1) {
            const q = Math.floor(a / p);
            let t = p;

            p = a % p;
            a = t;
            t = y;

            y = x - q * y;
            x = t;
        }

        if (x < 0) x += m0;

        return x;
    }
}

// Definir parámetros de la curva elíptica
const a = 2;
const b = 3;
const p = 97;
const curve = new EllipticCurve(a, b, p);
const G = [3, 6];

// Llaves privadas y públicas para pruebas
const private_key_A = 45;
const public_key_A = curve.scalarMultiplication(private_key_A, G);

// Mapeo de caracteres ASCII a puntos en la curva elíptica
const asciiToPoint = new Map();
const pointToAscii = new Map();

// Asignar caracteres ASCII a puntos válidos
let asciiCode = 32;
let x = 1;
while (asciiCode <= 126) {
    for (let y = 0; y < p; y++) {
        if (curve.isOnCurve(x, y)) {
            const point = [x, y];
            asciiToPoint.set(String.fromCharCode(asciiCode), point);
            pointToAscii.set(point.toString(), String.fromCharCode(asciiCode));
            asciiCode++;
            if (asciiCode > 126) break;
        }
    }
    x++;
}

// Convertir texto a puntos en la curva elíptica
function textToPoints(text) {
    return Array.from(text).map(char => {
        const point = asciiToPoint.get(char);
        if (!point) {
            console.error(`No se encontró un punto válido para el carácter: ${char}`);
        }
        return point || [null, null];
    });
}

// Convertir puntos a texto utilizando el mapeo
function pointsToText(points) {
    return points.map(point => {
        if (!point || point[0] === null) return '?';
        return pointToAscii.get(point.toString()) || '?';
    }).join('');
}

// Funciones de cifrado y descifrado
function encrypt(curve, public_key, plaintext_points) {
    return plaintext_points.map(point => {
        if (!point || point[0] === null) return [[null, null], [null, null]];
        const k = Math.floor(Math.random() * (curve.p - 1)) + 1;
        const C1 = curve.scalarMultiplication(k, G);
        const C2 = curve.pointAddition(point, curve.scalarMultiplication(k, public_key));
        return [C1, C2];
    });
}

function decrypt(curve, private_key, ciphertext) {
    return ciphertext.map(([C1, C2]) => {
        if (!C1 || !C2 || C1[0] === null || C2[0] === null) return [null, null];
        const S = curve.scalarMultiplication(private_key, C1);
        const S_neg = [S[0], (-S[1] + curve.p) % curve.p];
        return curve.pointAddition(C2, S_neg);
    });
}

// Gráfica de la curva elíptica completa y los puntos de cifrado
let chart;

function plotEllipticCurve(points) {
    const ctx = document.getElementById('curve-chart').getContext('2d');
    if (chart) chart.destroy();

    // Generar todos los puntos de la curva elíptica
    const curvePoints = [];
    for (let x = 0; x < p; x++) {
        for (let y = 0; y < p; y++) {
            if (curve.isOnCurve(x, y)) {
                curvePoints.push({ x, y });
            }
        }
    }

    chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                label: 'Curva Elíptica',
                data: curvePoints,
                pointRadius: 3,
                backgroundColor: 'rgba(0, 123, 255, 0.3)',
                showLine: false
            }, {
                label: 'Puntos de Cifrado',
                data: points.map(point => ({ x: point[0], y: point[1] })),
                pointRadius: 5,
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                showLine: false
            }]
        },
        options: {
            scales: {
                x: { title: { display: true, text: 'X' }, min: 0, max: p },
                y: { title: { display: true, text: 'Y' }, min: 0, max: p }
            }
        }
    });
}

// Funciones para cambiar entre las pestañas de cifrado y descifrado
document.getElementById('encrypt-tab').addEventListener('click', () => {
    document.getElementById('encrypt-section').classList.remove('hidden');
    document.getElementById('decrypt-section').classList.add('hidden');
    document.getElementById('encrypt-tab').classList.add('active');
    document.getElementById('decrypt-tab').classList.remove('active');
});

document.getElementById('decrypt-tab').addEventListener('click', () => {
    document.getElementById('decrypt-section').classList.remove('hidden');
    document.getElementById('encrypt-section').classList.add('hidden');
    document.getElementById('decrypt-tab').classList.add('active');
    document.getElementById('encrypt-tab').classList.remove('active');
});

// Cifrado
document.getElementById('encrypt-button').addEventListener('click', () => {
    const plaintext = document.getElementById('plaintext').value;
    const message_points = textToPoints(plaintext);

    if (!message_points || message_points.includes(undefined)) {
        alert("No se pudo convertir el texto a puntos válidos.");
        return;
    }

    ciphertext = encrypt(curve, public_key_A, message_points);
    document.getElementById('ciphertext').innerText = `Texto cifrado: ${JSON.stringify(ciphertext)}`;

    const encrypted_points = ciphertext.flatMap(([C1, C2]) => [C1, C2]).filter(Boolean);
    plotEllipticCurve(encrypted_points);
});

// Descifrado
document.getElementById('decrypt-button').addEventListener('click', () => {
    const private_key = parseInt(document.getElementById('private-key').value);

    if (!ciphertext.length) {
        alert("Primero debes cifrar un mensaje.");
        return;
    }

    const decrypted_points = decrypt(curve, private_key, ciphertext);
    const decrypted_message = pointsToText(decrypted_points);
    document.getElementById('decrypted-message').innerText = `Mensaje descifrado: ${decrypted_message}`;

    plotEllipticCurve(decrypted_points.filter(Boolean));
});
