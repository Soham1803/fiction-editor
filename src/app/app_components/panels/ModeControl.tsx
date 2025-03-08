import { Mode } from "../types";
import Chat from "./Chat";
import Nexus from "./Nexus";
import Plan from "./Plan";
import PrePlan from "./PrePlan";
import WritePanel from "./WritePanel";


export default function ModeControl(props: { mode : Mode, rightCollapsed: boolean }) {
    
    switch (props.mode) {
        case "Write":
            return <WritePanel rightCollapsed={props.rightCollapsed} />
    
        case "Plan":
            return <Plan rightCollapsed={props.rightCollapsed} />
    
        case "Pre-Plan":
            return <PrePlan rightCollapsed={props.rightCollapsed} />
    
        case "Chat":
            return <Chat rightCollapsed={props.rightCollapsed} />
    
        case "Nexus":
            return <Nexus rightCollapsed={props.rightCollapsed} />
    
        default:
            break;
    }
}