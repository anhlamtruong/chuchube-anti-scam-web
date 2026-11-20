// Adapted from living-ui-skills (living-ui-effects, MIT).
// Markup hook for the scramble effect. Server-safe: no hooks, real text in the
// HTML. Wrap only the label of a link or button, never its icons. `inline`
// keeps a plain link's underline; `quiet` softens the tail on filled buttons.

type ScrambleTextProps = {
  children: string;
  inline?: boolean;
  quiet?: boolean;
};

export const ScrambleText = ({ children, inline = false, quiet = false }: ScrambleTextProps) => {
  const className = `fx-scr${inline ? " fx-scr--inline" : ""}${quiet ? " fx-scr--quiet" : ""}`;
  return (
    <span className={className} data-fx-scr="">
      <span className="fx-scr__txt">{children}</span>
      <span className="fx-scr__fx" aria-hidden="true">
        <span className="fx-scr__done" />
        <span className="fx-scr__tail" />
      </span>
    </span>
  );
};
