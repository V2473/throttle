'use strict';

function throttle(f, delay) {
  let interval;
  let newInterval;
  let previous = Date.now();
  const bindedF = f.bind(this);

  return function(...args) {
    if (Date.now() - previous >= delay) {
      previous = Date.now();
    }

    if (!interval) {
      previous = Date.now();

      interval = setInterval(() => {
        clearInterval(interval);
        interval = null;

        return bindedF(...args);
      }, delay);
    } else {
      clearInterval(newInterval);

      newInterval = setInterval(() => {
        return bindedF(...args);
      }, (delay * 2) + (previous - Date.now()));
    }
  };
}

function onMove(event) {
  throttlePositionElement.textContent = `
    x: ${event.clientX}, y: ${event.clientY}
  `;
}

function onMoveRealtime(event) {
  realtimePositionElement.textContent = `
    x: ${event.clientX}, y: ${event.clientY}
  `;
}

const realtimePositionElement = document.querySelector('#realtime');
const throttlePositionElement = document.querySelector('#throttle');

const wrapper = throttle(onMove, 1000);

document.addEventListener('mousemove', wrapper);
document.addEventListener('mousemove', onMoveRealtime);
