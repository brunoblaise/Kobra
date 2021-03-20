import React, { useState, createContext, useContext, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import getMuiTheme from './getMuiTheme';
import { ThemeProvider } from '@material-ui/core';

export const DarkContext = createContext([false, (_: boolean) => {}] as [
  boolean,
  { (_: boolean): void }
]);

interface DarkThemeProviderProps {
  children: React.ReactNode;
}

export function DarkThemeProvider(props: DarkThemeProviderProps) {
  const [isDark, _setDark] = useState(Cookies.get('isDarkTheme') === 'true');
  const setDark = (themeEnabled: boolean) => {
    _setDark(themeEnabled);
    Cookies.set('isDarkTheme', themeEnabled.toString());
  };

    useEffect(() => {
        if(globalThis.window !== undefined) {
            document.body.style.backgroundColor = isDark ? "#121212" : "#ffffff";
        }
    }, [isDark]);

    const theme = useMemo(
        () => getMuiTheme(isDark),
        [isDark]
    );

    return (
        <ThemeProvider theme={theme}>
            <DarkContext.Provider value={ [isDark, setDark] }>
                { props.children }
            </DarkContext.Provider>
        </ThemeProvider>
    ); 
}

export function useDarkTheme() {
  const [isDark, setDark] = useContext(DarkContext);
  const toggleDark = () => setDark(!isDark);

  return { isDark, setDark, toggleDark };
}
