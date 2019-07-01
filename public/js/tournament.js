var socket = window.socket;
var sg = window.io.connect('/tournaments'); // the games conection
var g_i_s = {
  i: document.getElementById("g-i-img"),
  t: document.getElementById("g-i-type"),
  u: document.getElementById("g-i-username"),
  m: document.getElementById("g-i-map"),
  a: document.getElementById("g-i-ar"),
  p: document.getElementById("g-i-pnum"),
  pt: document.getElementById("g-i-table-b")
};