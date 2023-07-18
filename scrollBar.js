/*
 * @Author: gaiwa gaiwa@163.com
 * @Date: 2023-07-18 15:41:13
 * @LastEditors: gaiwa gaiwa@163.com
 * @LastEditTime: 2023-07-18 17:39:17
 * @FilePath: \html\work\js\day17\scrollbar\scrollBar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 获取DOM元素
var oWrap = document.querySelector('.wrap');
var oCon = document.querySelector('.con');
var oScroll = document.querySelector('.scroll');
var oBar = document.querySelector('.scrollBar');
// 事件分流
var eventTypeMap = {
  isDown: false,
  start: {
    y: 0,
    top: 0
  },
  _y: null,
  ratio: 3.84,
  'mousedown': function(e){
    this.isDown = true;
    this.start.y = e.clientY;
    this.start.top = oBar.offsetTop;
  },
  'mousemove': function(e){
    if (!this.isDown){
      return false;
    }
    var diffY =  e.clientY - this.start.y;
    this._y = this.start.top + diffY;
    this._y = Math.max(0,_y);
    this._y = Math.min(oScroll.offsetHeight - oBar.offsetHeight,_y);
    oBar.style.top = this._y + 'px'; 
    oCon.style.marginTop = -this._y * this.ratio + 'px';
  },
  'mouseup': function(e){
    if (!this.isDown){
      return false;
    }
    this.isDown = false;
  },
  'mousewheel': function(e){
    if(e.wheelDelta < 0){
      this._y += 10;
    } else {
      this._y -= 10;
    }
    this._y = Math.max(0, this._y);
    this._y = Math.min(oScroll.offsetHeight - oBar.offsetHeight, this._y);
    oBar.style.top = this._y + 'px'; 
    oCon.style.marginTop = -this._y * this.ratio + 'px';
  }
}
// 拖拽函数
function touchSroll(e){
  if(eventTypeMap[e.type] && typeof eventTypeMap[e.type] === 'function'){
    eventTypeMap[e.type](e);
  }
}
// 初始化函数
function initScroll() {
  oBar.style.height = (oWrap.offsetHeight / oCon.offsetHeight) * oScroll.offsetHeight + 'px';
}
initScroll();
// 事件监听
oBar.addEventListener('mousedown',touchSroll,false);
document.addEventListener('mousemove',touchSroll,false);
document.addEventListener('mouseup', touchSroll,false);
oWrap.addEventListener('mousewheel',touchSroll,false);
