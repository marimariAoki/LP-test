'use strict';

//ボタン
const btn = document.querySelector('#js-btn-scrollTop');
//クリックイベントを追加
btn.addEventListener( 'click' , () => {
  window.scroll({top: 0, behavior: 'smooth'});
});
//スクロール時のイベントを追加
window.addEventListener( 'scroll' , () => {
  if(window.scrollY > 800){
    btn.style.opacity = '1';
    btn.style.transition = 'ease-in-out .4s';
  }else	if(window.scrollY < 400){
    btn.style.opacity = '0';
    btn.style.transition = 'ease-in-out .4s';
  }
});