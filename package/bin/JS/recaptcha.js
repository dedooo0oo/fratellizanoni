const form = document.querySelector('form')

form.addEventListener('submit', (e) =>{
    e.preventDefault();
    const captchaResponse = grecaptcha.getResponse();

    if(!captchaResponse.length > 0){
        throw new Error ("Captcha not complete")
    }


    const fd = new FormData(e.target)
    const params = new URLSearchParams(fd);

    fetch('https://api.web3forms.com/submit', {
        method: "post",
        body: params,
    })
    .then (res=> res.json())
    .then (data=> console.log(data))
    .catch(err=>console.error(err))
});