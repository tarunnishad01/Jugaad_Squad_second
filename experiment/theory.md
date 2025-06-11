### Link your theory in here:
📘 Introduction
In modern communication systems, modulation is a key process that allows the transmission of signals over various media. As demand for higher data rates and bandwidth efficiency grows, advanced digital modulation techniques like Quadrature Phase Shift Keying (QPSK) and M-ary Phase Shift Keying (M-PSK) have become standard.

This experiment focuses on understanding and simulating advanced modulation techniques and analyzing their performance using Bit Error Rate (BER) as a quality metric. You will learn how signal constellations change with modulation order and how noise affects error probability in real-world scenarios.

🎯 Objectives
Understand the principle of QPSK and M-ary PSK (e.g., 8-PSK, 16-PSK) modulation techniques.

Simulate digital modulation and demodulation processes.

Analyze Bit Error Rate (BER) performance under varying Signal-to-Noise Ratios (SNR).

Compare performance of different modulation schemes.

🧠 Key Concepts
1. Phase Shift Keying (PSK)
Phase Shift Keying is a digital modulation technique in which the phase of the carrier signal is varied to represent digital data.

In Binary PSK (BPSK), the carrier has two phase states: 0° and 180°, representing bits 0 and 1.

In QPSK, two bits are represented by each symbol using four different phase shifts: 0°, 90°, 180°, and 270°.

In M-ary PSK, each symbol represents log₂(M) bits by dividing the 360° phase space into M parts.

2. QPSK (Quadrature Phase Shift Keying)
QPSK modulates two bits per symbol.

The signal constellation has four points spaced 90° apart.

Offers higher bandwidth efficiency than BPSK.

Requires accurate phase synchronization at the receiver.

3. M-ary PSK (e.g., 8-PSK, 16-PSK)
M-PSK generalizes PSK to M different phase values.

For instance, 8-PSK represents 3 bits per symbol with 8 different phases.

Higher-order M-PSK allows more bits per symbol but becomes more susceptible to noise due to closely spaced phase points.

4. Bit Error Rate (BER)
BER is a key metric that measures the number of bit errors divided by the total number of bits transmitted.

It evaluates the reliability of a modulation scheme in the presence of noise (usually modeled as AWGN – Additive White Gaussian Noise).

BER depends on:

Type of modulation.

SNR (Signal-to-Noise Ratio).

Symbol detection technique.

🔍 Signal Constellation
A constellation diagram visually represents symbol positions in the I-Q (In-phase and Quadrature) plane. For example:

QPSK has 4 symbols placed at equal 90° spacing.

8-PSK has 8 symbols, each separated by 45°.

16-PSK packs even more symbols into the same phase space, increasing efficiency but reducing noise tolerance.

📈 BER vs SNR
As SNR increases, the noise power decreases, making symbols easier to distinguish and thus reducing BER.

QPSK generally has better BER performance than higher-order PSKs (like 8-PSK, 16-PSK) for the same SNR.

Higher-order modulations need higher SNR to achieve the same BER.

🧪 What You Will Simulate
Modulation of digital data using QPSK and M-ary PSK techniques.

Transmission of modulated signals over a noisy channel (AWGN).

Demodulation and bit-by-bit comparison with original data to calculate BER.

Plotting BER vs SNR curve for different modulation schemes.

📝 Applications
Wireless Communication (Wi-Fi, 5G)

Satellite Transmission

Software-defined Radio

Optical Communications

📘 Conclusion
Advanced modulation techniques like QPSK and M-ary PSK provide enhanced spectral efficiency but come with a trade-off between data rate and error resilience. Through BER analysis, engineers can optimize the modulation scheme for specific environments (e.g., noisy channels, bandwidth-limited systems), making this experiment critical in digital communication system design and evaluation.










