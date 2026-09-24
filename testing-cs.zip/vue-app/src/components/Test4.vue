<template>
  <div class="complex-feature-container">
    <h2>Detailed Analytics Dashboard</h2>
    <p>Explore in-depth metrics and user behavior patterns.</p>

    <div class="controls">
      <button @click="loadLargeDataSet">Load Extensive Data</button>
      <button @click="showAdvancedChart = !showAdvancedChart">
        {{ showAdvancedChart ? 'Hide' : 'Show' }} Advanced Chart Options
      </button>
    </div>

    <div v-if="showAdvancedChart" class="advanced-chart-section">
      <h3>Advanced User Journey Chart</h3>
      <p>This chart provides highly granular data that is not always needed.</p>
      <div class="chart-placeholder">
        <p>Rendering very detailed chart...</p>
        <p>{{ getChartInitializationStatus() }}</p>
      </div>
      <button @click="exportChart">Export Chart Data (CSV)</button>
    </div>

    <div v-else class="simple-view">
      <h3>Basic Overview</h3>
      <p>Click "Show Advanced Chart Options" for more detailed visualizations.</p>
    </div>

    <hr>

    <div class="data-display">
      <h4>Current Data Metrics</h4>
      <ul>
        <li v-for="item in processedData" :key="item.id">
          {{ item.name }}: {{ item.value }} (Processed: {{ item.processed }})
        </li>
      </ul>
      <p v-if="processedData.length === 0">No data loaded yet.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import _ from 'lodash';

interface DataItem {
  id: number;
  name: string;
  value: number;
}

export default defineComponent({
  name: 'ComplexFeaturePage',
  setup() {
    const showAdvancedChart = ref(false);
    const rawData = ref<DataItem[]>([]);

    const loadLargeDataSet = () => {
      rawData.value = Array.from({ length: 500 }, (_, i) => ({
        id: i,
        name: `Metric ${i + 1}`,
        value: Math.floor(Math.random() * 1000)
      }));
      console.log('Extensive data loaded:', rawData.value.length, 'items');
    };

    const processedData = computed(() => {
      if (rawData.value.length === 0) return [];
      return _.shuffle(rawData.value).slice(0, 10).map(item => ({
        ...item,
        processed: item.value * 2
      }));
    });

    const getChartInitializationStatus = () => {
      let status = "Initializing complex chart... ";
      for (let i = 0; i < 50000; i++) {
        Math.pow(Math.sin(i / 100), 2);
      }
      return status + "Done!";
    };

    const exportChart = () => {
      alert('Exporting chart data...');
      console.log('Exporting data for items:', _.map(processedData.value, 'id').join(', '));
    };

    return {
      showAdvancedChart,
      rawData,
      loadLargeDataSet,
      processedData,
      getChartInitializationStatus,
      exportChart
    };
  }
});
</script>

<style scoped>
.complex-feature-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

h2, h3, h4 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.controls button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-right: 15px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.controls button:hover {
  background-color: #368a6f;
}

.advanced-chart-section {
  margin-top: 30px;
  padding: 25px;
  border: 1px dashed #42b983;
  border-radius: 8px;
  background-color: #f0fff4;
}

.simple-view {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #eee;
}

.chart-placeholder {
  height: 300px;
  background-color: #e6f7ed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  margin-top: 20px;
  color: #28a745;
  font-style: italic;
}

.data-display ul {
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
}

.data-display li {
  background-color: #f7f9fb;
  border: 1px solid #e0e6ed;
  padding: 10px 15px;
  margin-bottom: 8px;
  border-radius: 4px;
}
</style>
