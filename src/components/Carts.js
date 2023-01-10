import React from "react";

function CartItems({ cartItems, handleClick, cartKey }) {
  // console.log(cartItems);
  const drawItems = cartItems.map((value, index) => {
    return (
      <ul className="flex place-content-center ">
        <li key={index} className="mb-1">
          <div className="font-bold inline-flex w-10 text-stone-50 place-content-center bg-accent rounded-full py-2 px-2 mx-0.5">
            {value > 0 ? value : "zero"}
          </div>
          <button
            onClick={() => {
              handleClick(cartItems, index, "delete", cartKey);
            }}
            className="btn btn-sm btn-error ml-1  text-stone-50"
          >
            Delete
          </button>
          <button
            onClick={() => {
              handleClick(cartItems, index, "add", cartKey);
            }}
            className="btn btn-sm btn-circle btn-outline mx-1"
          >
            +
          </button>
          <button
            onClick={() => {
              handleClick(cartItems, index, "minus", cartKey);
            }}
            className="btn btn-sm btn-circle btn-outline mx-1"
          >
            -
          </button>
        </li>
      </ul>
    );
  });
  return drawItems;
}
function NavBar({ cartItems, handleNav, cartKey }) {
  /* COUNTING TOTAL CART ITEMS */
  console.log(`Counter key -->${cartKey}`);
  let navCounter = 0;
  cartItems.forEach((cartCount) => {
    if (cartCount > 0) {
      navCounter++;
    }
  });
  return (
    <div>
      <div className="p-2">
        <p className="text-center">
          <span className="font-bold text-xl px-1 bg-white rounded-full border px-2 text-center">
            {navCounter > 0 ? navCounter : " zero "}
          </span>
          Items
        </p>

        <div className="flex flex-col">
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text">Keep me stored</span>
              <input type="checkbox" className="toggle toggle-primary" />
            </label>
          </div>
        </div>
      </div>
      <div className="flex place-content-center">
        <div className="tooltip tooltip-success" data-tip="adds items to cart">
          <button
            className=" btn btn-primary btn-sm py-1 px-1 text-base"
            onClick={() => handleNav(cartItems, "add-counter", cartKey)}
          >
            Add item
          </button>
        </div>
        <button
          className=" btn btn-warning btn-sm text-white text-s py-1 px-1 "
          onClick={() => handleNav(cartItems, "reset", cartKey)}
        >
          Reset values
        </button>
      </div>
    </div>
  );
}
function Cart({ cartItems, handleClick, handleNav, cartKey }) {
  return (
    <main className="box-content bg-stone-50 w-80 p-4 border-4">
      <div className="dropdown flex place-content-center">
        <label tabindex="0" className="btn bg-success text-stone-50 btn-sm m-1">
          Click
        </label>
        <div
          tabindex="0"
          className="dropdown-content card card-compact w-64 p-2 shadow bg-primary text-primary-content"
        >
          <div className="card-body">
            <h3 className="card-title">This is cart {cartItems.length}!</h3>
            <p>You can add as much items as you want</p>
          </div>
        </div>
      </div>
      <NavBar cartItems={cartItems} handleNav={handleNav} cartKey={cartKey} />
      <div className="box-content p-4">
        <CartItems
          cartItems={cartItems}
          handleClick={handleClick}
          cartKey={cartKey}
        />
      </div>
    </main>
  );
}
function Carts() {
  const [cartCounters, setCartCounters] = React.useState(() => {
    return (
      JSON.parse(window.localStorage.getItem("counters")) ?? {
        cartNumbers: [
          [0, 0, 0, 0],
          [1, 2, 3, 4, 5, 6, 7, 9],
          [1, 2, 3, 4, 5, 6, 7, 9],
        ],
      }
    );
  });
  const { cartNumbers } = cartCounters; //! ASK ABOUT STATE MUTATION COPYING (DIFF BETWEEN REST SYNTAX AND NORMAL = OPERATION SYNTAX ) !///

  React.useEffect(() => {
    window.localStorage.setItem("counters", JSON.stringify(cartCounters));
  }, [cartCounters]);

  /* HANDLE NAV FUNCTIONS */
  const handleNav = (cartItems, operation, key) => {
    if (operation === "add-counter") {
      cartNumbers[key].push(0);
    }
    if (operation === "reset") {
      const resetValues = cartNumbers[key].map((item) => (item = 0));
      cartNumbers[key] = resetValues;
    }
    setCartCounters({ cartNumbers: cartNumbers });
  };
  /* HANDLE CART ITEMS */
  const handleClick = (cartItems, index, operation, key) => {
    console.log(
      `Adding value in Item:${index} of Cart:${key}--> ${cartNumbers[key]}`
    );
    //HANDLE ADDITION
    if (operation === "add") {
      cartNumbers[key][index] += 1;
    }
    //HANDLE SUBTRACTION
    if (operation === "minus") {
      if (cartNumbers[key][index] > 0)
        cartNumbers[key][index] = cartNumbers[key][index] - 1;
    }
    //HANDLE DELETE ITEM
    if (operation === "delete") {
      //Remove array element
      cartNumbers[key].splice(index, 1);
    }

    setCartCounters({ cartNumbers: cartNumbers });
  };
  const carts = cartNumbers.map((cartItem, index) => {
    return (
      <Cart
        cartKey={index}
        cartItems={cartItem}
        handleClick={handleClick}
        handleNav={handleNav}
      />
    );
  });

  return <div className="flex place-content-center">{carts}</div>;
}
export default Carts;
