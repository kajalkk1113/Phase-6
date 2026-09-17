const form = document.getElementById("form")
const result = document.getElementById("result")

form.addEventListener("submit",async(e)=>{
    e.preventDefault()

    const name = document.getElementById("name").value.trim()
    const rating= document.getElementById("rating").value
    const comment = document.getElementById("").value.trim()

    try {
        const response = await fetch("http://localhost:3000/form",{
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:name,
                rating:rating,
                comment:comment
            })
        })

        const data = await response.json()

        

        if(data.success){
            result.textContent =data.message
            form.reset()
        }
    } catch (error) {
        console.log(error);
        
        result.textContent="something went wrong"
    }
})