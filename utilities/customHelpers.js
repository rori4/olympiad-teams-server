function htmlToTextFormat(html) {
  let textWithNewLines = html.replace(/(<\/p>|<\/br>)/gm, "\n\n");
  let textWithListItems = textWithNewLines.replace(/(<li>)/gm, "• ");
  let clearedText = textWithListItems.replace(/<\/?[^>]+(>|$)/g, "");
  return clearedText;
}


module.exports = {
    htmlToTextFormat
}