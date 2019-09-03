function pdf(tag, nameTag, dateTag, deptTag) {
    var name = document.getElementById(nameTag).value + " ";
    var date = document.getElementById(dateTag).value;
    var dept = document.getElementById(deptTag).value;
    var divContents = $("#" + tag).html();
    var printWindow = window.open('', toolbar = 'yes', 'height=400,width=800');
    printWindow.document.write('<html><head><title>Order Quantity</title><link rel="stylesheet" type="text/css" href="style.css">');
    printWindow.document.write('</head><body><div style="width: 100%;height: 50px;padding:5px;float:left;"><img src = "http://www.liberaldictionary.com/wp-content/uploads/2019/02/icon-0326.jpg" alt = "logo" align = "left" style="max-height: 100px;"/ ></div>');
    printWindow.document.write('<div><h2 align="center">Ordering Form</h2></div>')
    printWindow.document.write('<hr />')
    printWindow.document.write('<h3>Order placed by:    ');
    printWindow.document.write(name + '</h3>');
    printWindow.document.write('<h3>Date:       ');
    printWindow.document.write(date + '</h3>');
    printWindow.document.write('<h3>Department:     ');
    printWindow.document.write(dept + '</h3>');
    printWindow.document.write('<hr />');
    printWindow.document.write(divContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}