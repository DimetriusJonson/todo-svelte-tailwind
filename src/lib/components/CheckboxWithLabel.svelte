<script lang="ts">
    let { name, label, className = "", checked = $bindable() } = $props();
</script>

<div class="mt-2 flex flex-row items-center">
    <input
        id={name.toLowerCase().replaceAll(" ", "")}
        type="checkbox"
        bind:checked
        {name}
        class={`mr-2 w-7 h-7 cursor-pointer appearance-none rounded-[4px] border 
        border-gray-500 
        hover:border-primary
        checked:border-primary
        checked:bg-yellow-200
        outline-hidden checked:relative
        checked:before:absolute checked:before:top-[3px] checked:before:right-[3px] 
        checked:before:text-base 
        checked:before:text-white checked:before:content-['✔']`}
    />
    <label
        for={name.toLowerCase().replaceAll(" ", "")}
        class="cursor-pointer text-base text-gray-700 dark:text-gray-50"
    >
        {label}
    </label>
</div>
