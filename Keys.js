// TODO might need to re-add the domElement stuff from SimpleControls.js

Keys = function() {

  this.shooting = false;

  Keys.prototype.switchControls = function () {
    if (controls instanceof SimpleControls) {
      initFlyControls();
    } else {
      initEncounterControls();
    }
  }

  Keys.prototype.onKeyUp = function (event) {
    switch(event.keyCode) {
      case 67: // c
        this.switchControls();
        break;
      case 32: // space
      case 90: // z
        this.shooting = false;
        break;
      case 80: // p
        isPaused = !isPaused;
        break;
    }
  };

  Keys.prototype.onKeyDown = function (event) {
    switch(event.keyCode) {
      case 32: // space
      case 90: // z
        this.shooting = true;
        break;
    }
  };

  document.addEventListener('keydown', bind(this, this.onKeyDown), false);
  document.addEventListener('keyup', bind(this, this.onKeyUp), false);

  function bind(scope, fn) {
    return function () {
      fn.apply(scope, arguments);
    };
  };

};