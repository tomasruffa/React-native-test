/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import LoaderScreen from './src/screen/LoaderScreen'
import ListScreen from './src/screen/ListScreen'

const App = () => {
  const [loader, setLoader] = React.useState(true);

  React.useEffect(() => {
    setTimeout(function(){ setLoader(false); }, 3000);
  },[])

  return (
    <>
      {
        loader ? <LoaderScreen /> : <ListScreen />
      }
    </>
  );
};

export default App;
