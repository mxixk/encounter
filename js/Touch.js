var Touch = {};

Touch.CONTROLS_CSS = 'opacity:0.1; background-color: red; z-index: 11000; border-style: dashed; border-width: 1px';
Touch.DPAD_BUTTON_WIDTH_PERCENT = 12;
Touch.DPAD_BUTTON_HEIGHT_PERCENT = 12;

Touch.dpad = {}; // map of dpad control objects
Touch.fireButton = null;

Touch.init = function()
{
  // disable dragging
  // FIXME this shouldn't be needed but we go a few px off bottom of screen, which enables drag
  document.addEventListener('touchmove', function(event) {
    event.preventDefault();
  });

  Touch.initFireButton();

  // pass our id, along with our press() and unpress() functions.
  // we need to do this eight times in all.
  Touch.dpad['upleft'] = Touch.createDPadButton('upleft', function() {
    event.preventDefault();
    Controls.current.moveForward = true;
    Controls.current.turnLeft = true;
  }, function() {
    event.preventDefault();
    Controls.current.moveForward = false;
    Controls.current.turnLeft = false;
  });
  Touch.dpad['upleft'].style.bottom = (Touch.DPAD_BUTTON_HEIGHT_PERCENT * 2) + '%';

  Touch.dpad['up'] = Touch.createDPadButton('up', function() {
    event.preventDefault();
    Controls.current.moveForward = true;
  },
  function() {
    event.preventDefault();
    Controls.current.moveForward = false;
  });
  Touch.dpad['up'].style.bottom = (Touch.DPAD_BUTTON_HEIGHT_PERCENT * 2) + '%';
  Touch.dpad['up'].style.left = Touch.DPAD_BUTTON_WIDTH_PERCENT + '%';

  Touch.dpad['upright'] = Touch.createDPadButton('upright', function() {
    event.preventDefault();
    Controls.current.moveForward = true;
    Controls.current.turnRight = true;
  }, function() {
    event.preventDefault();
    Controls.current.moveForward = false;
    Controls.current.turnRight = false;
  });
  Touch.dpad['upright'].style.bottom = (Touch.DPAD_BUTTON_HEIGHT_PERCENT * 2) + '%';
  Touch.dpad['upright'].style.left = (Touch.DPAD_BUTTON_WIDTH_PERCENT * 2) + '%';

  Touch.dpad['left'] = Touch.createDPadButton('left', function() {
    event.preventDefault();
    Controls.current.turnLeft = true;
  }, function() {
    event.preventDefault();
    Controls.current.turnLeft = false;
  });
  Touch.dpad['left'].style.bottom = Touch.DPAD_BUTTON_HEIGHT_PERCENT + '%';

  Touch.dpad['right'] = Touch.createDPadButton('right', function() {
    event.preventDefault();
    Controls.current.turnRight = true;
  }, function() {
    event.preventDefault();
    Controls.current.turnRight = false;
  });
  Touch.dpad['right'].style.bottom = Touch.DPAD_BUTTON_HEIGHT_PERCENT + '%';
  Touch.dpad['right'].style.left = (Touch.DPAD_BUTTON_WIDTH_PERCENT * 2) + '%';

  Touch.dpad['downleft'] = Touch.createDPadButton('downleft', function() {
    event.preventDefault();
    Controls.current.moveBackward = true;
    Controls.current.turnLeft = true;
  }, function() {
    event.preventDefault();
    Controls.current.moveBackward = false;
    Controls.current.turnLeft = false;
  });

  Touch.dpad['down'] = Touch.createDPadButton('down', function() {
    event.preventDefault();
    Controls.current.moveBackward = true;
  }, function() {
    event.preventDefault();
    Controls.current.moveBackward = false;
  });
  Touch.dpad['down'].style.left= Touch.DPAD_BUTTON_WIDTH_PERCENT + '%';

  Touch.dpad['downright'] = Touch.createDPadButton('downright', function() {
    event.preventDefault();
    Controls.current.moveBackward = true;
    Controls.current.turnRight = true;
  }, function() {
    event.preventDefault();
    Controls.current.moveBackward = false;
    Controls.current.turnRight = false;
  });
  Touch.dpad['downright'].style.left = (Touch.DPAD_BUTTON_WIDTH_PERCENT * 2) + '%';
}

// DPad buttons are divs with explicit press/unpress functions.
// This function assumes you live at bottom-left of the screen.
Touch.createDPadButton = function(id, pressFunction, unpressFunction)
{
  var button = document.createElement('div');
  button.id = id;
  button.style.cssText = Touch.CONTROLS_CSS;
  button.style.width = Touch.DPAD_BUTTON_WIDTH_PERCENT + '%';
  button.style.height = Touch.DPAD_BUTTON_HEIGHT_PERCENT + '%';
  button.style.position = 'absolute';
  button.style.bottom = '0px';
  button.style.left = '0px';

  button.press = pressFunction;
  button.unpress = unpressFunction;

  // press handler for basic touchstart case
  button.addEventListener('touchstart', button.press);
  // unpress handlers
  button.addEventListener('touchend', button.unpress);
  button.addEventListener('touchleave', button.unpress);

  // FIXME add touchmove handler
  //div.addEventListener('touchmove', function(event) {
  //  event.preventDefault();
  //  var touch = event.changedTouches[0];
  //  log('touch at ' + touch.clientX + ', ' + touch.clientY);
  //  log('element is ' + document.elementFromPoint(touch.clientX, touch.clientY).id);

  document.body.appendChild(button);

  return button;
}

// fire button is a bit simpler, no need for any touchmove for sliding fingers
Touch.initFireButton = function()
{
  Touch.fireButton = document.createElement('div');
  Touch.fireButton.id = 'fireButton';
  Touch.fireButton.style.cssText = Touch.CONTROLS_CSS;
  Touch.fireButton.style.width = '40%';
  Touch.fireButton.style.height = (Touch.DPAD_BUTTON_HEIGHT_PERCENT * 3) + '%';
  Touch.fireButton.style.position = 'absolute';
  Touch.fireButton.style.bottom = '0px';
  Touch.fireButton.style.right = '0px';

  Touch.fireButton.press = function() {
    event.preventDefault();
    Keys.shooting = true;
  };
  Touch.fireButton.unpress = function() {
    event.preventDefault();
    Keys.shooting = false;
  };

  Touch.fireButton.addEventListener('touchstart', function(event) {
    Touch.fireButton.press();
  });
  Touch.fireButton.addEventListener('touchend', function(event) {
    Touch.fireButton.unpress();
  });
  Touch.fireButton.addEventListener('touchleave', function(event) {
    Touch.fireButton.unpress();
  });

  document.body.appendChild(Touch.fireButton);
}