# Pretty Squares Image Engine (Node Version)

Welcome to the Pretty Squares Image Engine (Node version)!  
This Node.js version of [my Python image engine](https://www.github.com/the-imp0ster/pretty-squares-image-engine) generates pretty square images by combining random layers from the provided "traits" directory.  
The resulting images will be stored in a 'finished' directory along with their corresponding metadata files.

## Installation

To run the Pretty Squares Image Engine, you need to have Node.js installed on your system. If you haven't installed it yet, you can download the latest version from the official Node.js website: [Node.js Downloads](https://nodejs.org/en/download/)

Once you have Node.js installed, you can follow these steps to set up and run the image engine:

1. Clone the repository from GitHub to your local machine:

```bash
git clone https://github.com/the-imp0ster/pretty-squares-image-engine-node.git
```

Descend into the project folder, open a terminal, and install the Node modules:

```bash
npm install
```

## Usage

Before running the image engine, ensure that you also have the necessary image layers in the "traits" directory. The "traits" directory should accompany the repo.

## Running the Program

To run the program, open a terminal in the project folder, and run the command:

```bash
node image-engine.js
```

The Pretty Squares Image Engine will now create 10 random combinations of layers, merge them into square images, and save them in the 'finished' directory. The engine will also generate metadata files for each image, describing the traits used in the image.

## Customizing

If you are comfy with the code, feel free to swap out your own traits directory path, or traits themselves.  You can also change the size of the image or change the shape from square to rectangle!  Tweak the program and try new things; I made this (and the Python version) as my first image engine and it's made to be broken lol.  Many things are hard-coded as an example piece but there is still a lot of wiggle room to play with.

# Have fun!


