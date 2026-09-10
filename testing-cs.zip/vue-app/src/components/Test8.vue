<template>
  <div class="app-container">
    <h2 :style="pageTitleStyle">Application Information Panel</h2>

    <div
      class="info-card"
      :style="{
        backgroundColor: cardBgColor,
        color: cardTextColor,
        border: showCardBorder ? '1px solid #ddd' : 'none',
        padding: '20px',
        borderRadius: '10px',
        marginBottom: '25px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        transition: 'all 0.3s ease-in-out',
        width: cardWidth + 'px'
      }"
    >
      <h3 :style="{ color: headerColor, fontSize: '1.4em' }">
        Status Update: {{ panelStatus }}
      </h3>
      <p :style="{ lineHeight: '1.6', fontSize: panelFontSize + 'px' }">
        This panel provides important updates and statistics about the application.
        Current server load: <span :style="{ fontWeight: 'bold', color: serverLoadColor }">{{ serverLoadPercentage }}%</span>.
      </p>

      <div class="actions" :style="actionSectionStyle">
        <button
          @click="toggleBorder"
          :style="{
            backgroundColor: showCardBorder ? '#dc3545' : '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.95em',
            marginRight: '10px',
            transition: 'background-color 0.3s ease',
          }"
        >
          {{ showCardBorder ? 'Hide' : 'Show' }} Card Border
        </button>
        <button
          @click="increaseFontSize"
          :style="{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '0.95em',
            transition: 'background-color 0.3s ease',
          }"
        >
          Increase Text Size
        </button>
      </div>
    </div>

    <div class="analytics-summary" style="
        background-color: #e6f7ff;
        padding: 15px;
        border-left: 5px solid #007bff;
        margin-top: 30px;
        border-radius: 5px;
        color: #333;
    ">
        <p style="font-weight: bold; margin-bottom: 5px;">Quick Analytics:</p>
        <ul style="list-style-type: none; padding: 0;">
            <li style="margin-bottom: 3px;">Active users: <span style="color: #28a745;">1,234</span></li>
            <li style="margin-bottom: 3px;">Errors last hour: <span style="color: #dc3545;">5</span></li>
        </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

export default defineComponent({
  name: 'InfoPanel',
  setup() {
    const panelStatus = ref('Online');
    const showCardBorder = ref(true);
    const panelFontSize = ref(16);
    const cardWidth = ref(600);
    const serverLoad = ref(0.75);

    const pageTitleStyle = computed(() => ({
      color: '#34495e',
      textAlign: 'center',
      marginBottom: '30px',
      fontSize: '2.5em',
      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
    }));

    const actionSectionStyle = {
      marginTop: '20px',
      paddingTop: '15px',
      borderTop: '1px dashed #eee',
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
    };

    const cardBgColor = computed(() => showCardBorder.value ? '#ffffff' : '#f0f0f0');
    const cardTextColor = computed(() => showCardBorder.value ? '#333333' : '#555555');
    const headerColor = computed(() => showCardBorder.value ? '#2c3e50' : '#4a6980');

    const serverLoadPercentage = computed(() => (serverLoad.value * 100).toFixed(0));
    const serverLoadColor = computed(() => {
      if (serverLoad.value > 0.8) return '#dc3545';
      if (serverLoad.value > 0.5) return '#ffc107';
      return '#28a745';
    });

    const toggleBorder = () => {
      showCardBorder.value = !showCardBorder.value;
      cardWidth.value = showCardBorder.value ? 600 : 550;
    };

    const increaseFontSize = () => {
      panelFontSize.value = Math.min(panelFontSize.value + 2, 24);
    };

    setInterval(() => {
        serverLoad.value = Math.random() * 0.9 + 0.1;
        if (Math.random() > 0.8) {
            panelStatus.value = 'Degraded Performance';
        } else {
            panelStatus.value = 'Online';
        }
    }, 5000);

    return {
      panelStatus,
      showCardBorder,
      panelFontSize,
      cardWidth,
      serverLoadPercentage,
      cardBgColor,
      cardTextColor,
      headerColor,
      serverLoadColor,
      pageTitleStyle,
      actionSectionStyle,
      toggleBorder,
      increaseFontSize,
    };
  },
});
</script>

<style scoped>
.app-container {
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
  background-color: #f0f2f5;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.info-card .actions button:hover {
  filter: brightness(0.9);
}
</style>
