/**
 * Вписывает изображение в рамку
 * @param {object} frame Размеры рамки
 * @param {object} image Размеры изображения
 * @return {{width: number, height: number}}
 */
const resize = (frame, image) => {

  const ratioWidth = 1 / (image.width / frame.width);
  const ratioHeights = 1 / (image.height / frame.height);

  const largestRatio = ratioWidth < ratioHeights ? ratioWidth : ratioHeights;

  return {
    width: image.width * largestRatio,
    height: image.height * largestRatio,
  };

};

export {resize};
