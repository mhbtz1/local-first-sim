self.onmessage = (e) => {
    console.log("message received!")
    const event = new CustomEvent('worker-respond',
        {
            detail: "test"
        }
    )
}