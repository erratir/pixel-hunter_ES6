/**
 * Value of the game type in the local data and Server data are different. Fix it.
 *
 *********** local data:
 {
    "type": "paint-or-photo",
    "question": "Угадай, фото или рисунок?",
    "answers": [{"image": {"url": "https://k36.kn3.net/E9B401148.jpg", "width": 705, "height": 455}, "type": "painting"}]
 }

 *********** Server data:
 *{
    "type": "tinder-like",
    "question": "Угадай, фото или рисунок?",
    "answers": [{"image": {"url": "https://k36.kn3.net/E9B401148.jpg", "width": 705, "height": 455}, "type": "painting"}]
    }
 */

const adapterServerData = (data) => {

  return data.map((game) => {
    if (game.type === `tinder-like`) {
      game.type = `paint-or-photo`;
    }
    return game;
  });

};

export {adapterServerData};
