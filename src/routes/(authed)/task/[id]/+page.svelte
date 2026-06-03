<script lang="ts">
    import { taskPriorityName } from "$lib/TaskHelper.svelte";
    import { showInfo } from "$lib/store/messages.svelte.js";
    import Button from "$lib/components/Button.svelte";
    import ButtonLink from "$lib/components/ButtonLink.svelte";
    import type { Task } from "$lib/model/Task.svelte.js";
    import { deleteTask, getTask } from "$lib/remote/task.remote.js";

    let { params } = $props();

    const task = $derived(await getTask(params.id) as Task);
</script>

<div class="container mx-auto p-4">
    <!-- Message -->
    <div class="rounded-md bg-neutral-100 dark:bg-neutral-800 text-sm overflow-hidden border border-neutral-700">
        <!-- Message Header -->
        <div class="flex items-center justify-between bg-neutral-800 dark:bg-neutral-700 px-5 py-3 font-bold text-white dark:text-neutral-400">
            <p>{"Сделать"}</p>
        </div>

        <!-- Message Body -->
        <div class="border-t border-neutral-700 px-5 py-4 text-neutral-800 dark:text-neutral-100">
            <!-- media -->
            <div class="flex items-start gap-4">
                <!-- media-left -->
                <div class="shrink-0 text-4xl">
                    {#if task?.completed}
                        <span>{"✅"}</span>
                    {:else}
                        <span>{"❌"}</span>
                    {/if}
                </div>
                <div>
                    <p class="text-2xl font-monospace font-bold">
                        {task?.title}
                    </p>
                    <p class="text-base text-gray-700 dark:text-gray-300">
                        {taskPriorityName(task ?? {})}
                    </p>
                </div>
            </div>

            <div class="prose pt-4 text-gray-700 dark:text-gray-300">
                {#if task?.description}
                    <p>{task?.description}</p>
                {/if}
            </div>

            <div class="flex flex-wrap items-center gap-2 pt-4">
                <ButtonLink
                    color="light"
                    href={"/task/" + params.id + "/edit"}
                    label="Изменить"
                />
                <form
                    {...deleteTask.enhance(async ({ submit }) => {
                        if (await submit()) {
                            showInfo("Задача удалена.");
                        }
                    })}
                >
                    <input type="hidden" name="id" value={params.id} />

                    <Button
                        color="danger"
                        label="Удалить"
                        disabled={deleteTask.pending > 0}
                        loading={deleteTask.pending > 0}
                    />
                </form>
            </div>
        </div>
    </div>
</div>
