'use strict';

{
  const dts = document.querySelectorAll('dt');

  dts.forEach(dt => {
    dt.addEventListener('click', () => {
      // + -> ×, ddタグnone -> block
      dt.parentNode.classList.toggle('appear');

      dts.forEach(el => {
        if (dt !== el) {
          console.log(el)
          el.parentNode.classList.remove('appear');
        }
      });
    });
  });
}
