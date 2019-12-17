$(document).ready(function(){
  
  // config variable
  const compounding_per_year = 12;
  const validateKeys = [0,1,2,3,4,5,6,7,8,9, "."];
  
  var doneTypingInterval = 500, 
      property,
      propertyValue,
      deposit,
      depositValue,
      year,
      years,
      interest,
      interestVal,
      net,
      netValue,

      monthlyPayment,
      totalCost,
      ltv,
      totalMortgage,
      typingTimer;

  // call init fn
  init();
  

  function init(){
    autoFill();
    $(".alert-warning").hide();
  }

  function autoFill(){
    $("#compounding").val(compounding_per_year)
  }
  
  function showAlert(){
    $(".alert-warning").fadeIn();
    setTimeout(() => {
      $(".alert-warning").fadeOut();
    }, 1000)
  }
  function validate(str){
    
    if ( !str || str.includes('-')) return false
    else {
      return str.split("").reduce((flag, e) => {
        return flag && validateKeys.find(key => `${key}` === e) !== undefined
      }, true)
    }
  }

  function formatResult(){
    
  }

  function calcFn() {
      property = $('#propertyValue').val();
      deposit = $('#deposit').val();
      net = $('#netValue').val();
      year = $('#years').val();
      month = $('#months').val();
      interest = $('#interest').val();

      propertyValue = parseFloat(property),
      netValue = parseFloat(net),
      depositValue = parseFloat(deposit),
      months = parseFloat(month),
      years = parseFloat(year),
      interestVal = parseFloat(interest),
      
      monthlyPayment = (propertyValue * interestVal / 100 / compounding_per_year).toFixed(2);
      totalCost = (propertyValue * interestVal * years / 100).toFixed(2);
      ltv = (totalCost / netValue * 100).toFixed(2);
      totalMortgage = (propertyValue + parseFloat(totalCost)).toFixed(2);
      
      $("#monthlyPayment").text(monthlyPayment);
      $("#totalCost").text(totalCost);
      $("#ltv").text(ltv);
      $("#totalMortgage").text(totalMortgage);
  }
    
  $(function(){ 
    $('#interest').keyup(function(){
      interest = $(this).val();
      if (interest){
        console.log("interest", interest)
        if (interest.includes("-")) {
          $('#interest').val("");
          showAlert();
        }
        interestVal = parseFloat(interest)
        if (interestVal > 100) {
          $('#interest').val("");
          showAlert();
        }
      }
    })
  })
  
    
  $(function(){
    $('#years').keyup(function(){
        year = $(this).val();
        if (validate(year)) {
          years = parseFloat(year);
          clearTimeout(typingTimer);
          typingTimer = setTimeout(doneTyping, doneTypingInterval);
        } else {
          $(this).val("");
          showAlert();
        }
    });
  
    function doneTyping () {
      $('#months').val(Math.round(years * 12));  
    }
  })
  
  $(function(){
  
    $('#propertyValue').keyup(function(){
        property = $(this).val();
        deposit = $("#deposit").val();
        if (!validate(property)) {
          $(this).val("");
          showAlert();
          return;
        } 
        propertyValue = parseFloat(property);
        depositValue = deposit?parseFloat(deposit):0;
        clearTimeout(typingTimer);
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
    });
  
    function doneTyping () {
      $('#netValue').val(propertyValue - depositValue);  
    }
  })
  
  $(function(){
    $('#deposit').keyup(function(){
      deposit = $(this).val();
      property = $("#propertyValue").val();
      if (!validate(deposit)) {
        $(this).val("");
        showAlert();
        return;
      } 
      depositValue = parseFloat(deposit);
      propertyValue = property?parseFloat(property):0;
      console.log("deposit",deposit, depositValue, !deposit ,propertyValue > depositValue)
      clearTimeout(typingTimer);
      if (!deposit || propertyValue > depositValue) {
        typingTimer = setTimeout(doneTyping, doneTypingInterval);
      }
    });
  
    function doneTyping () {
      $('#netValue').val(propertyValue - depositValue);  
    }
  })
  
  
  $("#calcForm").submit(function(e){
    
    e.preventDefault();
    
    // $(this).reset();
    calcFn();
    
  })
})