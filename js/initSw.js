if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Serverworker registration was successful
      console.log('Service worker succesfully registered: ', registration.scope);
    }, function(err) {
      // Somethings not right -- failed
      console.error('Something went wrong: ', err);
    });
  });
}
