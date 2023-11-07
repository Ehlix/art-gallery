function dataURItoBlob(dataURI: string) {
// convert base64/URLEncoded data component to raw binary data held in a string
  let byteString;
  if (dataURI.split(',')[0].indexOf('base64') >= 0)
    byteString = atob(dataURI.split(',')[1]);
  else
    byteString = decodeURI(dataURI.split(',')[1]);
// separate out the mime component
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
// write the bytes of the string to a typed array
  const ia = new Uint8Array(byteString.length);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], {type: mimeString});
}

export function canvasRatio(file: File, aspectRatio: number): Promise<File> {

  const url = URL.createObjectURL(file);

  // we return a Promise that gets resolved with our canvas element
  return new Promise(resolve => {

    // this image will hold our source image data
    const inputImage: HTMLImageElement = new Image();

    // we want to wait for our image to load
    inputImage.onload = () => {

      // let's store the width and height of our image
      const inputWidth = inputImage.naturalWidth;
      const inputHeight = inputImage.naturalHeight;

      // get the aspect ratio of the input image
      const inputImageAspectRatio = inputWidth / inputHeight;

      // if it's bigger than our target aspect ratio
      let outputWidth = inputWidth;
      let outputHeight = inputHeight;
      if (inputImageAspectRatio > aspectRatio) {
        outputWidth = inputHeight * aspectRatio;
      } else if (inputImageAspectRatio < aspectRatio) {
        outputHeight = inputWidth / aspectRatio;
      }

      // calculate the position to draw the image at
      const outputX = (outputWidth - inputWidth) * .5;
      const outputY = (outputHeight - inputHeight) * .5;

      // create a canvas that will present the output image
      const outputImage = document.createElement('canvas');

      // set it to the same size as the image
      outputImage.width = outputWidth;
      outputImage.height = outputHeight;

      // draw our image at position 0, 0 on the canvas
      const ctx = outputImage.getContext('2d');
      ctx?.drawImage(inputImage, outputX, outputY);
      const base64 = outputImage.toDataURL();
      const blob = dataURItoBlob(base64);
      const newFile = new File([blob], file.name, {
        lastModified: new Date().getTime(),
        type: file.type
      });
      resolve(newFile);
    };

    // start loading our image
    inputImage.src = url;
  });

}