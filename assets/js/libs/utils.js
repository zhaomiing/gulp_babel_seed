export default {
  add: (...args) => {
    let sum = 0;
    
    for(let i of args) {
      sum += i;
    }
    
    return sum;
  }
};