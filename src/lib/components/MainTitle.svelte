<script lang="ts">
    interface Props {
        title: string;
        className?: string;
    }

    let { title, className = "" }: Props = $props();
</script>

<h1 class={"text-3xl font-monospace font-extrabold text-gray-800 dark:text-gray-200 tracking-tight pb-5".concat(className)}>
    {title}
</h1>
