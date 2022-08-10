export const ConvertAmount = () => {    
    const inputChangeHandler = (event) => {
        let value = event.target.value;

        if(value < 0 || typeof value !== Number) {
            value = 0
        }
        dispatch(convertActions.changeQuantity(+value));
      };

    return(
        <div className={classes.selects}>
          <label htmlFor="amount">Amount:</label>
          <input
            name="amount"
            id="amount"
            type="number"
            value={value}
            onChange={inputChangeHandler}
            className={classes.amount}
          />
        </div>
    )
}