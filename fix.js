// This file patches Qwen_javascript_20260509_3qpkovjr8.js
// It adds 'async' before 'function startTracking()'

const fs = require('fs');
const path = '/Users/chenjiaping/Downloads/三叶草/Qwen_javascript_20260509_3qpkovjr8.js';
let content = fs.readFileSync(path, 'utf8');
content = content.replace('function startTracking() {', 'async function startTracking() {');
fs.writeFileSync(path, content, 'utf8');
console.log('Fixed! Added async to startTracking');