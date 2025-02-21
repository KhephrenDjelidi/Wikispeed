import { useRedirect } from "../script/Redirection";

export const PlayButton = () => {
  const redirectTo = useRedirect();

  return (
    <button className="PlayButton" onClick={() => redirectTo("/multicreation")}>
      Play ! →
    </button>
  );
};
