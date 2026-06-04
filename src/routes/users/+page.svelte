<script lang="ts">
    import MainTitle from "$lib/components/MainTitle.svelte";
    import { getUsers } from "$lib/remote/user.remote";
</script>

<section>
    <div class="container mx-auto p-4">
        <MainTitle title="Пользователи" />

        <table class="table-auto w-full text-left dark:text-gray-200 text-xs md:text-base">
            <thead>
                <tr class="border-b dark:border-gray-600">
                <th class="px-4 py-4">{"Id"}</th>
                <th class="px-4">{"Имя"}</th>
                </tr>
            </thead>
            <tbody>
                {#each await getUsers() as { id, name }}
                    <tr class="dark:even:bg-gray-800/30 border-b dark:border-gray-600">
                        <td class="px-4 py-2">{id}</td>
                        <td class="px-4 py-2">{name}</td>
                    </tr>
                {/each}
            </tbody>
        </table>

    </div>
</section>
