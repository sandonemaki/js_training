import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
  // 1. TodoListModelの初期化
  #todoListModel = new TodoListModel(); //改良

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count");

    // -----------------------
    // リロードした時
    // - index.jsからmountメソッドが呼び出される
    // - ２のonChange目ヲッどを呼び出し、関数を登録する
    //
    // inputにテキスト入力した時
    // - subumitイベントを発生させる
    // - emitChange()が呼び出される
    // - ２のonchangeメソッドの呼び出し時に渡した関数を呼び出す
    // -----------------------

    // 2. TodoListModelの状態が更新されたら表示を更新する
    this.#todoListModel.onChange(() => {//改良
      // TodoリストをまとめるList要素
      const todoListElement = element`<ul></ul>`;

      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.#todoListModel.getTodoItems(); //改良

      // submitイベントが発生したときに直接DOM操作をしていた-> TodoListModelにTodoItemsを追加
      todoItems.forEach(item => {
        // 完了済みならchecked属性をつけ、未完了ならchecked属性を外す
        // input要素にはcheckboxクラスをつける
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox" checked><s>${item.title}</s></li>`
          : element`<li><input type="checkbox" class="checkbox">${item.title}</li>`;
        // TodoアイテムをtodoListElementに追加する
        todoListElement.appendChild(todoItemElement);
      });

      // コンテナ要素の中身をTodoリストをまとめるList要素で上書きする
      render(todoListElement, containerElement);

      // アイテム数の表示を更新
      todoItemCountElement.textContent = `Todoアイテム数: ${this.#todoListModel.getTotalCount()}`;
    });


    // 3. フォームを送信したら、新しいTodoItemModelを追加する
    formElement.addEventListener("submit", (event) => {
      // 本来のsubmitイベントの動作をとめる
      event.preventDefault();

      // 新しいTodoItemをTodoListへ追加する
      this.#todoListModel.addTodo(new TodoItemModel({ //改良
        title: inputElement.value,
        completed: false
      }));

      // 入力欄をから文字列にしてリセットする
      inputElement.value = "";

    });

  }
}
