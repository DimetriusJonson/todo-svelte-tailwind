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

  let changeCompletedInProgress = $state(true);
  onMount(() => {
    changeCompletedInProgress = false;
  });

  async function onChangeCompleted(info: any) {
    changeCompletedInProgress = true;
    try {
      let savedTask = await changeCompletedTask({
        id: parseInt(
          info.target.name.substring(info.target.name.indexOf("_") + 1),
        ),
        completed: info.target.checked,
      });

      let foundTask = tasks.find((t) => t.id === savedTask.id);
      if (foundTask) {
        foundTask.completed_at = savedTask.completed_at;
        foundTask.completed = savedTask.completed;
      }

      showInfo("Задача сохранена.");
    } catch (error: any) {
      info.target.checked = !info.target.checked;
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
    {#if tasks.length > 0}
      {#each tasks as task (task.id)}
        <tr class="dark:even:bg-gray-800/30 border-b dark:border-gray-600">
          <td class="px-4 py-2">{priorityName(task.priority ?? "")}</td>
          <td class="px-4 py-2">
            <input type="hidden" name="id" value={task.id} />
            <Checkbox
              className="is-medium"
              name={"completed_" + task.id}
              value={task.completed}
              title={task.completed && task.completed_at
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
