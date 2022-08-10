export const ConvertedValueDisplay = ({to,from,amount}) => {

    const resultView =
    itemFromData.price && itemToData.price && amount !== 0
      ? `${amount} 
        ${itemFromData.name} =
        ${interNumberFormat.format(result)} 
        ${itemToData.name}`
      : "Please Select Data";

    return (
        <div className={classes.result}>
        <p>Converted Amount:</p>
        <p className={classes["result-number"]}>{resultView}</p>
      </div>
    )
}