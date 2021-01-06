const updateEventForm = document.querySelector(".update-event-form");

window.addEventListener("DOMContentLoaded", async () => {
    let token = localStorage.getItem('TEQ_ACCESS_TOKEN');
    if (!token) {
        window.location.href = "/log-in";
    }
});

updateEventForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(updateEventForm);
    const time = formData.get("time");
    const date = formData.get("date");
    const venue = formData.get("venue");
    const address = formData.get("address");
    const name = formData.get("name");
    const cityId = formData.get("cityId");
    const description = formData.get('description');
    const _csrf = formData.get('_csrf');
    const limit = formData.get('limit')
    const hostId = localStorage.getItem('TEQ_CURRENT_USER_ID');
    const numOfGuests = formData.get('numOfGuests');

    const thisEvent = formData.get('eventId');

    const body = { cityId, date, time, venue, address, name, description, hostId, numOfGuests, limit, _csrf, thisEvent }

    //Finds the event id via url
    // function whatEvent() {
    //     let index;
    //     for (let i = window.location.href.length - 1; i > 0; i--) {
    //         if (window.location.href[i] === '/') {
    //             return window.location.href.slice(i + 1)
    //         }
    //     }
    // }
    // const thisEvent = whatEvent(); 
    


    try {
        const res = await fetch(`/auth/update/${thisEvent}`, {
            method: "PUT",
            body: JSON.stringify(body),
            headers: {
                Authorization: `Bearer ${localStorage.getItem(
                    "TEQ_ACCESS_TOKEN")}`,
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw res;
        }
        window.location.href = `/events/${thisEvent}`;

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


})


