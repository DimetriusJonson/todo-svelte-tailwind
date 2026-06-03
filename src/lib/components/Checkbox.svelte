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
    class={`w-7 h-7 cursor-pointer appearance-none rounded-[4px] border 
        border-gray-500 
        hover:border-primary
        checked:border-primary
        checked:bg-yellow-200
        outline-hidden 

        text-2xl 
        text-gray-900 
        
        checked:relative
        
        checked:before:absolute
        checked:before:top-[-0.2vw]
        checked:before:left-[-0.1vw]
        checked:before:content-['✔']

    `}
    />
</div>