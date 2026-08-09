const tf = require("@tensorflow/tfjs");

async function predictDemand(history) {

  const xs = tf.tensor1d(history.map((_, i) => i));
  const ys = tf.tensor1d(history);

  const model = tf.sequential();

  model.add(
    tf.layers.dense({
      units: 1,
      inputShape: [1]
    })
  );

  model.compile({
    loss: "meanSquaredError",
    optimizer: "sgd"
  });

  await model.fit(xs, ys, { epochs: 100 });

  const prediction = model.predict(tf.tensor1d([history.length]));

  return prediction.dataSync()[0];
}

module.exports = predictDemand;