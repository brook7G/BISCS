const myAudioContext = new AudioContext();

const Beep = (duration, frequency, volume) => {
  return new Promise((resolve, reject) => {
    duration = duration || 200;
    frequency = frequency || 440;
    volume = volume || 100;

    let oscillatorNode = myAudioContext.createOscillator();
    let gainNode = myAudioContext.createGain();

    oscillatorNode.connect(gainNode);
    gainNode.connect(myAudioContext.destination);

    oscillatorNode.type = "sine";
    oscillatorNode.frequency.value = frequency;

    gainNode.gain.value = volume;

    oscillatorNode.start(myAudioContext.currentTime);
    oscillatorNode.stop(myAudioContext.currentTime + duration / 1000);

    oscillatorNode.onended = resolve;
  });
};

export default Beep;
