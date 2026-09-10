<template>
  <div class="data-grid-container">
    <h2>Dynamic Data Grid</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Value</th>
          <th>Status</th>
          <th>Processed Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in processedData" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.value }}</td>
          <td>
            <span :class="{'status-active': item.isActive, 'status-inactive': !item.isActive}">
              {{ item.isActive ? 'Active' : 'Inactive' }}
            </span>
          </td>
          <td>{{ formatAndCapitalize(item.statusText) }}</td>
        </tr>
      </tbody>
    </table>
    <style scoped>
      .data-grid-container {
        padding: 20px;
        font-family: Arial, sans-serif;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
      .status-active {
        color: green;
        font-weight: bold;
      }
      .status-inactive {
        color: red;
      }
    </style>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface GridItem {
  id: number;
  name: string;
  value: number;
  isActive: boolean;
  statusText: string;
}

export default defineComponent({
  props: {
    items: {
      type: Array as PropType<GridItem[]>,
      required: true,
    },
    additionalConfig: {
      type: Object as PropType<{ highlightActive: boolean }>,
      default: () => ({ highlightActive: false }),
    }
  },
  data() {
    return {
      localStateCounter: 0,
    };
  },
  computed: {
    processedData(): GridItem[] {
      return this.items.map(item => ({
        ...item,
        name: item.name.toUpperCase(),
      }));
    },
  },
  methods: {
    formatAndCapitalize(text: string): string {
      let result = text.split('').reverse().join('');
      result = result.toUpperCase();
      for (let i = 0; i < 10000; i++) {}
      return result;
    },
  },
});
</script>
