(function(document) {
  var metas = document.getElementsByTagName('meta'),
    setViewport = function() {
      var i,
        el,
        viewport,
        width,
        initialScale = 1.0;

      if (metas[0].name === 'viewport') {
        viewport = metas[0];
      } else {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
      }

      for (i = 0; i < metas.length; i++) {
        if (metas[i].name === 'viewport') {
          viewport = metas[i];
          break;
        }
      }

      if (viewport) {
        width = window.innerWidth || document.documentElement.clientWidth;
        if (width > 900) {
          initialScale = Math.min(width / 900, 2.0);
        }
        viewport.content = 'width=device-width, initial-scale=' + initialScale;
      }
    };

  setViewport();
  window.addEventListener('resize', setViewport);
})(document);