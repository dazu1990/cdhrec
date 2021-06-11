
const darkModeHelper = (params) => {

  let isDarkMode = typeof window !== 'undefined' && global.localStorage ? 
    Boolean(Number(global.localStorage.getItem('isDarkMode'))) :
    false;

  // Flips the darkMode state
  const toggleDarkMode = () => {
    isDarkMode = !isDarkMode;
    if(typeof window !== 'undefined' && global.localStorage){
      global.localStorage.setItem('isDarkMode', isDarkMode ? 1: 0);
    }
    global.location.reload();
  }


  return {isDarkMode, toggleDarkMode, };
};

export default darkModeHelper;




