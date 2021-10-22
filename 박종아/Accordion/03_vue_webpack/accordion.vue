<template>
  <div>
    <h2>Animated Accordion</h2>
    In this example we have added a "plus" sign to each button. When the user
    clicks on the button, the "plus" sign is replaced with a "minus" sign.
    <div v-for="(section, index) in data" :key="index">
      <button ref="acc" @click="handleSectionNum(index)" class="accordion">
        {{ section.title }}
      </button>
      <div class="panel">
        <p>{{ section.content }}</p>
      </div>
    </div>
  </div>
</template>

<script>
const data = [
  {
    title: `Section 1`,
    content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat.`,
  },
  {
    title: `Section 2`,
    content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.`,
  },
  {
    title: `Section 3`,
    content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.`,
  },
];
export default {
  data() {
    return {
      data: data,
      selected: [],
    };
  },
  methods: {
    handleSectionNum(index) {
      if (this.selected.includes(index)) {
        this.selected = this.selected.filter(item => item !== index);
      } else {
        this.selected.push(index);
      }

      for (let item = 0; item < this.data.length; item++) {
        let now = this.$refs.acc[item];
        let panel = now.nextElementSibling;
        if (this.selected.includes(item)) {
          now.classList.add('active');
          panel.classList.add('show');
        } else {
          now.classList.remove('active');
          panel.classList.remove('show');
        }
      }
    },
  },
};
</script>

<style scoped>
.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

.active,
.accordion:hover {
  background-color: #ccc;
}

.panel {
  padding: 0 18px;
  background-color: white;
  max-height: 0px;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

.show {
  max-height: 68px;
}

.accordion:after {
  content: '\02795'; /* Unicode character for "plus" sign (+) */
  font-size: 13px;
  color: #777;
  float: right;
  margin-left: 5px;
}

.active:after {
  content: '\2796'; /* Unicode character for "minus" sign (-) */
}
</style>
