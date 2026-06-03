<script lang="ts">
    interface Props {
        title: string;
        className?: string;
    }

    let { title, className = "" }: Props = $props();
</script>

<h1 class={"text-3xl font-mono font-extrabold text-gray-800 dark:text-gray-200 tracking-tight pb-4".concat(className)}>
    {title}
</h1>
