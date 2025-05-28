//Your JavaScript goes in here

// Utility function: Generate random bits (0 or 1)
function generateRandomBits(length) {
    const bits = new Uint8Array(length);
    for (let i = 0; i < length; i++) bits[i] = Math.random() > 0.5 ? 1 : 0;
    return bits;
}

// Add AWGN noise to signal - signal is array of complex {re, im}, noisePower is variance
function addAWGN(signal, noisePower) {
    function gaussianNoise(sigma) {
        let u1 = Math.random();
        let u2 = Math.random();
        let z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        return z0 * sigma;
    }
    const noisySignal = signal.map(({ re, im }) => ({
        re: re + gaussianNoise(Math.sqrt(noisePower / 2)),
        im: im + gaussianNoise(Math.sqrt(noisePower / 2))
    }));
    return noisySignal;
}

// QPSK modulation: Map bits to constellation points
// Input bits length must be multiple of 2 since QPSK maps 2 bits per symbol
function qpskModulate(bits) {
    const symbols = [];
    for (let i = 0; i < bits.length; i += 2) {
        const b1 = bits[i];
        const b2 = bits[i + 1];
        // Gray coded QPSK mapping:
        // 00 -> (1/sqrt2, 1/sqrt2)
        // 01 -> (-1/sqrt2, 1/sqrt2)
        // 11 -> (-1/sqrt2, -1/sqrt2)
        // 10 -> (1/sqrt2, -1/sqrt2)
        let point;
        if (b1 === 0 && b2 === 0) point = { re: 1 / Math.SQRT2, im: 1 / Math.SQRT2 };
        else if (b1 === 0 && b2 === 1) point = { re: -1 / Math.SQRT2, im: 1 / Math.SQRT2 };
        else if (b1 === 1 && b2 === 1) point = { re: -1 / Math.SQRT2, im: -1 / Math.SQRT2 };
        else /*10*/ point = { re: 1 / Math.SQRT2, im: -1 / Math.SQRT2 };
        symbols.push(point);
    }
    return symbols;
}

// QPSK demodulation: map received symbols to bits by closest constellation point
function qpskDemodulate(symbols) {
    const bits = [];
    symbols.forEach(({ re, im }) => {
        // Distances to each QPSK point
        const points = [
            { bits: [0, 0], re: 1 / Math.SQRT2, im: 1 / Math.SQRT2 },
            { bits: [0, 1], re: -1 / Math.SQRT2, im: 1 / Math.SQRT2 },
            { bits: [1, 1], re: -1 / Math.SQRT2, im: -1 / Math.SQRT2 },
            { bits: [1, 0], re: 1 / Math.SQRT2, im: -1 / Math.SQRT2 }
        ];
        let minDist = Infinity;
        let closestBits = [0, 0];
        points.forEach(p => {
            const dist = (re - p.re) ** 2 + (im - p.im) ** 2;
            if (dist < minDist) {
                minDist = dist;
                closestBits = p.bits;
            }
        });
        bits.push(...closestBits);
    });
    return bits;
}

// Compute Bit Error Rate between original bits and demodulated bits
function computeBER(originalBits, demodBits) {
    if (originalBits.length !== demodBits.length) return 1;
    let errorCount = 0;
    for (let i = 0; i < originalBits.length; i++)
        if (originalBits[i] !== demodBits[i]) errorCount++;
    return errorCount / originalBits.length;
}

// Plot constellation diagram on canvas
function plotConstellation(canvas, points, title) {
    const ctx = canvas.getContext('2d');
    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw axes
    const w = canvas.width;
    const h = canvas.height;
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, h);
    ctx.moveTo(0, h / 2);
    ctx.lineTo(w, h / 2);
    ctx.stroke();

    // Draw points
    // Scale factor for constellation points
    const scale = Math.min(w, h) / 3;
    ctx.fillStyle = '#bb86fc';
    points.forEach(({ re, im }) => {
        let x = w / 2 + re * scale;
        let y = h / 2 - im * scale;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.strokeStyle = '#ddd';
        ctx.stroke();
    });

    // Label axes
    ctx.fillStyle = '#bbb';
    ctx.font = '14px monospace';
    ctx.fillText('I', w - 20, h / 2 - 10);
    ctx.fillText('Q', w / 2 + 10, 20);
    // Title
    ctx.fillStyle = '#bb86fc';
    ctx.font = '16px monospace bold';
    ctx.fillText(title, 10, 20);
}

// Run QPSK simulation: generate bits, modulate, add noise, demodulate, compute BER
async function runQPSKSimulation(snrDb, numSymbols) {
    // Validate inputs
    snrDb = Number(snrDb);
    numSymbols = Number(numSymbols);
    if (numSymbols % 2 !== 0) numSymbols += 1; // make even for QPSK 2 bits/symbol

    // Generate random bits
    const bits = generateRandomBits(numSymbols);

    // Modulate
    const symbols = qpskModulate(bits);

    // Calculate noise power from SNR (SNR = signal power / noise power)
    // Signal power for QPSK unit-energy constellation approx = 1
    let snrLinear = Math.pow(10, snrDb / 10);
    const noisePower = 1 / snrLinear;

    // Add noise
    const noisySymbols = addAWGN(symbols, noisePower);

    // Demodulate noisy symbols
    const demodBits = qpskDemodulate(noisySymbols);

    // Compute BER
    const ber = computeBER(bits, demodBits);

    // Plot constellation (received noisy)
    plotConstellation(document.getElementById('qpsk-constellation'), noisySymbols, 'QPSK Constellation');

    // BER calculation over SNR range for graph
    await plotBERRange('qpsk-ber', 'QPSK', numSymbols);

    return ber;
}

// M-ary PSK Modulation and Demodulation helper functions
function mpskModulate(bits, M) {
    const k = Math.log2(M);
    if (!Number.isInteger(k)) throw new Error('M must be power of 2.');
    const symbols = [];
    for (let i = 0; i < bits.length; i += k) {
        let symbolIndex = 0;
        for (let bit = 0; bit < k; bit++) {
            symbolIndex = (symbolIndex << 1) | bits[i + bit];
        }
        const angle = 2 * Math.PI * symbolIndex / M;
        symbols.push({ re: Math.cos(angle), im: Math.sin(angle) });
    }
    return symbols;
}

function mpskDemodulate(symbols, M) {
    const k = Math.log2(M);
    const bits = [];
    symbols.forEach(({ re, im }) => {
        let minDist = Infinity;
        let bestIndex = 0;
        for (let idx = 0; idx < M; idx++) {
            const angle = 2 * Math.PI * idx / M;
            const reIdeal = Math.cos(angle);
            const imIdeal = Math.sin(angle);
            const dist = (re - reIdeal) ** 2 + (im - imIdeal) ** 2;
            if (dist < minDist) {
                minDist = dist;
                bestIndex = idx;
            }
        }
        // Convert index to bits k-bit array
        for (let bit = k - 1; bit >= 0; bit--) {
            bits.push((bestIndex >> bit) & 1);
        }
    });
    return bits;
}

// Plot BER curve over range of SNR values on canvas with label
async function plotBERRange(canvasID, label, numSymbols) {
    const ctx = document.getElementById(canvasID).getContext('2d');
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.clearRect(0, 0, w, h);
    // axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // x-axis
    ctx.moveTo(50, h - 40);
    ctx.lineTo(w - 20, h - 40);
    // y-axis
    ctx.moveTo(50, 20);
    ctx.lineTo(50, h - 40);
    ctx.stroke();
    // axis labels
    ctx.fillStyle = '#bbb';
    ctx.font = '14px monospace';
    ctx.fillText('SNR (dB)', w / 2, h - 10);
    ctx.fillText('BER', 10, 30);

    // Simulate BER values for QPSK or M-ary PSK for SNR range 0 to 20 dB
    const snrRange = [];
    for (let snr = 0; snr <= 20; snr += 2) snrRange.push(snr);

    // Run BER simulation for each SNR value - approximate by Monte Carlo method
    const berValues = [];
    for (let snr of snrRange) {
        const bitsCount = numSymbols;
        // Generate bits
        const bits = generateRandomBits(bitsCount);
        let symbols, noisySymbols, demodBits, noisePower;
        if (label === 'QPSK') {
            if (bitsCount % 2 !== 0) bits.push(0);

            symbols = qpskModulate(bits);
            const snrLinear = Math.pow(10, snr / 10);
            noisePower = 1 / snrLinear;
            noisySymbols = addAWGN(symbols, noisePower);
            demodBits = qpskDemodulate(noisySymbols);
        } else if (label === 'M-ary PSK') {
            // This function is generic so no action here
            break;
        } else if (label.startsWith('MPSK-')) {
            const M = Number(label.split('-')[1]);
            const k = Math.log2(M);
            if (bitsCount % k !== 0) {
                while (bits.length % k !== 0) bits.push(0);
            }
            symbols = mpskModulate(bits, M);
            const snrLinear = Math.pow(10, snr / 10);
            noisePower = 1 / snrLinear;
            noisySymbols = addAWGN(symbols, noisePower);
            demodBits = mpskDemodulate(noisySymbols, M);
        }
        const ber = computeBER(bits, demodBits);
        berValues.push(ber);
        // Give UI time to update
        await new Promise(r => setTimeout(r, 5));
    }

    // If label is M-ary PSK run general MPSK simulation with current selected M
    if (label === 'M-ary PSK') return; // Skip since it will be handled by MPSK simulation below

    // Plot curve - log scale on y-axis
    ctx.strokeStyle = '#bb86fc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < snrRange.length; i++) {
        const x = 50 + ((w - 70) / 20) * snrRange[i];
        // use log scale for y on BER
        const logBer = berValues[i] > 0 ? Math.log10(berValues[i]) : -6;
        // y in [20..h-40] mapped in log scale from -6 to 0
        const y = Math.min(h - 40, Math.max(20, h - 40 - ((logBer + 6) / 6) * (h - 60)));
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Mini ticks and labels for y-axis (BER)
    ctx.fillStyle = '#bbb';
    ctx.font = '12px monospace';
    const ticks = [-6, -5, -4, -3, -2, -1, 0];
    for (let t of ticks) {
        let y = h - 40 - ((t + 6) / 6) * (h - 60);
        ctx.beginPath();
        ctx.moveTo(45, y);
        ctx.lineTo(50, y);
        ctx.stroke();
        ctx.fillText(`1e${t}`, 5, y + 4);
    }
    // Mini ticks for x-axis (SNR)
    for (let snr of snrRange) {
        let x = 50 + ((w - 70) / 20) * snr;
        ctx.beginPath();
        ctx.moveTo(x, h - 40);
        ctx.lineTo(x, h - 35);
        ctx.stroke();
        ctx.fillText(snr.toString(), x - 8, h - 20);
    }
}

// Run M-ary PSK simulation
async function runMPSKSimulation(M, snrDb, numSymbols) {
    const k = Math.log2(M);
    if (!Number.isInteger(k)) throw new Error('M must be power of 2.');
    snrDb = Number(snrDb);
    numSymbols = Number(numSymbols);
    // Make bits length multiple of k
    if (numSymbols % k !== 0) {
        numSymbols += k - (numSymbols % k);
    }
    // Generate bits
    const bits = generateRandomBits(numSymbols);
    // Modulate
    const symbols = mpskModulate(bits, M);

    // Noise power from SNR
    let snrLinear = Math.pow(10, snrDb / 10);
    const noisePower = 1 / snrLinear;

    // Add noise
    const noisySymbols = addAWGN(symbols, noisePower);

    // Demodulate noisy symbols
    const demodBits = mpskDemodulate(noisySymbols, M);

    // Compute BER
    const ber = computeBER(bits, demodBits);

    // Plot constellation
    plotConstellation(document.getElementById('mpsk-constellation'), noisySymbols, `${M}-PSK Constellation`);

    // Plot BER curve for M-ary PSK with the current M
    await plotBERRangeMPSK('mpsk-ber', M, numSymbols);

    return ber;
}

// Plot BER curve for M-ary PSK for range of SNR
async function plotBERRangeMPSK(canvasID, M, numSymbols) {
    const ctx = document.getElementById(canvasID).getContext('2d');
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;
    ctx.clearRect(0, 0, w, h);
    // axes
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1;
    ctx.beginPath();
    // x-axis
    ctx.moveTo(50, h - 40);
    ctx.lineTo(w - 20, h - 40);
    // y-axis
    ctx.moveTo(50, 20);
    ctx.lineTo(50, h - 40);
    ctx.stroke();
    // axis labels
    ctx.fillStyle = '#bbb';
    ctx.font = '14px monospace';
    ctx.fillText('SNR (dB)', w / 2, h - 10);
    ctx.fillText('BER', 10, 30);

    // Simulate BER values for M-ary PSK over SNR 0 to 20dB
    const snrRange = [];
    for (let snr = 0; snr <= 20; snr += 2) snrRange.push(snr);
    const berValues = [];

    for (let snr of snrRange) {
        // Generate bits
        const bitsCount = numSymbols;
        const k = Math.log2(M);
        const bits = generateRandomBits(bitsCount);
        if (bitsCount % k !== 0) {
            while (bits.length % k !== 0) bits.push(0);
        }
        const symbols = mpskModulate(bits, M);
        const snrLinear = Math.pow(10, snr / 10);
        const noisePower = 1 / snrLinear;
        const noisySymbols = addAWGN(symbols, noisePower);
        const demodBits = mpskDemodulate(noisySymbols, M);
        const ber = computeBER(bits, demodBits);
        berValues.push(ber);
        await new Promise(r => setTimeout(r, 5));
    }

    // Plot curve
    ctx.strokeStyle = '#bb86fc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < snrRange.length; i++) {
        const x = 50 + ((w - 70) / 20) * snrRange[i];
        const logBer = berValues[i] > 0 ? Math.log10(berValues[i]) : -6;
        const y = Math.min(h - 40, Math.max(20, h - 40 - ((logBer + 6) / 6) * (h - 60)));
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Mini ticks and labels for y-axis (BER)
    ctx.fillStyle = '#bbb';
    ctx.font = '12px monospace';
    const ticks = [-6, -5, -4, -3, -2, -1, 0];
    for (let t of ticks) {
        let y = h - 40 - ((t + 6) / 6) * (h - 60);
        ctx.beginPath();
        ctx.moveTo(45, y);
        ctx.lineTo(50, y);
        ctx.stroke();
        ctx.fillText(`1e${t}`, 5, y + 4);
    }
    // Mini ticks for x-axis (SNR)
    for (let snr of snrRange) {
        let x = 50 + ((w - 70) / 20) * snr;
        ctx.beginPath();
        ctx.moveTo(x, h - 40);
        ctx.lineTo(x, h - 35);
        ctx.stroke();
        ctx.fillText(snr.toString(), x - 8, h - 20);
    }
}

// Event handlers
document.getElementById('qpsk-run').addEventListener('click', async () => {
    const snr = document.getElementById('qpsk-snr').value;
    const numSymbols = document.getElementById('qpsk-num-symbols').value;
    const errorDiv = document.getElementById('qpsk-error');
    errorDiv.style.display = 'none';
    try {
        await runQPSKSimulation(snr, numSymbols);
    } catch (e) {
        errorDiv.textContent = 'Error: ' + e.message;
        errorDiv.style.display = 'block';
    }
});

document.getElementById('mpsk-run').addEventListener('click', async () => {
    const M = Number(document.getElementById('mpsk-m').value);
    const snr = document.getElementById('mpsk-snr').value;
    const numSymbols = document.getElementById('mpsk-num-symbols').value;
    const errorDiv = document.getElementById('mpsk-error');
    errorDiv.style.display = 'none';
    try {
        await runMPSKSimulation(M, snr, numSymbols);
    } catch (e) {
        errorDiv.textContent = 'Error: ' + e.message;
        errorDiv.style.display = 'block';
    }
});

// Run default simulations on page load
window.addEventListener('load', () => {
    document.getElementById('qpsk-run').click();
    document.getElementById('mpsk-run').click();
});
