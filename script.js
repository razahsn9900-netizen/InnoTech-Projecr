'use strict';

const slider = document.querySelector('#levelSlider');
const levelNumber = document.querySelector('#levelNumber');
const tankValue = document.querySelector('#tankValue');
const tankWater = document.querySelector('#tankWater');
const tankGraphic = document.querySelector('#tankGraphic');
const statusPill = document.querySelector('#statusPill');
const statusShort = document.querySelector('#statusShort');
const statusTitle = document.querySelector('#statusTitle');
const statusMessage = document.querySelector('#statusMessage');
const alertBox = document.querySelector('#alertBox');
const alertText = document.querySelector('#alertText');
const updatedText = document.querySelector('#updatedText');
const resetButton = document.querySelector('#resetButton');

const statusColors = {
  low: '#c8473d',
  medium: '#d59b20',
  high: '#34845c'
};

function getStatus(level) {
  if (level <= 25) {
    return {
      key: 'low',
      label: 'Low',
      title: 'Water level is low',
      message: 'Please check the tank and plan a refill.',
      alert: 'Low-water alert: the tank needs attention.'
    };
  }

  if (level <= 70) {
    return {
      key: 'medium',
      label: 'Medium',
      title: 'Water level is medium',
      message: 'The tank has a useful amount of water.',
      alert: 'No low-water alert.'
    };
  }

  return {
    key: 'high',
    label: 'High',
    title: 'Water level is high',
    message: 'The tank is mostly full.',
    alert: 'No low-water alert.'
  };
}

function updateMonitor(level) {
  const status = getStatus(level);
  const color = statusColors[status.key];

  levelNumber.textContent = `${level}%`;
  tankValue.textContent = `${level}%`;
  tankWater.style.height = `${level}%`;
  tankWater.style.backgroundColor = color;
  tankGraphic.setAttribute('aria-label', `Water tank is ${level} percent full`);

  document.documentElement.style.setProperty('--state', color);
  statusPill.dataset.state = status.key;
  statusShort.textContent = status.label;
  statusTitle.textContent = status.title;
  statusMessage.textContent = status.message;

  const isLow = status.key === 'low';
  alertBox.classList.toggle('is-alert', isLow);
  alertText.textContent = status.alert;
  updatedText.textContent = `Demo updated at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

slider.addEventListener('input', () => updateMonitor(Number(slider.value)));

document.querySelectorAll('[data-level]').forEach((button) => {
  button.addEventListener('click', () => {
    slider.value = button.dataset.level;
    updateMonitor(Number(slider.value));
  });
});

resetButton.addEventListener('click', () => {
  slider.value = 50;
  updateMonitor(50);
});

updateMonitor(Number(slider.value));
