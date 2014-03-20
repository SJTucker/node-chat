/* global io:true */

(function(){

  'use strict';

  $(document).ready(initialize);

  function initialize(){
    $(document).foundation();
    initializeSocketIO();
    $('button').click(sendMessage);
  }

  var socket;

  function initializeSocketIO(){
    socket = io.connect('/app');
    socket.on('online', function(data){console.log(data)});
    socket.on('message', addMessage);
  }

  function sendMessage(){
    var data = {};
    data.text = $('textarea').val();
    socket.emit('newmessage', data);
  }

  function addMessage(data){
    console.log('Received message from node: ')
    console.log(data);
    var $message = $('<div>'+data.text+'</div>');
    $('textarea').prepend($message);
  }


})();
