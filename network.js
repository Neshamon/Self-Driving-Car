class NeuralNetwork{
  constructor(neuronCounts){
    this.levels = [];
    for (let i = 0; i < neuronCounts.length; i++) {
      this.levels.push(new Level(
        neuronCounts[i], neuronCounts[i + 1]
      ));
    } //@dev This loop pushes
  } //@dev Param1 describes the number of neurons in each level

  static feedForward(givenInputs, network){
    let outputs = Level.feedForward(
      givenInputs, network.levels[0]
    ); //@dev This function causes the first level of the network to produce its outputs

    for (let i = 1; i < network.levels.length; i++) {
      let outputs = Level.feedForward(
        outputs, network.levels[i]
      );
    } //@dev This loop takes the output of the previous level and inserts it as an
      // input for the next level

    return outputs; //which is then returned as a final output here.
  }
} //@dev The outputs determine what direction the car should go in.

/*
@dev Neural Networks are typically split into mutiple levels.
These levels consist of the "neurons" which are arrays of values, biases, and weights.
A bias acts as the value at which the output neuron will fire and weights acts
as the degree to which a bias is fired
*/

class Level{
  constructor(inputCount, outputCount){
    this.inputs = new Array(inputCount);
    this.outputs = new Array(outputCount);
    this.biases = new Array(outputCount);

    this.weights = [];
    for (let i = 0; i < inputCount.length; i++) {
      this.weights[i] = new Array(outputCount);
    }

    Level.#randomize(this);
  }

  static #randomize(level){
    for (let i = 0; i < level.inputs.length; i++) {
      for (let j = 0; j < level.outputs.length; j++) {
        level.weights[i][j] = Math.random() * 2 - 1;
      }
    }

    for (let i = 0; i < level.biases.length; i++) {
      level.biases[i] = Math.random() * 2 - 1;
    }
  } //@dev This method randomly selects a weight for the bias to act upon
    //@dev The reason why we use negative weights is so we can guide the machine into
    //the correct way it should go by telling it what not to choose.

  static feedForward(givenInputs, level){
    for (let i = 0; i < level.inputs.length; i++) {
      level.inputs[i] = givenInputs[i];
    } //@dev This loop goes through all level inputs and sets them to the givenInputs

    for (let i = 0; i < level.outputs.length; i++) {
      let sum = 0
      for (let j = 0; j < level.inputs.length; j++) {
        sum += level.inputs[j] * level.weights[j][i];
      } //@dev This j loop goes through all level inputs and sums the product of the jth input and the
        //weight between the jth input and the ith output. This will repeat with every input neuron

      if(sum > level.biases[i]){
        level.outputs[i] = 1;
      } else {
        level.outputs[i] = 0;
      } //@dev This if statement checks if the sum is greater than the value of the
        //bias of the according output neuron.
        //If the sum is greater than the value of the bias then the output neuron will turn on.
        //If not, it will be set to 0, which will do nothing.
    }

    return level.outputs;
  } //@dev This method takes the values detected by the sensor and regulates
    //whether or not a bias should be activated
}
