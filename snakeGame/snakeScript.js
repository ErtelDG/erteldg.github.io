
    //Variablen anlegen
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let rows = 20;
    let cols = 20;
    let snake = [{ x: 19, y: 3 }];
    let food = [{ x: 0, y: 0 }];
    let cellWidth = canvas.width / cols;
    let cellHeight = canvas.height / rows;
    let direction = 'LEFT';
    let foodCollected = false;

    //Wie oft soll Game Loop in der Sekunde durchlaufen werden
    setInterval(gameLoop, 150);

    document.addEventListener('keydown', keyDown);

    placeFood();
    draw();

    //Darstellung bei der Bildwiederholung
    function draw() {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      snake.forEach(part => add(part.x, part.y));
      ctx.fillStyle = 'lightgreen';
      add(food.x, food.y);   //Food
      requestAnimationFrame(draw);
    }

    //Groeße des Spielfeldes festlegen
    function add(x, y) {
      ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
    }

    //Schlange bewegen
    function shiftSnake() {
      for (let i = snake.length - 1; i > 0; i--) {
        const part = snake[i];
        const lastPart = snake[i - 1];
        part.x = lastPart.x;
        part.y = lastPart.y;
      }
    }


    //Spieldurchlauf
    function gameLoop() {

      //Spiel Game Over?
      testGameOver()

      //Schlange hat essen aufgenommen?
      if (foodCollected) {
        snake = [{ x: snake[0].x, y: snake[0].y }, ...snake];
        placeFood();
        foodCollected = false;
      }

      //Schlange bewegen
      shiftSnake();
      if (direction == 'LEFT') {
        snake[0].x--;
      }

      if (direction == 'RIGHT') {
        snake[0].x++;
      }

      if (direction == 'UP') {
        snake[0].y--;
      }

      if (direction == 'DOWN') {
        snake[0].y++;
      }

      if (snake[0].x == food.x && snake[0].y == food.y) {
        foodCollected = true;
      }
    }

    //Festlegung Tasteneingabe
    function keyDown(e) {
      if (e.keyCode == 37) {
        direction = 'LEFT';
      }
      if (e.keyCode == 38) {
        direction = 'UP';
      }
      if (e.keyCode == 39) {
        direction = 'RIGHT';
      }
      if (e.keyCode == 40) {
        direction = 'DOWN';
      }
    }

    //Prüfen ob Game Over
    function testGameOver() {
      let firstPart = snake[0];
      let otherParts = snake.slice(1);
      let duplicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y);

      //1.Schlange läuft gegen die Wand
      if (snake[0].x < 0 ||
        snake[0].x > cols - 1 ||
        snake[0].y < 0 ||
        snake[0. > rows - 1] ||
        duplicatePart) {
        placeFood();
        snake = [{ x: 19, y: 3 }];
        direction = 'LEFT';
      }
    }

    //Food platzieren
    function placeFood() {
      let randomX = Math.floor(Math.random() * cols);
      let randomY = Math.floor(Math.random() * rows);

      food = { x: randomX, y: randomY };
    }

