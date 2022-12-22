'use strict';

{
  ///////////////////////////////////////////
  // Panel class
  //
  ///////////////////////////////////////////
  class Panel {
    constructor(game) {
      // Boardクラスでnew Panelの引数としてgameが渡された結果、constructorにgameが渡ってきた
      this.game = game
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      this.el.addEventListener('click', () => {
        this.check();
      });
    }
    getEl() {
      return this.el;
    }

    activate(num) {
      this.el.classList.remove('pressed');
      this.el.textContent = num;
    }

    check() {
      if (this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) {
        this.el.classList.add('pressed');
        this.game.addCurrentNum();

        if (this.game.getCurrentNum() === this.game.getLevel() ** 2) {
          clearTimeout(this.game.getTimeoutId());
        }
      }
    }

    //check() {
    //  if (currentNum === parseInt(this.el.textContent, 10)) {
    //    this.el.classList.add('pressed');
    //    currentNum++;

    //    if (currentNum === 4) {
    //      clearTimeout(timeoutId);
    //    }
    //  }
    //}
  }//Panel class
 
  ///////////////////////////////////////////
  // Board class
  //
  ///////////////////////////////////////////
  class Board {
    // gameクラス内からnewで呼び出された結果のインスタンスを受け取る
    constructor(game) {
      this.game = game;
      // 4枚のパネルを管理するためプロパティで配列として持つ
      this.panels = [];
      // for (let i = 0; i < 4; i++) {
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        // gameクラスから渡ってきたgameをthis.gameに代入した値を引数にとってPanelクラスのインスタンスを作成する
        this.panels.push(new Panel(this.game));
      }
      this.setup();
    }
    
    setup() {
      const board = document.getElementById('board');
      this.panels.forEach(panel => {
        board.appendChild(panel.getEl());
      });
    }

    activate() {
      const nums = [];
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        nums.push(i);
      }
      this.panels.forEach(panel => {
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1);
        panel.activate(num);
      });
    }
  }//Board class

  
  ///////////////////////////////////////////
  // Game class
  //
  ///////////////////////////////////////////
  class Game {
    constructor(level) {
      // 使うのはBoardクラスのパネルの数やnumsの数
      // 直接値を操作できないよう、メソッドを自分のクラスで定義する
      this.level = level;
      this.board = new Board(this); // 押し込むべき数値をcurrentNumで保持する
      this.currentNum = undefined;
      // ボタンを押した時の現在時刻を保持する
      this.startTime = undefined;
      // timerを止めるための変数
      this.timeoutId = undefined;

      const btn = document.getElementById('btn');
      btn.addEventListener('click', () => {
        this.start();
      });

      this.setup();
    }//constructor

    // containerの幅を動的に変更する
    setup() {
      const container = document.getElementById('container');
      const PANEL_WIDTH = 50;
      const BOARD_PADDING = 10;
      /* 50px * 2 + 10px * 2 */
      container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING *2 + 'px';
    }

    // btnを押すごとにtimerが走ってしまうので、timerを止める
    start() {
      if (typeof this.timeoutId !== 'undefined') {
        clearTimeout(this.timeoutId);
      }
      
      // startボタンを押した時にcurrentNumを初期化する
      this.currentNum = 0;
      this.board.activate();

      this.startTime = Date.now();
      this.runTimer();
    }

    runTimer() {
      const timer = document.getElementById('timer');
      timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);

      // runTimer自身を呼び出してあげる
      this.timeoutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }

    addCurrentNum() {
      this.currentNum++;
    }

    getCurrentNum() {
      return this.currentNum;
    }

    getTimeoutId() {
      return this.timeoutId;
    }

    getLevel() {
      return this.level;
    }

  }//Game class

  // 2*2なら2にする
  new Game(5);

}
