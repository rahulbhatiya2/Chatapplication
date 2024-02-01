  const socket = io('http://localhost:8000');

  const messageget = document.querySelector('#messagebox');
  const form = document.querySelector('#send-container');
  const conta = document.querySelector('.main-box');
  
  const name = prompt("Enter your name to join");
  socket.emit('new-user-joined', name);

  function append (message,position){
    console.log(message)
      const ele = document.createElement('div');
      ele.innerText = message;
    //   ele.classList.add('message');
    if(position=='max'){
        ele.classList.add('message3');
        ele.classList.remove('message');
    }
    else if(position=='left'){
        ele.classList.add('message2');
    }
    else {
        ele.classList.add('message');
    }
     ele.classList.add(position);
      conta.append(ele);
  }
  

   socket.on('user-joined',(name) =>{
      append(`${name} joined the chat`,'max');
   })
   socket.on('receive', data =>{
       append(`${data.name}: ${data.message}`, 'left')
   })
 socket.on('left', name =>{
     append(`${name} left the chat`, 'max')
 })

 form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageget.value;
    append(`You:- ${message}`, 'right');
    socket.emit('send', message);
    messageget.value = ''
})



