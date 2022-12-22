'use strict';

{ 
  // HTMLのsectionと同じ要素をDOMを使って作成する
  function render(quiz) {
    const main = document.querySelector('main');
    
    const section = document.createElement('section');
    const h2 = document.createElement('h2');
    h2.textContent = quiz[0];

    const ul = document.createElement('ul');
    const li0 = document.createElement('li');
    li0.textContent = quiz[1];
    li0.addEventListener('click', () => {
      if (quiz[4] === 0) {
        li0.classList.add('correct');
      } else {
        li0.classList.add('wrong');
      }
    });
    const li1 = document.createElement('li');
    li1.textContent = quiz[2];
    li1.addEventListener('click', () => {
      if (quiz[4] === 1) {
        li1.classList.add('correct');
      } else {
        li1.classList.add('wrong');
      }
    });const li2 = document.createElement('li');
    li2.textContent = quiz[3];
    li2.addEventListener('click', () => {
      if (quiz[4] === 2) {
        li2.classList.add('correct');
      } else {
        li2.classList.add('wrong');
      }
    });
    ul.appendChild(li0);
    ul.appendChild(li1);
    ul.appendChild(li2);


    section.appendChild(h2);
    section.appendChild(ul);
    main.appendChild(section);
  }

  // 問題文, 選択肢, 選択肢, 選択肢, 正解(0, 1, 2)
  const quizzes = [
    ['1の正解は？', '選択肢 A', '選択肢 B', '選択肢 C', 0],
    ['2の正解は？', '選択肢 A', '選択肢 B', '選択肢 C', 1],
    ['3の正解は？', '選択肢 A', '選択肢 B', '選択肢 C', 2],
  ];
  
  quizzes.forEach((quiz) => {
    render(quiz);
  });
}
