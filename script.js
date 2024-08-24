class EllipticCurve {
    constructor(a, b, p) {
        this.a = a;
        this.b = b;
        this.p = p;
    }

    isOnCurve(x, y) {
        if (x === null || y === null) return false; // Check for null points
        return (y ** 2) % this.p === (x ** 3 + this.a * x + this.b) % this.p;
    }

    pointAddition(P, Q) {
        if (!P || !Q) return [null, null];  // Handle null points
        if (P[0] === null) return Q;        // P is the point at infinity
        if (Q[0] === null) return P;        // Q is the point at infinity

        const [x1, y1] = P;
        const [x2, y2] = Q;

        if (x1 === x2 && y1 !== y2) return [null, null]; // Point at infinity

        let m;
        if (x1 === x2 && y1 === y2) {
            if (y1 === 0) return [null, null];  // Tangent is vertical
            m = ((3 * x1 ** 2 + this.a) * this.modInverse(2 * y1, this.p)) % this.p;
        } else {
            m = ((y2 - y1) * this.modInverse(x2 - x1, this.p)) % this.p;
        }

        if (m < 0) m += this.p;  // Ensure m is positive

        const x3 = (m ** 2 - x1 - x2) % this.p;
        const y3 = (m * (x1 - x3) - y1) % this.p;

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

// Define elliptic curve parameters
const a = 2;
const b = 3;
const p = 97;
const curve = new EllipticCurve(a, b, p);
const G = [3, 6];  // Generator point

// Define private and public keys for testing
const private_key_A = 45;
const public_key_A = curve.scalarMultiplication(private_key_A, G);

console.log(`Private key used for encryption and decryption: ${private_key_A}`);

// ASCII to elliptic curve point mapping
const asciiToPoint = new Map();
const pointToAscii = new Map();

// Map printable ASCII characters to elliptic curve points
let asciiCode = 32; // Starting with the first printable character
let x = 1;
while (asciiCode <= 126) {
    for (let y = 0; y < p; y++) {
        if (curve.isOnCurve(x, y)) {
            const point = [x, y];
            asciiToPoint.set(String.fromCharCode(asciiCode), point);
            pointToAscii.set(point.toString(), String.fromCharCode(asciiCode));
            asciiCode++;
            if (asciiCode > 126) break; // Exit if we reach the last printable character
        }
    }
    x++;
}

// Verify if all printable ASCII characters have been mapped
if (asciiToPoint.size < (126 - 32 + 1)) {
    console.error("Not all printable ASCII characters have an assigned point.");
} else {
    console.log("All printable ASCII characters are mapped to points on the curve.");
}

console.log("ASCII to Points Mapping:", asciiToPoint);

// Encryption and decryption functions
function textToPoints(text) {
    return Array.from(text).map(char => {
        const point = asciiToPoint.get(char);
        if (!point) {
            console.error(`No valid point found for character: ${char}`);
        }
        return point;
    });
}

function pointsToText(points) {
    return points.map(point => {
        if (!point || point[0] === null) {
            return '?';
        }
        const asciiChar = pointToAscii.get(point.toString());
        if (!asciiChar) {
            console.warn(`No ASCII character found for point: ${point}`);
            return '?';
        }
        return asciiChar;
    }).join('');
}

// Encrypt and decrypt functions
function encrypt(curve, public_key, plaintext_points) {
    return plaintext_points.map(point => {
        if (!point) return [null, null]; // Handle invalid points
        const k = Math.floor(Math.random() * (curve.p - 1)) + 1;
        const C1 = curve.scalarMultiplication(k, G);
        const C2 = curve.pointAddition(point, curve.scalarMultiplication(k, public_key));

        // Validate if C1 and C2 are on the curve
        if (!curve.isOnCurve(C1[0], C1[1]) || !curve.isOnCurve(C2[0], C2[1])) {
            console.warn(`Invalid encrypted point: C1=${C1}, C2=${C2}`);
            return [null, null, k];
        }

        return [C1, C2, k];
    });
}

function decrypt(curve, private_key, ciphertext) {
    return ciphertext.map(([C1, C2, k]) => {
        if (!C1 || !C2 || C1[0] === null || C2[0] === null) {
            return [null, null]; 
        }
        const S = curve.scalarMultiplication(private_key, C1);
        const S_neg = [S[0], (-S[1] + curve.p) % curve.p];
        const decryptedPoint = curve.pointAddition(C2, S_neg);
        
        // Validate if the decrypted point is in the mapping
        const pointString = decryptedPoint ? decryptedPoint.toString() : null;
        if (!pointToAscii.has(pointString)) {
            console.warn(`Decrypted point not found in reverse mapping: ${decryptedPoint}`);
            return [null, null];
        }
        
        return decryptedPoint ? [(decryptedPoint[0] + curve.p) % curve.p, (decryptedPoint[1] + curve.p) % curve.p] : [null, null]; 
    });
}

// Button interactions for encryption and decryption
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

// Button functionality for encryption
document.getElementById('encrypt-button').addEventListener('click', () => {
    const plaintext = document.getElementById('plaintext').value;
    const message_points = textToPoints(plaintext);

    if (!message_points || message_points.includes(undefined)) {
        alert("Could not convert text to valid points.");
        return;
    }

    ciphertext = encrypt(curve, public_key_A, message_points);
    document.getElementById('ciphertext').innerText = `Encrypted text: ${JSON.stringify(ciphertext)}`;
    console.log(`Encrypted text: ${JSON.stringify(ciphertext)}`);
});

// Button functionality for decryption
document.getElementById('decrypt-button').addEventListener('click', () => {
    const private_key = parseInt(document.getElementById('private-key').value);
    
    if (!ciphertext) {
        alert("Please encrypt a message first.");
        return;
    }

    const decrypted_points = decrypt(curve, private_key, ciphertext);
    console.log(`Decrypted points: ${JSON.stringify(decrypted_points)}`);
    const decrypted_message = pointsToText(decrypted_points);
    document.getElementById('decrypted-message').innerText = `Decrypted message: ${decrypted_message}`;
    console.log(`Decrypted message: ${decrypted_message}`);
});
