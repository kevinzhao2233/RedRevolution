import './style.scss';
import 'pure-full-page/lib/pureFullPage.min.css';
import PureFullPage from 'pure-full-page';


new PureFullPage().init();

const loading = document.querySelector('.loading');
loading.style.display = 'none';
