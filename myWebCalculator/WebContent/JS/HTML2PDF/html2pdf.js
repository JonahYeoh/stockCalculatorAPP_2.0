function pdf(tag) {
    var divContents = $("#" + tag).html();
    var printWindow = window.open('', toolbar = 'yes', 'height=400,width=800');
    printWindow.document.write('<html><head><title>DIV Contents</title><link rel="stylesheet" type="text/css" href="style.css">');
    printWindow.document.write('</head><body >');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}