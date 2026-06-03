<script lang="ts">
    let {
        name,
        value = $bindable(),
        placeholder = "",
        inputType = "",
        errors = [],
    } = $props();
</script>

<div class="w-full">
    <input
        aria-invalid={errors.length > 0}
        class={`w-full px-4 py-2 rounded-md shadow-inner 
            text-gray-700 
            placeholder-gray-400 
            dark:text-gray-50 

            autofill:bg-blue-300/20  
            dark:autofill:bg-gray-50

            focus:outline-4
            border
            
            hover:ring-gray-400
            hover:border-gray-400
            dark:hover:ring-gray-500
            dark:hover:border-gray-500
            bg-white
            dark:bg-dark-bg
            border-gray-300
            dark:border-gray-700
            focus:ring-indigo-400 
            focus:border-indigo-400
            active:ring-indigo-400 
            active:border-indigo-400 
            dark:active:ring-indigo-400 
            dark:active:border-indigo-400 
            dark:focus:ring-indigo-400 
            dark:focus:border-indigo-400
            focus:outline-blue-200/20
            aria-invalid:border-danger
            aria-invalid:dark:border-danger
            aria-invalid:dark:bg-danger-bg
            aria-invalid:focus:ring-danger 
            aria-invalid:focus:border-danger
            aria-invalid:active:ring-danger 
            aria-invalid:active:border-danger
            aria-invalid:focus:outline-danger/20
            aria-invalid:dark:focus:ring-danger 
            aria-invalid:dark:focus:border-danger 
            aria-invalid:dark:active:ring-danger 
            aria-invalid:dark:active:border-danger
        `}
        type={inputType}
        id={name}
        {name}
        bind:value
        {placeholder}
    />
</div>

{#each errors as issue}
    <p class="mt-1 text-xs text-danger dark:text-danger">{issue.message}</p>
{/each}
