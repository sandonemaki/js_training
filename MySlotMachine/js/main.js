'use strict';

{
  class Panel {
    constructor() {
      const section = document.createElement('section');
      section.classList.add('panel');

      this.img = document.createElement('img');
      // this.img.src = 'img/seven.png';
      // 初期化のたびにランダムな画像を表示
      this.img.src = this.getRandomImage();

      // timeoutIdを初期化
      this.timeoutId = undefined;

      this.stop = document.createElement('div');
      this.stop.textContent = 'STOP';
      this.stop.classList.add('stop', 'inactive');
      this.stop.addEventListener('click', () => {
        if (this.stop.classList.contains('inactive')) {
          return;
        }
        this.stop.classList.add('inactive');
        clearTimeout(this.timeoutId);

        // stopボタンを押すごとにパネルの数を減らす
        panelsLeft--;

        // パネルの数が0になったらチェック関数を呼び出す
        if (panelsLeft === 0) {
          spin.classList.remove('inactive');
          panelsLeft = 3;
          // パネル同士を比較する処理なので、パネルクラスの外に定義する
          checkResult();
        }
      });

      section.appendChild(this.img);
      section.appendChild(this.stop);

      const main = document.querySelector('main');
      main.appendChild(section);
    }
    
    getRandomImage() {
      const images = [
        'img/seven.png',
        'img/bell.png',
        'img/cherry.png',
      ];
      return images[Math.floor(Math.random() * images.length)];
    }
    // 画像を設定する
    // thisのimgのsrcプロパティをランダムな画像のファイル名にする
    spin() {
      this.img.src = this.getRandomImage();
      // 50msごとに自分を呼ぶ
      this.timeoutId = setTimeout(() => {
        this.spin();
      }, 50);
    }
    
    isUnmatched(p1, p2) {
      // if (this.img.src !== p1.img.src && this.img.src !== p2.img.src) {
        // return true;
      // } else {
        // return false;
      // }
      return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
    }

    unmatch() {
      this.img.classList.add('unmatched');
    }

    activate() {
      this.img.classList.remove('unmatched');
      this.stop.classList.remove('inactive');
    }
  }

  function checkResult() {
    if (panels[0].isUnmatched(panels[1], panels[2])) {
      panels[0].unmatch();
    }
    if (panels[1].isUnmatched(panels[0], panels[2])) {
      panels[1].unmatch();
    }
    if (panels[2].isUnmatched(panels[0], panels[1])) {
      panels[2].unmatch();
    }
  }

  const panels = [
    new Panel(),
    new Panel(),
    new Panel(),
  ];

  // パネルの数の初期値
  let panelsLeft = 3;

  const spin = document.getElementById('spin');
  spin.addEventListener('click', () => {
    if (spin.classList.contains('inactive')) {
      return;
    }
    spin.classList.add('inactive');
    // パネルの画像を切り替える
    // そのためpanelsの各要素をforEachで回す
    panels.forEach(panel => {
      panel.activate();
      // panelクラスのspinというメソッドにまとめる
      panel.spin();
    });
  });

}
