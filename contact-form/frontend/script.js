const form = document.getElementById("contactForm")

form.addEventListener("submit",async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("http://localhost:3000/submit-contact",{
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                name:name,
                email:email,
                message:message
            })
        })

        const data = await response.json();

        document.getElementById("result").textContent = data.message;

        if(data.success){
            form.reset()
        }
    } catch (error) {
        console.log(error);
        document.getElementById("result").textContent="something went wrong"
    }
})