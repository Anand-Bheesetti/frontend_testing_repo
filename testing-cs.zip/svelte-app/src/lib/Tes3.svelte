<script lang="ts">
    import Chart from 'chart.js/auto';
    import { onMount, onDestroy } from 'svelte';

    export let data: { label: string; value: number }[] = [];
    export let title: string = 'Monthly Data';
    export let chartType: 'bar' | 'line' = 'bar';

    let canvasElement: HTMLCanvasElement;
    let myChart: Chart | null = null;

    function renderChart() {
        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(canvasElement, {
            type: chartType,
            data: {
                labels: data.map(d => d.label),
                datasets: [{
                    label: title,
                    data: data.map(d => d.value),
                    backgroundColor: chartType === 'bar' ? 'rgba(75, 192, 192, 0.6)' : 'rgba(153, 102, 255, 0.6)',
                    borderColor: chartType === 'bar' ? 'rgba(75, 192, 192, 1)' : 'rgba(153, 102, 255, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    onMount(() => {
        renderChart();
    });

    onDestroy(() => {
        if (myChart) myChart.destroy();
    });

    function ExpensiveUtilityFunction(): string {
        let result = "Performing complex calculations for advanced settings... ";
        for (let i = 0; i < 10000; i++) {
            result += String(Math.sqrt(i) * Math.log(i + 1)).charAt(0);
        }
        return result.substring(0, 50) + "... done.";
    }

    let showAdvancedSettings = false;

    $: if (showAdvancedSettings) {
        console.log("Advanced settings triggered:", ExpensiveUtilityFunction());
    }

    $: if (data && canvasElement) {
        renderChart();
    }
</script>

<div class="data-visualizer-container">
    <h3>{title}</h3>
    <div style="height: 300px; width: 100%;">
        <canvas bind:this={canvasElement}></canvas>
    </div>

    <div class="controls">
        <button on:click={() => chartType = chartType === 'bar' ? 'line' : 'bar'}>Toggle Chart Type</button>
        <button on:click={() => showAdvancedSettings = !showAdvancedSettings}>
            {showAdvancedSettings ? 'Hide' : 'Show'} Advanced Settings
        </button>
    </div>

    {#if showAdvancedSettings}
        <div class="advanced-settings-panel">
            <h4>Advanced Settings</h4>
            <p>Here you can configure detailed report options.</p>
            <p>Calculation result: {ExpensiveUtilityFunction()}</p>
            <label>
                Detail Level:
                <input type="range" min="1" max="10" value="5" />
            </label>
        </div>
    {/if}
</div>

<style>
    .data-visualizer-container {
        border: 1px solid #ccc;
        padding: 20px;
        border-radius: 8px;
        background-color: #fff;
        max-width: 600px;
        margin: 20px auto;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }
    .controls button {
        margin-right: 10px;
        padding: 8px 15px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    .controls button:hover {
        background-color: #0056b3;
    }
    .advanced-settings-panel {
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px dashed #eee;
    }
</style>
