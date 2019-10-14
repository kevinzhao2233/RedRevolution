new Valine({
  av: AV,
  el: '#comment', // 评论挂载点的 DOM
  app_id: 'kecLA3GMIVzqViqHjepNgM1t-gzGzoHsz', // APP ID
  app_key: 'znixXCJ81hDMfpLE84DvI710', // APP KEY
  placeholder: '在这里写下想对祖国或者先烈们说的话吧，最多50个字符哦', // 留言框占位提示文字
  pageSize: 49
});

let commentBackup = [];

// ========== 为用户体验，限制评论的长度为50字；
const editor = document.querySelector('#veditor');
if (editor) {
  editor.maxLength = 50;
}

// ========== 获取一些必要的DOM元素
function getElementProp() {
  const barrage = document.querySelector('#barrage');   // 弹幕的大盒子
  const track = document.querySelectorAll('.track');     // 弹幕弹道
  const bullet = document.querySelectorAll('.track p');   // 子弹
  const commentLists = document.getElementsByClassName('vcontent');   // 评论的话
  return ({ barrage, track, bullet, commentLists });
}

// ========== 创建文档碎片，加入弹幕
function createDocumentFragment(txt) {      // 获取 Node 的字符串形式，转换成 Node 节点
  const template = `${txt}`;
  let frag = document.createRange().createContextualFragment(template);
  return frag;
}

// ========== 将现有评论保存都数组中
const getComment = (commentLists) => {
  const comment = [];
  for (let com of commentLists) {
    comment.unshift(com.innerHTML.trim());    // 这里会返回一个数组长度，需要的时候记得过来
  }
  console.log(comment);
  return comment;
}

// ========== 弹幕主体函数 =========== //
const barrageAnimation = (newComm) => {
  const elementProp = getElementProp();
  const bulletMarginR = getComputedStyle(elementProp.bullet[0], null).marginRight; // 子弹 margin-right
  const comment = getComment(elementProp.commentLists);          // 保存着已经存在的评论，评论为带有 p 标签的
  commentBackup = [...comment];
  console.log(commentBackup)
  let index = 0;                      // 用来循环数组的变量

  if (!!newComm) {
    comment.unshift(newComm);
  }
  
  function loadComm() {
    const comm = comment[index];
    index++;
    if (index >= comment.length) {
      index = 0;
    }
    return comm;
  }

  setInterval(() => {
    for (let track of elementProp.track) {      // 遍历轨道
      if (track.lastElementChild) {
        const lastElem = {
          clientLeft: track.lastElementChild.getBoundingClientRect().left,
          width: track.lastElementChild.clientWidth
        }
        if ((lastElem.clientLeft + lastElem.width + parseInt(bulletMarginR)) < (barrage.clientWidth + barrage.getBoundingClientRect().left)) {
          const comm = loadComm();   // 获取到即将加载到屏幕的评论
          track.appendChild(createDocumentFragment(comm));
        }
      } else {
        // TODO: 有轨道没有子弹
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

  }, 789);
}

document.addEventListener('click', function (e) {
  if (e.target.classList.value == 'vsubmit vbtn') {
    submitComm();
  }
})
document.addEventListener('keyup', function (e) {
  if (e.keyCode == 13 && e.ctrlKey) {
    submitComm();
  }
})

// ========== 提交按钮
const submitComm = () => {
  console.log('提交评论成功');
  setTimeout(() => {
    const submitValue = document.getElementsByClassName('vcontent')[0].innerHTML.trim();
    if (submitValue === commentBackup[commentBackup.length - 1]) {
      console.log('没有新的评论列表');
    } else {
      console.log(submitValue, '有新的评论')
      barrageAnimation(submitValue);
    }
  }, 400);
}



setTimeout(() => {
  barrageAnimation();
}, 1200);
