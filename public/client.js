
// client-side js
// run by the browser each time your view template is loaded

$("#submit-letter").click(async function() {

    const reqBody = {
      userName : $("#userName").val(),
      wish : $("#wish").val()
    }

    const result = await storeSantaLetter(reqBody)

    alert(result);
    
    // $.ajax({url: "/test", success: function(result){
    //   alert(JSON.stringify(result));
    // }});

});

async function storeSantaLetter(reqBody){

  try{

    const PUT_LETTER_URL = '/santa/putSantaLetter';

    const result = await asyncAjax(PUT_LETTER_URL, reqBody);

    return JSON.stringify(result);

  } catch(e){

      console.log(e);
      return "ERROR OCCURED SORRY!";

  }

}


function asyncAjax(url, data){

  return new Promise(function(resolve, reject) {
          $.ajax({
              url: url,
              type: "POST",
              data: data,
              dataType: "json",
              beforeSend: function() {
              },
              success: function(data) {
                  resolve(data) // Resolve promise and when success
              },
              error: function(err) {
                  reject(err) // Reject the promise and go to catch()
              }
          });
  });

}


// listen for the form to be submitted and add a new dream when it is
// santaForm.onsubmit = function (event) {

//   console.log("test 1 ##");
//   console.log(event);

//   // TODO: check the text isn't more than 100chars before submitting
//   // event.preventDefault();
// };
