import { element } from "./view/html-util.js";

export class TodoItemView {
  /**
   * `todoItem`に対応するTodoアイテムのHTML要素を作成して返す
   * @param {TodoItemModel} todoItem
   * @param {function({id: string, completed: boolean})} onUpdateTodo チェックボックスの更新イベントリスナー
   * @param {function({id: string})} onDeleteTodo 削除ボタンのクリックイベントリスナー
   * @returns {Element}
   */
  // メソッドの中身はApp.jsから移動させてきた
  createElement(todoItem, { onUpdateTodo, onDeleteTodo }) {
    const todoItemElement = todoItem.completed
      ? element`<li><input type="checkbox" class="checkbox" checked>
          <s>${item.title}</s>
          <button class="delete">x</button>
        </li>`
      : element`<li><input type="checkbox" class="checkbox">
          ${item.title}
          <button class="delete">x</button>
        </li>`;

    // チェックボックスがトグルしたときのイベントリスナー関数を登録
    const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
    inputCheckboxElement.addEventListener("change", () => {
      // Appクラスが保持するtodoListModelのメソッドからコールバック関数に変更
      onUpdateTodo({
        id: todoItem.id,
        completed: !item.completed
      });
    });

    // 削除ボタン(x)がクリックされたときにTodoListModelからアイテムを削除する
    const deleteButtonElement = todoItemElement.querySelector(".delete");
    deleteButtonElement.addEventListener("click", () => {
      // Appクラスが保持するtodoListModelのメソッドからコールバック関数に変更
      onDeleteTodo({
        id: todoItem.id
      });
    });
    // 作成されたTodoアイテムのHTML要素を返す

  }

}
