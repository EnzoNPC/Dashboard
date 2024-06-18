//RFI TAG:driverName=EMIC Message

/**
 * @fn void pEmicMessage(int tag, int message)
 * @alias send
 * @brief Send Message to widgets
 * @param tag tag
 * @param message message
 * @return Nothing
 */

function pEmicMessage(tag,message){
	const messageEvent = new CustomEvent(`user:subscribe:${tag}`, {
		detail: { topic: tag, message: message },
		bubbles: true,
		composed: true
	  });
	  document.dispatchEvent(messageEvent);
}

/**
 * @fn extern void eEmicMessage(int tag,int message)
 * @alias receive
 * @brief When receive Message to widgets
 * @param tag tag
 * @param message message
 * @return Nothing
 */