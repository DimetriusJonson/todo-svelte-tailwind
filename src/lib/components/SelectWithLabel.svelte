<script lang="ts">
    import SelectInput from "./SelectInput.svelte";

    let {
        name,
        label,
        options,
        value = $bindable(),
        onChange = (e: Event) => {},
        errors = [],
    } = $props();
</script>

<label class="block text-base text-gray-700 dark:text-gray-50 mx-2" for={name}>{label}</label>
<SelectInput
    {name}
    {label}
    bind:value={value}
    {options}
    notSelectedText={"Не выбран"}
    {onChange}
/>

{#each errors as issue}
    <p class="mt-1 px-2 text-xs text-pink-800 dark:text-danger">{issue.message}</p>
{/each}
