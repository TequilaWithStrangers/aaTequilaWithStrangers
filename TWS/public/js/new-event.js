const newEventForm = document.querySelector(".new-event");

newEventForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(newEventForm);
    const time = formData.get("time");
    const date = formData.get("date");
    const venue = formData.get("venue");
    const address = formData.get("address");
    const name = formData.get("name");
    const cityId = formData.get("cityId");
    const description = formData.get('description')
    // const numOfGuests = formData.get('numOfGuests')
    const limit = formData.get('limit')
    localStorage.setItem('TEQ_CURRENT_USER_ID', 9)
    const hostId = localStorage.getItem('TEQ_CURRENT_USER_ID');
    const numOfGuests = 0;
    if(!hostId) {
        alert('help');
    }

    const body = { cityId, date, time, venue, address, name, description, hostId, numOfGuests, limit }

    try {
        const res = await fetch("http://localhost:8080/events", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw res;
        }

        // const {
        //     token,
        //     user: { id },
        // } = await res.json();

        // localStorage.setItem("TEQ_ACCESS_TOKEN", token);
        // localStorage.setItem("TEQ_CURRENT_USER_ID", id);
        window.location.href = "/events";

    } catch (err) {

        // if (err.status >= 400 && err.status < 600) {
        //     const errorJSON = await err.json();
        //     const errorsContainer = document.querySelector(".errors-container");
        //     let errorsHtml = [
        //         `
        //         <div class="alert alert-danger">
        //             Something went wrong. Please try again.
        //         </div>
        //         `,
        //     ];
        //     const { errors } = errorJSON;
        //     if (errors && Array.isArray(errors)) {
        //         errorsHtml = errors.map(
        //             (message) => `
        //             <div class="alert alert-danger">
        //                 ${message}
        //             </div>
        //             `
        //         );
        //     }
        //     errorsContainer.innerHTML = errorsHtml.join("");
        // } else {
        //     alert(
        //         "Something went wrong. Please check your internet connection and try again!"
        //     );
        
    }
});