import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from './view/TodoListView.js';
import { render } from "./view/html-util.js";

export class App {
  #todoListModel = new TodoListModel();
  #todoListView = new TodoListView();

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * @param {string} title
   */
  handleAdd(title) {
    this.#todoListModel.addTodo(new TodoItemModel({ title, completed: false }));
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
  */
  handleUpdate({ id, completed }) {
    this.#todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * @param {{ id: number }}
   */
  handleDelete({ id }) {
    this.#todoListModel.deleteTodo({ id });
  }


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
    this.#todoListModel.onChange(() => {

      // それぞれのTodoItem要素をtodoListElement以下へ追加する
      const todoItems = this.#todoListModel.getTodoItems();

      // todoItemsに対応するTodoListViewを作成する
      const todoListElement = this.#todoListView.createElement(todoItems, {
        // Todoアイテムが更新イベントをハッシエしたときに呼ばれるリスナー関数
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        // Todoアイテムが削除イベントを発生したときに呼ばれるリスナー関数
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        }
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
      this.handleAdd(inputElement.value);

      // 入力欄をから文字列にしてリセットする
      inputElement.value = "";

    });
  }
}
