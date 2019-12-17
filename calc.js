$(document).ready(function(){

    console.log("start")
    function myFunction() {
        var loan = $('#amount').val(),
            month = $('#months').val(),
            int = $('#interest').val(),
            years = $('#years').val(),
            down = $('#down').val(),
            amount = parseInt(loan),
            months = parseInt(month),
            down = parseInt(down),
            annInterest = parseFloat(int),
            monInt = annInterest / 1200,
            calculation = ((monInt + (monInt / (Math.pow((1 + monInt), months) -1))) * (amount - (down || 0))).toFixed(2);
      
        document.getElementById("output").innerHTML = calculation;
    }
    
    
    $(function(){
        var month = $(this).val(),
          doneTypingInterval = 500,
          months = parseInt(month),
          typingTimer;
    
      $('#months').keyup(function(){
          month = $(this).val();
          months = parseInt(month);
      
          clearTimeout(typingTimer);
          if (month) {
              typingTimer = setTimeout(doneTyping, doneTypingInterval);
          }
      });
    
      function doneTyping () {
        $('#years').val(months/12);  
      }
    })
    
    $(function(){
        var month = $(this).val(),
          doneTypingInterval = 500,
          months = parseInt(month),
          typingTimer;
    
      $('#months').keyup(function(){
          month = $(this).val();
          months = parseInt(month);
      
          clearTimeout(typingTimer);
          if (month) {
              typingTimer = setTimeout(doneTyping, doneTypingInterval);
          }
      });
    
      function doneTyping () {
        $('#years').val(months/12);  
      }
    })
    
    $(function(){
        var year = $(this).val(),
          doneTypingInterval = 500,
          years = parseInt(year),
          typingTimer;
    
      $('#years').keyup(function(){
          year = $(this).val();
          myears = parseInt(year);
      
          clearTimeout(typingTimer);
          if (year) {
              typingTimer = setTimeout(doneTyping, doneTypingInterval);
          }
      });
    
     
    
      function doneTyping () {
        $('#months').val(year * 12);  
      }
    })
    
    $("#calc").click(function(){
        console.log("this is it")
        myFunction() 
      })
    
    
    
    
    
})