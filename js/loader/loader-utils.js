import {resize} from "../utils/resize";

const checkResponse = (response) => {
  if (response.ok && response.status === 200) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const loadData = (url) => {
  return fetch(url)
    .then(checkResponse)
    .then((response) => response.json());
};

// промис для одной картинки
const fetchImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = () => reject(`Не удалось загрузить картнку: ${url}`);
  });
};

// Предзагрузка всех изображений и ресайз
// "answers": [{"image": {"url": "https://k36.kn3.net/E9B401148.jpg", "width": 705, "height": 455}, "type": "painting"}]
const preloadImages = (data) => {
  const promises = [];
  data.forEach((game) => {
    const answers = game.answers;
    answers.forEach((answer) => {
      // для каждой картинки создаем промис и пушим в массив
      promises.push(fetchImage(answer.image.url)
      // при успешкной загрузке меняем размер в исходных данных
          .then((image) => {
            const newSize = resize(answer.image, image);
            answer.image.width = newSize.width;
            answer.image.height = newSize.height;
          })
          // .catch((error) => console.log(error))
      );
    });
  });
  // console.log(promises);
  return Promise.all(promises); // возвращаем промисы всех картинок
};


export {checkResponse, loadData, preloadImages};
