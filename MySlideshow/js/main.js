'use strict';

{
  const images = [
    'img/pic00.png',
    'img/pic01.png',
    'img/pic02.png',
    'img/pic03.png',
    'img/pic04.png',
    'img/pic05.png',
    'img/pic06.png',
    'img/pic07.png',
  ];

  let currentIndex = 0;

  const mainImage = document.getElementById('main');
  mainImage.src = images[currentIndex];
  
  // images を each で回して命令する
  images.forEach((image, index) => {
    // mig エレメントを作成してsrc属性を付与
    const img = document.createElement('img');
    img.src = image;
    // イメージの数分回転しながらli エレメントを作成
    const li = document.createElement('li');
    // もし index が currentIndex と同じならば current クラスをli に付与
    if (index === currentIndex) {
      li.classList.add('current');
    }
    // li に対してクリックしたら、mainImageのsrc属性にimageを代入する
    li.addEventListener('click', () => {
      mainImage.src = image;
      // 一度全てのcurrentIndexを削除してからクリックされたものに付与する
      // そのため全てのthumbnails要素を取得
      const thumbnails = document.querySelectorAll('.thumbnails > li');
      // thumbnails要素のcurrentIndex番目からcurrent要素を削除 
      thumbnails[currentIndex].classList.remove('current');
      // currentIndexにindexを再代入
      currentIndex = index;
      thumbnails[currentIndex].classList.add('current');
    });

    // img 要素を li エレメントの子にする
    li.appendChild(img);
    // thumbnails 要素を取得して li エレメントを子にする
    document.querySelector('.thumbnails').appendChild(li);
  });

  // 次へボタン
  const next = document.getElementById('next');
  next.addEventListener('click', () => {
    let target = currentIndex + 1; 
    if (target === images.length) {
      target = 0;
    }
    // li要素に対して click をすると上で設定したli要素に対するclick
    // イベントが発動した時の命令が実行される
    document.querySelectorAll('.thumbnails > li')[target].click();

  });

  // 前へボタン
  const prev = document.getElementById('prev');
  prev.addEventListener('click', () => {
    let target = currentIndex - 1;
    if (target < 0) {
      target = images.length - 1;
    }
    document.querySelectorAll('.thumbnails > li')[target].click();
  });

  let timeoutId;

  function playSlideshow() {
    // nextをclickした時と同じ処理
    timeoutId = setTimeout(() => {
      // 1秒後に実行される
      next.click();
      // ここでまた呼ばれるので1秒後に実行される
      playSlideshow();
    }, 1000);
  }

  let isPlaying = false;

  // playボタン
  const play = document.getElementById('play');
  play.addEventListener('click', () => {
    if (isPlaying === false) {
      playSlideshow();
      play.textContent = 'Pause'
    } else {
      clearTimeout(timeoutId);
      play.textContent = 'Play'
    }
    // ボタンがclickされる度にture/falseを反転させる
    isPlaying = !isPlaying;
  });
}
