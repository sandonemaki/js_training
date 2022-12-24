export class EventEmitter {
  // 登録する [イベント名, Set(リスナー関数)]を管理するMap
  // jsのmapはすべてキーバリューのハッシュ、連想配列になる
  // has、add、get、setメソッドを持つ
  // オブジェクトをmapとして扱える
  #listeners = new Map();
  /**
   * 指定したイベントが実行されたときに呼び出されるリスナー関数を登録する
   * @param {string} type イベント名
   * @param {Function} listener イベントリスナー
   */
  addEventListener(type, listener) {
    // 指定したイベントに対応するSetを作成しリスナー関数を登録する
    // キー（イベント名）で新しいsetオブジェクト格納
    // map.set(key, value) キーで、値を格納します
    // has: 特定のキーにひもづいた値を持っているかを確認する
    if (!this.#listeners.has(type)) {
      // App.jsのonChangeメソッド呼び出し時の引数が25行目でvalueのSet(0)に追加される
      // App.js <this.#todoListModel.onChange(() => {})>
      this.#listeners.set(type, new Set());
    }
    // getメソッドは特定のキーにひもづいた値を取り出す
    const listenerSet = this.#listeners.get(type);
    // valueであるSet(1)にlistenerがセットされる
    listenerSet.add(listener);
  }

  /**
   * 指定したイベントをディスパッチする
   * @param {string} type イベント名
   */
  emit(type) {
    // 指定したイベントに対応するSetを取り出し、すべてのリスナー関数を呼び出す
    // getメソッドは特定のキーにひもづいた値を取り出す
    const listenerSet = this.#listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach(listener => {
      // thisはなくても動く。ここでは特定の値の配列からlistenerを呼び出すので、
      // thisはlistenerSetになる
      listener.call(this);
    });
  }
}
