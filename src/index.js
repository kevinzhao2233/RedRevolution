import './style.scss';
import 'pure-full-page/lib/pureFullPage.min.css';
import PureFullPage from 'pure-full-page';
import './js/coment';
import './img/icon/iconfont';


new PureFullPage().init();

setTimeout(() => {
  const loading = document.querySelector('.loading');
  loading.style.display = 'none';
}, 1000);



/* ============== 模拟点击事件 方便调试 ================
const defaultPage = document.querySelectorAll('.nav-dot')[0];

const ev = new MouseEvent('click', {
  cancelable: true,
  bubble: true,
  view: window
});
defaultPage.dispatchEvent(ev);
/* ====================================================*/
