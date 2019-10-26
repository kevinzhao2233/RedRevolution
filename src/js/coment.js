
new Valine({
  av: AV,
  el: '#comment', // 评论挂载点的 DOM
  app_id: 'kecLA3GMIVzqViqHjepNgM1t-gzGzoHsz', // APP ID
  app_key: 'znixXCJ81hDMfpLE84DvI710', // APP KEY
  placeholder: '在这里写下想对祖国或者先烈们说的话吧，最多50个字符哦', // 留言框占位提示文字
  pageSize: 49  // 限制首次加载评论个数
});

// 弹幕文字前面的小图标
const icon = [
  '#icon-guoqing',
  '#icon-guoqingzhuanlan',
  '#icon-Holiday-icon_guoqing',
  '#icon-guoqing-',
  '#icon-guoqing1',
  '#icon-guoqing-1',
  '#icon-guoqing2',
  '#icon-guoqing3',
]

let newCommentValue = '';

// ========== 为用户体验，限制评论的长度为50字；
const editor = document.querySelector('#veditor');
if (!!editor) {
  editor.maxLength = 50;
}

// ========== 获取一些必要的DOM元素
function getElementProp() {
  const barrage = document.querySelector('#barrage');   // 弹幕的大盒子
  const track = document.querySelectorAll('.track');     // 弹幕弹道
  const bullet = document.querySelectorAll('.track p');   // 子弹
  const commentLists = document.querySelectorAll('.vcontent p');   // 评论的话
  return ({ barrage, track, bullet, commentLists });
}

// ========== 创建文档碎片，加入弹幕
function createDocumentFragment(txt, icon, isNewCom) {      // 获取 Node 的字符串形式，转换成 Node 节点
  let newComClass = "";
  if (!!isNewCom) {
    newComClass = "active";
    console.log("============================新的弹幕即将出现===========================");
  } else {
    newComClass = "";
  }
  const template = `
  <p class="${newComClass}">
    <svg class="icon" aria-hidden="true">
      <use xlink: href="${icon}"></use>
    </svg>
    <span>${txt}</span>
  </p>`;
  let frag = document.createRange().createContextualFragment(template);
  return frag;
}

// ========== 将现有评论保存都数组中
const getComment = (commentLists) => {
  const comment = [];
  for (let com of commentLists) {
    comment.push(com.innerHTML.trim());    // 这里会返回一个数组长度，需要的时候记得过来
  }
  return comment;
}

// ========== 弹幕主体函数 =========== //
const barrageAnimation = () => {
  const elementProp = getElementProp();
  const bulletMarginR = getComputedStyle(elementProp.bullet[0], null).marginRight; // 子弹 margin-right
  const comment = getComment(elementProp.commentLists);          // 保存着已经存在的评论，评论为带有 p 标签的
  console.log("========== 弹幕主体函数取得所有弹幕数组 ==========",comment);
  let index = 0;                      // 用来循环数组的变量
  let iconIndex = 0                   // 用来循环icon的变量
  // ======== 加载弹幕
  function loadComm(comments) {
    const comm = comments[index];
    index++;
    if (index >= comments.length - 1) {
      index = 0;
    }
    return comm;
  }
  // ========= 加载图标
  function loadIcon(icons) {
    const icon = icons[iconIndex];
    iconIndex++;
    if (iconIndex >= icons.length) {
      iconIndex = 0;
    }
    return icon;
  }
  // ========= 循环
  setInterval(() => {
    for (let track of elementProp.track) {      // 遍历轨道
      if (track.lastElementChild) {
        const lastElem = {
          clientLeft: track.lastElementChild.getBoundingClientRect().left,
          width: track.lastElementChild.clientWidth
        }
        if ((lastElem.clientLeft + lastElem.width + parseInt(bulletMarginR)) < (barrage.clientWidth + barrage.getBoundingClientRect().left)) {
          const comm = loadComm(comment);   // 获取到即将加载到屏幕的评论
          const iconf = loadIcon(icon);
          if (newCommentValue == comm) {
            const newC = true;
            track.appendChild(createDocumentFragment(comm, iconf, newC));
            newCommentValue = '';
          } else {
            track.appendChild(createDocumentFragment(comm, iconf));
          }
        }
      }

      // ========= 删掉已经走出区域的弹幕
      if (track.firstElementChild) {
        const firstEle = {
          clientLeft: track.firstElementChild.getBoundingClientRect().left,
          width: track.firstElementChild.clientWidth
        }
        if ((firstEle.clientLeft + firstEle.width + parseInt(bulletMarginR)) < (barrage.getBoundingClientRect().left)) {
          track.removeChild(track.firstElementChild);
        }
      }
    }
  }, 489);
}

document.addEventListener('click', function (e) {
  if (e.target.innerHTML == '回复') {
    newCommentValue = document.querySelector('#veditor').value;
  }
})

document.addEventListener('keydown', function (e) {
  if (13 == e.keyCode && e.ctrlKey) {
    newCommentValue = document.querySelector('#veditor').value;
  }
})

// ========= 监听有没有评论被加到 DOM 结构，有的话，就调用弹幕函数
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
const vlist = document.querySelector('.vlist');
const Observer = new MutationObserver(function () {
  setTimeout(() => {
    barrageAnimation();
  }, 800);
});
Observer.observe(vlist, {
  childList: true,
  subtree: true
});