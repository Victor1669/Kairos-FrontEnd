export default function Logo(
  props: React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
) {
  return <img {...props} src="/logo.png" />;
}
