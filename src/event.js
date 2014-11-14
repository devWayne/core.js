;(function($){

   /**
    * Event function collection
    */
    $.event = {

	   /**
	    * @param {varType} elem Description
	    * @param {varType} type Description
	    * @param {varType} callback Description
	    * @return {void} description
	    */
	    add:function(elem,type,callback){
		if(elem.addEventListener){
		elem.addEventListener(type,callback,false);	
		}	     	
		else{
		elem.attchEvent(type,callback);	
		}
	    },
	    remove:function(){
	  
	    }
    };
})(core);
