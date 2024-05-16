// #ifdef H5
(function () {
  var u = navigator.userAgent,
    w = window.innerWidth;
	
  if (!u.match(/AppleWebKit.*Mobile.*/) || u.indexOf("iPad") > -1) {
		window.innerWidth = 750 * (w / 750);
		window.onload = function () {
		  window.innerWidth = w;
		};
  }
})();
// #endif