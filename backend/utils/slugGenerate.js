export default function slugGenerate(str) {
  const a = "àáäâãåăæçèéëêǵḧìíïîḿńǹñòóöôœøṕŕßśșțùúüûǘẃẍÿź·/_,:;";
  const b = "aaaaaaaaaacceeeeghiiiimnnnooooooprsssstuuuuuwxyz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return str
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(p, (c) => b.charAt(a.indexOf(c)))
    .replace(/&/g, "-and-");
}
