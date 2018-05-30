(function() {
  var count = document.querySelector('.count');
  var first = document.querySelector('.first');
  var second = document.querySelector('.second');
  var clear = document.querySelector('.clear');
  var action = document.querySelector('.action');

  var max = 200;
  var step = 20;
  var roll_group = createRollGroup();
  var group = randomGroup();
  var onOff = false;
  var timer = null;
  var count_now = 0;

  action.onclick = function() {
    if (onOff) {
      var target_index = parseInt(roll_group[count_now - 1]);
      var target = group[target_index];
      first.innerHTML = toFixed(target[0]);
      second.innerHTML = toFixed(target[1]);
      this.innerHTML = '开始摇号';
      clearInterval(timer);
    } else {
      if (count_now >= roll_group.length) {
        alert('摇号结束');
        return;
      }
      count_now++;
      count.innerHTML = count_now;
      this.innerHTML = '停止摇号';
      rangeChange();
    }
    onOff = !onOff;
  };

  clear.onclick = function() {
    alert('并没有想到这个按钮有什么卵用...');
  };

  function rangeChange() {
    clearInterval(timer);
    timer = setInterval(function() {
      roll();
    }, 25);
  }

  function randomGroup() {
    var group = [];
    for (var i = 0; i < max; i++) {
      group.push([step * i + 1, step * (i + 1)]);
    }
    return group;
  }

  function roll() {
    var index = Math.floor(Math.random() * group.length);
    var target = group[index];
    first.innerHTML = toFixed(target[0]);
    second.innerHTML = toFixed(target[1]);
    return index;
  }

  function createRollGroup() {
    var len = 10;
    var arr = [];
    var userIndexGroup = getUserIndex();
    for (var i = 0; i < max; i++) {
      arr.push(i);
    }
    arr.sort(function() {
      return Math.random() > 0.5 ? -1 : 1;
    });
    arr = arr.splice(0, len);
    arr = userIndexGroup.concat(arr);
    arr = arr.splice(0, len);
    arr = distinct(arr);
    arr.sort(function() {
      return Math.random() > 0.5 ? 1 : -1;
    });
    var msg = '';
    for (var i = 0; i < arr.length; i ++) {
      if (typeof arr[i] === 'string') {
        msg += parseInt(i + 1) + ',';
      }
    }
    if (msg !== '') {
      msg = msg.replace(/,$/, '');
      msg = '内幕号码将会出现在第【'+ msg +'】组';
      alert(msg);
    }
    return arr;
  }

  function toFixed(n) {
    if (n < 10) {
      n = '000' + n;
    } else if (n >= 10 && n < 100) {
      n = '00' + n;
    } else if (n >= 100 && n < 1000) {
      n = '0' + n;
    } else {
      n = n.toString();
    }
    return n;
  }

  function getParam() {
    var pre = [];
    var search = window.location.search;
    if (search !== '' && !search.indexOf('=') > -1) {
      pre = search.replace('?', '').split(',');
      for (var i = 0; i < pre.length; i++) {
        pre[i] = parseInt(pre[i]);
      }
    }
    return pre;
  }

  function getUserIndex() {
    var arr = [];
    var userGroup = getParam();
    for (var i = 0; i < userGroup.length; i++) {
      var id = Math.floor(userGroup[i] / step);
      arr.push('+' + id);
    }
    return arr;
  }

  function distinct(arr) {
    var len = arr.length;
    for (var i = 0; i < len; i++) {
      for (var j = i + 1; j < len; j++) {
        if (arr[i] == arr[j]) {
          arr.splice(j, 1);
          len--;
          j--;
        }
      }
    }
    return arr;
  }
})();
