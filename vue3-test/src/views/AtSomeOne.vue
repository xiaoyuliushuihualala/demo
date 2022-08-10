<template>
  <div class="box">
    <div
      class="user-list-box"
      v-if="state.showSelectPeople"
      :style="{
        left: state.position.x + 'px',
        top: state.position.y + 'px',
      }"
    >
      <ul>
        <li
          v-for="item in state.userList"
          :key="item"
          @click="selectPeople(item)"
          class="user-list-item"
        >
          {{ item }}
        </li>
      </ul>
    </div>
    <div class="input-container">
      <div
        class="edittable-content"
        contenteditable="plaintext-only"
        ref="atInput"
        @input="handleInput"
      />
    </div>
    <div class="operation-bar">
      <div class="limited">
        <span :class="{ error: state.inputLength > state.maxlength }"
          >{{ state.inputLength }} </span
        >/{{ state.maxlength }}
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

const state = reactive({
  maxlength: 100,
  userList: ["张三", "李四", "王五", "老六"],
  showSelectPeople: false,
  pos: 0, //光标所在位置的偏移量
  inputLength: 0,
  searchVal: "",
  focusNode: Node, //光标所在节点
  focusOffset: 0, //光标所在位置
  position: {
    x: 0,
    y: 0,
  },
});

const atInput = ref(null);

const handleInput = (e) => {
  state.pos = getCurrentPosition(atInput.value);
  state.inputLength = atInput.value.innerText.length;
  if (state.inputLength >= state.maxlength) {
    atInput.value.contenteditable = false;
  }

  if (e.target) {
    var lastData = "";
    if (e.currentTarget.lastChild && !e.currentTarget.lastChild.className) {
      //最后一个文本节可能是空格后的一个节点它的textContent是空，但是相邻的文本节点其实是有数据的
      lastData =
        e.currentTarget.lastChild.textContent ||
        e.currentTarget.lastChild.wholeText;
    } else {
      lastData = "";
    }
    if (e.inputType === "deleteContentBackward") {
      //如果是删除的话，搜索的关键词是最后的@后的词
      state.showSelectPeople = true;
      if (lastData.indexOf("@") < 0) {
        state.showSelectPeople = false;
        return;
      }

      state.searchVal = lastData.substr(lastData.lastIndexOf("@") + 1);
      return;
    }
    getRangeRect();

    if (lastData.indexOf("@") > -1 && e.data !== "@") {
      state.searchVal = lastData.substr(lastData.lastIndexOf("@") + 1);
    }
  }

  setFocusNode(e);

  if (e.data === "@") {
    state.searchVal = "";
    openSelectPeopleList();
  }
};
const setFocusNode = (e) => {
  if (e.data === "@" && !e.target) {
    state.focusNode = e.textEle;
    state.focusOffset = e.textEle.data.length;
  } else {
    var selection = window.getSelection();
    state.focusNode = selection.focusNode;
    state.focusOffset = selection.focusOffset;
  }
};
const openSelectPeopleList = () => {
  state.showSelectPeople = true;
};
const getRangeRect = () => {
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);
  const rect = range.getClientRects()[0];
  const LINE_HEIGHT = 30;
  state.position = {
    x: rect.x,
    y: rect.y + LINE_HEIGHT,
  };
};
const getCurrentPosition = (element: Element) => {
  var caretOffset = 0;
  var doc = element.ownerDocument || element.document;
  var win = doc.defaultView || doc.parentWindow;
  var sel;

  if (typeof win.getSelection != "undefined") {
    sel = win.getSelection();
    // 选中的区域
    if (sel.rangeCount > 0) {
      var range = win.getSelection().getRangeAt(0);
      // 克隆一个选中区域
      var preCaretRange = range.cloneRange();
      // 设置选中区域的节点内容为当前节点
      preCaretRange.selectNodeContents(element);
      // 重置选中区域的结束位置
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    }
  }
  return caretOffset;
};
const selectPeople = (item) => {
  atInput.value.focus();
  var selection = window.getSelection();
  var range = selection.getRangeAt(0);
  let atIndex = state.focusNode.data.lastIndexOf("@");
  range.setStart(state.focusNode, atIndex);
  range.setEnd(state.focusNode, state.focusOffset);
  // 删除输入的 @ 到选择之前之间的数据
  range.deleteContents();

  let element = createChild(item);
  insertChild(atInput.value, element);

  state.showSelectPeople = false;
  state.inputLength = atInput.value.innerText.length;
};
const createChild = (item) => {
  let element: any;
  if (item) {
    element = document.createElement("a");
    element.className = "at_person";
    element.style.color = "#1890ff";
    element.href = "";
    element.target = "_bank";
    element.contentEditable = "false";
    element.innerText = `@${item}`;
  } else {
    element = document.createTextNode(item);
  }
  return element;
};
const insertChild = (el, element) => {
  if (window.getSelection) {
    var selection = window.getSelection();

    if (!selection.anchorNode) {
      return;
    }
    //空格
    // let text = String.fromCodePoint('0020')
    // let textNode = document.createTextNode(text)
    let textNode = document.createTextNode("\u00A0");
    let spanNode = document.createElement("span");

    var atInputElText = el.innerText;
    if (state.pos - 1 === atInputElText.length) {
      if (state.pos === 1) {
        el.appendChild(spanNode);
      }
      //光标在文本最后直接插入节点
      el.appendChild(element);
      el.appendChild(textNode);
    } else {
      // 获取光标对象
      var range = selection.getRangeAt(0);
      range.insertNode(textNode);
      range.insertNode(element);
    }

    range = document.createRange();
    range.selectNode(textNode);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }
};

onMounted(() => {
  document.addEventListener("keyup", (e: any) => {
    if (e.code === "Backspace") {
      console.log(e);
    }
  });
});
</script>
<style lang="less" scoped>
.box {
  width: 400px;
  position: relative;
}
.edittable-content {
  border: 1px solid rgba(159, 168, 181, 0.5);
  border-radius: 6px;
  background: #fff;
  height: 100px;
  line-height: 1.4;
  padding: 6px 8px 24px 8px;
  outline: none;
  resize: none;
  overflow-y: auto;
  word-break: break-all;
  word-wrap: break-word;
  white-space: normal;
  text-align: left;
  min-height: 56px;
}
.operation-bar {
  font-size: 12px;
  color: #999;
  position: absolute;
  right: 8px;
  bottom: 8px;
}
.user-list-box {
  position: fixed;
  border: 1px solid rgba(159, 168, 181, 0.5);
  width: 200px;
  border-radius: 6px;
  box-shadow: 4px 3px 12px #d4d4d4;
  background: #fff;
  ul {
    padding: unset;
    li {
      display: block;
      padding: 8px 0;
      &:hover {
        background: rgb(238, 235, 235);
      }
    }
  }
}
</style>
