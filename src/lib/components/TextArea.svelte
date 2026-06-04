<script lang="ts">
    let {
        name,
        value = $bindable(),
        placeholder,
        onChange = (v: string) => {},
    } = $props();
</script>

<textarea
    class={`textblock w-full px-3 py-2 rounded-md shadow-inner
        focus:outline-4
        border
        text-gray-700 
        placeholder-gray-400 
        hover:ring-gray-400
        hover:border-gray-400
        bg-white
        border-gray-300
        focus:ring-indigo-400 
        focus:border-indigo-400
        active:ring-indigo-400 
        active:border-indigo-400 
        focus:outline-blue-200/20

        transition-[background-color,border-color,box-shadow,color]
        duration-294

        dark:text-gray-50 
        dark:placeholder-gray-400 
        dark:hover:ring-gray-500
        dark:hover:border-gray-500
        dark:bg-dark-bg
        dark:border-gray-700
        dark:active:border-indigo-400 
        dark:focus:ring-indigo-400 
        dark:focus:border-indigo-400
        dark:active:ring-indigo-400 
    `}
    rows="4"
    cols="50"
    {name}
    bind:value
    {placeholder}
    onchange={(event: Event & { currentTarget: HTMLTextAreaElement }) =>
        onChange(event.currentTarget.value)}
></textarea>
