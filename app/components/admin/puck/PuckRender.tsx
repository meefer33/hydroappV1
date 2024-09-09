import { Render, usePuck } from "@measured/puck";

export default function PuckRender({config}:any){
    const { appState } = usePuck();

    return(
        <Render config={config} data={appState.data} />
    )

}