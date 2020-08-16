import React from 'react';

export const Context = React.createContext();

export const Provider = (props) => {
    const [user, setUser] = React.useState();

    return (
        <Context.Provider value={{ user, setUser }} {...props} />
    );
};
