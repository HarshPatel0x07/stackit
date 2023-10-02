//"https://script.google.com/macros/s/AKfycbyo1lFXgzDEeXgAYnLevcxN2MmP9_5XvljOWsup-Wb0-Gp9_B4aTGhLEbhzjisYOlxc/exec";

// web app UI
function doGet() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('Page')
      .setTitle('CSV Importer Web App')
      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  return htmlOutput;
}

// import selected columns to Sheet
function importSelectedColumns(data, selectedColumns) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  sheet.clear();

  // Headers
  var headers = data[0];
  var selectedHeaders = selectedColumns.map(function(col) {
    return headers[col];
  });

  // Append headers
  sheet.appendRow(selectedHeaders);

  // Batch processing for data rows (100 rows at a time)
  var batchSize = 100;
  for (var i = 1; i < data.length; i += batchSize) {
    var batchData = data.slice(i, i + batchSize);
    var rowData = batchData.map(function(row) {
      return selectedColumns.map(function(col) {
        return row[col];
      });
    });

    // Append batches
    sheet.getRange(sheet.getLastRow() + 1, 1, rowData.length, selectedColumns.length).setValues(rowData);
  }
}

// web app UI
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}
