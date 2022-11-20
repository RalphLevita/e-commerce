const numberValidation = (str) => {
    const strPosition = str.search("9");
    const strLength = str.length;
    const initial = str.substr(0, strPosition);
    const number = str.substr(strPosition, strLength);
    if (
     (str.startsWith("09") === true ||
      str.startsWith("+639") === true ||
      str.startsWith("63") === true) &&
     Number(number.length) === 10
    ) {
     return [{ message: "success", number, initial }];
    } else {
     return [{ message: "not success" }];
    }
   };


   const checkingValidation = (data) => {
    let error = "";
    Object.keys(data).map(function (key, index) {
     !data[key]
      ? (error =
         error === "" ? key + " is required" : error + "\n" + key + " is required")
      : null;
    });
    return error;
   };


   module.exports = {
    checkingValidation,
    numberValidation,
   };