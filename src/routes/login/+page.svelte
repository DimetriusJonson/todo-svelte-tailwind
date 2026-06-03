<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import MainTitle from "$lib/components/MainTitle.svelte";
    import { page } from "$app/state";
    import ButtonLink from "$lib/components/ButtonLink.svelte";
    import { showError, showInfo } from "$lib/store/messages.svelte.js";
    import { login } from "$lib/remote/user.remote";
    import TextWithError from "$lib/components/TextWithError.svelte";

    let redirectTo = $derived(page.url.searchParams.get("redirectTo"));
    login.fields.userName.set(page.url.searchParams.get("defUserName") ?? "");
</script>

<div class="container mx-auto p-4">
    <MainTitle title="Вход в систему" />

    <form
        {...login.enhance(async (instance) => {
            try {
                if (await instance.submit()) {
                    instance.element.reset();
                    showInfo("Вы вошли!");
                }
            } catch (error: any) {
                showError("login:" + error);
            }
        })}
        oninput={() => login.validate()}
    >
        <fieldset disabled={login.pending > 0}>
            <input
                {...login.fields.redirectTo.as("hidden", redirectTo ?? "/")}
            />

            <div class="mb-4">
                <TextWithError
                    {...login.fields.userName.as("text")}
                    placeholder="Имя пользователя"
                    errors={login.fields.userName.issues()}
                />
            </div>

            <div class="mb-4">
                <TextWithError
                    {...login.fields.password.as("password")}
                    placeholder="Пароль"
                    inputType="password"
                    errors={login.fields.password.issues()}
                />
            </div>

            <div class="flex flex-wrap items-center gap-2">
                <Button
                    label="Войти"
                    loading={login.pending > 0}
                    disabled={login.pending > 0}
                />
                <ButtonLink color="ghost" href="/createUser" label="Создать" />
            </div>
        </fieldset>
    </form>
</div>
