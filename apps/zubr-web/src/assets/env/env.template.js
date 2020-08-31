(function(window) {
  window.env = window.env || {};

  // Inject environment variables
  window["env"]["apiUrl"] = "${API_URL}";
})(this);
