/* --------------------------------------
Create Assignments v2.0
by Aaron Troia (https://github.com/atroia)
Modified Date: 4/14/23

Description: 
Create assignments from an text input list or a text selection

-------------------------------------- */

#targetengine "assignments"

var d = app.activeDocument;
var docName = d.name;
var assignment = [];
var selection;

main();

function main(){
  try {
    if (app.documents.length == 0) {
      alert("No documents are open.");
    } else {
      if (app.selection.length > 0) {
        selection = app.selection[0].contents;
        selectionDialog();
      } else {
        listDialog();
      }
    }
  } catch (e) {
    alert(e.description);
  }
}

// Copy InDesign file name, remove ext, split and 
// only return 20 chars to make native Assignment folder 
function formatFileName(){
  var docPath = d.filePath.absoluteURI;
  // Split document name to get 20 chars needed for Assignments folder
  var split = docName.split(".");
  var filename = split[0];
  if (filename.length > 20) {
    filename = filename.substring(0, 20);
  }
  var storyPath = docPath + "/" + filename + " Assignments/";
  return storyPath;
}

// Create Assignments from either list or selection
function createAssignments(name, path) {
  for (var i = 0; i < name.length; i++) {
    var userColor = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    var assignmentFile = new File(path + name[i] + ".icma");
    assignment.push(
      d.assignments.add(assignmentFile, undefined, false, {
        name: name[i],
        frameColor: userColor,
        includeLinksWhenPackage: true,
        exportOption: AssignmentExportOptions.ASSIGNED_SPREADS,
        assignmentFileStatus: AssignmentStatus.ASSIGNMENT_UP_TO_DATE,
      })
    );
    assignment[i].update();
  }
}

// Text List Input Dialog Box
function listDialog(){
  var asgnName = [];
  var win = new Window("dialog", "Create Assignments from a List, v2.0");
  // win.alignChildren = "left";
  win.input = win.add("group");
  win.input.alignChildren = "top";
  win.input.txt = win.input.add("edittext", undefined, undefined, {
    multiline: true,
  });
  win.input.txt.encoding = "UTF8";
  win.input.txt.minimumSize = [300, 300];
  win.buttons = win.add("group");
  win.buttons.alignChildren = "center";
  win.buttons.ok = win.buttons.add("button", undefined, "OK");
  win.buttons.cancel = win.buttons.add("button", undefined, "Cancel");
  win.show();
  //list text input
  asgnName = win.input.txt.text.split(/\n/);

  createAssignments(asgnName, formatFileName());
}

// Text Selection Dialog Box
function selectionDialog() {
  // DIALOG
  // ======
  var dialog = new Window("dialog");
  dialog.text = "Create Assignments";
  dialog.orientation = "column";
  dialog.alignChildren = ["center", "top"];
  dialog.spacing = 10;
  dialog.margins = 16;

  // GROUP1
  // ======
  var group1 = dialog.add("group", undefined, { name: "group1" });
  group1.orientation = "column";
  group1.alignChildren = ["left", "center"];
  group1.spacing = 10;
  group1.margins = 0;

  var radiobutton1 = group1.add("radiobutton", undefined, undefined, {
    name: "radiobutton1",
  });
  radiobutton1.text = "Compile from Selection";
  radiobutton1.helpTip = "Script compiles Assignments from selection";

  var radiobutton2 = group1.add("radiobutton", undefined, undefined, {
    name: "radiobutton2",
  });
  radiobutton2.text = "Export Formatted List to File";
  radiobutton2.helpTip = "Export the selection as a formatted CSV text file";

  var radiobutton3 = group1.add("radiobutton", undefined, undefined, {
    name: "radiobutton3",
  });
  radiobutton3.text = "Export Unformatted List to File";
  radiobutton3.helpTip = "Export the selection as is to a text file";

  // GROUP2
  // ======
  var group2 = dialog.add("group", undefined, { name: "group2" });
  group2.orientation = "row";
  group2.alignChildren = ["left", "center"];
  group2.spacing = 10;
  group2.margins = 0;

  // buttons
  var button1 = group2.add("button", undefined, undefined, { name: "button1" });
  button1.text = "Cancel";

  var button2 = group2.add("button", undefined, undefined, { name: "button3" });
  button2.text = "OK";

  var myResult = dialog.show();
  if (myResult == 1) {
    if (radiobutton1.value == true) {
      createAssignments(selectedText(selection), formatFileName());
    } else if (radiobutton2.value == true) {
      myExport(selectedText(selection).join("\n"), "txt");
    }
    else if (radiobutton3.value == true) {
      myExport(selection, "txt");
    }
  } else if (myResult == 2) {
    exit(0);
  }

}

// Format selected or list text
function selectedText(sel) {
  // Select the TOC in InDesign and return and array
  var split = sel.split(/\t\d+(\r?\n?\s+?|$)/);
  var frontmatter_TOC = [],
    frontmatter_clean = [],
    content_TOC = [],
    content_clean = [],
    content_removeCh = [],
    content_addChNum = [],
    backmatter_TOC = [],
    completeTOC = [];
  frontmatter_TOC.push("Frontmatter"); //unshift

  function pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }

  // Split out TOC selection so its easier to format
  for (var i = 0; i < split.length; i++) {
    if (split[i].match(/(Chapter|Book)/gi)) {
      content_TOC.push(split[i]);
    } else if (
      split[i].match(
        /(Preface|Acknowledgments|Introduction|A Note to the Reader|Foreword|Poem)/gi
      )
    ) {
      frontmatter_TOC.push(split[i]);
    } else if (split[i].match(/(Index|Appendix|Endnotes|Biblography|References|Reference List)/gi)) {
      backmatter_TOC.push(split[i]);
    }
  }

  // remove any tabs or spaces in frontmatter items
  for (var m = 0; m < frontmatter_TOC.length; m++) {
    frontmatter_clean.push(frontmatter_TOC[m].replace(/(\t+?|\s+?)$/gi, ""));
  }

  // remove Chapter or Book with number or word, perid or colon, and any tabs or spaces following it
  for (var j = 0; j < content_TOC.length; j++) {
    content_removeCh.push(
      // content_TOC[j].replace(/((Chapter|Book) ([\d+|\w+])[:.]\t?\s+?|\t\d+)/gi, "")
      content_TOC[j].replace(/((Chapter|Book) (\d+|\w+)[:.](\t|\s)+)/gi, "")
    );
  }

  // remove any punctuation
  for (var n = 0; n < content_removeCh.length; n++) {
    content_clean.push(content_removeCh[n].replace(/[^A-Za-z0-9 \n-]+/g, ""));
  }

  // add chapter number and hyphen
  for (var k = 0; k < content_clean.length; k++) {
    content_addChNum.push(String([k + 1]) + "-" + content_clean[k]);
  }

  // If Backmatter_TOC is empty concat does not work correctly
  if (backmatter_TOC !== []) {
    var concTOC = frontmatter_clean.concat(
      content_addChNum,
      backmatter_TOC
    );
  } else {
    var concTOC = frontmatter_clean.concat(content_addChNum);
  }

  // add overall list numbers to all TOC items
  for (var l = 0; l < concTOC.length; l++) {
    completeTOC.push(String(pad([l])) + "-" + concTOC[l]);
  }
  return completeTOC;
  // createAssignments(completeTOC, formatFileName());
}

// Export selected text to a text file
// https://stackoverflow.com/questions/35487623/how-do-i-save-a-text-file-using-an-indesign-script
function myExport(sel, ext) {
  var split = docName.split(".");
  var fn = split[0];
  var docPath = d.filePath.absoluteURI;
  var filename = fn + "." + ext;

  //Create File object
  var file = new File(docPath + "/" + filename);

  file.encoding = "UTF-8";
  file.open("w");
  file.write(sel);
  file.close();
}