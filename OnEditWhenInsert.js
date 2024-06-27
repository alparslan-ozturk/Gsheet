function onEdit(e) {
    // Ensure the event object e is defined
    if (!e) {
      Logger.log('The event object is not defined.');
      return;
    }
  
    // Get the active sheet
    var sheet = e.source.getActiveSheet();
    var sheetName =sheet.getName();
  
    if(sheetName == "TALEPLER"){
    // Get the range that was edited
    var range = e.range;
    if (range.getColumn() == 3) { // Column G is the 3th column
      // Get the current date and time
      var now = new Date();
  
      // Write the current date and time to the corresponding cell in column H
      var row = range.getRow();
      sheet.getRange(row, 5).setValue(now); // Column H is the 5th column
    }
  }
  
    if(sheetName == "TALEP AYRINTILAR"){
  
    // Get the range that was edited
    var range = e.range;
  
    // Check if the edited cell is in column G
    if (range.getColumn() == 8) { // Column G is the 3th column
      // Get the current date and time
      var now = new Date();
  
      // Write the current date and time to the corresponding cell in column H
      var row = range.getRow();
      var oldValue = e.oldValue;
      var newValue = e.value;
      if(newValue == undefined){
        protectCell(range);
        sheet.getRange(row, 8).setValue(oldValue);
        var valid = sheet.getRange(row,13).getValue();
        if(valid == undefined || valid == ""){
          sheet.getRange(row, 13).setValue(1);
        }
        else{
          sheet.getRange(row, 13).setValue(parseInt(valid) + 1);
        }
        SpreadsheetApp.getUi().alert("BU VERİ SİLİNEMEZ!")
        return;
      }
      var drpList = [    
      "FİYAT TEKLİFİ AŞAMASINDA",
      "ONAY BEKLİYOR",
      "SATINALMA GERÇEKLEŞTİ"
      ];
      const oldValueIndex = drpList.findIndex(item => item == oldValue);
      const newValueIndex = drpList.findIndex(item => item == newValue);
      if(oldValueIndex >= newValueIndex){
        sheet.getRange(row, 8).setValue(oldValue);
        var alert = SpreadsheetApp.getActive().toast("BU AŞAMA GERİ ALINAMAZ!", "HATA MESAJI");
      }
      else{
        sheet.getRange(row, 9).setValue(now); // Column H is the 5th column
      }
    }
  }
  }
  function protectCell(range) {
    var ownerMail = SpreadsheetApp.getActiveSpreadsheet().getOwner().getEmail();
      var protection = range.protect().setDescription('Protected by script');
      protection.removeEditors(protection.getEditors())
      var editors = protection.getEditors();
      for(var i = 0; i< editors.lenght; i++ ){
        if(ownerMail != editors[i].getEmail()){
          protection.removeEditors(editors[i])
        }
      }
  }
  