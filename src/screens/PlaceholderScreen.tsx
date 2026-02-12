interface Props {
  title: string;
}

export const PlaceholderScreen = ({ title }: Props) => {
  return (
    <div style={{ padding: 20 }}>
      <h2>{title}</h2>
      <p>Coming soon…</p>
    </div>
  );
};
