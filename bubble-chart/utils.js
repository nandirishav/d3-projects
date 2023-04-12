export const colorBox = [
  "#1e1286",
  "#265fa5",
  "#059769",
  "#a8d5c9",
  "#613314",
  "#90fa94",
  "#493600",
  "#6a94ed",
];

export const setData = (data) => {
  const inData = JSON.parse(JSON.stringify(data));
  console.log(inData);
  let labels = inData?.labels
    ? inData?.labels
    : [{ label: "label", value: "value" }];
  let allData = inData.data;

  let filteredData = allData;
  var formattedData = [];
  // process data object with multiple values
  for (var k = 0; k < labels.length; k++) {
    var items = [];
    for (let i = 0; i < filteredData.length; i++) {
      let value = filteredData[i][labels[k].value];
      const item = {
        label: filteredData[i].label,
        value: parseInt(value),
        accValue:
          (formattedData[k - 1] && formattedData[k - 1][i]?.accValue
            ? formattedData[k - 1][i]?.accValue
            : 0) + parseInt(value),
        labelText: labels[k].label,
        index: i,
        color: allData[i].color ? allData[i].color : colorBox[k],
      };
      items.push(item);
    }
    formattedData.push(items);
  }
  return formattedData;
};
