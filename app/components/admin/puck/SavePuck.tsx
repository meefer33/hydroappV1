import { Button } from "@mantine/core";
import { usePuck } from "@measured/puck";
import { useFetcher } from "@remix-run/react";

export default function SavePuck({ saveMeta, type }) {
  const { appState } = usePuck();
  const updateMetafield = useFetcher();
  const isSaving = updateMetafield.state !== "idle";

  const save = (appData) => {
    updateMetafield.submit(
      {
        id: saveMeta.id,
        metaobject: {
          fields: [
            {
              key: type,
              value: JSON.stringify(appData),
            },
          ],
        },
      },
      {
        method: "POST",
        action: "/api/updateMetaobject",
        encType: "application/json",
      },
    );

    return true;
  };

  return (
    <Button
      loading={isSaving}
      loaderProps={{ type: "dots" }}
      color="teal.6"
      onClick={() => save(appState)}
    >
      Save
    </Button>
  );
}
