<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import ButtonLink from "$lib/components/ButtonLink.svelte";
    import { logout } from "$lib/remote/user.remote";
    import { showInfo } from "$lib/store/messages.svelte";
    import { onMount } from "svelte";

    let navLinksActive = $state(false);

    let { user } = $props();

    let onServerRedirectTo = $derived("/");
    onMount(() => {
        onServerRedirectTo = "";
    });
</script>

<noscript>
    <style>
        .no-script-navbar-menu {
            display: block;
        }
    </style>
</noscript>


<nav class="w-full relative bg-primary">

    {#snippet userButtons(key: string | number)}
        {#if user?.name}
            <form
                {...logout.for(key).enhance(async ({ submit }) => {
                    if (await submit()) {
                        showInfo("Вы вышли!");
                    }
                })}
            >
                <input
                    type="hidden"
                    name="redirectTo"
                    value={onServerRedirectTo}
                />
                <Button
                    color="light"
                    class="ml-2"
                    label="Выйти"
                    loading={logout.pending > 0}
                />
            </form>
        {:else}
            <ButtonLink
                color="brown"
                label="Создать пользователя"
                href="/createUser"
            />
            <ButtonLink
                color="light"
                label="Войти"
                href="/login"
            />
        {/if}
    {/snippet}                


    <div class="px-1 py-1 sm:px-2 lg:px-4">
        <div class="flex justify-between h-14">
            <!-- Brand / Logo Area -->
            <div class="shrink-0 flex items-center">
                <a href="/" class="text-4xl font-extrabold text-gray-800 pr-2 font-mono">TODO</a>
                <ButtonLink
                    label="Пользователи"
                    href="/users"
                    color="black"
                />
            </div>

            <!-- Right-side Menu Wrapper (Flexbox items) -->
            <div class="flex items-center">
                <!-- Mobile Burger Button -->
                <button
                    id="mobile-menu-button"
                    type="button"
                    class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-yellow-700/20 bg-yellow-500 focus:outline-none"
                    aria-controls="mobile-menu"
                    aria-expanded={`${navLinksActive}`}
                    onclick={() => (navLinksActive = !navLinksActive)}
                >
                    <span class="sr-only">Open main menu</span>
                    <!-- Burger Icon SVG -->
                    <svg
                        class="h-6 width-6"
                        xmlns="http://w3.org"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>


                <!-- Desktop Navigation Links (Hidden on mobile) -->
                <div class="hidden md:flex md:space-x-4 md:items-center">
                    {@render userButtons("desktop")}
                </div>
            </div>
        </div>
    </div>

    <!-- Mobile Menu Dropdown (Controlled via JavaScript) -->
    <div
        id="mobile-menu"
        class={`md:hidden absolute  bg-yellow-500 left-0 right-0 top-fu z-50 ${!navLinksActive ? "hidden" : ""}`}
    >
        <div class="py-4">
            {@render userButtons("mobile")}
        </div>
    </div>
</nav>
