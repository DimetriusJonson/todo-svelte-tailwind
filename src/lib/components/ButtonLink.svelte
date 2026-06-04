<script lang="ts">
    import { tv, type VariantProps } from 'tailwind-variants';    

    const buttonLink = tv({
    base: 'rounded-3xl font-medium px-6 py-2 text-center transition-[background-color,border-color,box-shadow,color] duration-294',
    variants: {
        color: {
            ghost: 'text-link dark:text-link-dark',
            light: 'bg-gray-200 dark:hover:bg-gray-50 hover:bg-gray-300 text-black',
            black: "bg-black hover:bg-gray-900 text-white",
            brown: "bg-yellow-900/80 hover:bg-yellow-700 text-gray-50"
        },
        textSize: {
            sm: 'text-sm',
            md: 'text-base',
        },
        buttonWidth: {
            auto: 'w-auto',
            md: 'w-32',
        },
    },
    defaultVariants: {
        size: 'md',
        color: 'ghost'
    }
    });    

    type ButtonLinkVariants = VariantProps<typeof buttonLink>;

    let {
        id = null,
        color = 'light', 
        textSize = 'md', 
        buttonWidth = 'md', 
        class: customClass = "",
        href = "",
        label,
    } = $props();
</script>

<a
    {id}
    aria-label={label}
    {href}
    class={buttonLink({ color, textSize, buttonWidth, class: customClass } as ButtonLinkVariants)}
    >{label}</a
>
