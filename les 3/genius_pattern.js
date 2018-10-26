var text = "'Isn't this game really cool' - he asked.\nShe said: 'Well, it's so hard and I can't pass the first level!'";
var pattern = /(\B|\W)'|'(\W|\B)/g;
result=text.replace(pattern, '\"');
console.log(result);