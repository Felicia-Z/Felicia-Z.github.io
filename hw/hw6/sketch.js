/**
 * pixel mapping. each pixel is translated into a new element (svg file).
 * take care to sort the svg file according to their greyscale value.
 *
 * KEYS
 * s                   : save png
 */
console.log(2);
var shapes;
var img;

function preload() {
  img = loadImage('data/vector/pic.png');
//   img = loadImage('data/dog/pic1_s.png');

  shapes = [];
  shapes.push(loadImage('data/vector/056.svg'));
  shapes.push(loadImage('data/vector/076.svg'));
  shapes.push(loadImage('data/vector/082.svg'));
  shapes.push(loadImage('data/vector/096.svg'));
  shapes.push(loadImage('data/vector/117.svg'));
  shapes.push(loadImage('data/vector/148.svg'));
  shapes.push(loadImage('data/vector/152.svg'));
  shapes.push(loadImage('data/vector/157.svg'));
  shapes.push(loadImage('data/vector/164.svg'));
  shapes.push(loadImage('data/vector/166.svg'));
  shapes.push(loadImage('data/vector/186.svg'));
  shapes.push(loadImage('data/vector/198.svg'));
  shapes.push(loadImage('data/vector/224.svg'));
//   shapes.push(loadImage('data/dog/001.svg'));
//   shapes.push(loadImage('data/dog/002.svg'));
//   shapes.push(loadImage('data/dog/003.svg'));
//   shapes.push(loadImage('data/dog/004.svg'));
//   shapes.push(loadImage('data/dog/005.svg'));
//   shapes.push(loadImage('data/dog/006.svg'));
//   shapes.push(loadImage('data/dog/009.svg'));
//   shapes.push(loadImage('data/dog/010.svg'));
//   shapes.push(loadImage('data/dog/017.svg'));
//   shapes.push(loadImage('data/dog/018.svg'));
//   shapes.push(loadImage('data/dog/bw007.svg'));
//   shapes.push(loadImage('data/dog/bw008.svg'));
//   shapes.push(loadImage('data/dog/bw011.svg'));
//   shapes.push(loadImage('data/dog/bw012.svg'));
//   shapes.push(loadImage('data/dog/bw013.svg'));
//   shapes.push(loadImage('data/dog/bw014.svg'));
//   shapes.push(loadImage('data/dog/bw015.svg'));
//   shapes.push(loadImage('data/dog/bw016.svg'));

}

function setup() {
  createCanvas(600, 900);
  image(img);
}

function draw() {
  background(255);

  for (var gridX = 0; gridX < img.width; gridX++) {
    for (var gridY = 0; gridY < img.height; gridY++) {
      // grid position + title size
      var titleWidth = 603 / img.width;
      var titleHeight = 873 / img.height;
      var posX = titleWidth * gridX;
      var posY = titleHeight * gridY;

      // get current color
      img.loadPixels();
      var c = img.get(min(gridX, img.width - 1), gridY);
      // greyscale conversion
      var greyscale = round(red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071);
      var gradientToIndex = round(map(greyscale, 0, 255, 0, shapes.length - 1));
      image(shapes[gradientToIndex], posX, posY, titleWidth, titleHeight);
    }
  }
}

function keyReleased() {
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
}