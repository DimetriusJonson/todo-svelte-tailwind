<script lang="ts">
    let {
        name,
        label,
        options,
        className = "",
        value = $bindable(),
        notSelectedText,
        onChange,
    } = $props();
</script>

<div class={className}>
    <select
        class="dark:bg-dark-bg border dark:text-gray-50 rounded-lg dark:border-gray-700 focus:outline-none 
            dark:focus:ring-indigo-400 dark:focus:border-indigo-400 dark:active:ring-indigo-400 dark:active:border-indigo-400 
            block w-full p-2"
        id = {name}
        aria-label={label}
        {name}
        bind:value
        onchange={(event: Event & { currentTarget: HTMLSelectElement }) => {
            onChange(event.currentTarget.value);
        }}
    >
        <option class="dark:bg-dark-bg" value={""}>{notSelectedText}</option>
        {#each options as option (option.value)}
            <option class="dark:bg-dark-bg" value={option.value}>{option.text}</option>
        {/each}
    </select>
</div>
