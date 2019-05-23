$(document).ready(function() {

	$("#newTodo").on("keypress", function(event){
		if(event.keyCode == 13){	/*Hit Enter Key*/
			var TodoText = $(this).val();
			$(this).val(""); 		//Clear the input after grab the data
			$("ul").append("<li><span class=\"delete\"><i class=\"fas fa-trash-alt\"></i></span>"+TodoText+"</li>");
		}
	})

	// .on( events [, selector ], handler )
	// A selector string to filter the descendants of the selected elements that trigger the event. 
	// For DYNAMIC listener
	$("ul").on("click", "li", function(){
		$(this).toggleClass("markFinished");
	})

	$("ul").on("click", ".delete", function(event){
		$(this).parent().fadeOut(function(){
			$(this).remove();
		})
		// stop tracing back to the parent element
		// in this case, don't triggered the click event in <li>: markFinished
		event.stopPropagation();
	})

	$("#plus").on("click", function(){
		$("#newTodo").fadeToggle(function() {
			
		});
	});

});
