document.addEventListener('DOMContentLoaded', (e) =>{

    const loggedInUser = localStorage.getItem('TEQ_CURRENT_USER_ID');
    const liloLink = document.querySelector('.lilo-link')

    //Changes the link to log in/out depending on token
    if (loggedInUser) {
        const liloText = document.getElementById('lilo-text');
        liloText.innerHTML = 'Log Out'
        const signButton =  document.querySelector('.nav-bar__logout')
        liloLink.setAttribute('href', '')
        liloLink.setAttribute('class', 'log-out__function nav-bar__link')
    }

    liloLink.addEventListener("click", async (e) => {
        e.preventDefault();
        try {
            localStorage.setItem("TEQ_ACCESS_TOKEN", "");
            localStorage.setItem("TEQ_CURRENT_USER_ID", "");

            window.location.href = "/log-in";

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
                        <div class="alert alert-danger">
                            ${message}
                        </div>
                        `
                    );
                }
                errorsContainer.innerHTML = errorsHtml.join("");
            } else {
                alert(
                    "Something went wrong. Please check your internet connection and try again!"
                );
            }
        }
    });

})