import './style.scss';
import 'pure-full-page/lib/pureFullPage.min.css';
import PureFullPage from 'pure-full-page';
import './js/coment';

new PureFullPage().init();

const loading = document.querySelector('.loading');
loading.style.display = 'none';


/* ============== 模拟点击事件 方便调试 ================*/
const defaultPage = document.querySelectorAll('.nav-dot')[3];

const ev = new MouseEvent('click', {
  cancelable: true,
  bubble: true,
  view: window
});
defaultPage.dispatchEvent(ev);
/* ====================================================*/
