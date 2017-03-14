// Given a credit card number, this function should return a string with the 
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy! 
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

// Note: `cardNumber` will always be a string 
var detectNetwork = function(cardNumber) { 
  var cards = [
  				{ name: 'American Express', prefix: [34, 37], length: [15] }, 
  				{ name: "Diner's Club", prefix: [38, 39], length: [14] },
  				{ name: 'Visa', prefix: [4], length: [13, 16, 19] },
  				{ name: 'MasterCard', prefix: [51, 52, 53, 54, 55], length: [16] },
  				{ name: 'Discover', prefix: [6011, 644, 645, 646, 647, 648, 649, 65], length: [16, 19] },
  				{ name: 'Maestro', prefix: [5018, 5020, 5038, 6304], length: [12, 13, 14, 15, 16, 17, 18, 19] },
  				{ name: 'China UnionPay', prefix: [[622126, 622925], [624, 626], [6282, 6288]], length: [16, 17, 18, 19] },
  				{ name: 'Switch', prefix: [4903, 4905, 4911, 4936, 564182, 633110, 6333, 6759], length: [16, 18, 19] }
              ]

  var match = cards.find(card => matchCard(card, cardNumber)); 
  return match ? match.name : 'Not a valid card number';
};

function matchCard(card, number) {
  var prefix = card.prefix.some(start => {
  	if(Array.isArray(start)) {
  	  for(var i = start[0]; i <= start[1]; i++) {
  	  	if(number.startsWith(i)) {
  	  	  return true;
  	  	}
  	  }
  	  return false;
  	} else {
  	  if((number.startsWith(4903) || number.startsWith(4905) || 
  	  	 number.startsWith(4911) || number.startsWith(4936))) { // &&
  	  	 //number.length === 16 || number.length === 19) {
  	  	return card.name === 'Switch';
  	  } else {
  	  	return number.startsWith(start);
  	  }
  	}
  });
  var length = card.length.some(len => number.length === len);
  return prefix && length; 
}