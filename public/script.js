const button = document.querySelector("button")
button.addEventListener("click", () => {
    console.log("chekcout")
    fetch('http://localhost:3000/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            items: [
                { id: 1, quantity: 3 },
                { id: 2, quantity: 1 }
            ]
        })
    })
        .then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => promiseImpl.reject(json))
        }).then(({ url }) => {
            window.location = url
            // console.log(url)
        })
        .catch(e => {
            console.log(e.error)
        })
})
