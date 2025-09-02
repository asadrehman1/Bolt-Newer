import { useAction } from "@/context/ActionContext";
import {
  useSandpack,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import React, { useEffect, useRef } from "react";

function SandpackPreviewClient({ style }) {
  const { sandpack } = useSandpack();
  const previewRef = useRef();
  const { action } = useAction();

  useEffect(() => {
    getSandPackClient();
  }, [sandpack && action]);

  const getSandPackClient = async () => {
    const client = previewRef.current?.getClient();
    if (client) {
      const result = await client.getCodeSandboxURL();
      if(action.actionType === "export") {
        window?.open(result?.editorUrl);
      }
    }
  };
  return (
    <SandpackPreview ref={previewRef} style={style} showNavigator={true} />
  );
}

export default SandpackPreviewClient;
