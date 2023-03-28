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
  img = loadImage('data/dog/pic1_s.png');

  shapes = [];

  // color+a little bw
  // shapes.push(loadImage('data/dog/001.svg'));  //purple ballon dog
  shapes.push(loadImage('data/dog/002.svg'));
  shapes.push(loadImage('data/dog/003.svg'));
  shapes.push(loadImage('data/dog/004.svg'));
  // shapes.push(loadImage('data/dog/005.svg'));  //藏獒
  shapes.push(loadImage('data/dog/006.svg'));  // boarder collie
  shapes.push(loadImage('data/dog/009.svg'));
  shapes.push(loadImage('data/dog/010.svg'));  // golden retriever
  shapes.push(loadImage('data/dog/017.svg'));
  shapes.push(loadImage('data/dog/018.svg'));
  shapes.push(loadImage('data/dog/019.svg'));
//   shapes.push(loadImage('data/dog/020.svg'));
  shapes.push(loadImage('data/dog/021.svg'));  //blue pet house
  // shapes.push(loadImage('data/dog/022.svg'));  //罗威纳
  shapes.push(loadImage('data/dog/023.svg'));  
  // shapes.push(loadImage('data/dog/024.svg'));  //斑点狗
  // shapes.push(loadImage('data/dog/025.svg'));
  // shapes.push(loadImage('data/dog/026.svg'));  //戌
//   shapes.push(loadImage('data/dog/bw007.svg'));  //dog shadow look back
//   shapes.push(loadImage('data/dog/bw008.svg'));  //collar
  // shapes.push(loadImage('data/dog/bw011.svg')); //paws
  // shapes.push(loadImage('data/dog/bw012.svg'));  // dog shadow running
  shapes.push(loadImage('data/dog/bw013.svg'));  // dog outline sit
  shapes.push(loadImage('data/dog/bw014.svg'));
  shapes.push(loadImage('data/dog/bw015.svg'));
  shapes.push(loadImage('data/dog/bw016.svg'));

  // // bw + a little color
  // shapes.push(loadImage('data/bwdog/001.svg'));
  // shapes.push(loadImage('data/bwdog/002.svg'));
  // shapes.push(loadImage('data/bwdog/003.svg'));
  // shapes.push(loadImage('data/bwdog/004.svg'));
  // shapes.push(loadImage('data/bwdog/005.svg'));
  // shapes.push(loadImage('data/bwdog/006.svg'));
  // shapes.push(loadImage('data/bwdog/007.svg'));
  // shapes.push(loadImage('data/bwdog/008.svg'));
  // shapes.push(loadImage('data/bwdog/009.svg'));
  // shapes.push(loadImage('data/bwdog/010.svg'));
  // shapes.push(loadImage('data/bwdog/011.svg'));
  // shapes.push(loadImage('data/bwdog/012.svg'));
  // shapes.push(loadImage('data/bwdog/013.svg'));
  // shapes.push(loadImage('data/bwdog/014.svg'));
  // shapes.push(loadImage('data/bwdog/015.svg'));
  // shapes.push(loadImage('data/bwdog/016.svg'));
  // shapes.push(loadImage('data/bwdog/017.svg'));
  // shapes.push(loadImage('data/bwdog/018.svg'));
  // shapes.push(loadImage('data/bwdog/c001.svg'));
  // shapes.push(loadImage('data/bwdog/c002.svg'));
  // shapes.push(loadImage('data/bwdog/c003.svg'));
  // shapes.push(loadImage('data/bwdog/c004.svg'));
  // shapes.push(loadImage('data/bwdog/c005.svg'));

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