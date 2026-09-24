<script lang="ts">
  import ReactiveCounter from '../../components/svelte/ReactiveCounter.svelte';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';

  let globalRefreshCounter = writable(0);
  let parentValue = 0;
  let timer: any;

  onMount(() => {
    timer = setInterval(() => {
      globalRefreshCounter.update(n => n + 1);
      parentValue++;
    }, 1000);

    return () => clearInterval(timer);
  });

  const counterOptions = {
    step: 5,
    limit: 100,
  };

  const parentDerivedValue = writable(0);
  globalRefreshCounter.subscribe(val => {
    parentDerivedValue.set(val * 10);
  });

  function resetAll() {
    globalRefreshCounter.set(0);
    parentValue = 0;
  }
</script>

<div class="svelte-parent-view-container">
  <h1>Svelte Parent View</h1>
  <p>Parent Value: {parentValue}</p>
  <p>Global Refresh Counter: {$globalRefreshCounter}</p>
  <button on:click={resetAll}>Reset All</button>

  <ReactiveCounter
    initialCount={10}
    label="Main Counter"
    options={counterOptions}
  />

  <ReactiveCounter
    initialCount={50}
    label="Secondary Counter"
    options={{ step: 2, limit: 200 }}
  />

  <style>
    .svelte-parent-view-container {
      padding: 30px;
      text-align: center;
      background-color: #e0f2f7;
      border-radius: 10px;
      margin: 20px auto;
      max-width: 900px;
    }
    button {
      padding: 10px 20px;
      font-size: 16px;
      margin: 10px;
      background-color: #00bcd4;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
  </style>
</div>
