const logInForm = document.querySelector(".log-in-form");

logInForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(logInForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const _csrf = formData.get('_csrf');

    const body = { email, password, _csrf };
    try {
        const res = await fetch("/users/token", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!res.ok) {
            throw res;
        }
        const {
            token,
            user: { id },
        } = await res.json();

        localStorage.setItem("TEQ_ACCESS_TOKEN", token);
        localStorage.setItem("TEQ_CURRENT_USER_ID", id);

        window.location.href = "/events";
    } catch (err) {
        if (err.status >= 400 && err.status < 600) {
            const errorJSON = await err.json();
            const errorsContainer = document.querySelector(".errors-container");
            let errorsHtml = [
                `
                <div class="alert alert-danger">
                    Something went wrong. Please try again.
                </div>
                `,
            ];
            const { errors } = errorJSON;
            if (errors && Array.isArray(errors)) {
                errorsHtml = errors.map(
                    (message) => `
                    <li type="circle">
                        ${message}
                    </li>
                    `
                );
            }
            errorsContainer.innerHTML = `<ul> ${errorsHtml.join("")} </ul>`;
        } else {
            alert(
                "Something went wrong. Please check your internet connection and try again!"
            );
        }
    }
});

const formDemo = document.querySelector('.demo-login-form');

formDemo.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(formDemo);
    const email = 'demo@example.com';
    const password = 'password';
    const city = 'Boston'
    const _csrf = formData.get('_csrf');

    const body = { email, password, _csrf };

    const res = await fetch('/users/token', {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json"
        }
    });
    const {
        token,
        user: { id },
    } = await res.json();

    localStorage.setItem("TEQ_ACCESS_TOKEN", token);
    localStorage.setItem("TEQ_CURRENT_USER_ID", id);
    
    if (!res.ok) {
        const { message } = data;
        const errorsContainer = document.querySelector('#errors-container');
        errorsContainer.innerHTML = message;
        return;
    }
    // redirect to dashboard
    window.location.href = '/dashboard';



});