const goikenBox = document.getElementById('js-btn-goiken-box');
window.addEventListener("scroll" , () => {
    console.log('スクロールされています！');
  if(window.scrollY < 700) {
    goikenBox.style.opacity = '1';
    goikenBox.style.transition = 'ease-in-out .4s';
  } else if(window.scrollY < 400) {
    goikenBox.style.opacity = '0';
    goikenBox.style.transition = 'ease-in-out .4s';
  } else {
    const btnText = document.getElementById('btn-text');
    btnText.style.display = 'none';
    btnText.style.transition = 'ease-in-out .4s';
    goikenBox.style.width = '100px';
  }
});