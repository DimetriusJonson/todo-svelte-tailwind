<script lang="ts">
    import { receive, send } from "$lib/ui/transition";
    import {
        messages,
        removeMessage,
        type Message,
    } from "$lib/store/messages.svelte";

    function msg_style(msg: Message) {
        if (msg.kind === "INFO") {
            return "bg-primary";
        }

        return "bg-danger";
    }

    let onclick = (event: MouseEvent) => {
        const idStr = (event.currentTarget as HTMLElement).id;
        let id = idStr.substring(idStr.indexOf("_") + 1);
        removeMessage(id);
    };
</script>

<div
    class="text-center py-3"
    style:position="fixed"
    style:left="0"
    style:bottom="1.5rem"
    style:width="100%"
    style:z-index="1000"
>
    {#each messages as message (message.id)}
        <p
            class="mb-4"
            in:receive={{ key: message.id }}
            out:send={{ key: message.id }}
        >
            <span class={"inline-flex items-center justify-center px-2.5 py-1 text-base font-semibold rounded text-black space-x-2 " + msg_style(message)}>
                {message.msg}
                <button
                    aria-label="x"
                    class="inline-flex items-center justify-center w-4 h-4 rounded-full bg-black/20 hover:bg-black/30 text-white text-xs cursor-po"
                    id={"m_" + message.id}
                    {onclick}
                >&nbsp;&times;</button>
            </span>
        </p>
    {/each}
</div>
