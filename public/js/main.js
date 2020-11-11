console.log('Client side js loaded')

const weartherform= document.querySelector('form')
var resultline=document.querySelector('[id="ForcRes"]')
resultline.textContent='Enter details to see your forecast here'
weartherform.addEventListener('submit',(e)=>{
    e.preventDefault()
 //   var params=document.querySelector('input')
    var city=document.querySelector('[name="city"]').value
var country=document.getElementsByName('country')[0].value
resultline.textContent='Loading..'

//fetch('http://localhost:3000/weather?city='+city+'&country='+country).then(
//shortening the url casue we won't know in which port the code will run on server 
fetch('/weather?city='+city+'&country='+country).then(
    (response)=>{
        response.json().then((data)=>{

            if(data.error)
            {
                console.log(data.error)
                resultline.textContent=JSON.stringify(data.error)
            }
            else
            {
                console.log(data)
                var msg= city+' will have a temperature of '+ data.temp+' and the sky will be '+data.sky+'.'

                resultline.textContent=msg
            }
        })
    }
)
})