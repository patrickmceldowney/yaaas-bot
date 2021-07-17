<script>
  import { createEventDispatcher, onMount, tick } from 'svelte';
  import jQuery from 'jquery';

  // button animation shit
  var pointsA = [],
    pointsB = [],
    parentCanvas = null,
    canvas = null,
    context = null,
    vars = null,
    points = 8,
    viscosity = 20,
    mouseDist = 70,
    damping = 0.05,
    showIndicators = false,
    mouseX = 0,
    mouseY = 0,
    relMouseX = 0,
    relMouseY = 0,
    mouseLastX = 0,
    mouseLastY = 0,
    mouseDirectionX = 0,
    mouseDirectionY = 0,
    mouseSpeedX = 0,
    mouseSpeedY = 0;

  /**
   * Get mouse direction
   */
  function mouseDirection(e) {
    if (mouseX < e.pageX) mouseDirectionX = 1;
    else if (mouseX > e.pageX) mouseDirectionX = -1;
    else mouseDirectionX = 0;

    if (mouseY < e.pageY) mouseDirectionY = 1;
    else if (mouseY > e.pageY) mouseDirectionY = -1;
    else mouseDirectionY = 0;

    mouseX = e.pageX;
    mouseY = e.pageY;

    relMouseX = mouseX - parentCanvas.offset().left;
    relMouseY = mouseY - parentCanvas.offset().top;
  }

  /**
   * Get mouse speed
   */
  function mouseSpeed() {
    mouseSpeedX = mouseX - mouseLastX;
    mouseSpeedY = mouseY - mouseLastY;

    mouseLastX = mouseX;
    mouseLastY = mouseY;

    setTimeout(mouseSpeed, 50);
  }
  mouseSpeed();

  /**
   * Init button
   */
  async function initButton() {
    // Get button
    let button = jQuery('.btn-liquid');
    let buttonWidth = button.width();
    let buttonHeight = button.height();

    // Create canvas
    parentCanvas = jQuery('<canvas></canvas>').css({
      position: 'absolute',
      inset: '-50px',
      'z-index': 1,
    });
    button.append(parentCanvas);

    canvas = parentCanvas.get(0);
    canvas.width = buttonWidth + 100;
    canvas.height = buttonHeight + 100;
    context = canvas.getContext('2d');

    // Add points

    let x = buttonHeight / 2;
    for (let j = 1; j < points; j++) {
      addPoints(x + ((buttonWidth - buttonHeight) / points) * j, 0);
    }
    addPoints(buttonWidth - buttonHeight / 5, 0);
    addPoints(buttonWidth + buttonHeight / 10, buttonHeight / 2);
    addPoints(buttonWidth - buttonHeight / 5, buttonHeight);
    for (let j = points - 1; j > 0; j--) {
      addPoints(x + ((buttonWidth - buttonHeight) / points) * j, buttonHeight);
    }
    addPoints(buttonHeight / 5, buttonHeight);

    addPoints(-buttonHeight / 10, buttonHeight / 2);
    addPoints(buttonHeight / 5, 0);

    // Start render
    renderCanvas();
  }

  /**
   * Add points
   */
  function addPoints(x, y) {
    pointsA.push(new Point(x, y, 1));
    pointsB.push(new Point(x, y, 2));
  }

  /**
   * Point
   */
  function Point(x, y, level) {
    this.x = this.ix = 50 + x;
    this.y = this.iy = 50 + y;
    this.vx = 0;
    this.vy = 0;
    this.cx1 = 0;
    this.cy1 = 0;
    this.cx2 = 0;
    this.cy2 = 0;
    this.level = level;
  }

  Point.prototype.move = function () {
    this.vx += (this.ix - this.x) / (viscosity * this.level);
    this.vy += (this.iy - this.y) / (viscosity * this.level);

    let dx = this.ix - relMouseX,
      dy = this.iy - relMouseY;
    let relDist = 1 - Math.sqrt(dx * dx + dy * dy) / mouseDist;

    // Move x
    if (
      (mouseDirectionX > 0 && relMouseX > this.x) ||
      (mouseDirectionX < 0 && relMouseX < this.x)
    ) {
      if (relDist > 0 && relDist < 1) {
        this.vx = (mouseSpeedX / 4) * relDist;
      }
    }
    this.vx *= 1 - damping;
    this.x += this.vx;

    // Move y
    if (
      (mouseDirectionY > 0 && relMouseY > this.y) ||
      (mouseDirectionY < 0 && relMouseY < this.y)
    ) {
      if (relDist > 0 && relDist < 1) {
        this.vy = (mouseSpeedY / 4) * relDist;
      }
    }
    this.vy *= 1 - damping;
    this.y += this.vy;
  };

  /**
   * Render canvas
   */
  function renderCanvas() {
    // rAF
    let rafID = requestAnimationFrame(renderCanvas);

    // Clear scene
    context.clearRect(0, 0, parentCanvas.width(), parentCanvas.height());
    context.fillStyle = '#FFC9E7';
    context.fillRect(0, 0, parentCanvas.width(), parentCanvas.height());

    // Move points
    for (let i = 0; i <= pointsA.length - 1; i++) {
      pointsA[i].move();
      pointsB[i].move();
    }

    // Create dynamic gradient
    let gradientX = Math.min(
      Math.max(mouseX - parentCanvas.offset().left, 0),
      parentCanvas.width()
    );
    let gradientY = Math.min(
      Math.max(mouseY - parentCanvas.offset().top, 0),
      parentCanvas.height()
    );
    var distance =
      Math.sqrt(
        Math.pow(gradientX - parentCanvas.width() / 2, 2) +
          Math.pow(gradientY - parentCanvas.height() / 2, 2)
      ) /
      Math.sqrt(
        Math.pow(parentCanvas.width() / 2, 2) +
          Math.pow(parentCanvas.height() / 2, 2)
      );

    let gradient = context.createRadialGradient(
      gradientX,
      gradientY,
      300 + 300 * distance,
      gradientX,
      gradientY,
      0
    );
    gradient.addColorStop(0, '#1196d1');
    gradient.addColorStop(1, '#ff4bb2');

    // Draw shapes
    let groups = [pointsA, pointsB];

    for (let j = 0; j <= 1; j++) {
      let points = groups[j];

      if (j == 0) {
        // Background style
        context.fillStyle = '#2cc941';
      } else {
        // Foreground style
        context.fillStyle = gradient;
      }

      context.beginPath();
      context.moveTo(points[0].x, points[0].y);

      for (var i = 0; i < points.length; i++) {
        let p = points[i];
        let nextP = points[i + 1];
        let val = 30 * 0.552284749831;

        if (nextP != undefined) {
          p.cx1 = (p.x + nextP.x) / 2;
          p.cy1 = (p.y + nextP.y) / 2;
          p.cx2 = (p.x + nextP.x) / 2;
          p.cy2 = (p.y + nextP.y) / 2;

          context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
          // 	continue;
          // }

          // context.bezierCurveTo(p.cx1, p.cy1, p.cx2, p.cy2, nextP.x, nextP.y);
        } else {
          nextP = points[0];
          p.cx1 = (p.x + nextP.x) / 2;
          p.cy1 = (p.y + nextP.y) / 2;

          context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
        }
      }

      // context.closePath();
      context.fill();
    }

    if (showIndicators) {
      // Draw points
      context.fillStyle = '#000';
      context.beginPath();
      for (let i = 0; i < pointsA.length; i++) {
        let p = pointsA[i];

        context.rect(p.x - 1, p.y - 1, 2, 2);
      }
      context.fill();

      // Draw controls
      context.fillStyle = '#ff767a';
      context.beginPath();
      for (let i = 0; i < pointsA.length; i++) {
        let p = pointsA[i];

        context.rect(p.cx1 - 1, p.cy1 - 1, 2, 2);
        context.rect(p.cx2 - 1, p.cy2 - 1, 2, 2);
      }
      context.fill();
    }
  }

  const dispatch = createEventDispatcher();

  const change = () => {
    dispatch('liquidClick');
  };

  onMount(async () => {
    jQuery(document).on('mousemove', mouseDirection);
    initButton();
  });
</script>

<div class="btn-liquid" on:click={change}>
  <span class="inner">Bwahhh</span>
</div>

<style>
  .btn-liquid {
    display: inline-block;
    position: relative;
    width: 240px;
    height: 60px;
    border-radius: 27px;
    color: #fff;
    font: 700 14px/60px 'Fredoka One', sans-serif;
    letter-spacing: 0.05em;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    cursor: pointer;
  }

  .btn-liquid .inner {
    position: relative;
    z-index: 2;
  }
</style>
