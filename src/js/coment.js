new Valine({
  av: AV,
  el: '#comment', // 评论挂载点的 DOM
  app_id: 'kecLA3GMIVzqViqHjepNgM1t-gzGzoHsz', // APP ID
  app_key: 'znixXCJ81hDMfpLE84DvI710', // APP KEY
  placeholder: '在这里写下想对祖国或者先烈们说的话吧，最多50个字符哦' // 留言框占位提示文字
});

// 为用户体验，限制评论的长度为50字；
const editor = document.querySelector('#veditor');
if (editor) {
  editor.maxLength = 50;
}
console.log(editor.maxLength);

function getElementProp() {
  const barrage = document.querySelector('#barrage');   // 弹幕的大盒子
  const track = document.querySelectorAll('.track');     // 弹幕弹道
  const bullet = document.querySelectorAll('.track p');   // 子弹
  return ({ barrage, track, bullet });
}

function createDocumentFragment(txt) {      // 获取 Node 的字符串形式，转换成 Node 节点
  const template = `${txt}`;
  let frag = document.createRange().createContextualFragment(template);
  return frag;
}

const commentLists = document.getElementsByClassName('vcontent');   // 评论的话
const comment = [];   // 保存着已经存在的评论，评论为带有 p 标签的
const getComment = () => {
  for (let com of commentLists) {
    comment.unshift(com.innerHTML.trim());    // 这里会返回一个数组长度，需要的时候记得过来
  }
  console.log(comment);
}


const barrageAnimation = (newComment) => {
  const elementProp = getElementProp();
  const tempComment = [...comment];   // 用来循环的评论数组，copy
  let index = 0;
  if (!!newComment) {
    tempComment.splice(index + 1, 0, `<p>${newComment}</p>`);
  }
  const bulletMarginR = getComputedStyle(elementProp.bullet[0], null).marginRight; // 子弹 margin-right
  setInterval(() => {
    for (let track of elementProp.track) {      // 遍历轨道
      if (track.lastElementChild) {
        const comm = tempComment[index];
        index++;
        if (index >= tempComment.length) {
          index = 0;
        }

        const lastElem = {
          clientLeft: track.lastElementChild.getBoundingClientRect().left,
          width: track.lastElementChild.clientWidth
        }
        if ((lastElem.clientLeft + lastElem.width + parseInt(bulletMarginR)) < (barrage.clientWidth + barrage.getBoundingClientRect().left)) {
          track.appendChild(createDocumentFragment(comm));
        }
      } else {
        // TODO: 如果所有轨道都没有子弹
      }
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
  }, 800);
}

const btnSubmit = document.querySelector('.vsubmit');
btnSubmit.addEventListener('click', function () {
  let submitValue = document.querySelector('#veditor').value;
  console.log(submitValue, 'aaaaaa');
  barrageAnimation(submitValue);
})

setTimeout(() => {
  getComment();
  barrageAnimation();
}, 1200);
