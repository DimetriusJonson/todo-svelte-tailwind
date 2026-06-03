<script lang="ts">
    let { name, title, className, value, disabled, inputRef = $bindable(), onChange = () => {} } = $props();
    
    let checkOnChange = (event: Event& { currentTarget: HTMLInputElement }) => {
        event.preventDefault();
        onChange({
            name: name,
            value: event.currentTarget.checked,
            target: event.currentTarget
        });
    };

</script>

<div class="mt-2 flex flex-row items-center">
    <input
    id={name.toLowerCase().replaceAll(" ", "")}
    type="checkbox"
    aria-label={title}
    checked={value}
    name={name}
    {title}
    onchange={checkOnChange}
    class={`mr-2 w-7 h-7 cursor-pointer appearance-none rounded-[4px] border 
    border-gray-500 
    hover:border-primary
    checked:border-primary
    checked:bg-yellow-200
    outline-hidden checked:relative
       checked:before:absolute checked:before:top-[-6px] checked:before:right-[-2px] 
     checked:before:text-2xl checked:before:text-gray-900 checked:before:content-['✔']`}
    />
</div>