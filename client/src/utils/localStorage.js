export const getSavedDrinkIds = () => {
    const savedDrinkIds = localStorage.getItem('saved_drinks')
      ? JSON.parse(localStorage.getItem('saved_drinks'))
      : [];
  
    return savedDrinkIds;
  };
  
  export const saveDrinkIds = (drinkIdArr) => {
    if (drinkIdArr.length) {
      localStorage.setItem('saved_drinks', JSON.stringify(drinkIdArr));
    } else {
      localStorage.removeItem('saved_drinks');
    }
  };
  
  export const removeDrinkId = (name) => {
    const savedDrinkIds = localStorage.getItem('saved_drinks')
      ? JSON.parse(localStorage.getItem('saved_drinks'))
      : null;
  
    if (!savedDrinkIds) {
      return false;
    }
  
    const updatedSavedDrinkIds = savedDrinkIds?.filter((savedDrinkId) => savedDrinkId !== name);
    localStorage.setItem('saved_drinks', JSON.stringify(updatedSavedDrinkIds));
  
    return true;
  };