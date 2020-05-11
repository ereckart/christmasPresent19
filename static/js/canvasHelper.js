function wrapText(context, text, x, y, maxWidth, fontSize) {
    lineHeight = fontSize * 1.3;
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
        ctx.font = `${fontSize}px "Press Start 2P"`;
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
    }
    else {
        line = testLine;
    }
    }
    context.fillText(line, x, y);
}