import { Button } from "@mantine/core";
import { usePuck } from "@measured/puck";
import { useFetcher } from "@remix-run/react";
import { useEffect } from "react";

export default function SavePuck({ saveMeta, type, setIsSaving }:any) {
  const { appState } = usePuck();
  const updateMetafield = useFetcher();
  const isSaving = updateMetafield.state !== "idle";

  const save = (appData:any) => {
    setIsSaving(true)
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

    //return true;
  };

  useEffect(()=>{
    updateMetafield.state === 'idle' && setIsSaving(false)
  },[updateMetafield.state])

  return (
    <Button
      loading={isSaving}
      loaderProps={{ type: "dots" }}
      color="gray.7"
      onClick={(e) => {
        e.preventDefault()
        save(appState)
      }}
    >
      Save
    </Button>
  );
}
