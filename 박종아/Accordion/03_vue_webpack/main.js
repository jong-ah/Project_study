import Vue from 'vue';
import accordion from './accordion';

new Vue({
  render: createElement => createElement(accordion),
}).$mount('#root');
