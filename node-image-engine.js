// ‧͙⁺˚*･༓☾  Pretty Squares Image Engine (Node Version).  ☽༓･*˚⁺‧͙

// ‧͙⁺˚*･༓☾  Imports.
const fs = require('fs');
const path = require('path');
const Jimp = require('jimp');

// ‧͙⁺˚*･༓☾  Rouse the image engine from its slumber.
async function imageEngine(traitDirectory, numImages) {
  // ‧͙⁺˚*･༓☾  Create/find a directory called Finished in the project folder to save the generated images to.
  const finishedDirectory = 'finished';
  if (!fs.existsSync(finishedDirectory)) {
    fs.mkdirSync(finishedDirectory);
  }

  // ‧͙⁺˚*･༓☾  Get the layers in each trait folder.
  const topLeftLayers = await fs.promises.readdir(path.join(traitDirectory, 'TopLeft'));
  const topRightLayers = await fs.promises.readdir(path.join(traitDirectory, 'TopRight'));
  const bottomRightLayers = await fs.promises.readdir(path.join(traitDirectory, 'BottomRight'));
  const bottomLeftLayers = await fs.promises.readdir(path.join(traitDirectory, 'BottomLeft'));

  // ‧͙⁺˚*･༓☾  Make a list of previously used combinations (so it doesn't make duplicates).
  const usedCombos = [];

  for (let i = 1; i <= numImages; i++) {
    while (true) {
      // ‧͙⁺˚*･༓☾  Select a random layer from each subdirectory.
      const top_left_layer = randomChoice(topLeftLayers);
      const top_right_layer = randomChoice(topRightLayers);
      const bottom_right_layer = randomChoice(bottomRightLayers);
      const bottom_left_layer = randomChoice(bottomLeftLayers);

      // ‧͙⁺˚*･༓☾  Combine the four selected layers into one image by stacking them.
      const layerSize = 200;
      const top_left_image = await Jimp.read(path.join(traitDirectory, 'TopLeft', top_left_layer));
      const top_right_image = await Jimp.read(path.join(traitDirectory, 'TopRight', top_right_layer));
      const bottom_right_image = await Jimp.read(path.join(traitDirectory, 'BottomRight', bottom_right_layer));
      const bottom_left_image = await Jimp.read(path.join(traitDirectory, 'BottomLeft', bottom_left_layer));

      top_left_image.resize(layerSize, layerSize);
      top_right_image.resize(layerSize, layerSize);
      bottom_right_image.resize(layerSize, layerSize);
      bottom_left_image.resize(layerSize, layerSize);

      const combined_image = new Jimp(layerSize, layerSize, 0x00000000);
      combined_image.composite(top_left_image, 0, 0);
      combined_image.composite(top_right_image, 0, 0);
      combined_image.composite(bottom_right_image, 0, 0);
      combined_image.composite(bottom_left_image, 0, 0);

      // ‧͙⁺˚*･༓☾  Before saving the image, check if this combination has already been used.
      const combo = [top_left_layer, top_right_layer, bottom_right_layer, bottom_left_layer].join(',');
      if (!usedCombos.includes(combo)) {
        const imageFilename = path.join(finishedDirectory, `${i}.png`);
        await combined_image.writeAsync(imageFilename);

        // ‧͙⁺˚*･༓☾  Create a JSON metadata object for the pretty square.
        const metadata = {
          name: `Pretty Square #${i}`,
          traits: {
            TopLeft: top_left_layer,
            TopRight: top_right_layer,
            BottomRight: bottom_right_layer,
            BottomLeft: bottom_left_layer,
          },
        };

        // ‧͙⁺˚*･༓☾  Save the JSON metadata to a file (1 file for each generated image).
        const metadataFilename = path.join(finishedDirectory, `${i}_metadata.json`);
        fs.writeFileSync(metadataFilename, JSON.stringify(metadata));

        // ‧͙⁺˚*･༓☾  Add the combination to the used combinations list.
        usedCombos.push(combo);
        break;
      }
    }
  }
}

// Helper function to choose a random element from an array
function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// ‧͙⁺˚*･༓☾  Provide the trait directory and number of images desired here, then call the image engine function.
if (require.main === module) {
  const traitDirectory = 'traits';
  const numImages = 10;
  imageEngine(traitDirectory, numImages).catch((err) => console.error(err));
}