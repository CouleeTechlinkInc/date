/**
 * Module Dependencies
 */

var Clock = require('matthewmueller-clock');
var Calendar = require('calendar-component');
var event = require('component-event');
var debounce = require('debounce');
var date = require('date.js');

/**
 * Handle input
 */

var input = document.getElementById('date-input');
input.oninput = debounce(parse, 200);
input.focus();

/**
 * Time element
 */

var time = document.querySelector('#demo .time');

/**
 * Live clock: Update every second
 */

parse()
setInterval(parse, 1000)

/**
 * Parse the time
 */

function parse() {
  var val = input.value;
  if (!val) {
    time.innerHTML = t(new Date);
    return;
  }
  var d = date(val);
  cal.select(d);
  time.innerHTML = t(d);
}

/**
 * Handle suggestions
 */

var table = document.getElementsByTagName('table')[0];
event.bind(table, 'click', function(e) {
  var target = e.target;
  if ('TD' !== target.nodeName) return;
  var prev = table.querySelector('[selected]')
  prev && prev.removeAttribute('selected')
  input.value = target.innerText;
  target.setAttribute('selected', true)
  parse()
});

/**
 * Place the calendar
 */

var cal = new Calendar;
cal.el.appendTo('.calendar-container');

/**
 * Place a clock in the nav bar
 */

var navClock = document.querySelector('.nav-clock');
var clock = new Clock();
clock.refresh();
navClock.appendChild(clock.el);
setInterval(function() {
  clock.refresh();
}, 1000);

/**
 * Convert Date to Timestring
 */

function t(date) {
  var t = date.toTimeString().split(' ')[0];
  var meridiem = 'am';
  var parts = t.split(':');
  parts.pop();
  var h = parts[0];

  if (12 <= h) {
    h = (12 == h) ? h : h - 12;
    meridiem = 'pm';
  }
  t = parts.join(':');
  t = ('0' == t[0]) ? t.slice(1) : t;
  t += meridiem;
  return t;
}
