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
        class={`border rounded-lg block w-full p-2
            focus:outline-4
            focus:outline-blue-400/20
            dark:focus:outline-blue-200/20
            bg-white
            border-gray-300
            dark:bg-dark-bg
            dark:text-gray-50 
            dark:border-gray-700 
            hover:ring-gray-400
            hover:border-gray-400
            dark:hover:ring-gray-500
            dark:hover:border-gray-500
            focus:ring-indigo-400 
            focus:border-indigo-400
            active:ring-indigo-400 
            active:border-indigo-400 
            dark:active:ring-indigo-400 
            dark:active:border-indigo-400 
            dark:focus:ring-indigo-400 
            dark:focus:border-indigo-400
            `}
        id={name}
        aria-label={label}
        {name}
        bind:value
        onchange={(event: Event & { currentTarget: HTMLSelectElement }) => {
            onChange(event.currentTarget.value);
        }}
    >
        <option class="dark:bg-dark-bg" value={""}>{notSelectedText}</option>
        {#each options as option (option.value)}
            <option class="dark:bg-dark-bg" value={option.value}
                >{option.text}</option
            >
        {/each}
    </select>
</div>
