const form = document.getElementById("form");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const title = document.getElementById("title").value;
const content = document.getElementById("content").value;

try {

    const response = await fetch("http://localhost:3000/note", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            title: title,
            content: content
        })
    });

    const data = await response.json();

    message.innerText = data.message;

    form.reset();

} catch (error) {

    console.log(error);

    message.innerText = "Something went wrong";

}

});