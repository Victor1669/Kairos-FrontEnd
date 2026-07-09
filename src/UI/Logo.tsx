interface PropType extends React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
> {
  type?: "normal" | "transparent";
}

export default function Logo({ type = "normal", ...props }: PropType) {
  return (
    <img
      {...props}
      style={{
        aspectRatio: type === "normal" ? 162 / 83 : 1018 / 322,
        width: 162,
      }}
      alt="Logo da Kairós"
      src={type === "normal" ? "/logo.png" : "/logo-transparent.png"}
    />
  );
}
