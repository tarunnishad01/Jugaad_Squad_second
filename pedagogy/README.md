#### Please use the [reference](https://github.com/virtual-labs/ph3-exp-dev-process/blob/main/pedagogy/README.org) document to fill this template.  Follow the [link](https://github.com/virtual-labs/ph3-exp-dev-process/tree/main/sample/pedagogy) to view a sample pedagogy document.

## Pedagogy
<p align="center">


<br>
<b> Experiment : Name of the experiment	 <a name="top"></a> <br>
</p>

<b>Discipline |Electronics and Communication Engineering <b> 
:--|:--|
<b> Lab |Electronics and Communication Engineering <b> 
<b> Experiment|	Detailed Analog/Digital Modulation Experiments (e.g., Advanced QPSK, M-ary PSK with BER)   <b> 


<h4> [1. Focus Area](#LO)
<h4> [2. Learning Objectives ](#LO)
<h4> [3. Instructional Strategy](#IS)
<h4> [4. Task & Assessment Questions](#AQ)
<h4> [5. Simulator Interactions](#SI)
<hr>

<a name="LO"></a>
#### 1. Focus Area : Reinforce theoretical concept.
This experiment aims to strengthen understanding of digital modulation techniques such as QPSK and M-ary PSK, and evaluate performance using Bit Error Rate (BER) analysis. Students will connect modulation theory with practical outcomes using simulated signal constellations, noise models, and BER plots.
#### 2. Learning Objectives and Cognitive Level


Sr. No |	Learning Objective	| Cognitive Level | Action Verb
:--|:--|:--|:-:
1.|Explain the principles of QPSK and M-ary PSK modulation schemes |Understanding |	Explain
2.|Construct modulation and demodulation systems in a simulated environment |	Applying |	Construct
3.|Analyze constellation diagrams and BER performance under various noise |conditions |	Analyzing	Analyze
<br/>
<div align="right">
    <b><a href="#top">↥ back to top</a></b>
</div>
<br/>
<hr>

<a name="IS"></a>
#### 3. Instructional Strategy
###### Name of Instructional Strategy  : Simulation-Based Experimentation with Visual Feedback   
###### Assessment Method: Scenario-based challenges, visual constellation pattern interpretation, embedded MCQs and performance-based tasks.  

<u> <b>Description: </b>    </u>
<br>
    Students will use a digital modulation simulator to construct, run, and evaluate advanced modulation techniques such as QPSK and M-ary PSK. Visual feedback via constellation diagrams and BER plots under varying SNR will enable students to build an intuitive understanding of signal quality and error analysis. Embedded questions and diagnostic tasks will reinforce learning through active engagement.

<br/>
<div align="right">
    <b><a href="#top">↥ back to top</a></b>
</div>
<br/>
<hr>

<a name="AQ"></a>
#### 4. Task & Assessment Questions:

  
<br>

Sr. No |	Learning Objective	| Task to be performed by <br> the student  in the simulator | Assessment Questions as per LO & Task
:--|:--|:--|:-:
1.|Explain QPSK and M-ary PSK	| Observe signal constellation patterns with different modulation orders	| What is the key difference in constellation between QPSK and 8-PSK?
2.|Construct modulation systems	 |Build a QPSK system using provided blocks and run with test data |How is the symbol rate affected by the modulation order?
3.|Analyze BER |Vary the SNR and plot the BER curve |How does increasing SNR affect the BER in M-ary PSK systems?

<div align="right">
    <b><a href="#top">↥ back to top</a></b>
</div>
<br/>
<hr>

<a name="SI"></a>

#### 4. Simulator Interactions:
<br>

Sr.No | What Students will do? |	What Simulator will do?	| Purpose of the task
:--|:--|:--|:--:
1.|Choose modulation scheme (QPSK, 8-PSK, etc.) and set input parameters |	Display constellation diagram and initial signal |To visualize modulation in the complex plane
2.|Inject noise (vary SNR levels) into the signal | Show noisy signal and track BER 	|To study impact of channel conditions
3.|Modify modulation order (M values) and observe results |Replot constellation and BER in real-time| To compare performance between modulation schemes
4.|Run BER simulation using pseudo-random data |Generate BER vs. SNR plot	|To evaluate system performance
5.|Simulate demodulation and error counting |Output received signal and error stats	|To observe decoding reliability and system accuracy
