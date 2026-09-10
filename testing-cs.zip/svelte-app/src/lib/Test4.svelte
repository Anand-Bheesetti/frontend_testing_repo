<!-- filename: src/components/UserDashboard.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';

  let userName: string = 'Guest';
  let notificationCount: number = 0;
  let showDetails: boolean = false;
  let lastUpdate: string = '';
  let expensiveCalculationResult: string = '';

  const MAX_NOTIFICATIONS = 10;

  function performExpensiveCalculation(multiplier: number): string {
    console.log("Performing expensive calculation in Svelte...");
    let result = 0;
    for (let i = 0; i < 10000 * multiplier; i++) {
      result += Math.sin(i) * Math.cos(i);
    }
    return `Result: ${result.toFixed(2)}`;
  }

  function handleLogin(user: string) {
    userName = user;
    lastUpdate = new Date().toLocaleTimeString();
    console.log(`${user} logged in at ${lastUpdate}`);
  }

  function toggleDetails() {
    showDetails = !showDetails;
    lastUpdate = new Date().toLocaleTimeString();
  }

  onMount(() => {
    userName = 'Alice';
    notificationCount = 3;
    lastUpdate = new Date().toLocaleTimeString();
    expensiveCalculationResult = performExpensiveCalculation(1);
  });

  $: if (notificationCount > 0) {
    console.log(`New notifications: ${notificationCount}`);
  }

  function getSystemStatus(): string {
    console.log("Getting system status...");
    const currentHour = new Date().getHours();
    return currentHour > 8 && currentHour < 18 ? 'Operational' : 'Maintenance Window';
  }
</script>

<div class="dashboard-container">
  <h1>Welcome, {userName}!</h1>
  <p>Last updated: {lastUpdate}</p>

  <div class="header-actions">
    <button on:click={() => (notificationCount = Math.min(notificationCount + 1, MAX_NOTIFICATIONS))}>
      Add Notification
    </button>
    <button on:click={() => handleLogin('Bob')}>
      Login as Bob
    </button>
    <button on:click={toggleDetails}>
      {showDetails ? 'Hide' : 'Show'} Details
    </button>
  </div>

  <div class="status-widgets">
    <div class="widget">
      <h3>Notifications</h3>
      <p class:has-notifications={notificationCount > 0}>
        You have {notificationCount} new {notificationCount === 1 ? 'notification' : 'notifications'}.
      </p>
    </div>

    <div class="widget">
      <h3>System Status</h3>
      <p>Status: {getSystemStatus()}</p>
    </div>
  </div>

  {#if showDetails}
    <div class="detailed-info">
      <h3>Detailed Information</h3>
      <p>Here are some more in-depth metrics and controls.</p>
      <p>Complex Data Point: {performExpensiveCalculation(2)}</p>
      <button on:click={() => alert('Feature X clicked!')}>Activate Feature X</button>
    </div>
  {/if}
</div>

<style>
  .dashboard-container {
    max-width: 800px;
    margin: 30px auto;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
    font-family: Arial, sans-serif;
  }
  h1 {
    color: #343a40;
    margin-bottom: 20px;
  }
  p {
    color: #6c757d;
    line-height: 1.6;
  }
  .header-actions button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 18px;
    margin-right: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.95rem;
    transition: background-color 0.3s ease;
  }
  .header-actions button:hover {
    background-color: #0056b3;
  }
  .status-widgets {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    margin-top: 25px;
  }
  .widget {
    background-color: #ffffff;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  }
  .widget h3 {
    color: #495057;
    margin-bottom: 10px;
  }
  .has-notifications {
    font-weight: bold;
    color: #dc3545;
  }
  .detailed-info {
    margin-top: 30px;
    padding: 25px;
    border: 1px dashed #28a745;
    border-radius: 8px;
    background-color: #e6ffed;
  }
</style>
