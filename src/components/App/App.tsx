import { useState } from "react";

import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";

export const App = () => {
  const [count, setCount] = useState<number>(0);

  const incrementFunc = () => setCount((prev) => prev + 1);
  return (
    <div>
      <Link to='/about'>About</Link>
      <br />
      <Link to='/shop'>Shop</Link>
      <h1 className={classes.count}>{count}</h1>
      <button className={classes.button} onClick={incrementFunc}>
        Click!
      </button>
      <Outlet />
    </div>
  );
};
