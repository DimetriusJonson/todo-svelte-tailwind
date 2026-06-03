<script lang="ts">
    import { tv } from 'tailwind-variants';    

    const buttonLink = tv({
    base: 'rounded-3xl font-medium px-6 py-2 ml-2',
    variants: {
        color: {
            ghost: 'text-link dark:text-link-dark',
            light: 'bg-gray-200 dark:hover:bg-gray-50 hover:bg-gray-300 text-black',
            black: "bg-black hover:bg-gray-900 text-white",
            brown: "bg-yellow-900/80 hover:bg-yellow-700 text-gray-50"
        },
        size: {
            sm: 'text-sm',
            md: 'text-base',
        }
    },
    defaultVariants: {
        size: 'md',
        color: 'ghost'
    }
    });    

    let {
        id = null,
        color = 'light', 
        size = 'md', 
        class: customClass = "",
        href = "",
        label,
    } = $props();
</script>

<a
    {id}
    aria-label={label}
    {href}
    class={buttonLink({ color, size, class: customClass })}
    >{label}</a
>
