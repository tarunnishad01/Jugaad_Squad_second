#### Please use the [reference](https://github.com/virtual-labs/ph3-exp-dev-process/blob/main/storyboard/README.org) document to fill this template. Follow the [link](https://github.com/virtual-labs/ph3-exp-dev-process/tree/main/sample/storyboard) to view a sample storyboard document. 



## Storyboard

Experiment 1: Name of the Experiment :"Detailed Analog/Digital Modulation Experiments – Advanced QPSK, M-ary PSK with BER"
### 1. Story Outline

The user approaches the simulator to understand the concepts of advanced digital modulation techniques such as QPSK and M-ary PSK, along with Bit Error Rate (BER) analysis. Through interactive modules—Demo, Practice, and Experiment—the user engages with signal waveforms, constellation diagrams, and performance under noisy channels. The simulator helps visualize key modulation properties and allows hands-on experimentation and result verification.


### 2. Story
#### 2.1 Set the Visual Stage Description:
Upon landing on the simulator page, the user sees three interactive options: Demo, Practice, and Experiment.

* Demo – A control panel displays instructions at the top. A live signal modulation animation appears below, showcasing modulated waveforms or constellation diagrams. Buttons include Start, Pause, Reset, and a Noise slider to simulate channel conditions.

* Practice – Users choose modulation schemes (e.g., BPSK, QPSK, 8-PSK). A diagram of modulated symbols is shown. Buttons include Next, Change Modulation, Reset. The user can observe changes in constellation and waveform with each action. A comments box provides real-time feedback.

* Experiment – A detailed interface allows input of custom parameters: modulation order (M), noise level (Eb/N0), and data length. Buttons include Start, Plot BER, Reset. The results are shown as constellation diagrams and BER vs Eb/N0 graphs.


#### 2.2 Set User Objectives & Goals:
| Learning Objectives                                                                                  | Cognitive Level |
| ---------------------------------------------------------------------------------------------------- | --------------- |
| Differentiate between various digital modulation schemes and their noise performance using BER plots | Analyse         |
| Apply QPSK and M-ary PSK schemes on digital data using simulator tools                               | Apply           |
| Evaluate BER performance under different channel conditions                                          | Evaluate        |

#### 2.3 Set the Pathway Activities:

a) Demo:
1. User clicks Start to visualize a basic QPSK or M-ary PSK waveform.

2. Adjust Noise slider to add Gaussian noise.

3. View the changing constellation diagram in real time.

4. Pause and Resume functionalities enable step-by-step observation.

5. Reset restores default settings.

 b) Practice:

1. User clicks Next to move through modulation types: BPSK → QPSK → 8-PSK → 16-PSK.

2. Simulator displays waveform and symbol mapping for each type.

3. Comments explain symbol spacing, phase differences, and error tolerance.

4. Reset clears selections for a fresh start.

c) Experiment:

1. User enters Modulation Order, Noise Level (Eb/N0), and Data Length.

2. Clicking Start simulates transmission and reception.

3. Plot BER button generates BER vs Eb/N0 graphs.

4. A comparison feature lets the user overlay BER curves for different schemes.

5. Reset clears the data and graphs.


##### 2.4 Set Challenges and Questions/Complexity/Variations in Questions:

Q1: Which modulation scheme has the highest bandwidth efficiency but lowest noise immunity?

A. BPSK

B. QPSK

C. 16-PSK

D. 64-PSK

Q2: For QPSK in AWGN, the BER is closest to:

A. Q(√2Eb/N0)

B. Q(√Eb/N0)

C. (1/2)exp(-Eb/N0)

D. QPSK has no BER

Q3: What happens to the constellation spacing in 16-PSK compared to QPSK?

A. Increases

B. Decreases

C. Remains same

D. Cannot be determined

Q4: Which factor most affects BER in M-ary PSK?

A. Sampling Rate

B. Phase Offset

C. Eb/N0 Ratio

D. Symbol Rate

Q5: How many bits are transmitted per symbol in 8-PSK?

A. 1

B. 2

C. 3

D. 4
##### 2.5 Allow pitfalls:
* If the user does not correctly set Eb/N0 before clicking "Plot BER", results will be skewed.

* Selecting an invalid modulation order (e.g., M not a power of 2) will trigger an error message.

* Misinterpreting constellation diagrams due to overlapping symbols at low SNR.



##### 2.6 Conclusion:
1. Immediate feedback is provided after the experiment. Upon submitting values, the simulator displays the correct BER curve and an explanation.

2. Summary of performance is shown: selected parameters, achieved BER, comparison with theoretical curves.

3. Scores can be given for correct predictions of BER or correct identification of constellation schemes.

4. Total session time including pre-test, simulation, and post-test is approximately 60 minutes.


##### 2.7 Equations/formulas: NA

### 3. Flowchart
Link to flow chart Here : Store in the  /flowchart folder within pedagogy folder in your repo
<br>
(Guide :The lab proposer should extract logic from the story, prepare a flowchart from the story narration and write the algorithm to execute the black box.  use Google Drawings https://docs.google.com/drawings/ (send the link to your flowchart and also attach .png by exporting it )

### 4. Mindmap
 Link to mindmap here : Store the mindmap in both .mm & .png extension in the  /mindmap folder and include link of only .pdf verison here
 <br>
 (Guide : An elaborate mind map (connecting all the points in the experiment flow ) should be prepared and submitted by the lab proposer. The mind map should be a clear and detailed document that takes into account all minute intri5acies involved in the development of virtual lab. The mindmap should be self-content and any developer across the globe should be able to code it with all those details. using only FreeMind http://freemind.sourceforge.net/wiki/index.php/Main_Page (send the .png file and also the original .mm extension project file. )

### 5. Storyboard

Link the storyboard (.gif file ) in here :
(Guide: This document should include sketching and description scene wise (duration, action, description). Software to be used for storyboarding : https://wonderunit.com/storyboarder/ (Its a FOSS tool).
