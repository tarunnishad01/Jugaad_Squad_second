### Proceducer: Advanced QPSK and M-ary PSK Modulation with BER Analysis
Step 1:
Define Parameters.
* Start by defining the basic parameters for the simulation:
* Type of modulation: QPSK, 8-PSK, 16-PSK, etc.
* Number of bits to transmit (e.g., 10⁵ to 10⁶ bits)
SNR range: typically 0 dB to 20 dB.
* Sampling rate and carrier frequency (if applicable)
* Channel type: AWGN (initially), later test Rayleigh or Rician

Step 2:
Generate Random Bit Stream:
* Generate a binary bit stream (0s and 1s) of desired length using a random generator.

Step 3:
Symbol Mapping (Modulation):
* Group bits into symbols based on the modulation order (M = 4 for QPSK, 8 for 8-PSK, etc.)
* Map bit groups to constellation points using Gray coding or another mapping scheme
  Normalize the signal power if needed.

Example:
* QPSK: 2 bits per symbol → 00, 01, 10, 11
* 8-PSK: 3 bits per symbol → 000 to 111

Step 4:
Modulate the Signal:
Use mathematical equations or in-built functions to modulate the signal:

For M-PSK:

*  𝑠(𝑡)=𝐴⋅cos⁡(2𝜋𝑓𝑐𝑡+𝜃)s(t)=A⋅cos(2πf c​ t+θ)
  where θ is the phase based on bit group.
* For simulation, use complex exponential representation:
* 𝑠𝑘=exp⁡(𝑗⋅2𝜋⋅𝑘/𝑀)s k​ =exp(j⋅2π⋅k/M)

Step 5: 
Transmit Through Channel:
*  Add AWGN to the modulated signal using SNR levels.
matlab code:
 * Edit rx = awgn(tx, SNR_dB, 'measured');
 * Optionally, simulate fading effects (Rayleigh or Rician channels).

Step 6:
Receiver Demodulation:
* Demodulate the received signal:
* Use nearest-neighbor decision rule (Euclidean distance from constellation points)
  Map the received symbols back to binary bits.

Step 7:
BER Calculation:
 * Compare the transmitted and received bits.
*  BER= Number of Error Bits/Total Transmitted Bits

​Step 8: 
Repeat Over SNR Range:

* Repeat steps 5–7 for multiple SNR values (e.g., 0 to 20 dB in 2 dB steps).
* Store BER values for each SNR point.

Step 9: 
Plot Results:

* Plot BER vs. SNR curve for each modulation scheme on a semi-log scale.
  matlab   code is:
* semilogy(SNR_dB, BER);
* xlabel('SNR (dB)');
* ylabel('Bit Error Rate (BER)');
* title('BER vs. SNR for QPSK and M-PSK');
* legend('QPSK', '8-PSK', '16-PSK');

Step 10:

Analysis:

* Observe and analyze how increasing M (modulation order) affects BER.
* Discuss trade-offs:
* Higher M = more bandwidth efficiency but more susceptible to noise.
* QPSK has lower BER than 16-PSK at low SNRs.






