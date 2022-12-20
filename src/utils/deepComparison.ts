export const deepComparison = (prevValue: any, nextValue: any): boolean => {

    if (typeof prevValue !== typeof nextValue) {
        return false;
      }
    
      if (typeof prevValue === "object") {
        if (Object.keys(prevValue).length !== Object.keys(nextValue).length) {
          return false;
        }
    
        return Object.keys(prevValue).every((key) =>
          deepComparison(prevValue[key], nextValue[key])
        );
      } 
    
      return prevValue === nextValue;

    
}