new Valine({
  av: AV,
  el: '#comment', // 评论挂载点的 DOM
  app_id: 'kecLA3GMIVzqViqHjepNgM1t-gzGzoHsz', // APP ID
  app_key: 'znixXCJ81hDMfpLE84DvI710', // APP KEY
  placeholder: '在这里写下想对祖国或者先烈们说的话吧，最多50个字符哦' // 留言框占位提示文字
});

const editor = document.querySelector('#veditor');
if(editor) {
  editor.maxLength = 50;
}
console.log(editor.maxLength)

/**
 *思路
 * 在页面load后，使用延时加载评论（这个日后可以改一改，看看能不能监听请求）
 * 将评论连同 p 标签保存到 comment[] 
 * 弹幕尝试使用 requestAnimationFrame，增加页面流畅度
 * 先让一个子弹左边对齐父容器右边缘，然后计算父容器宽度（1000px）+ 子弹宽度，
 * 这样就能确定一个子弹经过的时间（速度固定）
 * 为子弹添加的动画尽量是 transform，不要用left等等
 */

const getElementProp = () => {
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

const rate = 1;     // 速度

const barrageAnimation = () => {
  const elementProp = getElementProp();
  const tempComment = [...comment];
  const bulletMarginR = getComputedStyle(elementProp.bullet[0], null).marginRight; // 子弹 margin-right
  setInterval(() => {
    for (let track of elementProp.track) {      // 遍历轨道
      if (track.lastElementChild) {
        const lastElem = {
          clientLeft: track.lastElementChild.getBoundingClientRect().left,
          width: track.lastElementChild.clientWidth
        }
        if ((lastElem.clientLeft + lastElem.width + parseInt(bulletMarginR)) < (barrage.clientWidth + barrage.getBoundingClientRect().left)) {
          track.appendChild(createDocumentFragment(tempComment[1]));
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
          console.log('可以删掉的');
        }
      }
    }
  }, 500);
}


setTimeout(() => {    //TODO: 延迟，让JS能够加载到评论，这个以后可以改一下
  getComment();
  barrageAnimation();
}, 1000);
