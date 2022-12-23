export function escapeSpecialChars(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");  
}

/**
 * HTML文字列からHTML要素を作成して返す
 * @param {string} html
 */
export function htmlToElement(html) {
  const template = document.createElement("template");
  // DocumentFragment のHTML文字列の断片に{String} html を代入 
  // HTML要素を作成
  template.innerHTML = html;
  // DocumentFragment の最初の子要素
  // @param {Element} を返す
  return template.content.firstElementChild;
}

  /**
   * HTML文字列からDOM Nodeを作成して返すタグ関数
   * @return {Element} <li>value</li>（liタグ+入力文字列）
   * @param  {Element} [<li>,</li>] 初期値:<li>, str:</li>
   * @param {String} valuesは入力文字列
   */
  export function element(strings, ...values) {
    const htmlString = strings.reduce((result, str, i) => {
      const value = values[i - 1];
      if (typeof value === "string") {
        return result + escapeSpecialChars(value) + str;
      } else {
        return result + String(value) + str;
      }
    });
    return htmlToElement(htmlString); 
  }

  /**
   * コンテナ要素の中身をbodyElementで上書きする
   * @param {Element} bodyElement コンテナ要素の中身となる要素
   * @param {Element} containerElement コンテナ要素
   */
  export function render(bodyElement, containerElement) {
    // containerElementの中身を空にする
    containerElement.innerHTML = "";
    // containerElementの直下にbodyElementを追加する
    containerElement.appendChild(bodyElement);
  }

