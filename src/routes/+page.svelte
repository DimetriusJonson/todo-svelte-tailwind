<script lang="ts">
    import type { Task } from "$lib/model/Task.svelte.js";
    import { localStore } from "$lib/store/localStore.svelte";
    import { filterTask, sortTask } from "$lib/TaskHelper.svelte.js";
    import SelectInput from "$lib/components/SelectInput.svelte";
    import TasksPanel from "$lib/composite/TasksPanel.svelte";
    import type { TasksSettings } from "$lib/model/TasksSettings.svelte.js";
    import Button from "$lib/components/Button.svelte";
    import { page } from "$app/state";
    import ButtonLink from "$lib/components/ButtonLink.svelte";
    import {
        getFilterOptions,
        getSortOptions,
        getTasks,
    } from "$lib/remote/task.remote.js";

    let { data } = $props();

    let filterSelect = $derived(page.url.searchParams.get("filterSelect"));
    let sortSelect = $derived(page.url.searchParams.get("sortSelect"));

    let tasksSettings = localStore<TasksSettings>(
        "tasksSettings",
        {} as TasksSettings,
    );

    let filteredTasks = $derived(
        (await getTasks({ filter: filterSelect, sortKind: sortSelect }))
            .filter((t: Task) =>
                filterTask(t, tasksSettings.value.filter ?? ""),
            )
            .sort((task1: Task, task2: Task) =>
                sortTask(task1, task2, tasksSettings.value.sortKind ?? ""),
            ),
    );
</script>

<div class="container mx-auto pt-5 dark:text-gray-50 text-xs md:text-base">
    <form method="GET" action="?/">
        <div class="flex justify-between pb-4 pl-4">
            <span class="flex space-x-4">
                <SelectInput
                    name="filterSelect"
                    label="Фильтр"
                    notSelectedText="Фильтр"
                    value={filterSelect ?? tasksSettings.value.filter}
                    options={await getFilterOptions()}
                    onChange={(value: string) => {
                        tasksSettings.value.filter = value;
                        tasksSettings.saveValue();
                    }}
                />
                <SelectInput
                    name="sortSelect"
                    label="Сортировка"
                    notSelectedText="Сортировка"
                    value={sortSelect ?? tasksSettings.value.sortKind}
                    options={await getSortOptions()}
                    onChange={(value: string) => {
                        tasksSettings.value.sortKind = value;
                        tasksSettings.saveValue();
                    }}
                />
                <noscript>
                    <Button color="light" label="Ok" />
                </noscript>
            </span>
            {#if data.user}
                <ButtonLink
                    color="light"
                    class="mr-2 text-xs md:text-base"
                    href="/task/create"
                    id="create_button"
                    label="+"
                />
            {/if}
        </div>
    </form>

    <TasksPanel tasks={filteredTasks} />
</div>
