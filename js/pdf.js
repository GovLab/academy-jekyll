$(document).ready(function() {
  $(".download-button").click(function() {
    var doc = new jsPDF();

    doc.addImage($('#gov-logo').get(0), 65, 10, 80, 10);
    doc.addImage($('#gov-footer').get(0), 7, 275, 195, 18);

    doc.fromHTML($('#pdf-title').get(0), 10, 13);
    doc.fromHTML($('#pdf-start').get(0), 10, 29);

    // doc.text("DESCRIPTION", 10, 55);
    doc.fromHTML($('#pdf-desc').get(0), 10, 40, {'width': 180});

    // doc.text("CLASSES", 10, 110);
    var classes = document.getElementsByClassName('pdf-class-title');
    var classDesc = document.getElementsByClassName('pdf-class-desc');

    var classHeight = 93;
    var weekDesc = 103;

    for (var i = 0, len = classes.length; i < len; i++) {
      doc.fromHTML(classes[i], 10, classHeight, {'width': 180});
      doc.fromHTML(classDesc[i], 10, weekDesc, {'width': 180});
      if(classHeight >= 130 || weekDesc >= 130) {
        classHeight = -60;
        weekDesc = -50;
        doc.addPage();
        doc.addImage($('#gov-logo').get(0), 65, 10, 80, 10);
        doc.addImage($('#gov-footer').get(0), 7, 275, 195, 18);
      } else if (classHeight >= 230 || weekDesc >= 230) {
        classHeight = -60;
        weekDesc = -50;
        doc.addPage();
        doc.addImage($('#gov-logo').get(0), 65, 10, 80, 10);
        doc.addImage($('#gov-footer').get(0), 7, 275, 195, 18);
      }
      classHeight += 80;
      weekDesc += 80;
    }

    doc.save('syllabus.pdf')
  })
})
