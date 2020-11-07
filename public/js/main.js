console.log('Client side js loaded')

const weartherform= document.querySelector('form')
var resultline=document.querySelector('[id="ForcRes"]')
resultline.textContent='Enter details to see your forecast here'
weartherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    var params=document.querySelector('input')
    var city=document.querySelector('[name="city"]').value
var country=document.getElementsByName('country')[0].value
resultline.textContent='Loading..'
//console.log(city,country,params)
fetch('http://localhost:3000/weather?city='+city+'&country='+country).then(
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
                resultline.textContent=JSON.stringify(data)
            }
        })
    }
)
 
//    console.log('Testing')
})