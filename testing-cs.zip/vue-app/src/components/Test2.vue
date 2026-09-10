<template>
  <div class="parent-view-container">
    <h1>Parent View (Vue)</h1>
    <p>Parent Counter: {{ parentCounter }}</p>
    <button @click="incrementParentCounter">Increment Parent Counter</button>

    <div class="child-component-area">
      <DataGrid :items="gridItems" :additionalConfig="inlineConfig" />
      <MemoizedMessage :message="staticMessage" />
      <FunctionPassingChild :action="handleChildAction" />
    </div>

    <style scoped>
      .parent-view-container {
        padding: 30px;
        text-align: center;
        background-color: #f8f8f8;
        border-radius: 10px;
        margin: 20px auto;
        max-width: 900px;
      }
      button {
        padding: 10px 20px;
        font-size: 16px;
        margin: 10px;
        background-color: #42b983;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      .child-component-area {
        margin-top: 30px;
        border: 1px dashed #ccc;
        padding: 20px;
        background-color: #fff;
      }
    </style>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DataGrid from './Test1.vue';
import MemoizedMessage from './Test2.vue';
import FunctionPassingChild from './Test2.vue';

export default defineComponent({
  components: {
    DataGrid,
    MemoizedMessage,
    FunctionPassingChild,
  },
  setup() {
    const parentCounter = ref(0);
    const gridItems = ref([
      { id: 101, name: 'Alpha', value: 10, isActive: true, statusText: 'active_status' },
      { id: 102, name: 'Beta', value: 20, isActive: false, statusText: 'pending_status' },
      { id: 103, name: 'Gamma', value: 30, isActive: true, statusText: 'completed_status' },
    ]);
    const staticMessage = "This message should not cause re-renders.";

    const incrementParentCounter = () => {
      parentCounter.value++;
    };

    const inlineConfig = {
      highlightActive: true,
    };

    const handleChildAction = () => {
      console.log('Action from child triggered!');
      parentCounter.value += 10;
    };

    return {
      parentCounter,
      gridItems,
      staticMessage,
      incrementParentCounter,
      inlineConfig,
      handleChildAction,
    };
  },
});
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    console.log(`MemoizedMessage re-rendering: ${props.message}`);
    return {};
  },
});
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    action: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    return {
      triggerAction: () => props.action(),
    };
  },
});
</script>
