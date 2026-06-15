<script lang="ts">
  import { type Task } from "$lib/model/Task.svelte";
  import { priorityName } from "$lib/TaskHelper.svelte";
  import Checkbox from "$lib/components/Checkbox.svelte";
  import { showError, showInfo } from "$lib/store/messages.svelte";
  import { onMount } from "svelte";
  import { changeCompletedTask } from "$lib/remote/task.remote";
  
  interface Props {
    tasks: Task[];
  }

  let { tasks }: Props = $props();

  let my_tasks = $derived(tasks);

  let changeCompletedInProgress = $state(true);
  onMount(() => {
    changeCompletedInProgress = false;
  });

  async function onChangeCompleted(info: any) {
    let completed = info.target.checked;

    info.target.checked = !info.target.checked;
    changeCompletedInProgress = true;
    try {
      let id = parseInt(info.target.name.substring(info.target.name.indexOf("_") + 1));
      let taskIndex = my_tasks.findIndex((t) => t.id === id);

      if (taskIndex >= 0) {
        let savedTask = await changeCompletedTask({id, completed});
        my_tasks[taskIndex].completed_at = savedTask?.completed_at;
        showInfo("Задача сохранена.");
      }

    } catch (error: any) {
      showError(error);
    } finally {
      changeCompletedInProgress = false;
    }
  }
</script>

<table class="table-auto w-full text-left dark:text-gray-200 text-xs md:text-base">
  <thead>
    <tr class="border-b dark:border-gray-600">
      <th class="px-4 py-4">{"Приоритет"}</th>
      <th class="px-4">{"Завершена"}</th>
      <th class="px-4">{"Название"}</th>
      <th class="px-4 py-4 hidden md:block">{"Описание"}</th>
    </tr>
  </thead>
  <tbody>
    {#if my_tasks.length > 0}
      {#each my_tasks as task (task.id)}
        <tr class="dark:even:bg-gray-800/30 border-b dark:border-gray-600">
          <td class="px-4 py-2">{priorityName(task.priority ?? "")}</td>
          <td class="px-4 py-2">
            <input type="hidden" name="id" value={task.id} />
            <Checkbox
              className="is-medium"
              name={"completed_" + task.id}
              value={task.completed_at}
              title={task.completed_at
                ? "Завершена " + new Date(task.completed_at).toLocaleString()
                : "Не завершена"}
              disabled={changeCompletedInProgress}
              onChange={onChangeCompleted}
            />
          </td>
          <td class="px-4 py-2"
            ><a class="text-link dark:text-link-dark" href={"/task/" + task.id} aria-label={task.title}>{task.title}</a></td
          >
          <td class="px-4 py-2 hidden md:block">{task.description}</td>
        </tr>
      {/each}
    {:else}
      <tr><td colSpan="3" class="text-center">{"Нет записей"}</td></tr>
    {/if}
  </tbody>
</table>
