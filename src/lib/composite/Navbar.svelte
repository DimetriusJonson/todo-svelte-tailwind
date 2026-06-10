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

<style lang="css">
    @media (scripting: none) {
        #mobile-menu {
            display: block;
        }
        #desktop-menu {
            display: none;
        }
    }
</style>

<nav class="w-full relative bg-primary">

    {#snippet userButtons(key: string | number)}
        {#if user?.name}
            <div class="flex items-center pl-2 py-2">
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
            </div>
        {:else}
            <div class="flex items-center pl-2 py-2">
                <ButtonLink
                    buttonWidth="auto"
                    color="brown"
                    label="Создать пользователя"
                    href="/createUser"
                />
            </div>
            <div class="flex items-center pl-2 py-2">
                <ButtonLink
                    color="light"
                    label="Войти"
                    href="/login"
                />
            </div>
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
                    buttonWidth="auto"
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
                <div id="desktop-menu" class="hidden md:flex md:space-x-4 md:items-center">
                    {@render userButtons("desktop")}
                </div>
            </div>
        </div>
    </div>

    <!-- Mobile Menu Dropdown (Controlled via JavaScript) -->
    <div
        id="mobile-menu"
        class={`md:hidden bg-primary left-0 right-0 top-fu z-50 ${!navLinksActive ? "hidden" : ""}`}
    >
        <div class="py-4">
            {@render userButtons("mobile")}
        </div>
    </div>
</nav>
