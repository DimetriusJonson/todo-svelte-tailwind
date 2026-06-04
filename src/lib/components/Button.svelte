<script lang="ts">
    import { tv, type VariantProps } from 'tailwind-variants';    

    const button = tv({
    base: 'rounded-3xl cursor-pointer font-medium px-6 py-2 h-10 transition-[background-color,border-color,box-shadow,color] duration-294',
    variants: {
        color: {
            primary: 'bg-primary hover:bg-primary/80 text-black',
            light: 'bg-gray-200 dark:hover:bg-gray-50 hover:bg-gray-300 text-black',
            danger: 'bg-danger hover:bg-danger/80 text-black'
        },
        textSize: {
            sm: 'text-sm',
            md: 'text-base',
        },
        buttonWidth: {
            auto: 'w-auto',
            md: 'w-32',
        },
        loading: {
            true: 'inline-flex justify-center items-center leading-6 transition ease-in-out duration-150',
            false: '',
        },
        disabled: {
            true: 'cursor-not-allowed brightness-110',
            false: '',
        },
    },
    defaultVariants: {
        size: 'md',
        color: 'primary',
        buttonWidth: 'auto',
        loading: false,
        disabled: false,
    }
    });    

    type ButtonVariants = VariantProps<typeof button>;
    
    let buttonElement: HTMLButtonElement;
    let {
        id = null,
        loading = false,
        color = 'primary', 
        textSize = 'md',
        buttonWidth = 'md', 
        class: customClass = "",
        disabled = false,
        label,
        onclick = () => {},
    } = $props();
</script>

<button
    bind:this={buttonElement}
    {id}
    aria-label={label}
    class={button({ color, textSize, buttonWidth, loading, disabled: loading || disabled, class: customClass } as ButtonVariants)}
    onclick={(event) => onclick(event)}
    onmouseup={() => buttonElement.blur()}
    disabled={disabled || loading}
>

  {#if loading}
    <svg class="animate-spin [animation-duration:500ms] h-5 w-5 text-black" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    &nbsp;
  {:else}
    {label}
  {/if}

</button>

