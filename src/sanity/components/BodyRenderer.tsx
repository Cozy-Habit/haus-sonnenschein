import { Typography } from "@/components";
import { PortableText } from "@portabletext/react";
import { InternationalizedArrayPortableText } from "../../../sanity.types";

export default function BodyRenderer({ body }: { body: any; key?: string }) {
  return (
    <PortableText
      value={body as never}
      components={{
        block: {
          h2: ({ children }) => (
            <Typography type="h1" as="h2" fontFamily="lilita">
              {children}
            </Typography>
          ),
          normal: ({ children }) => (
            <Typography type="body-semibold">{children}</Typography>
          ),
          h3: ({ children }) => (
            <Typography type="h2" as="h3">
              {children}
            </Typography>
          ),
        },
        list: {
          bullet: ({ children }) => (
            <Typography type="body-semibold" as="span">
              <ul style={{ paddingLeft: "20px" }}>{children}</ul>
            </Typography>
          ),
        },
        listItem: {
          bullet: ({ children }) => <li>{children}</li>,
        },
      }}
    />
  );
}
