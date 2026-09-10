<!-- src/pages/vue/ParentView.vue -->
<template>
  <div class="parent-view-container">
    <h1>Parent View (Vue)</h1>
    <p>Parent Counter: {{ parentCounter }}</p>
    <button @click="incrementParentCounter">Increment Parent Counter</button>

    <div class="child-component-area">
      <DataGrid :items="gridItems" :additionalConfig="inlineConfig" /> <!-- VULNERABILITY: inlineConfig -->
      <MemoizedMessage :message="staticMessage" />
      <!-- VULNERABILITY: Inline function passed as prop to a potentially memoized child -->
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
import DataGrid from '../../components/vue/DataGrid.vue';
import MemoizedMessage from '../../components/vue/MemoizedMessage.vue'; // A hypothetically memoized child
import FunctionPassingChild from '../../components/vue/FunctionPassingChild.vue'; // Child receiving function prop

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
      // VULNERABILITY: Modifying the `gridItems` array in a way that *could* cause re-renders
      // even if the data itself is conceptually the same, if DataGrid used index as key.
      // Here, just incrementing parentCounter will trigger DataGrid's template re-evaluation.
      // If we *mutate* gridItems without changing `id`s, `key="item"` in DataGrid.vue would also re-render.
    };

    // VULNERABILITY: Inline object literal for additionalConfig.
    // This object reference changes on every render of ParentView, causing DataGrid to re-render.
    const inlineConfig = {
      highlightActive: true,
      // More config...
    };

    // VULNERABILITY: Inline function definition.
    // This function reference changes on every render of ParentView, causing FunctionPassingChild to re-render.
    const handleChildAction = () => {
      console.log('Action from child triggered!');
      parentCounter.value += 10; // Affecting parent state
    };

    return {
      parentCounter,
      gridItems,
      staticMessage,
      incrementParentCounter,
      inlineConfig, // VULNERABILITY exposed
      handleChildAction, // VULNERABILITY exposed
    };
  },
});
</script>

<script lang="ts">
// src/components/vue/MemoizedMessage.vue - Hypothetically memoized, but for demo assumes v-memo or shallowRef
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    console.log(`MemoizedMessage re-rendering: ${props.message}`); // Will still log if props are unstable
    return {};
  },
});
</script>

<script lang="ts">
// src/components/vue/FunctionPassingChild.vue - Child receiving an inline function
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    action: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    console.log('FunctionPassingChild re-rendering. Action reference:', props.action);
    return {
      triggerAction: () => props.action(),
    };
  },
});
</script>