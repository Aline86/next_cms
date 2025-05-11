const LinkData = ({ url, name }: { url: string; name: string }) => {
  return (
    <a
      href={url !== undefined ? url : ""}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: "blue", textDecoration: "underline" }}
    >
      {name}
    </a>
  );
};

export default LinkData;
