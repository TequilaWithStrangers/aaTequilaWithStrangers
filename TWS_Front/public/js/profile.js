document.addEventListener('DOMContentLoaded', async ()=> {
    const user = localStorage.getItem("TWITTER_LITE_CURRENT_USER_ID");
    
    try{
        
        
        const res = await fetch(`http://localhost:8080/users/${user}/tweets`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("TWITTER_LITE_ACCESS_TOKEN")}`
            }
          });
        if (res.status === 401){
            window.location.href = '/log-in';
            return;
        };
        const tweets = await res.json();
        const tweetsContainer = document.querySelector(".tweets-container");
        console.log(tweets)
        const tweetsHtml = tweets.map(
            ({ message, id }) => `
            <div class="card" id="tweet-${id}">
              <div class="card-body">
                <p class="card-text">${message}</p>
              </div>
            </div>
          `
          );
        tweetsContainer.innerHTML = tweetsHtml.join("");
    }
    catch(err){
        console.error(err)
    }
})
