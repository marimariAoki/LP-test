'use strict';

const btn = document.querySelector('#js-btn-scrollTop');

btn.addEventListener("click", () => {
  console.log("クリックされています");

  // #btn 要素までのオフセットを取得
  const offsetTop = document.querySelector('#header').offsetTop;

  // スムーススクロールで指定位置まで移動
  window.scroll({
    top: offsetTop,
    behavior: "smooth",
  });
});

